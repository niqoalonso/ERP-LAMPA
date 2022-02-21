<?php

namespace App\Http\Controllers;

use App\Models\Comprobante;
use App\Models\DetalleComprobante;
use App\Models\PlanCuenta;
use App\Models\TipoComprobante;
use App\Models\UnidadNegocio;
use Illuminate\Http\Request;

date_default_timezone_set("America/Santiago");

class ComprobanteController extends Controller
{

    public function getInicial($id)
    {
        $tipo = TipoComprobante::all();
        $unidad = UnidadNegocio::where('empresa_id', $id)->get();
        return ['tipos' => $tipo, 'unidad' => $unidad];
    }

    public function getComprobantes($id)
    {
        $datos = Comprobante::where('empresa_id', $id)->get();

        $idplancaja = PlanCuenta::where('manualcuenta_id', 1)->first();
        $idplanbanco = PlanCuenta::where('manualcuenta_id', 2)->first();
        $idplananticipo = PlanCuenta::where('manualcuenta_id', 18)->first();
        $planxpagar = PlanCuenta::where('manualcuenta_id', 19)->first();

        if(count($datos) > 0){

            foreach ($datos as $key => $value) {

              $detalles  =  DetalleComprobante::where([['comprobante_id',$value["id_comprobante"]]])
                                                ->with('PlanCuenta.ManualCuenta')->get();

                if(count($detalles) > 0){

                    foreach ($detalles as $key1 => $value1) {

                        if($value1["plancuenta_id"] != $idplancaja->id_plan_cuenta && $value1["plancuenta_id"] != $idplanbanco->id_plan_cuenta && $value1["plancuenta_id"] != $idplananticipo->id_plan_cuenta && $value1["plancuenta_id"] != $planxpagar->id_plan_cuenta){


                            $datos[$key]["detalle_comprobantes"] = $detalles;

                        }else{

                        }
                    }
                }

            }

            return $datos;

        }else{

            return [];
        }





        $datos->load('TipoComprobante', 'UnidadNegocio','Detalles.PlanCuenta.ManualCuenta','Detalles.PlanCuenta.MiManualCuenta');
        return $datos;



    }

    public function GenerarCodigo(){
        do {
            $number = rand(0,99999);
            $codigo = Comprobante::select('codigo')->where('codigo', $number)->first();
        } while (!empty($codigo->codigo));

        return $number;
    }

    public function store(Request $request)
    {
        Comprobante::create(['codigo' => $this->GenerarCodigo(),'glosa' => $request->glosa, 'fecha_comprobante' => $request->fecha_comprobante, 'empresa_id' => $request->idEmpresa['id_empresa'],
                             'unidadnegocio_id' => $request->unidadnegocio['id_unidadnegocio'], 'tipocomprobante_id' => $request->comprobante['id_tipocomprobante']]);
        return  $this->successResponse('Unidad de Negocio añadida exitosamente', false);
    }

    // informacion para el libro caja

    public function librocajames($id,$cuenta){

        // capturar el mes en curso
        $month = date('m');
        // capturar año en curso
        $year = date('Y');

        $comprobantes = Comprobante::where('empresa_id',$id)
                                     ->whereYear('comprobantes.fecha_comprobante', $year)
                                     ->whereMonth('comprobantes.fecha_comprobante', $month)
                                     ->get();

        $plan = PlanCuenta::where('manualcuenta_id', (int) $cuenta)->first();

        if(count($comprobantes) > 0){

            foreach ($comprobantes as $key => $value) {

              $detalles  =  DetalleComprobante::where([['comprobante_id',$value["id_comprobante"]]])
                                                ->with('PlanCuenta.ManualCuenta')->get();



                if(count($detalles) > 0){

                    foreach ($detalles as $key1 => $value1) {

                        if($value1["plancuenta_id"] === $plan->id_plan_cuenta){

                            $comprobantes[$key]["detalle_comprobantes"] = $detalles;

                        }
                    }
                }

            }

            return $comprobantes;

        }else{

            return [];
        }

    }

    public function busquedalibraocaja($date,$id,$cuenta){

        // capturar el mes en curso
        $datearray = explode("-", $date);

        $year = $datearray[0];
        $month = $datearray[1];

        $comprobantes = Comprobante::where('empresa_id',$id)
                                     ->whereYear('comprobantes.fecha_comprobante', $year)
                                     ->whereMonth('comprobantes.fecha_comprobante', $month)
                                     ->get();

        if(count($comprobantes) > 0){

            foreach ($comprobantes as $key => $value) {

              $detalles  =  DetalleComprobante::where([['comprobante_id',$value["id_comprobante"]]])
                                                ->with('PlanCuenta.ManualCuenta')->get();
                $existe = 0;

                if(count($detalles) > 0){

                    foreach ($detalles as $key1 => $value1) {


                        if($value1["plancuenta_id"] === (int)$cuenta){

                            $comprobantes[$key]["detalle_comprobantes"] = $detalles;

                        }
                    }
                }

            }

            return $comprobantes;

        }else{

            return [];
        }

    }

    public function cerrarcaja(Request $request){

        $totalcaja = 0;
        $item = [];
        foreach ($request->totales as $key => $value) {

            if(isset($value["total"])){
                array_push($item, ["glosa" => $value["plan_cuenta"]["manual_cuenta"]["nombre"], 'debe' => $value["total"], 'haber' => 0, 'plancuenta' => $value["plancuenta_id"]]);
                $totalcaja = $totalcaja + $value["total"];
            }else{
                array_push($item, ["glosa" => $value["plan_cuenta"]["manual_cuenta"]["nombre"], 'debe' => $value["debe"], 'haber' => 0, 'plancuenta' => $value["plancuenta_id"]]);
                $totalcaja = $totalcaja + $value["debe"];
            }

        }

        return[
            $item,
            $totalcaja
        ];


    }

    public function obtenerinfocuenta($id){

        $cuentas = PlanCuenta::where('empresa_id', $id)->with('ManualCuenta')->get();

        // capturar el mes en curso
        $month = date('m');
        // capturar año en curso
        $year = date('Y');

        if(count($cuentas) > 0 ){

            foreach ($cuentas as $key3 => $value3) {

                $detalles  =  DetalleComprobante::where([['plancuenta_id', $value3["id_plan_cuenta" ]]])
                                                            ->whereYear('created_at', $year)
                                                            ->whereMonth('created_at', $month)->get();

                if(count($detalles) > 0){

                       $cuentas[$key3]["detalle_comprobantes"] = $detalles;
                }

            }

            return $cuentas;


        }else{
            return [];
        }

    }


}
