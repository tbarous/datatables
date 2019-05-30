<?php

namespace App\Http\Controllers;

use App\Exports\UsersExport;
use App\Models\User;
use App\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
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
        $b = [];
        $array = Page::get()->toArray();
        $first = Arr::first($array, function ($value, $key) {
            $b[] = $value['name'];
            $a = Str::contains("http://project.local/users", $value['name']);
            return $a;
        });

        dd($b);
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
