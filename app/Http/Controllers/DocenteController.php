<?php

namespace App\Http\Controllers;

use App\Models\Docente;
use App\Models\DocenteSubnivel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Docente\DocenteRequest;

class DocenteController extends Controller
{
    public function store(DocenteRequest $request)
    {
        $code_verification = sha1(time());

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'code_verification' => $code_verification,
            'estado_id' => 1
        ]);

        $user->assignRole(2);
        // si existe el usuario creamos al docente
        if($user){
            $docente = Docente::create([
                'nombres' => $request->nombres ,
                'apellidos' => $request->apellidos ,
                'user_id' => $user->id
            ]);

        // si existe el docente insertamos el subnivel o subniveles
            if($docente){
                $arraySubNivel = array();
                foreach($request->subnivel_id as $item){
                    array_push($arraySubNivel, $item['id_subnivel']);
                }
                $docente->docentenivel()->sync($arraySubNivel);

                return $this->successResponse($docente, 'Docente creado exitosamente', true);
            }else{
                return $this->successResponse($docente, 'Error al crear al docente', false);
            }
        }else{
            return $this->successResponse($user, 'Error al crear al docente', false);
        }
    }

    public function show()
    {
        $docente = Docente::all();
        $docente->load('user', 'docentenivel.nivel');
        return $docente;
    }

    public function validarEmail($email){

       $user = User::where('email', $email)->first();

       if($user){
        return 1;
       }else{
        return 0;
       }

    }

    public function update(Request $request, Docente $docente)
    {
        $arraySubNivel = array();

        $docente->update(['nombres' => $request->nombres, 'apellidos' => $request->apellidos]);
        $docente->user->update(['email' => $request->email, 'password' => Hash::make($request->password)]);

        foreach($request->subnivel_id as $item){
            array_push($arraySubNivel, $item['id_subnivel']);
        }

        $docente->docentenivel()->sync($arraySubNivel);

        return $this->successResponse('Docente actualizado exitosamente', true);
    }

    public function destroy(Docente $docente)
    {
        $docente->user->delete();
        $docente->delete();

        return $this->successResponse('Docente desactivado exitosamente',true);
    }

}
