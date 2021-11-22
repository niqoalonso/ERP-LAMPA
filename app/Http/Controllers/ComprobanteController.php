<?php

namespace App\Http\Controllers;

use App\Models\Comprobante;
use App\Models\TipoComprobante;
use App\Models\UnidadNegocio;
use Illuminate\Http\Request;

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
        $datos->load('TipoComprobante', 'UnidadNegocio');
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

}
