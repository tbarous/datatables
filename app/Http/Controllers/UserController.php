<?php
     
namespace App\Http\Controllers;

use App\Http\Resources\UsersResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class UserController extends Controller
{
    /**
     * @param User $user
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * GET api route resolver
     * @param  Request $request
     * @return UsersResource
     */
    public function index(Request $request)
    {
        $query = User::filter($request)->orderBy($request->column, $request->order);

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

    public function updateMany(Request $request)
    {
        $ids = json_decode($request->selected, true);
        $data = json_decode($request->row, true);

        foreach ($ids as $key => $id) {
            $data['id'] = $id;
            User::where('id', $id)->update($data);
        }

        return User::find($ids);
    }

    public function destroy(Request $request)
    {
        $user = User::find($request->id);

        $user->delete();

        return 5;
    }
}
