<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Proveedor;
use App\Models\UnidadNegocio;
use App\Models\DocumentoTributario;
use App\Models\EncabezadoDocumento;
use App\Models\InfoDocumento;
use App\Models\CentroCosto;
use App\Models\DetalleDocumento;
use PDF;

class CompraController extends Controller
{
    public function getInicial($tipo, $empresa)
    {   
        $proveedores = Proveedor::all();
        $unidades = UnidadNegocio::where('empresa_id', $empresa)->get();
        $documento = DocumentoTributario::where('tipo', $tipo)->first();
        return ['proveedores'  => $proveedores, 'unidades' => $unidades, "documento" => $documento];
    }

    public function verificarDocumentoFormulario($tipo,$empresa)
    {   
        $doc = DocumentoTributario::where('tipo', $tipo)->first();
        
        if($doc->requiere_antecesor == 1)
        {   
            if(count($doc->RelacionAntecesor) != 0){
                $datos =  InfoDocumento::whereIn('documento_id', array_column($doc->RelacionAntecesor->toArray(), 'id_documento'))->where('empresa_id', $empresa)->where('estado_id', 14)->get();
                $datos->load('Encabezado.Proveedor','DocumentoTributario');
                return ['estado' => 1, 'datos' => $datos, 'documento' => $doc];
            }else{
                return ['estado' => 3, 'documento' => $doc];
            }
        }else if($doc->requiere_antecesor == 2){
            return ['estado' => 2, 'documento' => $doc];    
        }
    }

    public function VerificarDocumentoRelacionadoExistente($idDocumento, $TipoDocumento)
    {   
        $documento = InfoDocumento::find($idDocumento);
        $documento->load('Encabezado');
        $tipo = DocumentoTributario::where('tipo', $TipoDocumento)->first();

        $existeCreado = count(InfoDocumento::where('documento_id', $tipo->id_documento)->where('encabezado_id', $documento->encabezado->id_encabezado)->get());
        return ['existe' => $existeCreado, 'nombreDocumento' => $tipo->descripcion];
    }

    public function getCodigoDocumento($documento, $empresa)
    {   
        $doc = DocumentoTributario::select('id_documento')->where('tipo', $documento)->first();
        $num = InfoDocumento::select('n_documento')->where('documento_id', $doc->id_documento)->where('empresa_id', $empresa)->latest()->first();
        if(!empty($num)){
            return $num->n_documento+1;
        }else{
            return 1;
        }
        
    }

    public function getInicialDetalle($ndocumento)
    {   

        $centros       = CentroCosto::all();
        $documento     = InfoDocumento::where('n_documento', $ndocumento)->first();
        $documento->load('Encabezado.Proveedor.Producto', 'Encabezado.UnidadNegocio', 'DocumentoTributario', 'detalleDocumento.Producto', 'detalleDocumento.CentroCosto');
        
        return ["documento" => $documento, 'centros' => $centros];
    }

    public function getDocumentoAprobar($empresa)
    {   
        $datos = InfoDocumento::where('empresa_id', $empresa)->where('estado_id', 12)->get();
        $datos->load('DocumentoTributario', 'Encabezado.UnidadNegocio', 'Encabezado.Proveedor');
        return $datos;
    }

    public function getDocumentoModificar($empresa)
    {
        $datos = InfoDocumento::where('empresa_id', $empresa)->whereIn('estado_id', [12,13])->get();
        $datos->load('DocumentoTributario', 'Encabezado.UnidadNegocio', 'Encabezado.Proveedor');
        return $datos;
    }

    public function aprobarDocumento($id)
    {
        InfoDocumento::updateOrCreate(['id_info' => $id],['estado_id' => 13]);
        return "Documento aprobado, ahora puedes emitirlo.";
    }

    public function getDocumentoEmitir($empresa)
    {
        $datos = InfoDocumento::where('empresa_id', $empresa)->where('estado_id', 13)->get();
        $datos->load('DocumentoTributario', 'Encabezado.UnidadNegocio', 'Encabezado.Proveedor');
        return $datos;
    }

    public function emitirDocumento($id)
    {   
        InfoDocumento::updateOrCreate(['id_info' => $id],['estado_id' => 14]);
        return "Documento emitido exitosamente.";
    }

    public function getDocumentosEmitidos($empresa)
    {   
        $datos = InfoDocumento::where('empresa_id', $empresa)->where('estado_id', 14)->get();
        $datos->load('DocumentoTributario', 'Encabezado.UnidadNegocio', 'Encabezado.Proveedor');
        return $datos;
    }

    public function generarInfoDocumentoRelacionado($documento, $tipoDocumento)
    {   
        $info = InfoDocumento::find($documento);
        $info->load('Encabezado.Proveedor', 'Encabezado.UnidadNegocio', 'DetalleDocumento.Producto', 'DocumentoTributario');
        $doc = DocumentoTributario::where('tipo', $tipoDocumento)->first();
        $cod = InfoDocumento::select('n_documento')->where('documento_id', $doc->id_documento)->where('empresa_id', $info->empresa_id)->latest()->first();
        if(!empty($cod)){ $codigo = $cod->n_documento+1;}else{ $codigo = 1;}

        return ['informacion' => $info, 'documentoT' => $doc, 'codigo' => $codigo];
    }

    public function generarDocumentoPosterior(Request $request)
    {
     
        $doc = DocumentoTributario::where('tipo', $request->tipoDocumento)->first();
        $cod = InfoDocumento::select('n_documento')->where('documento_id', $doc->id_documento)->where('empresa_id', $request->informacion['infoEmpresa']['id_empresa'])->latest()->first();
        if(!empty($cod)){ $codigo = $cod->n_documento+1;}else{ $codigo = 1;}

        $info = InfoDocumento::create(['n_documento' => $codigo, 'fecha_emision' => $request->informacion['fechadoc'], 'fecha_vencimiento' => $request->informacion['fechaven'], 'glosa' => $request->informacion['glosa'],
                                 'empresa_id' => $request->informacion['infoEmpresa']['id_empresa'], 'documento_id' => $doc->id_documento, 'estado_id' => 12, 'encabezado_id' => $request->informacion['idEncabezado'] , 
                                 'total_documento' => $request->total , 'total_iva' => $request->m_iva, 'total_retenciones' => $request->retenciones, 
                                'total_afecto' => $request->m_afecto]);
        
        foreach($request->detalles as $item){
            DetalleDocumento::create([
                'sku'                       => $item['producto']['sku'],
                'producto_id'               => $item['producto']['id_prod_proveedor'],
                'centrocosto_id'            => $item['centrocosto_id'],
                'cantidad'                  => $item['cantidad'],
                'precio'                    => $item['precio'],
                'descuento_porcentaje'      => $item['descuento_porcentaje'],
                'precio_descuento'          => $item['precio_descuento'],
                'descripcion_adicional'     => $item['descripcion_adicional'],
                'info_id'                   => $info->id_info,
                'total'                     => $item['total'],
            ]);
        }
                        
        return "Documento Tributario creado, puede aprobarlo.";

    }

    public function getDocumento($id)
    {
        $info = InfoDocumento::find($id);
        $hola = $info;
        $datos = DetalleDocumento::where('info_id', $id)->get();
        $pdf = PDF::loadView('pdf', compact('datos'));
        return $pdf->stream();
        return $pdf->download('afiliacion.pdf'); 
    }
}
