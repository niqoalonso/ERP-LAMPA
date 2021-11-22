<?php

namespace App\Http\Requests\Proveedor;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProveedorRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'rut'           =>  ['required', ($this->method() == 'PUT') ? Rule::unique('proveedors')->ignore($this->id_proveedor, 'id_proveedor') : 'unique:proveedors'],
            'nombre'        =>  ['required', 'max:300'],
            'celular'       =>  ['required', 'numeric', 'max:99999999'],
            'correo'        =>  ['required', 'email', 'max:400'],
            'giro'          =>  ['required'],
            'direccion'     =>  ['required', 'max:1000'],
        ];
    }

    public function messages()
    {
        return [
            'rut.required'      =>  'Debes ingresar un RUT',
            'rut.unique'        =>  'RUT proveedor ya esta ingresado.',
            'nombre.required'   =>  'Razon social es requerido.',
            'nombre.max'        =>  'Razon social admite un maximo de 300 caracteres.',
            'celular.required'  =>  'Celular es requerido.',
            'celular.numeric'   =>  'Celular solo admite numeros.',
            'celular.max'       =>  'Celular solo admite 8 digitos.',
            'correo.required'   =>  'Correo es requerido.',
            'correo.email'      =>  'Correo no es un formato valido.',
            'correo.max'        =>  'Correo admite un maximo de 400 caracteres.',
            'giro.required'     =>  'Debe seleccionar un giro.',
            'direccion.required'=>  'Dirección es requerido.',
            'direccion.max'     =>  'Dirección admite un maximo de 1000 caracteres.',
        ];
    }
}
