<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render('Admin/User/Index', [
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Admin/User/Partials/CreateUserForm', [
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) : RedirectResponse
    {
        //

        $request->validate([
            'address' => 'required|string|max:255',
            'phone_number' => 'required|max:20',
            'sim_number' => 'required|max:30',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'address' => $request->address,
            'phone_number' => $request->phone_number,
            'sim_number' => $request->sim_number,
            'password' => Hash::make($request->password),
        ]);

        return Redirect::route('user.index');

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(user $user)
    {
        //
        return Inertia::render('Admin/User/Partials/EditUserForm', [
            'status' => session('status'),
            'users' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, user $user): RedirectResponse
    {
        //

        $request->validate([
            'address' => 'required|string|max:255',
            'phone_number' => 'required|max:20',
            'sim_number' => 'required|max:30',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
        ]);

        $user->address = $request->address;
        $user->phone_number = $request->phone_number;
        $user->sim_number = $request->sim_number;
        $user->name = $request->name;
        $user->email = $request->email;

        $user->save();

        return Redirect::route('user.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //

        $user->delete();

        return Redirect::route('user.index');
    }
}
