<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Device;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class EmployeeController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return Application|Response|ResponseFactory
     */
    public function index()
    {
        $users = User::where('role', 2)
            ->with(['bills' => function ($q) {
                $q->with(['requests' => function ($sq) {
                    $sq->where('status', '!=', '2');
                }]);
            }])->with(['employees' => function ($q) {
                $q->with('types');
            }])
            ->when(\request()->has('search'), function ($q) {
                $q->where('title', 'LIKE', '%' . \request('search') . '%');
            })
            ->orderBy('id', 'desc')
            ->paginate(10);

        return response($users, 201);
    }


    public function saveDeviceId($token)
    {
        $data = [
            'token' => $token,
            'user_id' => auth()->user()->id
        ];
        Device::updateorcreate($data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|unique:users,email',
            'password' => ['required', 'min:8', 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/']
        ]);

        DB::beginTransaction();

        try {
            $data = $this->storeUserData($request);
            $user = User::create($data);
            $employeeData = $this->storeEmployeeData($request, $user->id);
            $employee = Employee::create($employeeData);
            if ($request->input('role')) {
                $adminData = $this->storeAdminData($request, $user->id);
                Admin::create($adminData);
            }
            $employee->types()->sync($request->input('categories'));

            DB::commit();

            return $this->successResponse([$user]);

        } catch (\Throwable $throwable) {
            DB::rollBack();
            $this->errorLog($throwable, 'api');

            return $this->failResponse($throwable->getMessage());
        }
    }

    /**
     * @throws ValidationException
     */
    public function addBulk(Request $request, $failed): JsonResponse
    {
        $this->validate($request, [
            '*.email' => 'required|email|unique:users,email'
            ],
            [
                '*.email.unique' => ':attribute Already Exists',
            ]);

        $unresolved = json_decode($failed);

//        dd($request->input());

        if (count($request->input()) > 0) {
            $types = [];
            for ($i = 0; $i < count($request->input()); $i++) {
                if ($request[$i]['phone'] == 'y') {
                    $types[] = 1;
                }
                if ($request[$i]['internet'] == 'y') {
                    $types[] = 2;
                }
                if ($request[$i]['car'] == 'y') {
                    $types[] = 3;
                }
                if ($request[$i]['train'] == 'y') {
                    $types[] = 4;
                }
                DB::beginTransaction();
                try {
                    $data = $this->storeUserData($request[$i]);
                    $user = User::create($data);
                    $employeeData = $this->storeEmployeeData($request[$i], $user->id);
                    $employee = Employee::create($employeeData);
                    $employee->types()->sync($types);
                    DB::commit();
                    $types = [];

                } catch (\Throwable $throwable) {
                    DB::rollBack();
                    $this->errorLog($throwable, 'api');
                    return $this->failResponse($throwable->getMessage());
                }
            }
        }

        return $this->successResponse([$user]);
    }

    private function storeUserData($request): array
    {
        if ($request['password']) {
            return [
                'email' => $request['email'],
                'password' => bcrypt($request['password']),
            ];
        } else {
            return [
                'email' => $request['email'],
            ];
        }
    }

    private function storeEmployeeData($request, $id): array
    {
        return [
            'user_id' => $id,
            'first_name' => $request['first_name'],
            'last_name' => $request['last_name'],
            'gender' => $request['gender'],
            'phone' => $request['phone_number'],
            'address' => $request['address'],
        ];
    }

    private function storeAdminData($request, $id): array
    {
        return [
            'user_id' => $id,
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param $id
     * @return Response
     */
    public function show($id): Response
    {
        $user = User::where('id', $id)
            ->with(['bills' => function ($q) {
                $q->with(['type' => function ($q) {
                    $q->when(\request()->has('category'), function ($q) {
                        $q->where('categories.id', \request('category'));
                    });
                }])
                    ->with(['requests' => function ($sq) {
                        $sq->with('response');
                    }])
                    ->when(\request()->has('period'), function ($q) {
                        if (\request('period') == 1) {
                            $q->whereMonth('created_at', '<', '5');
                        } else if (\request('period') == 2) {
                            $q->where(function ($query) {
                                $query->whereMonth('created_at', 5);
                                $query->orWhere(function ($query2) {
                                    $query2->whereMonth('created_at', 6);
                                });
                                $query->orWhere(function ($query1) {
                                    $query1->whereMonth('created_at', 7);
                                });
                                $query->orWhere(function ($query1) {
                                    $query1->whereMonth('created_at', 8);
                                });
                            });
                        } else {
                            $q->whereMonth('created_at', '>', '8');
                        }
                    })
                    ->when(\request()->has('year'), function ($q) {
                        $q->whereYear('created_at', '=', \request('year'));
                    })
                    ->when(\request()->has('search'), function ($q) {
                        $q->where('title', 'LIKE', '%' . \request('search') . '%');
                    });
            }])
            ->with(['employees' => function ($q) {
                $q->with('types');
            }])
            ->first();

        $open = [];
        $approved = [];
        $rejected = [];
        foreach ($user->bills as $bills) {
            foreach ($bills->requests as $request) {
                if ($request->status == '1') {
                    $open[] = $request;
                }
                if ($request->status == '2') {
                    $approved[] = $request;
                }
                if ($request->status == '3') {
                    $rejected[] = $request;
                }
            }
        }

        $result = ['user' => $user, 'open' => $open, 'approved' => $approved, 'rejected' => $rejected];

        return response($result, 201);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Employee $employee
     * @return Response
     */
    public function edit(Employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function update(Request $request, $id): JsonResponse
    {

        $user = User::findOrFail($id);

        $data = $this->storeUserData($request);
        $user->update($data);

        $employeeData = $this->storeEmployeeData($request, $user->id);
        $employee = Employee::findOrFail($user->employees->id);

        $employee->update($employeeData);

        $employee->types()->detach();
        $employee->types()->sync($request->input('categories'));

        return $this->successResponse([$user]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Employee $employee
     * @return Response
     */
    public function destroy(Employee $employee)
    {
        //
    }


    public function admin()
    {
        return User::with('admins')
            ->where('id', auth()->user()->id)
            ->first();
    }

    public function employee()
    {
        return User::with('employees')
            ->where('id', auth()->user()->id)
            ->first();
    }

    public function profileImage(Request $request, $id)
    {

        $employee = Employee::find($id);
        $image_url = $this->storeImage($request, $id);

        $employee->update(['image' => $image_url]);

        return response('done', 201);
    }

    private function storeImage($request, $id): string
    {

        if ($request->input('image')) {
            $image = $request->input('image');
            $image = str_replace('data:image/jpeg;base64,', '', $image);
            $image = str_replace('data:image/png;base64,', '', $image);
            $image = str_replace(' ', '+', $image);

            $imageName = 'user_' . $id . '.' . 'png';
            $upload_path = 'assets/userImage/';
            if (!\File::isDirectory($upload_path)) {
                \File::makeDirectory($upload_path, 777);
            }
            \File::put(public_path($upload_path) . $imageName, base64_decode($image));
            $image_url = $upload_path . $imageName;
        }
        return $image_url;
    }

}
