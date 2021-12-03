<?php

namespace App\Http\Controllers;

use App\Models\EncabezadoDocumento;
use App\Models\InfoDocumento;
use Illuminate\Http\Request;

class EncabezadoDocumentoController extends Controller
{

    public function GenerarCodigo()
    {
        do {            
            $number = rand(1, 9000);
            $codigo = EncabezadoDocumento::select('num_encabezado')->where('num_encabezado', $number)->first();
        } while (!empty($codigo->num_encabezado));

        return $number;
    }

    public function GenerarCodigoInterno()
    {
        do {            
            $number = rand(1, 99999);
            $codigo = InfoDocumento::select('n_interno')->where('n_interno', $number)->first();
        } while (!empty($codigo->n_interno));

        return $number;
    } 

    public function storeEncabezado(Request $request)
    {   
        $encebezado = EncabezadoDocumento::create([ 'num_encabezado' => $this->GenerarCodigo(),'proveedor_id' => $request->proveedor['id_proveedor'],
                                                    'unidadnegocio_id' => $request->unidad['id_unidadnegocio'], 'ciclo' => 1]);

        $cod = InfoDocumento::select('n_documento')->where('documento_id', $request->documento_id)->where('empresa_id', $request->empresa['id_empresa'])->latest()->first();
        
        $doc = InfoDocumento::create([ 'n_documento' => (!empty($cod)) ? $cod->n_documento+1 : 1, 'glosa' => $request->glosa, 'documento_id' => $request->documento_id,
                                'fecha_emision' => $request->fechadoc, 'fecha_vencimiento' => $request->fechaven,'empresa_id' => $request->empresa['id_empresa'],
                                'estado_id' => 12, 'encabezado_id' => $encebezado->id_encabezado, 'n_interno' => $this->GenerarCodigoInterno()]);
        
        return  $doc->n_interno;
    }

}
