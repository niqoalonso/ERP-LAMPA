<?php

namespace App\Http\Controllers;

use App\Http\Requests\Anticipo\AnticipoRequest;
use App\Models\Anticipo;
use App\Models\Comprobante;
use App\Models\DetalleComprobante;
use Illuminate\Http\Request;

date_default_timezone_set("America/Santiago");

class AnticipoController extends Controller
{

    public function show($id){

        // capturar el mes en curso
        $month = date('m');
        // capturar año en curso
        $year = date('Y');

        return Anticipo::where('empresa_id', $id)
                        ->whereYear('created_at', $year)
                        ->whereMonth('created_at', $month)
                        ->with('trabajador','plancuenta.ManualCuenta')
                        ->orderBy('estado_pago','ASC')->get();

    }


    public function store(AnticipoRequest $request)
    {
        $anticipo = Anticipo::updateOrCreate(['id_anticipo'=>$request->id_anticipo],
        [
            'monto' => $request->monto,
            'trabajador_id' => $request->trabajador["id_trabajador"],
            'plancuenta_id' => $request->cuenta["id_plan_cuenta"],
            'empresa_id' => $request->id_empresa,
            'fecha' => date('Y-m-d')
        ]);

        return $anticipo;

    }

    public function pagaranticipo($id){

         // capturar el mes en curso
         $month = date('m');
         // capturar año en curso
         $year = date('Y');

         $totalcaja = 0;
         $totalbanco = 0;
         $totalmonto = 0;
         $idplancaja = 8; // por defecto
         $idplanbanco = 9; // por defecto
         $idplananticipo = 6; 

        $anticipo = Anticipo::where([['empresa_id', $id],['estado_pago',0]])
                            ->whereYear('created_at', $year)
                            ->whereMonth('created_at', $month)
                            ->with('trabajador','plancuenta.ManualCuenta')
                            ->get();
        
        foreach ($anticipo as $key => $value) {

            // manualcuenta_id = 1 es caja - manualcuenta_id = 2 
            
            if($value["plancuenta"]["manualcuenta_id"] == 1){

                $totalcaja = round($totalcaja + $value["monto"]) ;
                $idplancaja = $value["plancuenta_id"];
            }else if($value["plancuenta"]["manualcuenta_id"] == 2){
                $totalbanco = round($totalbanco + $value["monto"]) ;
                $idplanbanco = $value["plancuenta_id"];
            }

            $totalmonto = round($totalmonto + $value["monto"]) ;
        }

        $debe = $totalmonto;
        $haber = round($totalcaja + $totalbanco);


        $comprobante = Comprobante::create([
            'codigo' => $this->GenerarCodigo(),
            'glosa' => 'Anticipo',
            'fecha_comprobante' => date('Y-m-d'),
            'empresa_id' => $id,
            'unidadnegocio_id' => 1,
            'tipocomprobante_id' => 2,
            'haber' => $debe,
            'deber' => $haber
            ]);

        $items = [
            ["glosa" => 'Anticipo', 'debe' => $totalmonto, 'haber' => 0, 'plancuenta' => $idplananticipo],
            ["glosa" => 'Caja', 'debe' => 0, 'haber' => $totalcaja, 'plancuenta' => $idplancaja],
            ["glosa" => 'Bono', 'debe' => 0, 'haber' => $totalbanco, 'plancuenta' => $idplanbanco]
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

            Anticipo::where('empresa_id',$id)
                            ->whereYear('created_at', $year)
                            ->whereMonth('created_at', $month)->update([
                                'estado_pago' => 1
                            ]);

            Comprobante::where('id_comprobante', $comprobante->id_comprobante)->update([
                'estado_id' => 3
            ]);

            return 1;

        }else{
            return 0;
        }

    }

    public function destroy(Anticipo $anticipo)
    {
        if($anticipo->estado_pago == 0){
            $anticipo->delete();
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
