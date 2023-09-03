<?php

namespace App\Http\Controllers\Api;

use App\Models\Car;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CarApiController extends Controller
{
    //

    public function index(Request $request)
    {
        //
        // dd($request);

        $cars = Car::first();

        if($request->has('keyword')){
            $cars = $cars->where('brand', 'LIKE', "%{$request->keyword}%")->orWhere('model', 'LIKE', "%{$request->keyword}%")->orWhere('license_plate', 'LIKE', "%{$request->keyword}%")->orWhere('rental_rate', 'LIKE', "%{$request->keyword}%");
           
            $request->merge([
                'page' => 1
            ]);
        }

        if($request->has('column.sorter')){
            $orderBy = $request->order == 'ascend' ? 'asc' : 'desc';

            $cars = $cars->orderBy($request->field, $orderBy);
        }

        if($request->has('pagination.pageSize')){
            $cars = $cars->paginate($perPage = $request->pagination['pageSize']);
        }else{
            $cars = $cars->get();
        }

        $response = [
            'status' => "success",
            'message' => "Data successfully retrivied.",
            'data' => $cars,
        ];

        return response()->json($response, 200);
    }

    public function availableCar(Request $request)
    {
        $cars = Car::where('is_available', '1')->get();

        $response = [
            'status' => "success",
            'message' => "Data successfully retrivied.",
            'data' => $cars,
        ];

        return response()->json($response, 200);
    }
}
