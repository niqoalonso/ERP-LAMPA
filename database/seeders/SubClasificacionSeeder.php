<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SubClasificacion;

class SubClasificacionSeeder extends Seeder
{
   
    public function run()
    {
        SubClasificacion::create(['nombre'     =>   'Circulantes',                          'asignacion' => 1, 'clasificacion_id' => 1 ]);
        SubClasificacion::create(['nombre'     =>   'Fijos',                                'asignacion' => 2, 'clasificacion_id' => 1]);
        SubClasificacion::create(['nombre'     =>   'Otros activos',                        'asignacion' => 3, 'clasificacion_id' => 1]);

        SubClasificacion::create(['nombre'     =>   'Circulantes',                          'asignacion' => 1, 'clasificacion_id' => 2]);
        SubClasificacion::create(['nombre'     =>   'Largo plazo',                          'asignacion' => 2, 'clasificacion_id' => 2]);
        SubClasificacion::create(['nombre'     =>   'Patrimonio',                           'asignacion' => 3, 'clasificacion_id' => 2]);

        SubClasificacion::create(['nombre'     =>   'Capital',                              'asignacion' => 1, 'clasificacion_id' => 3]);
        SubClasificacion::create(['nombre'     =>   'Utilidades',                           'asignacion' => 2, 'clasificacion_id' => 3]);
        SubClasificacion::create(['nombre'     =>   'Reservas',                             'asignacion' => 3, 'clasificacion_id' => 3]);
        SubClasificacion::create(['nombre'     =>   'Utilidades no distribuidas',           'asignacion' => 4, 'clasificacion_id' => 3]);

        SubClasificacion::create(['nombre'     =>   'Ingreso de explotación',               'asignacion' => 1, 'clasificacion_id' => 4]);
        SubClasificacion::create(['nombre'     =>   'Costo de explotación',                 'asignacion' => 2, 'clasificacion_id' => 4]);
        SubClasificacion::create(['nombre'     =>   'Administración y ventas',              'asignacion' => 3, 'clasificacion_id' => 4]);
        SubClasificacion::create(['nombre'     =>   'Otros ingresos fuera de explotación',  'asignacion' => 4, 'clasificacion_id' => 4]);
        SubClasificacion::create(['nombre'     =>   'Egresos fuera de explotación',         'asignacion' => 5, 'clasificacion_id' => 4]);
        SubClasificacion::create(['nombre'     =>   'Prevision inpuesto a la renta',        'asignacion' => 6, 'clasificacion_id' => 4]);
    }
}
