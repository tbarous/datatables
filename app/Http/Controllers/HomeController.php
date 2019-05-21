<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class HomeController extends Controller
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
        $pages = [
            ['title'=>'EETT Overview', 'slug' => 'eett-overview', 'icon' => 'dashboard'],
            ['title'=>'EETT Delta Report', 'slug' => 'eett-delta-report', 'icon' => 'report'],
            ['title'=>'EETT Scripts', 'slug' => 'eett-scripts', 'icon' => 'code'],
            ['title'=>'Log', 'slug' => 'log', 'icon' => 'chat'],
            ['title'=>'Users', 'slug' => 'users', 'icon' => 'person']
        ];

        $data = [
            'user' => auth()->user(),
            'users' => User::getData(),
            'pages' => $pages
        ];

        return view('layouts.app', compact('data'));
    }
}
