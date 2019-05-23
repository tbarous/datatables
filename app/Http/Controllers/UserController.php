<?php
     
namespace App\Http\Controllers;

use App\Http\Resources\UsersResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

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
     * GET api route resolver
     * @param  Request $request
     * @return UsersResource
     */
    public function index(Request $request)
    {
        // $users = User::query();
        // Cache::put('users', $users);

        $query = $this->user->filter($request)->orderBy($request->column, $request->order);

        $users = $query->paginate($request->per_page);

        return UsersResource::collection($users);
    }

    /**
     * [update description]
     * @param  Request $request [description]
     * @return [type]           [description]
     */
    public function update(Request $request)
    {
        $user = json_decode($request->row, true);

        unset($user['created_at']);
        unset($user['updated_at']);

        User::where('id', $user['id'])->update($user);
    }
}
