<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Car>
 */
class CarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'brand' => fake()->name(),
            'model' => fake()->name(),
            'license_plate' => fake()->name(),
            'rental_rate' => fake()->randomDigit() * 9999999999,
        ];
    }
}
