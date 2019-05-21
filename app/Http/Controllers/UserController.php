<?php
     
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UsersResource;

class UserController extends Controller
{
    protected $user;

    /**
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * @param  Request $request
     * @return Collection
     */
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
        //
    }
}
