<?php

namespace Database\Factories;

use Faker\Provider\Fakecar;
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
        $this->faker->addProvider(new Fakecar($this->faker));
        $vehicle = $this->faker->vehicleArray();

        return [
            //
            'brand' => $vehicle['brand'],
            'model' => $vehicle['model'],
            'license_plate' => $this->faker->vehicleRegistration,
            'rental_rate' => round((fake()->randomDigit() + 1) * 200000, 0),
        ];
    }
}
