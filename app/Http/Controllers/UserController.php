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

    public function index(Request $request)
    {
        $queries = json_decode($request->queries);

        $query = $this->user->orderBy($request->column, $request->order);

        if (!$this->isEmpty($request->search)) {
            $query = $query->where('username', 'LIKE', '%' . $request->search . '%')
                           ->orWhere('email', 'LIKE', '%' . $request->search . '%');
        }

        $text_attributes = ['username' => $queries->username, 'email' => $queries->email];
        foreach ($text_attributes as $key => $text_attribute) {
            if (!$this->isEmpty($text_attribute)) {
                $query = $query->where($key, 'LIKE', '%' . $text_attribute . '%');
            }
        }

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
        return $string == '';
    }
}
