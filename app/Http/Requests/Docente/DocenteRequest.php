<?php

namespace App\Http\Requests\Docente;

use Illuminate\Foundation\Http\FormRequest;

class DocenteRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'nombres'                   => ['required', 'max:200'],
            'apellidos'                 => ['required', 'max:200'],
            'subnivel_id'               => ['required'],
            'email'                     => ['required','email','unique:users', 'max:200'],
            'password'                  => ['required','min:8']
        ];
    }

    public function messages()
    {
        return [
            'nombres.required'                  => 'Debes ingresar un nombre.',
            'nombres.max'                       => 'Nombre no puede exceder los 200 caracteres.',
            'apellidos.required'                => 'Debes ingresar un apellido.',
            'apellidos.max'                     => 'Apellidos no puede exceder los 200 caracteres.',
            'subnivel_id.required'              => 'Debes seleccionar un subnivel.',
            'email.required'                    => 'Debes ingresar un email.',
            'email.email'                       => 'Debe ser un email valido.',
            'email.unique'                      => 'El email ya se encuentra registrado.',
            'email.max'                         => 'Correo electronico no puede exceder los 200 caracteres.',
            'password.required'                 => 'Debes ingresar una contraseña.',
            'password.min'                      => 'Debe contener 8 caracteres.'
        ];
    }
}
