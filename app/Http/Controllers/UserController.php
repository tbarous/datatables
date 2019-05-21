<?php
     
namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use DataTables;
use App\Http\Resources\UsersResource;

class UserController extends Controller
{
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function filter(Request $request)
    {
        return User::filter($request)->get();
    }

    public function index(Request $request)
    {
        // $users = User::query();
        // Cache::put('users', $users);

        $query = User::filter($request)->orderBy($request->column, $request->order);

        $users = $query->paginate($request->per_page);
        return UsersResource::collection($users);
    }

    public function update(Request $request)
    {
        $data = json_decode($request);

        User::update([
            $data
        ]);

        return $data;
    }

    public function isEmpty($string)
    {
        return $string == '' || $string == null;
    }
}
