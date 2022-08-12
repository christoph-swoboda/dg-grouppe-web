<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\RequestResponse;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RequestResponseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
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

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request): Response
    {
        $response = RequestResponse::with('request')->where('id', $request->input('id'))->first();
        $image_url = $this->storeImage($request);
        $response->update(['image' => $image_url]);
        $response->update(['message' => '1 Image Was Uploaded']);

        $user = User::find(auth()->user()->id);
        $user->update(['last_response_at' => Carbon::now()]);

        $billRequest = $response->request;
        $billRequest->update(['published'=>0]);
        $billRequest->update(['status'=>'1']);

        $notificationData = [
            'bill_request_id' => $billRequest->id,
            'user_id' => $billRequest->user_id
        ];
        $notification= Notification::updateorcreate($notificationData);
        $notification->update(['seen'=>0]);

        return response('Photo Uploaded Successfully', 200);
    }

    private function storeImage($request): string
    {

        if ($request->input('image')) {
            $image = $request->input('image');
            $image = str_replace('data:image/jpeg;base64,', '', $image);
            $image = str_replace('data:image/png;base64,', '', $image);
            $image = str_replace(' ', '+', $image);

            $imageName = 'response_' . $request->input('id') . '.' . 'png';
            $upload_path = 'assets/responses/';
            if (!\File::isDirectory($upload_path)) {
                \File::makeDirectory($upload_path, 777);
            }
            \File::put(public_path($upload_path) . $imageName, base64_decode($image));
            $image_url = $upload_path . $imageName;
        }
        return $image_url;
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\RequestResponse $requestResponse
     * @return Response
     */
    public function show(RequestResponse $requestResponse)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\RequestResponse $requestResponse
     * @return Response
     */
    public function edit(RequestResponse $requestResponse)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param \App\Models\RequestResponse $requestResponse
     * @return Response
     */
    public function update(Request $request, RequestResponse $requestResponse)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\RequestResponse $requestResponse
     * @return Response
     */
    public function destroy(RequestResponse $requestResponse)
    {
        //
    }
}
