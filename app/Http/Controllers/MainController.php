<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MainController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @param Request $request
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        $data = [
            'auth' => auth()->user(),
            'menu' => (new \App\Models\Page)->getMenu(),
            'pages' => (new \App\Models\Page)->getData(),
            'users' => (new \App\Models\User)->getData(),
            'cells' => (new \App\Models\Cell)->getData()
        ];

        return view('layouts.app', compact('data'));
    }
}
