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
            $keyword = $input[0];
            $value   = $input[1];

            // Handle app_logo separately
            if ($keyword === 'app_logo') {
                if (!empty($value)) {
                    $value = $this->storeImage($value);
                } else {
                    $existing = Setting::where('keyword', 'app_logo')->first();
                    $value = $existing ? $existing->value : ''; // ensure never null
                }
            }

            // Update or create
            Setting::updateOrCreate(
                ['keyword' => $keyword],
                ['value'   => $value]
            );

            $keys[] = [
                'keyword' => $keyword,
                'value'   => $value,
            ];
        }

        return response($keys, 201);
    }



    private function storeImage($image): string
    {
        if ($image) {
            $image = str_replace('data:image/jpeg;base64,', '', $image);
            $image = str_replace('data:image/png;base64,', '', $image);
            $image = str_replace(' ', '+', $image);

            $imageName = 'logo' . now()->timestamp . '.' . 'png';
            $upload_path = 'assets/logo/';
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
