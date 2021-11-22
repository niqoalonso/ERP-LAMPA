<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DocenteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
           'nombres' => ['required'],
           'apellidos' => ['required'],
           'subnivel_id' => ['required','exists:sub_nivels,id_subnivel'],
           'email' => ['required','email','unique:users'],
           'password' => ['required','min:8']
        ];
    }

    public function messages()
    {
        return [
            'nombres.required'       => 'Debes ingresar un nombre.',
            'apellidos.required'       => 'Debes ingresar un apellido.',
            'subnivel_id.required'  => 'Debes seleccionar un subnivel.',
            'subnivel_id.exists'  => 'No se encuentra ese subnivel.',
            'email.required' => 'Debes ingresar un email.',
            'email.email' => 'Debe ser un email valido.',
            'email.unique' => 'El email ya se encuentra registrado.',
            'password.required' => 'Debes ingresar una contraseña.',
            'password.min' => 'Debes contener 8 caracteres.'

        ];
    }
}
