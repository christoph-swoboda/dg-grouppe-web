<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @return Collection|User[]
     */
    public function show()
    {
        return User::all();
    }

    public function update(Request $request)
    {
        $user = User::where('email', $request->input('email'))->first();

        if ($request->input('newPassword')) {
            if ($request->input('newPassword') === $request->input('repeatPassword')) {
                if (!Hash::check($request->input('currentPassword'), $user->password)) {
                    return response('old password is wrong', '555');
                } else {
                    $user->update(['password' => bcrypt($request->input('newPassword'))]);
                    return response('password updated successfully', '200');
                }
            } else {
                return response('passwords didnt match', '554');
            }
        }

        $employee = $user->employees;
        $employee->update(['phone' => $request->input('phone-input')]);
    }
}
