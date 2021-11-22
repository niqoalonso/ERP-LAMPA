<?php

namespace App\Http\Controllers;

use App\Models\DetalleDocumento;
use App\Models\EncabezadoDocumento;
use App\Models\InfoDocumento;
use Illuminate\Http\Request;

class DetalleDocumentoController extends Controller
{
    
    public function store(Request $request)
    {   
        $info = DetalleDocumento::where('info_id', $request->info_id)->delete();

        foreach($request->detalles as $item){
            DetalleDocumento::create([
                'sku'                       => $item['producto']['sku'],
                'producto_id'               => $item['producto']['id_prod_proveedor'],
                'centrocosto_id'            => $item['centro_costo']['id_centrocosto'],
                'cantidad'                  => $item['cantidad'],
                'precio'                    => $item['precio'],
                'descuento_porcentaje'      => $item['descuento_porcentaje'],
                'precio_descuento'          => $item['precio_descuento'],
                'descripcion_adicional'     => $item['descripcion_adicional'],
                'info_id'                   => $request->info_id,
                'total'                     => $item['total'],
            ]);
        }

        InfoDocumento::updateOrCreate(['id_info' => $request->info_id],[
            'total_afecto'      =>  $request->m_afecto,
            'total_iva'         =>  $request->m_iva,
            'total_retenciones' =>  $request->retenciones,
            'total_documento'   =>  $request->total,
            'estado_id'         =>  12,
        ]);
        
        return "Detalle agregado a documento exitosamente.";
    }
}
