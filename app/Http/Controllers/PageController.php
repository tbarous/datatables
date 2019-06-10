<?php

namespace App\Http\Controllers;

use App\Http\Resources\PageResource;
use App\Models\Page;
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

        return PageResource::collection($pages);
    }
}
