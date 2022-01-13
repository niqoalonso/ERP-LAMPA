<?php

namespace App\Http\Requests\Anticipo;

use Illuminate\Foundation\Http\FormRequest;

class AnticipoRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()


    {

        return [
            'trabajador'=> ['required'],
            'cuenta'=> ['required'],
            'monto'=> ['required']
        ];
    }

    public function messages()
    {
        return [
            'trabajador'=> 'Debes ingresar un Trabajador.',
            'cuenta'=> 'Debes ingresar una cuenta.',
            'monto'=> 'Debes ingresar un monto.'
        ];
    }
}
