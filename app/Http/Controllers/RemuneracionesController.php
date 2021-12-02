<?php

namespace App\Http\Controllers;

use App\Models\BonosRemuneracion;
use App\Models\Remuneraciones;
use Illuminate\Http\Request;

class RemuneracionesController extends Controller
{
    public function show(){

        return Remuneraciones::with('trabajador.afp','trabajador.trabajorcarga','bonos')->get();
    }

    public function store(Request $request){

        $remuneracion = Remuneraciones::updateOrCreate(['id_remuneracion' => $request->id_remuneracion],[
            'monto' => $request->monto,
            'sueldo_liquido' => $request->sueldo_liquido,
            'total_imponible'=> $request->total_imponible,
            'total_haberes' => $request->total_haberes,
            'afc_monto' => $request->afc_monto,
            'impuesto_unico' => $request->impuesto_unico,
            'alcance_liquido' => $request->alcance_liquido,
            'anticipo' => $request->anticipo,
            'desgaste_herramientas' => $request->desgaste_herramientas,
            'otros' => $request->otros,
            'porcentaje_hora_extra' => $request->porcentaje_hora_extra,
            'uf' => $request->uf,
            'gratificacion' => $request->gratificacion,
            'participacion' => $request->participacion,
            'cantidad_horas_extras' => $request->cantidad_horas_extras,
            'horas_extras_monto' => $request->horas_extras_monto,
            'dias_trabajados' => $request->dias_trabajados,
            'afp_monto' => $request->afp_monto,
            'fonasa_monto' => $request->salud_monto,
            // 'monto_carga_familiar' => $request->monto_carga_familiar,
            'asignacion_familiar' => $request->asignacion_familiar,
            'fecha' => date('Y-m-d'),
            'trabajador_id' => $request->trabajador_id["id_trabajador"]
        ]);

        if($request->bonos){

            BonosRemuneracion::where('remuneracion_id', $remuneracion->id_remuneracion)->delete();

            foreach ($request->bonos as $key => $value) {

                BonosRemuneracion::create([
                    'glosa' => $value["glosa"],
                    'monto' => $value["monto"],
                    'remuneracion_id' => $remuneracion->id_remuneracion
                ]);
            }

        }

        return  $remuneracion;

    }
}
