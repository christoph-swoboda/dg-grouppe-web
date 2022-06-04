<?php
namespace App\Repositories\Products;
use Illuminate\Http\Request;

interface UsersInterface
{
    public function save(Request $request);

    public function update(Request $request, int $id);

    public function delete(int $id);

}
