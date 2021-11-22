<?php

namespace App\Http\Controllers;

use App\Models\Giro;
use App\Models\Estado;
use Illuminate\Http\Request;
use App\Http\Requests\Giro\GiroRequest;

class GiroController extends Controller
{

    public function getIva()
    {
        $estados = Estado::where('id_estado', 6)->orWhere('id_estado', 7)->get();
        return $estados;
    }

    public function getCategorias()
    {
        $estados = Estado::where('id_estado', 8)->orWhere('id_estado', 9)->get();
        return $estados;
    }

    public function store(GiroRequest $request)
    {   
        Giro::create(['codigo' => $request->codigo, 'nombre' => $request->nombre, 'impuesto_adicional' => $request->impuesto_adicional,
                      'categoria_id' => $request->categoria['id_estado'], 'iva_id' => $request->iva['id_estado']]);
        
        return  $this->successResponse('Giro Creado Exitosamente', false);
    }

    public function update(GiroRequest $request, Giro $giro)
    {   
        $giro->update(['codigo' => $request->codigo, 'nombre' => $request->nombre, 'categoria_id' => $request->categoria['id_estado'], 'iva_id' => $request->iva['id_estado']]);
        return  $this->successResponse('Actualizada Exitosamente.', false);
    }

    public function obtegerGiros()
    {   $giros = Giro::all();
        $giros->load('estadoIva', 'estadoCategoria');
        return $giros;
    }

}
