<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;

class ReturnApiController extends Controller
{
    //

    public function index(Request $request)
    {
        $booking = Booking::with('car')->whereHas('car', function ($query) use ($request) {
            $query->where('license_plate', $request->licensePlate);
        })->where('user_id', $request->userId)->get();

        // DB::transaction(function () {

        //     $booking->is_return = 1;
        //     $booking->save();

        //     $car = Car::find($booking->car->id);
        //     $car->is_available = 1;
        //     $car->save();
        // });

        if ($booking->isEmpty()) {
            $response = [
                'status' => false,
                'message' => "Lincense plate in your booking was not found",
            ];
        }else{
            $response = [
                'status' => true,
                'message' => "Data successfully retrivied.",
                'data' => $booking,
            ];

        }

        return response()->json($response, 200);

    }
}
