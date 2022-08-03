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

    public function updatePassword(Request $request, $id)
    {
        $user = User::find($id);

        if ($request->input('newPassword') === $request->input('repeatPassword')) {
            if (!Hash::check($user->password, $request->input('currentPassword'))) {
                return response('old password is wrong', '555');
            } else {
                $user->update(['password'=>$request->input('newPassword')]);
                return response('password updated successfully', '200');
            }
        } else {
            return response('passwords didnt match', '554');
        }
    }

    public function updatePhone(Request $request, $id){
        $user=User::where('id', $id)->with('employees')->first();
        $employee=$user->employees;
        $employee->update(['phone'=>$request->input('phone')]);

        return response($employee, '200');
    }

}
