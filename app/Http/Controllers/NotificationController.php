<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       $notifications= Notification::where('user_id', auth()->user()->id)
        ->where('seen', 0)
        ->with(['request'=> function ($q){
            $q->with('bill')
            ->with('type')
            ->with('response');
        }])
        ->orderBy('id', 'desc')
        ->get();

        $duplicateNotifications = [];
        $newNotifications=[];
        foreach ($notifications as $notification) {
            if (!in_array($notification['bill_request_id'], $duplicateNotifications)) {
                $duplicateNotifications[]=$notification['bill_request_id'];
                $newNotifications[]=$notification;
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
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Notification  $notification
     * @return \Illuminate\Http\Response
     */
    public function show(Notification $notification)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Notification  $notification
     * @return \Illuminate\Http\Response
     */
    public function edit(Notification $notification)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Notification  $notification
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Notification $notification)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Notification  $notification
     * @return \Illuminate\Http\Response
     */
    public function destroy(Notification $notification)
    {
        //
    }
}
