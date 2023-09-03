<?php

namespace App\Http\Controllers;

use App\Models\booking;
use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReturnController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render('Admin/Return/Index', [
            'status' => session('status'),
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        DB::transaction(function () use ($request) {
            $booking = Booking::find($request->id);
            $car = Car::find($request->car_id);

            $booking->is_return = "1";
            $booking->save();

            $car->is_available = "1";
            $car->save();
        });

        try {
            DB::transaction(function () use ($request) {
                $booking = Booking::find($request->id);
                $car = Car::find($request->car_id);

                $booking->is_return = "1";
                $booking->return_date = date('Y-m-d');
                
                $booking->save();

                $car->is_available = "1";
                $car->save();

            });
        } catch (\Exception $e) {
            return redirect('/return')->with([
                'status' => false,
                'status' => 'Your order has failed',
            ]);
        }
        return redirect('/dashboard')->with([
            'status' => true,
            'message' => 'Your return has successfully',
        ]);
    }
}
