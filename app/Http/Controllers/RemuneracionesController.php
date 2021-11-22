<?php

namespace App\Http\Controllers;

use App\Models\Remuneraciones;
use Illuminate\Http\Request;

class RemuneracionesController extends Controller
{
    public function show(){

        return Remuneraciones::with('trabajador.afp','trabajador.trabajorcarga')->get();
    }

    public function store(Request $request){

        $remuneracion = Remuneraciones::updateOrCreate(['id_remuneracion' => $request->id_remuneracion],[
            'monto' => $request->monto,
            'sueldo_liquido' => $request->sueldo_liquido,
            'sueldo_bruto' => $request->sueldo_bruto,
            'cantidad_horas_extras' => $request->cantidad_horas_extras,
            'horas_extras_monto' => $request->horas_extras_monto,
            'dias_trabajados' => $request->dias_trabajados,
            'afp_monto' => $request->afp_monto,
            'fonasa_monto' => $request->salud_monto,
            'monto_carga_familiar' => $request->monto_carga_familiar,
            'asignacion_familiar' => $request->asignacion_familiar,
            'fecha' => date('Y-m-d'),
            'trabajador_id' => $request->trabajador_id["id_trabajador"]
        ]);

        return $remuneracion;
    }
}
