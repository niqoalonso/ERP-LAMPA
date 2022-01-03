<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\InfoDocumento;
use App\Models\EncabezadoDocumento;
use App\Models\DetalleDocumento;
use App\Models\DocumentoTributario;
use App\Models\PlanCuenta;
use App\Models\TarjetaExistencia;
use App\Models\Operacion;
use App\Models\Existencia;


class TesoreriaController extends Controller
{   

    public function getInicialCompras($empresa)
    {   
        //TRAEMOS EL PLAN DE CUENTA DE LA EMPRESA.
        $cuentas = PlanCuenta::where('empresa_id', $empresa)->get();
        $cuentas->load('ManualCuenta', 'MiManualCuenta');

        //TRAEMOS LOS DOCUMENTOS TRIBUTARIOS QUE AL EMITIRLOS TIENE CONDICIONES DE REQUIREN PAGO
        $documentos = DocumentoTributario::where('ciclo', 1)->where('pago',  1)->get();
        $dato = array();
        foreach ($documentos as $key => $value) {
            array_push($dato, $value->id_documento);
        }

        $doc = InfoDocumento::whereIn('documento_id', $dato)->where('empresa_id', $empresa)->where('estado_id', 14)->get();
        $doc->load('Encabezado.Proveedor.Producto', 'Encabezado.UnidadNegocio', 'DocumentoTributario.RelacionAntecesor', 'detalleDocumento.Producto', 'detalleDocumento.CentroCosto');

        return ['doc' => $doc, 'cuentas' => $cuentas];
    }

    public function aprobarPago(Request $request)
    {   
        EncabezadoDocumento::updateOrCreate(['num_encabezado' => $request->n_encabezado],['cuenta_origen_id' => $request->origen['id_plan_cuenta'], 'cuenta_destino_id' => $request->destino['id_plan_cuenta']]);

        return $request;
    }
    
}
