<?php

namespace App\Http\Controllers;

use App\Models\BonosRemuneracion;
use App\Models\Estudiante;
use App\Models\Remuneraciones;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

date_default_timezone_set("America/Santiago");

class RemuneracionesController extends Controller
{
    public function show(){

        $userlogin = Auth::user();

        $estudiante = Estudiante::where('user_id', $userlogin->id)->first();

        return Remuneraciones::where('estudiante_id',$estudiante->id_estudiante)->with('trabajador.afp','trabajador.trabajorcarga','bonos')->get();
    }

    public function remuneracionmes(){

        $userlogin = Auth::user();

        $estudiante = Estudiante::where('user_id', $userlogin->id)->first();

        // capturar el mes en curso
        $month = date('m');
        // capturar año en curso
        $year = date('Y');

        return Remuneraciones::where('estudiante_id',$estudiante->id_estudiante)
                            ->whereYear('created_at', $year)
                            ->whereMonth('created_at', $month)
                            ->with('trabajador.afp','trabajador.trabajorcarga','bonos')
                            ->get();

    }

    public function busquedaremuneracion($date){

        $userlogin = Auth::user();

        $estudiante = Estudiante::where('user_id', $userlogin->id)->first();

        $datearray = explode("-", $date);

        $year = $datearray[0];
        $month = $datearray[1];

        return Remuneraciones::where('estudiante_id',$estudiante->id_estudiante)
                            ->whereYear('created_at', $year)
                            ->whereMonth('created_at', $month)
                            ->with('trabajador.afp','trabajador.trabajorcarga','bonos')
                            ->get();

    }

    public function store(Request $request){

        $userlogin = Auth::user();

        if($userlogin){

        $estudiante = Estudiante::where('user_id', $userlogin->id)->first();

        $remuneracion = Remuneraciones::updateOrCreate(['id_remuneracion' => $request->id_remuneracion],[
            'monto' => $request->monto,
            'sueldo_liquido' => $request->sueldo_liquido,
            'total_imponible'=> $request->total_imponible,
            'total_haberes' => $request->total_haberes,
            'total_descuentos' => $request->total_descuentos,
            'afc_monto' => $request->afc_monto,
            'impuesto_unico' => $request->impuesto_unico,
            'alcance_liquido' => $request->alcance_liquido,
            'anticipo' => $request->anticipo,
            'viaticos' => $request->viaticos,
            'otros' => $request->otros,
            'porcentaje_hora_extra' => $request->porcentaje_hora_extra,
            'uf' => $request->uf,
            'utm' => $request->utm,
            'gratificacion' => $request->gratificacion,
            'participacion' => $request->participacion,
            'cantidad_horas_extras' => $request->cantidad_horas_extras,
            'horas_extras_monto' => $request->horas_extras_monto,
            'dias_trabajados' => $request->dias_trabajados,
            'afp_monto' => $request->afp_monto,
            'fonasa_monto' => $request->salud_monto,
            'isapre_uf' => $request->isapre_uf,
            // 'monto_carga_familiar' => $request->monto_carga_familiar,
            'asignacion_familiar' => $request->asignacion_familiar,
            'fecha' => date('Y-m-d'),
            'trabajador_id' => $request->trabajador_id["id_trabajador"],
            'estudiante_id' => $estudiante->id_estudiante
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
}
