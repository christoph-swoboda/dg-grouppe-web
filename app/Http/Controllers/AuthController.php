<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Repositories\Users\UsersRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    private $usersRepository;

    public function __construct(UsersRepository $usersRepository)
    {
        $this->usersRepository = $usersRepository;
    }

    /**
     * Show the form for creating a new register.
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request): Response
    {
        $response = $this->usersRepository->store($request);
        return response($response, 201);
    }

    /**
     * Show the form for creating a new register.
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request): Response
    {
        $fields = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ],
            [
                'email.required' => ':attribute is not valid',
                'password.required' => ':attribute does not match to this email',
            ]
        );

        $user = User::where('email', $fields['email'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'user not found'
            ], 401);
        }

        $admin = false;
        if ($user->role !== 'user') {
            $admin = true;
        }
        $token = $user->createToken('portfolioToken')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token,
            'admin' => $admin
        ], 202);
    }

    /**
     * Show the form for creating a new logout.
     *
     */
    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Logged Out'
        ];
    }

}
