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
use App\Models\DocumentoRelacionado;
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

        $verificarDocAprovados = InfoDocumento::where('encabezado_id', $documento->encabezado_id)->where('estado_id', '!=', 14)->get();
        if(count($verificarDocAprovados) == 0){
            return ['estado' => 0, 'existe' => $existeCreado, 'nombreDocumento' => $tipo->descripcion];
        }else{
            return ['estado' => 1];
        }
        

        
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

    public function getInicialDetalle($ninterno)
    {   
        $documento     = InfoDocumento::where('n_interno', $ninterno)->first();
            if($documento->estado_id == 14){
                return ['estado' => 1]; //SI EL DOCUMENTO ESTA EMITIDO NO PUEDE EDITARSE, SEGURIDAD DE URL
            }
        $documento->load('Encabezado.Proveedor.Producto', 'Encabezado.UnidadNegocio', 'DocumentoTributario.RelacionAntecesor', 'detalleDocumento.Producto', 'detalleDocumento.CentroCosto');

        $encabezados = InfoDocumento::where('encabezado_id', $documento->encabezado_id)->where('n_interno', '!=', $ninterno)->get();
        $encabezados->load('Encabezado.Proveedor.Producto', 'Encabezado.UnidadNegocio', 'DocumentoTributario.RelacionAntecesor', 'detalleDocumento.Producto', 'detalleDocumento.CentroCosto');
        $centros       = CentroCosto::all();

        return ["estado" => 0 ,"documento" => $documento, 'centros' => $centros, 'encabezados' => $encabezados];
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
        
        $doc = InfoDocumento::find($id);
        if(count($doc->detalleDocumento) > 0)
        {   
            $doc->update(['estado_id' => 13]);
            return ['estado' => 1, 'mensaje' => "Documento aprobado, ahora puede emitirlo."];
        }else{
            return ['estado' => 0, 'mensaje' => "Este documento no posee ningun detalle de producto, no puede ser emitido."];
        }

        return "Documento aprobado, ahora puedes emitirlo.";
    }

    public function getDocumentoEmitir($empresa)
    {
        $datos = InfoDocumento::where('empresa_id', $empresa)->where('estado_id', 13)->get();
        $datos->load('DocumentoTributario', 'Encabezado.UnidadNegocio', 'Encabezado.Proveedor');
        return $datos;
    }

    public function MueveExistenciaComprobar($id)
    {
        $info = InfoDocumento::where('n_interno', $id)->first();
        return $info->DocumentoTributario->mueve_existencia;
    }

    public function emitirDocumento($id)
    {   
        InfoDocumento::updateOrCreate(['n_interno' => $id],['estado_id' => 14]);
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

    public function GenerarCodigoInterno()
    {
        do {            
            $number = rand(1, 99999);
            $codigo = InfoDocumento::select('n_interno')->where('n_interno', $number)->first();
        } while (!empty($codigo->n_interno));

        return $number;
    } 

    public function generarDocumentoPosterior(Request $request)
    {   
        //Buscamos el tipo de documento tributario a emitir.
        $docTributario = DocumentoTributario::where('tipo', $request->tipoDocumento)->first();
        
        //Verificamos que el documento no haya sido emitido antes, ya que no puede haber dos factura o dos guias para una orden de compra.
        if(count(DocumentoRelacionado::where([['documentotributario_id', $docTributario->id_documento],['encabezado_id', $request->encabezado_id]])->get()) > 0){
            return ['estado' => 2, 'mensaje' =>  "Documento tributario ya ha sido emitido anteriormente."];
        }
        
        //BUSCAMOS ENTRE TODO LOS DOCUMENTOS DEL ENCABEZADO EL DOCUMENTO CON LA FECHA MAYOR PARA COMPRAR CON LA FECHA DEL DOCUMENTO A CREAR
        $ultimoDocFecha = InfoDocumento::where('encabezado_id', $request->encabezado_id)->max('fecha_emision');
    
        //COMPROBAMOS QUE LA FECHA DEL NUEVO DOCUMENTO SEA MAYOR QUE LA FECHA DE CUALQUIER OTRO DOCUMENTO CREADO.
        
        if($ultimoDocFecha > $request->informacion['fechadoc'])
        {
            return ['estado' => 0, 'mensaje' => 'Fecha de emisión no puede ser inferior al dia '.$ultimoDocFecha];

        }else{

            //CREAMOS EL NUEVO DOCUMENTO TRIBUTARIO
            $doc = DocumentoTributario::where('tipo', $request->tipoDocumento)->first();
            $cod = InfoDocumento::select('n_documento')->where('documento_id', $doc->id_documento)->where('empresa_id', $request->informacion['infoEmpresa']['id_empresa'])->latest()->first();
            if(!empty($cod)){ $codigo = $cod->n_documento+1;}else{ $codigo = 1;}

            $info = InfoDocumento::create(['n_documento' => $codigo, 'fecha_emision' => $request->informacion['fechadoc'], 'fecha_vencimiento' => $request->informacion['fechaven'], 'glosa' => $request->informacion['glosa'],
                                    'empresa_id' => $request->informacion['infoEmpresa']['id_empresa'], 'documento_id' => $doc->id_documento, 'estado_id' => 12, 'encabezado_id' => $request->informacion['idEncabezado'] , 
                                    'total_documento' => $request->total , 'total_iva' => $request->m_iva, 'total_retenciones' => $request->retenciones, 
                                    'total_afecto' => $request->m_afecto, 'n_interno' => $this->GenerarCodigoInterno()]);
            
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

            //INSERTAMOS INFORMACIÓN EN TABLA DOCUMENTOS RELACIONADOS.
            $docPadre = InfoDocumento::find($request->documento_id)->first();
            DocumentoRelacionado::create(['documento_hijo' => $info->id_info, 'documento_padre' => $docPadre->id_info, 'documentotributario_id' => $docTributario->id_documento, 'encabezado_id' => $request->encabezado_id]);
   
            return ['estado' => 1, 'mensaje' =>  "Documento Tributario creado, puede aprobarlo."];

            //FIN CREACION DOCUMENTO TRIBUTARIO

        }
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
    
    public function updateFechaEmision(Request $request)
    {      
        $doc = InfoDocumento::where('n_interno', $request->n_interno)->first();

        //BUSCAMOS ENTRE TODO LOS DOCUMENTOS DEL ENCABEZADO EL DOCUMENTO CON LA FECHA MAYOR PARA COMPRAR CON LA FECHA DEL DOCUMENTO A CREAR
        $ultimoDocFecha = InfoDocumento::where('encabezado_id', $doc->encabezado_id)->where('id_info', '!=', $doc->id_info)->max('fecha_emision');
        
        //COMPROBAMOS QUE LA FECHA DEL NUEVO DOCUMENTO SEA MAYOR QUE LA FECHA DE CUALQUIER OTRO DOCUMENTO CREADO.
        
        if($ultimoDocFecha > $request->fechadoc)
        {
            return ['estado' => 1, 'mensaje' => 'Fecha de emisión no puede ser inferior al dia '.$ultimoDocFecha];

        }else{
            $doc->update(['fecha_emision' => $request->fechadoc]);
            return ['estado' => 0, 'mensaje' => 'Encabezado ha sido actualizado exitosamente.'];
        }

    }

}
