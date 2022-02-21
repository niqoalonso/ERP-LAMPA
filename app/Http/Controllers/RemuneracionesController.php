<?php

namespace App\Http\Controllers;

use App\Models\BonosRemuneracion;
use App\Models\Comprobante;
use App\Models\DetalleComprobante;
use App\Models\Estudiante;
use App\Models\PlanCuenta;
use App\Models\Remuneraciones;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

date_default_timezone_set("America/Santiago");

class RemuneracionesController extends Controller
{
    public function show($id){

        // $userlogin = Auth::user();

        // $estudiante = Estudiante::where('user_id', $userlogin->id)->first();

        return Remuneraciones::where('empresa_id',$id)->with('trabajador.afp','trabajador.trabajorcarga','bonos')->get();
    }

    public function shownopagadas($id){

            // $userlogin = Auth::user();

            // $estudiante = Estudiante::where('user_id', $userlogin->id)->first();

            // capturar el mes en curso
            $month = date('m');
            // capturar año en curso
            $year = date('Y');

            return Remuneraciones::where([['empresa_id',$id],['estado_pago',0]])
                            ->whereYear('created_at', $year)
                            ->whereMonth('created_at', $month)
                            ->with('trabajador.afp','trabajador.trabajorcarga','bonos')->get();
    }



    public function remuneracionmes($id){

        // $userlogin = Auth::user();

        // $estudiante = Estudiante::where('user_id', $userlogin->id)->first();

        // capturar el mes en curso
        $month = date('m');
        // capturar año en curso
        $year = date('Y');

        return Remuneraciones::where('empresa_id',$id)
                            ->whereYear('created_at', $year)
                            ->whereMonth('created_at', $month)
                            ->with('trabajador.afp','trabajador.trabajorcarga','bonos')
                            ->get();

    }

