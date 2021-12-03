<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\InfoDocumento;
use App\Models\EncabezadoDocumento;
use App\Models\DetalleDocumento;
use App\Models\DocumentoTributario;
use App\Models\PlanCuenta;
class TesoreriaController extends Controller
{   

    public function getInicialCompras($empresa)
    {   
        //TRAEMOS EL PLAN DE CUENTA DE LA EMPRESA.
        $cuentas = PlanCuenta::where('empresa_id', $empresa)->get();
        $cuentas->load('ManualCuenta', 'MiManualCuenta');

        //TRAEMOS LOS DOCUMENTOS POR PAGAR
        $documentos = DocumentoTributario::where('ciclo', 1)->where('pago',  1)->get();
        $dato = array();
        foreach ($documentos as $key => $value) {
            array_push($dato, $value->id_documento);
        }

        $doc = InfoDocumento::whereIn('documento_id', $dato)->where('empresa_id', $empresa)->get();
        $doc->load('Encabezado.Proveedor.Producto', 'Encabezado.UnidadNegocio', 'DocumentoTributario.RelacionAntecesor', 'detalleDocumento.Producto', 'detalleDocumento.CentroCosto');

        return ['doc' => $doc, 'cuentas' => $cuentas];
    }
    
}
