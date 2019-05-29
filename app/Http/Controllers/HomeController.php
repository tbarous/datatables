<?php

namespace App\Http\Controllers;

use App\Exports\UsersExport;
use App\Models\User;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

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
        Excel::store(new UsersExport(2018), 'public/invoices.xlsx');
        Excel::store(new UsersExport(2018), 'public/invoices.pdf');

        $pages = [
            'tools' => [
                ['title' => 'Tools'],
                ['title'=>'EETT Overview', 'slug' => 'eett-overview', 'icon' => 'dashboard'],
                ['title'=>'EETT Delta Report', 'slug' => 'eett-delta-report', 'icon' => 'report'],
                ['title'=>'EETT Scripts', 'slug' => 'eett-scripts', 'icon' => 'code'],
                ['title'=>'Log', 'slug' => 'log', 'icon' => 'chat'],
                ['title'=>'Users', 'slug' => 'users', 'icon' => 'person']
            ],
            'documentation' => [
                ['title'=>'Documentation', 'slug' => 'documentation', 'icon' => 'fa fa-file']
            ],
            'info' => [
                ['title'=>'Information', 'slug' => 'info', 'icon' => 'fa fa-info']
            ]
        ];

        $data = [
            'user' => auth()->user(),
            'users' => User::getData(),
            'pages' => $pages
        ];

        return view('layouts.app', compact('data'));
    }

    public function page_not_found()
    {
        return view('404');
    }
}
