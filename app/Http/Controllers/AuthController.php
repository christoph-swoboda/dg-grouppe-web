<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Notification;
use App\Models\User;
use App\Repositories\Users\UsersRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    private $usersRepository;

    public function __construct(UsersRepository $usersRepository)
    {
        $this->usersRepository = $usersRepository;
    }

    /**
     * Show the form for creating a new register.
     *
     * @return Response
     */
    public function register(Request $request): Response
    {
        $response = $this->usersRepository->store($request);
        return response($response, 201);
    }

    /**
     * Show the form for creating a new register.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        $credentials = [
            'email' => request('email'),
            'password' => request('password'),
        ];

        $user = Auth::attempt($credentials);

        if (!$user || (isset($user->status) && !$user->status)) {
            return response()->json([
                'code' => 401,
                'message' => 'invalid_credentials.'
            ], 401);
        }

        $tokenResult = $request->user()->createToken('auth:token');
        $user = auth()->user();

        if($user->role==='2' && $user->enabled===0){
            $user->update(['enabled'=>1]);
        }

        return response()->json([
            'user' => $user,
            'access_token' => $tokenResult->plainTextToken,
            'token_type' => 'Bearer',
        ]);
    }

    /**
     * Show the form for creating a new logout.
     *
     */
    public function logout(Request $request): array
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Logged Out'
        ];
    }

    public function test()
    {
//        return Bill::with('type')->with(['requests' => function ($q) {
//                $q->with('response')->get();
//        }])->get();

//        return Notification::where('employee_id',auth()->user()->id)->with('response')->get();
        return Notification::with('response')->get();

    }

}
