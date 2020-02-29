<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Image;
use Faker\Generator as Faker;

$factory->define(Image::class, function (Faker $faker) {
    return [
        'title'         =>      $faker->sentence(3),
        'description'   =>      $faker->sentence(5),
        'file_name'     =>      $faker->sentence(1),
    ];
});
