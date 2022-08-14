<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Collection|Setting[]
     */
    public function index()
    {
        return Setting::all();
    }


    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Application|ResponseFactory|Response
     */
    public function store(Request $request)
    {
        $keys = [];
        foreach ($request->input() as $key => $input) {
            $keys[$key]['keyword'] = $input[0];
            $keys[$key]['value'] = $input[1];
        }

        foreach ($keys as $data) {
            Setting::updateorcreate(['keyword' => $data['keyword']],$data);
        }

        return response($keys, '201');
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Setting $setting
     * @return Response
     */
    public function show(Setting $setting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Setting $setting
     * @return Response
     */
    public function edit(Setting $setting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param \App\Models\Setting $setting
     * @return Response
     */
    public function update(Request $request, Setting $setting)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Setting $setting
     * @return Response
     */
    public function destroy(Setting $setting)
    {
        //
    }
}
