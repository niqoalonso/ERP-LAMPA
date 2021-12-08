<?php

namespace App\Http\Requests\Previsiones;

use Illuminate\Foundation\Http\FormRequest;

class PrevisionesRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'nombre'                   => ['required'],
            'tasa_dependiente'                 => ['required'],
            'tasa_independiente'               => ['required'],
            'sis'                     => ['required']
        ];
    }

    public function messages()
    {
        return [
            'nombre.required'                  => 'Debes ingresar un nombre.',
            'tasa_dependiente.required'                => 'Debes ingresar una tasa dependiente.',
            'tasa_independiente.required'              => 'Debes seleccionar una tasa independiente.',
            'sis.required'                 => 'Debes ingresar un SIS.',
        ];
    }
}
