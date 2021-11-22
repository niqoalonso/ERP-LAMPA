<?php

namespace App\Http\Controllers;

use App\Models\PlanCuenta;
use App\Models\ManualCuentaSii;
use App\Models\MiManualCuenta;
use App\Models\Empresa;
use App\Models\Estudiante;
use App\Models\Clasificacion;
use App\Models\SubClasificacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PlanCuentaController extends Controller
{

    public function getDatos()
    {   
        $datos = ManualCuentaSii::all();
        $datosMiManuel = MiManualCuenta::all();
        $datos->load('clasificacion', 'subclasificacion');
        $clasificacion = Clasificacion::all();
        $subclasificacion = SubClasificacion::all();

        $user = Auth::user();
        $estudiante = Estudiante::where('user_id', $user->id)->first();
        $empresas = Empresa::where('estudiante_id', $estudiante->id_estudiante)->get();

        return  ['datos' => $datos, 'empresas' => $empresas, 'clasificacion' => $clasificacion, 'subclasificacion' => $subclasificacion];
    }

    public function getPlanCuenta($id)
    {   
        $datos =  PlanCuenta::where('empresa_id', $id)->get();
        $datos->load('ManualCuenta', 'MiManualCuenta');
        return $datos;
    }

    public function addPlanCuenta(Request $request)
    {   
        $existe = PlanCuenta::where('empresa_id', $request->empresa['id_empresa'])->where('manualcuenta_id', $request->manual)->first();
        if(!empty($existe)){
            return response()->json([
                'errors' => "Cuenta ya esta registrada en este planta de cuenta.",
            ], 422);
        }elseif(empty($request->empresa)){
            return response()->json([
                'errors' => "Debe seleccionar una empresa.",
            ], 422);
        }
        
        PlanCuenta::create(['empresa_id' => $request->empresa['id_empresa'], 'manualcuenta_id' => $request->manual]);

        return  $this->successResponse('Cuenta añadida exitosamente', false);
    }

    public function addMiPlanCuenta(Request $request)
    {
        $existe = PlanCuenta::where('empresa_id', $request->empresa['id_empresa'])->where('mimanualcuenta_id', $request->manual)->first();
        if(!empty($existe)){
            return response()->json([
                'errors' => "Cuenta ya esta registrada en este planta de cuenta.",
            ], 422);
        }elseif(empty($request->empresa)){
            return response()->json([
                'errors' => "Debe seleccionar una empresa.",
            ], 422);
        }
        
        PlanCuenta::create(['empresa_id' => $request->empresa['id_empresa'], 'mimanualcuenta_id' => $request->manual]);

        return  $this->successResponse('Cuenta añadida exitosamente', false);
    }

    public function deleteCuenta(Request $request)
    {   
        $dato = PlanCuenta::where('empresa_id', $request->empresa)->where('manualcuenta_id', $request->manual)->delete();
        
        return  $this->successResponse('Cuenta añadida exitosamente', false);
    }

}
