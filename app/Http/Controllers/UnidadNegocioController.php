<?php

namespace App\Http\Controllers;

use App\Models\UnidadNegocio;
use Illuminate\Http\Request;

class UnidadNegocioController extends Controller
{
    public function getInicial($id)
    {
        $datos = UnidadNegocio::where('empresa_id', $id)->get();
        return $datos;
    }

    public function generateCodigo($id)
    {
        $dt = UnidadNegocio::where('empresa_id', $id)->get();
        return $dt->last()->codigo+1;
    }

    public function store(Request $request)
    {    
        $dat = UnidadNegocio::create(['nombre' => $request->nombre, 'codigo' => $this->generateCodigo($request->id), 'empresa_id' => $request->id]);
        return  $this->successResponse('Unidad de Negocio añadida exitosamente', false);
    }

    public function update(Request $request, $id)
    {   
        UnidadNegocio::updateOrCreate(['id_unidadnegocio' => $request->idUnidad],['nombre' => $request->nombre]);

        return  $this->successResponse('Unidad de Negocio actualizada exitosamente', false);
    }
}
