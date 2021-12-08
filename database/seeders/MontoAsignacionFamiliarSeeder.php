<?php

namespace Database\Seeders;

use App\Models\MontoAsignacionFamiliar;
use Illuminate\Database\Seeder;

class MontoAsignacionFamiliarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        MontoAsignacionFamiliar::create(['monto' => 13832, 'renta_minima' => 0, 'renta_maxima' => 353356]);
        MontoAsignacionFamiliar::create(['monto' => 8488, 'renta_minima' => 353356, 'renta_maxima' => 516114]);
        MontoAsignacionFamiliar::create(['monto' => 2683, 'renta_minima' => 516114, 'renta_maxima' => 804962]);
        MontoAsignacionFamiliar::create(['monto' => 0, 'renta_minima' => 804962, 'renta_maxima' => 1000000]);
    }
}
