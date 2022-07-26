<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
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
     * @param  \Illuminate\Http\Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @return Collection|User[]
     */
    public function show( )
    {
        return User::all();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  Message  $message
     * @return Response
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param $id
     * @param $role
     * @return Response
     */
    public function update($id, $role)
    {
       return User::where('id',$id)->update(['role'=>$role]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Message  $message
     * @return Response
     */
    public function destroy(Message $message)
    {
        //
    }
}
