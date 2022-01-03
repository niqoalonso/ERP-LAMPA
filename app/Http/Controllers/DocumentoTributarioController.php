<?php

namespace App\Http\Controllers;

use App\Models\DocumentoTributario;
use App\Models\DocumentoAntecesor;
use App\Models\DocumentoSucesor;
use Illuminate\Http\Request;
use App\Models\TipoComprobante;

class DocumentoTributarioController extends Controller
{

    public function getInicial()
    {
        $comprobantes = TipoComprobante::all();
        $doc = DocumentoTributario::all();

        return ['comprobantes' => $comprobantes, 'docTributarios' => $doc];
    }

    public function getDocumento($tipo)
    {
        $documento = DocumentoTributario::where('tipo', $tipo)->first();
        return $documento;
    }

    public function getTablaCompra()
    {
        $documentos = DocumentoTributario::all();
        $documentos->load('TipoComprobante');
        return $documentos; 
    }
    
    public function getDocumentoRelaciones($tipo)
    {   
        $doc = DocumentoTributario::where('tipo', $tipo)->first();
        $documentos = DocumentoTributario::where('ciclo', $doc->ciclo)->where('id_documento', '!=', $doc->id_documento)->get();
        return ['documentos' => $documentos, 'id' => $doc->id_documento];
    }

    public function store(Request $request)
    {   
        
        $doc = DocumentoTributario::create(['tipo' => $request->tipo, 'descripcion' => $request->descripcion, 'requiere_antecesor' => $request->requiere_antecesor, 'mueve_existencia' => $request->existencia,
                                            'requiere_sucesor' => $request->requiere_sucesor, 'debe_haber' => $request->debe_haber, 'cod_sii' => $request->codigo,
                                            'f_vencimiento' => $request->vencimiento, 'ciclo' => $request->ciclo, 'tipocomprobante_id' => $request->comprobante['id_tipocomprobante'], 
                                            'pago' => $request->pago, 'libro' => $request->libro, 'iva_honorario' => $request->impuesto, 'incrementa_disminuye' => $request->incrementa_disminuye,
                                            'anulacion' => $request->anulacion, 'doc_anulacion' => ($request->anulacion == 2) ? 0 : $request->doc_anulacion, 'doc_paraanular' => ($request->doc_anulacion == 2) ? 0 : $request->doc_paraanular['id_documento']]);
            
        return  $this->successResponse('Documento tributario añadida exitosamente', false);
    }

    public function getRelacionesIniciales($tipo)
    {
        $doc = DocumentoTributario::where('tipo', $tipo)->first();
        $doc->load('RelacionSucesor', 'RelacionAntecesor');
        return $doc;
    }

    
    public function storeSucesor(Request $request)
    {   
        DocumentoSucesor::where('docactual_id', $request->id)->delete();
        foreach ($request->select as $key => $value) {
            DocumentoSucesor::create(['docsucesor_id' => $value['id_documento'], 'docactual_id' => $request->id]);
        }
        return  $this->successResponse('Documentos relacionados añadidos exitosamente.', false);
    }

    public function storeAntecesor(Request $request)
    {   
        DocumentoAntecesor::where('docactual_id', $request->id)->delete();
        foreach ($request->select as $key => $value) {
            DocumentoAntecesor::create(['docantecesor_id' => $value['id_documento'], 'docactual_id' => $request->id]);
        }
        return  $this->successResponse('Documentos relacionados añadidos exitosamente.', false);
    }

    public function update(Request $request, $id)
    {   
      
        $doc = DocumentoTributario::updateOrCreate(['id_documento' => $request->id],['tipo' => $request->tipo, 'descripcion' => $request->descripcion, 'requiere_antecesor' => $request->requiere_antecesor, 
                                            'requiere_sucesor' => $request->requiere_sucesor, 'debe_haber' => $request->debe_haber, 'cod_sii' => $request->codigo, 'mueve_existencia' => $request->existencia,
                                            'f_vencimiento' => $request->vencimiento, 'ciclo' => $request->ciclo, 'tipocomprobante_id' => $request->comprobante['id_tipocomprobante'], 
                                            'pago' => $request->pago, 'libro' => $request->libro, 'iva_honorario' => $request->impuesto, 'incrementa_disminuye' => $request->incrementa_disminuye]);
                                            
        return  $this->successResponse('Documento tributario añadida exitosamente', false);
    }

}
