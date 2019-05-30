<?php

namespace App\Http\Controllers;

use App\Exports\UsersExport;
use App\Models\User;
use App\Page;
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

        $data = [
            'user' => auth()->user(),
            'users' => User::getData(),
            'pages' => Page::get()->toTree()
        ];

        return view('layouts.app', compact('data'));
    }

    public function page_not_found()
    {
        return view('404');
    }
}
