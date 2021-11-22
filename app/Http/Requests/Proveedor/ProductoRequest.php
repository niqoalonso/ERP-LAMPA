<?php

namespace App\Http\Requests\Proveedor;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductoRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'id_proveedor'  =>  ['required'],
            'sku'           =>  ['max:300', ($this->method() == 'PUT') ? Rule::unique('producto_proveedors')->ignore($this->id_producto, 'id_prod_proveedor') : 'unique:producto_proveedors'],
            'nombre'        =>  ['required', 'max:400'],
            'p_bruto'       =>  ['required', 'numeric', 'max:999999999'],
            'iva'           =>  ['required', 'numeric', 'max:999999999'],
            'p_neto'        =>  ['required', 'numeric', 'max:999999999'],
            'descripcion'   =>  ['max:1500'],
        ];
    }

    public function messages()
    {
        return [
            'id_proveedor.required'     =>  'Problemas con regsitros.',
            'sku.max'                   =>  'SKU no puede exceder los 300 caracteres.',
            'sku.unique'                =>  'SKU ya ha sido ingresado.',
            'nombre.required'           =>  'Nombre es requerido.',
            'nombre.max'                =>  'Nombre no puede exceder los 400 caracteres.',
            'p_bruto.required'          =>  'Precio bruto es requerido.',
            'p_bruto.numeric'           =>  'Precio bruto solo acepta numeros.',
            'p_bruto.max'               =>  'Precio bruto acepta un maximo de 9 digitos.',
            'iva.required'              =>  'IVA es requerido.',
            'iva.numeric'               =>  'IVA solo acepta numeros.',
            'iva.max'                   =>  'IVA acepta un maximo de 9 digitos.',
            'p_neto.required'           =>  'Precio neto es requerido.',
            'p_neto.numeric'            =>  'Precio neto solo acepta numeros.',
            'p_neto.max'                =>  'Precio neto acepta un maximo de 9 digitos.',
            'descripcion.max'           =>  'Descripción admite un maximo de 1500 caracteres.',
            
        ];
    }
}
