<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Proveedor;
use App\Models\Giro;
use App\Http\Requests\Proveedor\ProveedorRequest;

class ProveedorController extends Controller
{
    public function obtenerGiros()
    {
        $giros = Giro::All();
        $giros->load('estadoIva', 'estadoCategoria');
        return $giros;
    }

    public function store(ProveedorRequest $request)
    {   
        Proveedor::create(['rut' => $request->rut, 'celular' => $request->celular, 'email' => $request->correo, 'razon_social' => $request->nombre, 'giro_id' => $request->giro['id_giro'], 'direccion' => $request->direccion]);
        return  $this->successResponse('Proveedor Creado Exitosamente', false);
    }

    public function getProveedores()
    {   
        $proveedores = Proveedor::all();
        $proveedores->load('Giro');
        return $proveedores;
    }

    public function update(ProveedorRequest $request, Proveedor $proveedor)
    {   
        $proveedor->update(['rut' => $request->rut, 'razon_social' => $request->nombre, 'celular' => $request->celular, 'email' => $request->correo, 'giro_id' => $request->giro['id_giro'], 'direccion' => $request->direccion]);
        return  $this->successResponse('Proveedor Actualizado Exitosamente', false);
    }
}
