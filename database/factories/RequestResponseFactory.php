<?php

namespace Database\Factories;

use App\Models\RequestResponse;
use Illuminate\Database\Eloquent\Factories\Factory;

class RequestResponseFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = RequestResponse::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'message' => 'Foto ist unklar',
            'image' => '',
        ];
    }
}
