<?php

namespace App\Http\Controllers;

use App\Models\UnresolvedUser;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UnresolvedUserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Collection|UnresolvedUser[]
     */
    public function index()
    {
        return UnresolvedUser::all();
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
     * @param $id
     * @return Response
     */
    public function show($id): Response
    {
        return UnresolvedUser::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param UnresolvedUser $unresolvedUser
     * @return Response
     */
    public function edit(UnresolvedUser $unresolvedUser)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param UnresolvedUser $unresolvedUser
     * @return Response
     */
    public function update(Request $request, UnresolvedUser $unresolvedUser)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param UnresolvedUser $unresolvedUser
     * @return Response
     */
    public function destroy(UnresolvedUser $unresolvedUser)
    {
        //
    }
}