    public function busquedaremuneracion($date, $id){

        // $userlogin = Auth::user();

        // $estudiante = Estudiante::where('user_id', $userlogin->id)->first();

        $datearray = explode("-", $date);

        $year = $datearray[0];
        $month = $datearray[1];

        return Remuneraciones::where('empresa_id',$id)
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
            'empresa_id' => $request->id_empresa
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

    // pagar remuneraciones del mes en curso

    public function pagarremuneraciones(Request $request){

        // traemos las remuneraciones no pagadas del mes en curso

        $remuneraciones = $this->shownopagadas($request->id_empresa);

        // return $remuneraciones;

        $sueldobase = 0;
        $horaextras= 0;
        $gratificacion = 0;
        $bonos = 0;
        $asigfam = 0;
        $colacion = 0;
        $movilizacion = 0;
        $viaticos = 0;
        $leyessociales = 0;
        $afp = 0;
        $afc = 0;
        $salud = 0;
        $mutual = 0;
        $impunico = 0;
        $anticipo = 0;
        $sueldoliquido = 0;
        $sis =0 ;
        $mutual = 0;
        $afcempresa = 0;
        $totalhaber = 0;

        foreach ($remuneraciones as $key => $value) {

            $sueldobase = $sueldobase + $value["trabajador"]["sueldo_base"];
            $horaextras = $horaextras + $value["horas_extras_monto"];
            $gratificacion = $gratificacion + $value["gratificacion"];

            if(count($value["bonos"]) > 0){

                foreach ($value["bonos"] as $key => $value1) {
                    $bonos = $bonos + $value1["monto"];
                }

            }

            $asigfam = $asigfam + $value["asignacion_familiar"];
            $colacion = $colacion + $value["trabajador"]["colacion"];
            $movilizacion = $movilizacion + $value["trabajador"]["movilidad"];
            $viaticos = $viaticos + $value["viaticos"];

            // leyes sociales
                // sis

            $sis = $sis + round( ($value["total_imponible"] * $value["trabajador"]["afp"]["sis"]) /100 );

                // mutual

            $mutual = $mutual + round( ($value["total_imponible"] * 0.95) /100 );

                // afc parte empresa

            if($value["trabajador"]["tipo_contrato"] == 'Indefinido'){

                $afcempresa = $afcempresa + round( ($value["total_imponible"] * 2.40) /100 );

            }else{

                $afcempresa = $afcempresa + round( ($value["total_imponible"] * 3) /100 );
            }


            $afp = $afp + $value["afp_monto"];
            $afc = $afc + $value["afc_monto"];
            $salud = $salud + $value["fonasa_monto"];
            $impunico = $impunico + $value["impuesto_unico"];
            $anticipo = $anticipo + $value["anticipo"];
            $sueldoliquido = $sueldoliquido + $value["sueldo_liquido"];
            $totalhaber = $totalhaber + $value["total_haber"];

        }

        $leyessociales = round( $sis + $mutual + $afcempresa) ;

        $totalremuneracion = $sueldobase + $horaextras + $gratificacion + $bonos + $colacion + $movilizacion + $viaticos;

        $totalafc = $afc + $afcempresa;

        $prev = $afp + $afc + $salud + $totalafc + $sis + $mutual;

        $xpagar = $sueldoliquido;

        $debe = $totalremuneracion + $asigfam + $leyessociales;
        $haber = $prev + $impunico + $anticipo + $xpagar;

        $comprobante = Comprobante::create([
                                            'codigo' => $this->GenerarCodigo(),
                                            'glosa' => 'Centralizacion de la remuneracion del mes',
                                            'fecha_comprobante' => $request->fecha,
                                            'empresa_id' => $request->id_empresa,
                                            'unidadnegocio_id' => 1,
                                            'tipocomprobante_id' => 2,
                                            'haber' => $haber ,
                                            'deber' => $debe
                                            ]);

        $planremuneracion = PlanCuenta::where('manualcuenta_id', 13)->first();
        $planasigfam = PlanCuenta::where('manualcuenta_id', 14)->first();
        $planleyessociales = PlanCuenta::where('manualcuenta_id', 15)->first();
        $planprev = PlanCuenta::where('manualcuenta_id', 16)->first();
        $planimpunico = PlanCuenta::where('manualcuenta_id', 17)->first();
        $plananticipo = PlanCuenta::where('manualcuenta_id', 18)->first();
        $planxpagar = PlanCuenta::where('manualcuenta_id', 19)->first();

        $items = [
            ["glosa" => 'Remuneracion', 'debe' => $totalremuneracion, 'haber' => 0, 'plancuenta' => $planremuneracion->id_plan_cuenta],
            ["glosa" => 'Asig Fam', 'debe' => $asigfam, 'haber' => 0, 'plancuenta' => $planasigfam->id_plan_cuenta],
            ["glosa" => 'Leyes Sociales', 'debe' => $leyessociales, 'haber' => 0, 'plancuenta' => $planleyessociales->id_plan_cuenta],
            ["glosa" => 'Institucion PREV', 'debe' => 0, 'haber' => $prev, 'plancuenta' => $planprev->id_plan_cuenta],
            ["glosa" => 'Impuesto Unico', 'debe' => 0, 'haber' => $impunico, 'plancuenta' => $planimpunico->id_plan_cuenta],
            ["glosa" => 'Anticipo', 'debe' => 0, 'haber' => $anticipo, 'plancuenta' => $plananticipo->id_plan_cuenta],
            ["glosa" => 'Remuneracion por pagar', 'debe' => 0, 'haber' => $xpagar, 'plancuenta' => $planxpagar->id_plan_cuenta]
        ];

        for ($i=0; $i < count($items) ; $i++) {

            $detalle = DetalleComprobante::create([
                'comprobante_id' => $comprobante->id_comprobante,
                'n_detalle' => ($i + 1),
                'plancuenta_id'  =>  $items[$i]["plancuenta"],
                'centrocosto_id' => 2,
                'unidadnegocio_id' => 1,
                'glosa'          => $items[$i]["glosa"],
                'debe'           => $items[$i]["debe"],
                'haber'          =>  $items[$i]["haber"],
            ]);

        }


        if($detalle){
            // capturar el mes en curso
            $month = date('m');
            // capturar año en curso
            $year = date('Y');

            Remuneraciones::where('empresa_id',$request->id_empresa)
                            ->whereYear('created_at', $year)
                            ->whereMonth('created_at', $month)->update([
                                'estado_pago' => 1
                            ]);

            Comprobante::where('id_comprobante', $comprobante->id_comprobante)->update([
                'estado_id' => 3
            ]);

            $comprobanteant = $comprobante->id_comprobante;


            $comprobante = Comprobante::create([
                'codigo' => $this->GenerarCodigo(),
                'glosa' => 'Pago de las remuneraciones del mes',
                'fecha_comprobante' => $request->fecha,
                'empresa_id' => $request->id_empresa,
                'unidadnegocio_id' => 1,
                'tipocomprobante_id' => 2,
                'haber' => $xpagar,
                'deber' => $xpagar
                ]);

            $items = [
                ["glosa" => 'Pago Remuneraciones', 'debe' => $xpagar, 'haber' => 0, 'plancuenta' => $planxpagar->id_plan_cuenta],
                ["glosa" => $request->cuenta["manual_cuenta"]["nombre"], 'debe' => 0, 'haber' => $xpagar, 'plancuenta' => $request->cuenta["id_plan_cuenta"]]
            ];
            for ($i=0; $i < count($items) ; $i++) {

                $detalle = DetalleComprobante::create([
                    'comprobante_id' => $comprobante->id_comprobante,
                    'n_detalle' => ($i + 1),
                    'plancuenta_id'  =>  $items[$i]["plancuenta"],
                    'centrocosto_id' => 2,
                    'unidadnegocio_id' => 1,
                    'glosa'          => $items[$i]["glosa"],
                    'debe'           => $items[$i]["debe"],
                    'haber'          =>  $items[$i]["haber"],
                    'estado_pago'    => 1
                ]);

            }

            // actualizar el estado de pago del detalle de remuneraciones por pagar


            DetalleComprobante::where([['comprobante_id', $comprobanteant],['plancuenta_id',$planxpagar->id_plan_cuenta]])->update([
                'estado_pago' => 1
            ]);

            return 1;
        }else{
            return 0;
        }

    }

    public function GenerarCodigo(){
        do {
            $number = rand(0,99999);
            $codigo = Comprobante::select('codigo')->where('codigo', $number)->first();
        } while (!empty($codigo->codigo));

        return $number;
    }


}
