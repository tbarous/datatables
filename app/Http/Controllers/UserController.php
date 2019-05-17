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

    public function update(Request $request)
    {
        $data = json_decode($request);

        User::update([
            $data
        ]);

        return $data;
    }

    public function getUsersForDataTable(Request $request)
    {
        $queries = json_decode($request->queries);

        $query = $this->user->orderBy($request->column, $request->order);

        if (!$this->isEmpty($request->search)) {
            $query = $query->where('username', 'LIKE', '%' . $request->search . '%')
                           ->orWhere('email', 'LIKE', '%' . $request->search . '%');
        }

        if (!$this->isEmpty($queries->username)) {
            $query = $query->where('username', 'LIKE', '%' . $queries->username . '%');
        }

        if (!$this->isEmpty($queries->email)) {
            $query = $query->where('email', 'LIKE', '%' . $queries->email . '%');
        }

        $users = $query->paginate($request->per_page);
        return UsersResource::collection($users);
    }

    public function isEmpty($string)
    {
        return $string == '';
    }
}
