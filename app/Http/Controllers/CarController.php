<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render('Admin/Car/Index', [
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Admin/Car/Partials/CreateCarForm', [
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        $request->validate([
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'license_plate' => 'required|string|max:30',
            'rental_rate' => 'required|max:255',
        ]);

        $car = Car::create($request->all());

        return Redirect::route('car.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Car $car)
    {
        //

        return Inertia::render('Admin/Car/Partials/EditCarForm', [
            'status' => session('status'),
            'cars' => $car
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Car $car)
    {
        //
        $request->validate([
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'license_plate' => 'required|string|max:30',
            'rental_rate' => 'required|max:255',
        ]);

        $car->brand = $request->brand;
        $car->model = $request->model;
        $car->license_plate = $request->license_plate;
        $car->rental_rate = $request->rental_rate;
        $car->save();

        return Redirect::route('car.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Car $car)
    {
        //
        $car->delete();

        return Redirect::route('car.index');
    }
}
