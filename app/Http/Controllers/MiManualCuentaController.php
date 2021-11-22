<?php

namespace App\Http\Controllers;

use App\Models\SubClasificacion;
use App\Models\MiManualCuenta;
use App\Models\Clasificacion;
use Illuminate\Http\Request;

class MiManualCuentaController extends Controller
{   
    public function getDatos()
    {
        $datos = MiManualCuenta::all();
        $datos->load('Clasificacion', 'SubClasificacion');
        return $datos;
    }

    public function getSubClasificacion($id)
    {   
        $sub = SubClasificacion::where('clasificacion_id', $id)->get();
        return $sub;
    }

    public function store(Request $request)
    {   
        $posicion3 = $request->codigo1.'.'.$request->codigo2.'.'.$request->codigo3;

        if($request->clasificacion['asignacion'] != $request->codigo1)
        {
            return response()->json([
                'errors' => "Primer digito de la codificacion esta mal.",
            ], 422);
        }

        if($request->subclasificacion['asignacion'] != $request->codigo2)
        {
            return response()->json([
                'errors' => "Segundo digito de la codificacion esta mal.",
            ], 422);
        }

        $d = MiManualCuenta::where('codigo', 'like', $posicion3.'%')->get();
        if(count($d)){
            return response()->json([
                'errors' => "Tercer digito de la codificacion esta mal.",
            ], 422);
        }

        $codigo = $request->codigo1.'.'.$request->codigo2.'.'.$request->codigo3.'.'.$request->codigo4;

        MiManualCuenta::create([
            'codigo'                =>  $codigo,
            'codigo1'               =>  $request->codigo1,
            'codigo2'               =>  $request->codigo2,
            'codigo3'               =>  $request->codigo3,
            'codigo4'               =>  $request->codigo4,
            'nombre'                =>  $request->nombre,
            'descripcion'           =>  $request->descripcion,
            'cargos'                =>  $request->cargos,
            'abonos'                =>  $request->abonos,
            'saldo_deudor'          =>  $request->saldoDeudor,
            'saldo_acreedor'        =>  $request->saldoAcreedor,
            'clasificacion_id'      =>  $request->clasificacion['id_clasificacion'],
            'subclasificacion_id'   =>  $request->subclasificacion['id_subclasificacion'],
        ]);

        return  $this->successResponse('Cuenta Creada Exitosamente', false);
    }

    public function update(Request $request, $id)
    {   
        $posicion3 = $request->codigo1.'.'.$request->codigo2.'.'.$request->codigo3;

        if($request->clasificacion['asignacion'] != $request->codigo1)
        {
            return response()->json([
                'errors' => "Primer digito de la codificacion esta mal.",
            ], 422);
        }

        if($request->subclasificacion['asignacion'] != $request->codigo2)
        {
            return response()->json([
                'errors' => "Segundo digito de la codificacion esta mal.",
            ], 422);
        }

        $d = MiManualCuenta::where('codigo', 'like', $posicion3.'%')->where('id_manual_cuenta', '!=', $id)->get();
        if(count($d)){
            return response()->json([
                'errors' => "Tercer digito de la codificacion esta mal.",
            ], 422);
        }

        $codigo = $request->codigo1.'.'.$request->codigo2.'.'.$request->codigo3.'.'.$request->codigo4;
        
        MiManualCuenta::updateOrCreate(['id_manual_cuenta' => $id],[
            'codigo'                =>  $codigo,
            'codigo1'               =>  $request->codigo1,
            'codigo2'               =>  $request->codigo2,
            'codigo3'               =>  $request->codigo3,
            'codigo4'               =>  $request->codigo4,
            'nombre'                =>  $request->nombre,
            'descripcion'           =>  $request->descripcion,
            'cargos'                =>  $request->cargos,
            'abonos'                =>  $request->abonos,
            'saldo_deudor'          =>  $request->saldoDeudor,
            'saldo_acreedor'        =>  $request->saldoAcreedor,
            'clasificacion_id'      =>  $request->clasificacion['id_clasificacion'],
            'subclasificacion_id'   =>  $request->subclasificacion['id_subclasificacion'],
        ]);

        return  $this->successResponse('Cuenta Actualizada Exitosamente', false);
    }
}
