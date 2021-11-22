<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Clasificacion;

class ClasificacionSeeder extends Seeder
{
    
    public function run()
    {
        Clasificacion::create(['nombre'     => 'Activo', 'asignacion' => 1]); //1
        Clasificacion::create(['nombre'     => 'Pasivo', 'asignacion' => 2]); //2
        Clasificacion::create(['nombre'     => 'Patrimonio', 'asignacion' => 3]); //3
        Clasificacion::create(['nombre'     => 'Resultado', 'asignacion' => 4]); //4
    }
}
 