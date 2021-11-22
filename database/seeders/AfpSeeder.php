<?php

namespace Database\Seeders;

use App\Models\Afp;
use Illuminate\Database\Seeder;

class AfpSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Afp::create(['nombre'     => 'Capital', 'tasa_dependiente' => 11.44, 'sis' => 1.85, 'tasa_independiente' => 13.29]);
        Afp::create(['nombre'     => 'Cuprum', 'tasa_dependiente' => 11.44, 'sis' => 1.85, 'tasa_independiente' => 13.29]);
        Afp::create(['nombre'     => 'Habitat', 'tasa_dependiente' => 11.27, 'sis' => 1.85, 'tasa_independiente' => 13.12]);
        Afp::create(['nombre'     => 'PlanVital', 'tasa_dependiente' => 11.16, 'sis' => 1.85, 'tasa_independiente' => 13.01]);
        Afp::create(['nombre'     => 'ProVida', 'tasa_dependiente' => 11.45, 'sis' => 1.85, 'tasa_independiente' => 13.30]);
        Afp::create(['nombre'     => 'Modelo', 'tasa_dependiente' => 10.58, 'sis' => 1.85, 'tasa_independiente' => 12.43]);
        Afp::create(['nombre'     => 'Uno', 'tasa_dependiente' => 10.69, 'sis' => 1.85, 'tasa_independiente' => 12.54]);

    }
}
