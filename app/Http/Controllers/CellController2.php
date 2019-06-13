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

        return CellResource::collection($cells);
    }

    /**
     * [update description]
     * @param  Request $request [description]
     * @return [type]           [description]
     */
    public function update(Request $request)
    {
    }

    public function updateMany(Request $request)
    {
    }

    public function destroy(Request $request)
    {
    }
}
