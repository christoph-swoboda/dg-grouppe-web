<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Artisan;

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
        $notification=Notification::find($id);
        $notification->update(['seen'=>1]);

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

    public function send()
    {
        return Artisan::call("send:notification", [
            'notificationData' => [
                "title" => "Sample Message",
                "body" => "This is Test message body"
            ]
        ]);
//        return $this->sendNotification('dweLTctVRqu6clnZZjkJbr:APA91bFU1LMx3Z7OZwsU74_-Zf0aHnACqM9zfEcrW_PTK3TuW3tuDhEP9IPbSv9enQcw4lWTL2zSFPvDtd0Pc6DPwKr1NcnIX3_adn3sUSZMjrPfskksrJ4SdScEpE0VqEUD824Kq-yf', array(
//            "title" => "Sample Message",
//            "body" => "This is Test message body"
//        ));
    }

    public function sendNotification($device_token, $message)
    {
        $SERVER_API_KEY = 'AAAAqOpu2V4:APA91bGJhNQUrcrqE97HWOZIdWE_I5pGmZ6R5K3Z9UOcfz-Z_JeQ8SygBHJ2T2x0LoPgdCxvKAutXB_ZAbKJhZvYcWlbvwir5qUfpH3fYEBfRQ-WC-2oCV0UpcsdFpgrzpK4VGrmbwcJ';

        // payload data, it will vary according to requirement
        $data = [
            "to" => $device_token, // for single device id
            "data" => $message
        ];
        $dataString = json_encode($data);

        $headers = [
            'Authorization: key=' . $SERVER_API_KEY,
            'Content-Type: application/json',
        ];

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $dataString);

        $response = curl_exec($ch);

        curl_close($ch);

        return $response;
    }

    public function sendNotifications(): bool
    {
        return Artisan::call("send:notification", [
            'notificationData' => [
                "title" => "Sample Message",
                "body" => "This is Test message body"
            ]
        ]);
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
