<?php

namespace App\Http\Controllers;

use App\Http\Resources\PageResource;
use App\Models\Page;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    
    public function index(Request $request)
    {
        $query = Page::filter($request)->orderBy($request->column, $request->order);

        $pages = $query->paginate($request->per_page);

        $additional = [
            'meta' => [
                'last_update' => Carbon::parse(Page::max('updated_at'))->format('d/m/Y - H:i:s a'),
            ]
        ];

        return PageResource::collection($pages)->additional($additional);
    }

    public function update(Request $request)
    {
        $request = (object) json_decode($request->row, true);
        $page = Page::find($request->id);
        $page->name = $request->name;
        $page->save();

        return $page;
    }

    public function destroy(Request $request)
    {
        $user = Page::find($request->id);

        $user->delete();
    }
}
