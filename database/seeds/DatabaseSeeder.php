<?php

use Illuminate\Database\Seeder;
use App\Image;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Image::unguard(); 

        $this->call(ImageTableSeeder::class);

        Image::reguard(); 
    }
}
