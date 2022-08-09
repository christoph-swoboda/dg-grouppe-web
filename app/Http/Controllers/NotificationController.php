<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\BillCategory;
use App\Models\BillRequest;
use App\Models\Device;
use App\Models\Notification;
use App\Models\RequestResponse;
use App\Models\User;
use App\Notifications\SendPushNotification;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Artisan;
use Kutia\Larafirebase\Facades\Larafirebase;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): Response
    {
        $notifications = Notification::where('user_id', auth()->user()->id)
            ->where('seen', 0)
            ->with(['request' => function ($q) {
                $q->with('bill')
                    ->with('type')
                    ->with('response');
            }])
            ->orderBy('id', 'desc')
            ->get();

        $duplicateNotifications = [];
        $newNotifications = [];
        foreach ($notifications as $notification) {
            if (!in_array($notification['bill_request_id'], $duplicateNotifications)) {
                $duplicateNotifications[] = $notification['bill_request_id'];
                $newNotifications[] = $notification;
            }
            // to delete from db
            // if (in_array($notification['bill_request_id'], $duplicateNotifications)) {
            //     Notification::where('id', $notification['id'])->delete();
            // } else {
            //    $newNotifications[]=$notification;
            // }
        }

        return response($newNotifications, 201);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    public function seen($id)
    {
        $notification = Notification::find($id);
        $notification->update(['seen' => 1]);

        return response($notification, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Notification $notification
     * @return Response
     */
    public function show(Notification $notification)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Notification $notification
     * @return Response
     */
    public function edit(Notification $notification)
    {
        //
    }

    public function sendNotification(Request $request)
    {
//        $title = 'hey there';
//        $message = 'Your Notification';
//
//        try {
//            $devicesWithUsers = Device::whereNotNull('token')->get();
//            $fcmTokens = $devicesWithUsers->pluck('token')->toArray();
//
//            Larafirebase::withTitle($title)
//                ->withBody($message)
//                ->sendNotification($fcmTokens);
//            return response($fcmTokens, 201);
//
//        } catch (\Exception $e) {
//            report($e);
//            return response('failed', 560);
//        }


//        $fcmTokens = Device::whereNotNull('token')->pluck('token')->toArray();
        $fcmTokens = Device::whereNotNull('token')->get();


        $users = User::where('role', '!=', 1)->get();

        foreach ($users as $key => $User) {
            $bill = Bill::create(['user_id' => $User->id]);

            $userWithTypes = User::where('id', $User->id)
                ->with(['employees' => function ($q) {
                    $q->with('types');
                }])->get();

            $userTypes = [];
            $userTypesTitle = [];
            foreach ($userWithTypes as $user) {
                $employees = $user->employees;
                foreach ($employees->types as $type) {
                    $userTypes[] = $type->id;
                    $userTypesTitle[] = $type->title;
                }
            }

            foreach ($userTypes as $index=> $userType) {
                BillCategory::create([
                    'bill_id' => $bill->id,
                    'category_id' => $userType,
                ]);

                $billRequest = BillRequest::create([
                    'bill_id' => $bill->id,
                    'category_id' => $userType,
                    'user_id' => $User->id
                ]);

                RequestResponse::create([
                    'bill_request_id' => $billRequest->id,
                ]);

                $title = 'Request To Upload ' . $userTypesTitle[$index] . ' Bill';
                $message = 'Upload appropriate photo for the required bill';
                if ($User->id == $fcmTokens[$key]->user_id) {
                    Larafirebase::withTitle($title)
                        ->withBody($message)
                        ->sendNotification($fcmTokens[$key]->token);
                }
            }
        }
        return response($fcmTokens, 201);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Notification $notification
     * @return Response
     */
    public function update(Request $request, Notification $notification)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Notification $notification
     * @return Response
     */
    public function destroy(Notification $notification)
    {
        //
    }
}
