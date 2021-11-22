<?php

namespace App\Http\Controllers;

use App\Models\Estudiante;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class EstudianteController extends Controller
{

    public function store(Request $request)
    {
         // recibimos los datos
         $input = $request->all();

         // mandamos a validar los datos

         $validatedata = $this->validaDatos($input);


        if($validatedata->fails()){
            return $this->errorResponse('Validacion errors', $validatedata->errors() ) ;
        }

        $input["code_verification"] = sha1(time());

        $user = User::create([
            'email' => $input["email"],
            'password' => Hash::make($input["password"]),
            'code_verification' => $input["code_verification"],
            'estado_id' => 1,
        ]);

        $user->assignRole(3);

        if($user){

            $estudiante = Estudiante::create(
                ['rut' => $input["rut"],
                'nombres' => $input["nombres"],
                'apellidos' => $input["apellidos"],
                'subnivel_id' => $input["subnivel_id"]["id_subnivel"],
                'user_id' => $user->id
                ]
            );

            if($estudiante){
                return $this->successResponse($estudiante, 'Alumno creado exitosamente', true);
            }else{
                return $this->successResponse($estudiante, 'Error al crear al alumno', false);
            }
        }else{

            return $this->successResponse('Error al crear al alumno', false);

        }
    }


    public function show($subnivel)
    {
        $estudiante = Estudiante::where('subnivel_id','=',$subnivel)->get();
        $estudiante->load('user','subnivel');
        return $estudiante;
    }

    public function update(Request $request, Estudiante $estudiante)
    {

        $estudiante->update(
            ['rut' => $request->rut,
            'nombres' => $request->nombres,
            'apellidos' => $request->apellidos,
            'subnivel_id' => $request->subnivel_id["id_subnivel"]
        ]);

        $estudiante->user->update(['email' => $request->email, 'password' => Hash::make($request->password)]);

        return $this->successResponse('Alumno actualizado exitosamente', true);

    }


    public function destroy(Estudiante $estudiante)
    {
        $estudiante->delete();

        return $this->successResponse('Docente desactivado exitosamente',true);
    }

    public function validaDatos($datos){

        $input = $datos;

        $validatedata =  Validator::make($input,[
            'rut' => ['required'],
            'nombres' => ['required'],
            'apellidos' => ['required'],
            'subnivel_id' => ['required'],
            'email' => ['required','email','unique:users'],
            'password' => ['required','min:8']
            ],

            [
            'rut.required'       => 'Debes ingresar un rut.',
            'nombres.required'       => 'Debes ingresar un nombre.',
            'apellidos.required'       => 'Debes ingresar un apellido.',
            'subnivel_id.required'  => 'Debes seleccionar un subnivel.',
            'email.required' => 'Debes ingresar un email.',
            'email.email' => 'Debe ser un email valido.',
            'email.unique' => 'El email ya se encuentra registrado.',
            'password.required' => 'Debes ingresar una contraseña.',
            'password.min' => 'Debe contener 8 caracteres.'

              ]
        );

        return $validatedata;

    }
}
