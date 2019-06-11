<?php

namespace App\Http\Controllers;

use App\Exports\UsersExport;
use App\Models\Cell;
use App\Models\Page;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Redirect;
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
    }

    /**
     * Show the application dashboard.
     *
     * @param Request $request
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        // Excel::store(new UsersExport(2018), 'public/invoices.xlsx');
        // Excel::store(new UsersExport(2018), 'public/invoices.pdf');

        $data = [
            'auth' => auth()->user(),
            'users' => (new User)->getData(),
            'menu' => (new Page)->getMenu(),
            'pages' => (new Page)->getData(),
            'cells' => array_merge((new Cell)->getData(), [
                'selectFilters' => [
                    [
                        'name' => 'status',
                        'options' => ['Halted', 'Down'],
                        'value' => 'Halted'
                    ]
                ]
            ])
        ];

        return view('layouts.app', compact('data'));
    }
}
