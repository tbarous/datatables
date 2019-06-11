<?php

namespace App\Http\Controllers;

use App\Http\Resources\CellResource;
use App\Models\Cell;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CellController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(Request $request)
    {
        $query = Cell::filter($request)->orderBy($request->column, $request->order);

        $cells = $query->with('status')->paginate($request->per_page);

        $additional = [
            'meta' => [
                'last_update' => Carbon::parse(Cell::max('updated_at'))->format('d/m/Y - H:i:s a'),
            ]
        ];

        return CellResource::collection($cells)->additional($additional);
    }

    /**
     * [update description]
     * @param  Request $request [description]
     * @return [type]           [description]
     */
    // public function update(UserUpdateRequest $request)
    // {
    //     $validated = (object) $request->validated();
    //     $user = User::find($validated->id);
    //     $user->username = $validated->username;
    //     $user->email = $validated->email;
    //     $user->save();

    //     return $user;
    // }

    // public function updateMany(Request $request)
    // {
    //     $ids = json_decode($request->selected, true);
    //     $data = json_decode($request->row, true);

    //     foreach ($ids as $key => $id) {
    //         $data['id'] = $id;
    //         User::where('id', $id)->update($data);
    //     }

    //     $users = User::find($ids);

    //     return UsersResource::collection($users);
    // }

    // public function destroy(Request $request)
    // {
    //     // $user = User::find($request->id);

    //     // $user->delete();
    // }
}
