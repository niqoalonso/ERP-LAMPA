<?php

namespace App\Http\Requests\Giro;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GiroRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'codigo'    => ['required', ($this->method() == 'PUT') ? Rule::unique('giros')->ignore($this->id_giro, 'id_giro') : 'unique:giros'],
            'nombre'    => ['required', 'max:300'],
            'categoria' => ['required'],
            'iva'       => ['required'], 
        ];
    }

    public function messages()
    {
        return [
            'codigo.required'       =>  'Debes ingresar un codigo para la actividad economica',
            'codigo.unique'         =>  'Codigo ya ha sido ingresado.',
            'nombre.required'       =>  'Debe ingresar el nombre de la actividad economia.',
            'nombre.max'            =>  'Nombre de la actividad no puede tener mas de 300',
            'categoria.required'    =>  'Debe seleccionar a que categoria pertenece.',
            'iva.required'          =>  'Debe seleccionar si es afecto o no a IVA',
        ];
    }
}
