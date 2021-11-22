<?php

namespace App\Http\Requests\Trabajador;

use Illuminate\Foundation\Http\FormRequest;

class TrabajadorRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()


    {

        return [
            'nombres'=> ['required'],
            'apellidos'=> ['required'],
            'email'=> ['required'],
            'direccional'=> ['required'],
            'estado_civil'=> ['required'],
            'nacionalidad'=> ['required'],
            'carga_familiar'=> ['required'],
            'salud'=> ['required'],
            'rut'=> ['required'],
            'celular'=> ['required'],
            'fecha_nacimiento'=> ['required'],
            'edad'=> ['required'],
            'fecha_contrato'=> ['required'],
            'sueldo_base'=> ['required'],
            'colacion'=> ['required'],
            'movilidad'=> ['required'],
            'url_pdf'=> ['required'],
            'afp_id'=> ['required'],
            'afp_id'=> ['required'],
            'comuna_id'=> ['required']
        ];
    }

    public function messages()
    {
        return [
            'nombres'=> 'Debes ingresar un nombre.',
            'apellidos'=> 'Debes ingresar un apellido.',
            'email'=> 'Debes ingresar un email.',
            'direccional'=> 'Debes ingresar un direccional.',
            'estado_civil'=> 'Debes ingresar un estado civil.',
            'nacionalidad'=> 'Debes ingresar una nacionalidad.',
            'carga_familiar'=> 'Debes indica si tienes carga familiar.',
            'salud'=> 'Debes completar el campo.',
            'rut'=> 'Debes ingresar un rut.',
            'celular'=> 'Debes ingresar un celular.',
            'fecha_nacimiento'=> 'Debes ingresar una fecha de nacimiento.',
            'edad'=> 'Debes ingresar tu edad.',
            'fecha_contrato'=> 'Debes ingresar una fecha.',
            'sueldo_base'=> 'Debes ingresar el sueldo base.',
            'colacion'=> 'Debes ingresar el monto de colacion.',
            'movilidad'=> 'Debes ingresar el monto de movilidad.',
            'afp_id'=> 'Debes ingresar un nombre.',
            'comuna_id'=> 'Debes ingresar un nombre.'
        ];
    }
}
