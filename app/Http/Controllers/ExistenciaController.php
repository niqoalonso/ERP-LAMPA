<?php

namespace App\Http\Controllers;

use App\Models\Existencia;
use Illuminate\Http\Request;
use App\Models\InfoDocumento;
use App\Models\TarjetaProducto;
use App\Models\DetalleDocumento;

class ExistenciaController extends Controller
{   

    //MODULO EXISTENCIA -> TARJETAS
    public function getInicial($empresa)
    {
        $tarjetas = TarjetaProducto::where('empresa_id', $empresa)->get();
        return $tarjetas;
    }

    public function getTarjetasProducto($sku)
    {

        $existencias = TarjetaProducto::where('sku', $sku)->first();
        $datos = $existencias->load('Existencia');

        return $datos;

    }

    public function GenerarCodigo(){
        do {            
            $number = rand(0,99999);
            $codigo = TarjetaProducto::select('sku')->where('sku', $number)->first();
        } while (!empty($codigo->sku));

        return $number;
    }

    public function getDetalleExistencia($documento, $empresa)
    {   
        $existencia = TarjetaProducto::where('empresa_id', $empresa)->get();
        $doc = InfoDocumento::where('n_interno', $documento)->first();
        $doc->load('detalleDocumento.Producto', 'DocumentoTributario');
        return ['existencias' => $existencia, 'info' => $doc];
    }

    public function emitirDocumentoWithExistencia(Request $request)
    {   
  
        $info = InfoDocumento::find($request->documento);

        foreach ($request->moverExistencia as $key => $value) {
           
            $detalle =  DetalleDocumento::where('id_detalle', $value['id_detalle'])->first();
           

            if($value['tarjeta'] == 0)
            {   
                
                $tarjeta =  TarjetaProducto::create(['sku' => $this->GenerarCodigo(), 'nombre' =>  $value['nombre'], 'empresa_id' => $request->empresa]);
                            Existencia::create(['fecha' => $info->fecha_emision,                        'info_id' => $info->id_info,    'encabezado_id' => $info->Encabezado->id_encabezado, 
                                                'tarjeta_id' => $tarjeta->id_tarjeta,                   'tipo_operacion' => 1,          'precio' => $detalle->precio, 
                                                'cant_entrada' => $detalle->cantidad,                   'cant_salida' => 0,             'total_cant' => $detalle->cantidad, 
                                                'total_entrada' => $detalle->precio*$detalle->cantidad, 'total_salida' => 0,            'total_precio' => $detalle->precio*$detalle->cantidad, 
                                                'control_stock' => $detalle->cantidad,                  'stock_estado' => 1]);
            }else{

                $tarjeta=   TarjetaProducto::find($value['tarjeta']);
                
                

                            Existencia::create(['fecha' => $info->fecha_emision,                        'info_id' => $info->id_info,    'encabezado_id' => $info->Encabezado->id_encabezado, 
                                                'tarjeta_id' => $tarjeta->id_tarjeta,                   'tipo_operacion' => 1,          'precio' => $detalle->precio, 
                                                'cant_entrada' => $detalle->cantidad,                   'cant_salida' => 0,             'total_cant' => Existencia::where('tarjeta_id', $tarjeta->id_tarjeta)->where('stock_estado', 1)->sum('control_stock')+$detalle->cantidad, 
                                                'total_entrada' => $detalle->precio*$detalle->cantidad, 'total_salida' => 0,            'total_precio' => intval(Existencia::where('tarjeta_id', $tarjeta->id_tarjeta)->pluck('total_precio')->last())+intval($detalle->precio*$detalle->cantidad), 
                                                'control_stock' => $detalle->cantidad,                  'stock_estado' => 1]);

            }
        }

        InfoDocumento::updateOrCreate(['id_info' => $request->documento],['estado_id' => 14]);

        return "Documento emitido exitosamente.";
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Existencia $existencia)
    {
        //
    }

    public function edit(Existencia $existencia)
    {
        //
    }

    public function update(Request $request, Existencia $existencia)
    {
        //
    }

    public function destroy(Existencia $existencia)
    {
        //
    }
}
