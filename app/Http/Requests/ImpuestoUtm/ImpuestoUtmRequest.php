<?php

namespace App\Http\Requests\ImpuestoUtm;

use Illuminate\Foundation\Http\FormRequest;

class ImpuestoUtmRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'desde'                   => ['required'],
            'hasta'                 => ['required'],
            'factor'               => ['required'],
            'rebaja'                     => ['required']
        ];
    }

    public function messages()
    {
        return [
            'desde.required'                  => 'Debes ingresar desde.',
            'hasta.required'                => 'Debes ingresar hasta.',
            'factor.required'              => 'Debes ingresar factor.',
            'rebaja.required'                 => 'Debes ingresar rebaja.',
        ];
    }
}
