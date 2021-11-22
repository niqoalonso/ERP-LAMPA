<?php

namespace App\Http\Controllers;

use App\Models\ManualCuentaSii;
use App\Models\Clasificacion;
use App\Models\SubClasificacion;
use Illuminate\Http\Request;

class ManualCuentaSiiController extends Controller
{

    public function getDatos()
    {   
        $clasificacion = Clasificacion::all();
        $subclasificacion = SubClasificacion::all();
        return ['clasificacion' => $clasificacion, 'subclasificacion' => $subclasificacion];
    }

    public function getInformacion()
    {
        $datos = ManualCuentaSii::all();
        $datos->load('Clasificacion', 'SubClasificacion');
        return  $datos;
    }

    public function store(Request $request)
    {   
        ManualCuentaSii::create([
            'codigo'                =>  $request->codigo,
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
        ManualCuentaSii::updateOrCreate(['id_manual_cuenta' => $id],[
            'codigo'                =>  $request->codigo,
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
