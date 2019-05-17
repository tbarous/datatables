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

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return User::get();
    }

    public function getUsersForDataTable(Request $request)
    {
        $query = $this->user->orderBy($request->column, $request->order);

        if (!$this->isEmpty($request->search)) {
            $query = $query->where('username', 'LIKE', '%' . $request->search . '%');
        }

        $users = $query->paginate($request->per_page);
        return UsersResource::collection($users);
    }

    public function isEmpty($string)
    {
        return $string == '';
    }
}
