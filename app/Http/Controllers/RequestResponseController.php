<?php

namespace App\Http\Controllers;

use App\Models\RequestResponse;
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
        $response = RequestResponse::find($request->input('id'));
        $image_url = $this->storeImage($request);

        $response->update(['image' => $image_url]);

        return response('Photo Uploaded Successfully', 200);
    }

    private function storeImage($request): string
    {

        if ($request->input('image')) {
            $image = $request->input('image');
            $image = str_replace('data:image/jpeg;base64,', '', $image);
            $image = str_replace('data:image/png;base64,', '', $image);
            $image = str_replace(' ', '+', $image);

            $imageName ='response_'. $request->input('id') . '.' . 'png';
            $upload_path = 'assets/responses/';
            if (!\File::isDirectory($upload_path)) {
                \File::makeDirectory($upload_path, 777);
            }
            \File::put(public_path($upload_path) . $imageName, base64_decode($image));
            $image_url= $upload_path . $imageName;
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
