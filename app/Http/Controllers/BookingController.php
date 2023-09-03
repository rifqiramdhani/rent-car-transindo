<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Inertia\Inertia;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render('Admin/Booking/Index', [
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
        $request->validate([
            'started_date' => 'required',
            'ended_date' => 'required',
            'car_id' => 'required'
        ]);

        $user_id = Auth::user()->id;

        $car = Car::find($request->car_id);

        if($car->is_available == 0){
            return redirect('/booking')->with(['status'=> false, 'message' => 'Sorry, this car is not available']);

        }

        $booking = Booking::create([
            'user_id' => $user_id,
            'car_id' => $car->id,
            'start_date' => $request->started_date,
            'end_date' => $request->ended_date
        ]);

        $car->is_available = '0';
        $car->save();

        return redirect('/dashboard')->with(['status'=> true, 'message' => 'Your order has successfully']);

    }
}
