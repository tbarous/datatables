<?php

namespace App\Http\Controllers;

use App\Exports\UsersExport;
use App\Models\User;
use App\Page;
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

        $path = request()->path();
        
        if ($path != '/') {
            $result = Page::where('slug', '/' . $path)->get();
            if ($result->isEmpty()) {
                abort(404);
            }
        } else {
            Redirect::to('/eett/overview')->send();
        }
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
            'users' => User::getData(),
            'pages' => Page::getData()
        ];

        return view('layouts.app', compact('data'));
    }
}
