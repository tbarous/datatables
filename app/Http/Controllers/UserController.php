<?php
     
namespace App\Http\Controllers;

use App\Http\Requests\UserUpdateRequest;
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

        return UsersResource::collection($users)
                            ->additional(
                                [
                                    'meta' => [
                                        'last_update' => Carbon::parse(User::max('updated_at'))->format('d/m/Y - H:i:s a', 'Europe/Athens'),
                                        'created_at' => [Carbon::parse(User::min('created_at'))->format('d/m/Y H:i:s', 'Europe/Athens'), Carbon::parse(User::max('created_at'))->format('d/m/Y H:i:s', 'Europe/Athens')]
                                    ]
                                ]
                            );
    }

    /**
     * [update description]
     * @param  Request $request [description]
     * @return [type]           [description]
     */
    public function update(UserUpdateRequest $request)
    {
        $validated = (object) $request->validated();
        // return $request->id;
        $user = User::find($request->id);
        $user->username = $validated->username;
        $user->email = $validated->email;
        $user->save();

        return $user;
    }

    public function updateMany(Request $request)
    {
        $ids = json_decode($request->selected, true);
        $data = json_decode($request->row, true);

        foreach ($ids as $key => $id) {
            $data['id'] = $id;
            User::where('id', $id)->update($data);
        }

        $users = User::find($ids);

        return UsersResource::collection($users);
    }

    public function destroy(Request $request)
    {
        // $user = User::find($request->id);

        // $user->delete();
    }
}
