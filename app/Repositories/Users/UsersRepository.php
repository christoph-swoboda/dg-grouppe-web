<?php

namespace App\Repositories\Users;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class UsersRepository
{

    private $model;

    public function __construct(User $user)
    {
        $this->model = $user;
    }

    public function store($request)
    {
        $fields = $request->validate([
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => ['required', 'confirmed', 'string', 'min:10', 'regex:/[a-z]/',
                'regex:/[A-Z]/',
                'regex:/[a-z]/',
                'regex:/[0-9]/'],
            'password_confirmation' => ['required', 'string', 'min:10', 'regex:/[a-z]/',
                'regex:/[A-Z]/',
                'regex:/[a-z]/',
                'regex:/[0-9]/']
        ],
            [
                'firstName.required' => ':attribute can not be blank',
                'lastName.required' => ':attribute can not be blank',
                'email.required' => ':attribute has to be unique',
                'password.required' => ':attribute must have at least one upper case, one lower case letter and number',
                'password_confirmation.required' => ':attribute didnt match the password',
            ]);

        if ($fields['password'] === $fields['password_confirmation']) {
            $user = $this->model::create([
                'first_name' => $fields['firstName'],
                'last_name' => $fields['lastName'],
                'email' => $fields['email'],
                'role' => 'user',
                'password' => bcrypt($fields['password']),
                'password_confirmation' => bcrypt($fields['password_confirmation'])
            ]);
        } else {
            $message = 'passwords didnt match';
        }

        $token = $user->createToken('myapptoken')->plainTextToken;
        $response = [
            'user' => $user,
            'token' => $token,
        ];

        return $response;
    }

    public function login($request)
    {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ],
            [
                'email.required' => ':attribute can not be blank',
                'password.required' => ':attribute does not match to this email',
            ]
        );

        $user = $this->model::where('email', $fields['email'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'user not found'
            ], 401);
        }

        $admin = false;
        if ($user->role !== 'user') {
            $admin = true;
        }
        $token = $user->createToken('myapptoken')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token,
            'admin' => $admin
        ], 202);
    }
}
