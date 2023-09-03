<?php

use Inertia\Inertia;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\CarController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReturnController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ProfileController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $user_id = Auth::user()->id;
    $booking = Booking::with(['user', 'car'])->where('bookings.user_id', $user_id)->get();
    $countBooking = Booking::where('user_id', $user_id)->get()->count();
    $countCarActive = Booking::where('user_id' , $user_id)->where('is_return' , '0')->get()->count();
    $countCarReturn = Booking::where('user_id' , $user_id)->where('is_return' , '1')->get()->count();

    return Inertia::render('Dashboard', [
        'booking' => $booking,
        'countBooking' => $countBooking,
        'countCarActive' => $countCarActive,
        'countCarReturn' => $countCarReturn,

    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resources([
    'user' => UserController::class,
    'car' => CarController::class,
    'booking' => BookingController::class,
    'return' => ReturnController::class,
]);

});

require __DIR__.'/auth.php';
