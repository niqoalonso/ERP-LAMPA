<?php

namespace App\Http\Controllers;

use App\Models\ProductoProveedor;
use App\Models\Proveedor;
use Illuminate\Http\Request;
use App\Http\Requests\Proveedor\ProductoRequest;

class ProductoProveedorController extends Controller
{
    
    public function obtenerProveedores()
    {
        return Proveedor::all();
    }

    public function obtenerProductoProveedor($id)
    {
        $productos = ProductoProveedor::where('proveedor_id', $id)->get();
        return $productos;
    }

    public function GenerarCodigo(){
        do {            
            $number = rand();
            $codigo = ProductoProveedor::select('sku')->where('sku', $number)->withTrashed()->first();
        } while (!empty($codigo->sku));

        return $number;
    }

    public function store(ProductoRequest $request)
    {   
        ProductoProveedor::create(['nombre' => $request->nombre, 'sku' => (!empty($request->sku)) ? $request->sku : $this->GenerarCodigo(), 'precio_neto' => $request->p_neto, 'iva' => $request->iva, 
                                    'precio_bruto' => $request->p_bruto, 'proveedor_id' => $request->id_proveedor, 'descripcion' => $request->descripcion]);
        return  $this->successResponse('Producto Creado Exitosamente', false);
    }

    public function update(ProductoRequest $request, ProductoProveedor $producto)
    {   
        $producto->update(['sku' => (!empty($request->sku)) ? $request->sku : $this->GenerarCodigo(), 'nombre' => $request->nombre, 'precio_bruto' => $request->p_bruto, 'iva' => $request->iva, 'precio_neto' => $request->p_neto, 'descripcion' => $request->descripcion]);
        return  $this->successResponse('Producto Actualizado Exitosamente', false);
    }

}
