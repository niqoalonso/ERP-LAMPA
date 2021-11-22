<?php

namespace App\Http\Controllers;
use App\Models\Comprobante;
use App\Models\DetalleComprobante;
use App\Models\PlanCuenta;
use App\Models\CentroCosto;
use Illuminate\Http\Request;

class DetalleComprobanteController extends Controller
{

    public function getInicial($id,$empresa)
    {   
        $info = Comprobante::where('codigo', $id)->first();
        $info->load('TipoComprobante', 'UnidadNegocio');
        $cuentas = PlanCuenta::where('empresa_id', $empresa)->get();
        $centros = CentroCosto::all();

        return ['info' => $info, 'cuentas' => $cuentas, 'centros' => $centros];
    }

    public function getDetalle($id)
    {
        $comprobante = Comprobante::where('codigo', $id)->first();

        $datos = DetalleComprobante::where('comprobante_id', $comprobante->id_comprobante)->get();
        $datos->load('PlanCuenta','PlanCuenta.ManualCuenta','PlanCuenta.MiManualCuenta' , 'CentroCosto', 'Comprobante');

        return $datos;
    }

    public function store(Request $request)
    {   
        $comprobante = Comprobante::where('codigo', $request->idComprobante)->first();

        DetalleComprobante::create([
                        'comprobante_id' => $comprobante->id_comprobante,
                        'plancuenta_id'  =>  $request->cuenta['id_plan_cuenta'],
                        'centrocosto_id' => $request->centro['id_centrocosto'],
                        'glosa'          => $request->glosa,
                        'debe'           => $request->deber,
                        'haber'          =>  $request->haber,
        ]);

        return  $this->successResponse('Detalle Comprobante añadida exitosamente', false);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DetalleComprobante  $detalleComprobante
     * @return \Illuminate\Http\Response
     */
    public function show(DetalleComprobante $detalleComprobante)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\DetalleComprobante  $detalleComprobante
     * @return \Illuminate\Http\Response
     */
    public function edit(DetalleComprobante $detalleComprobante)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DetalleComprobante  $detalleComprobante
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DetalleComprobante $detalleComprobante)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DetalleComprobante  $detalleComprobante
     * @return \Illuminate\Http\Response
     */
    public function destroy(DetalleComprobante $detalleComprobante)
    {
        //
    }
}
