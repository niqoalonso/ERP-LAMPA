<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubNivelesRequest;
use App\Models\Nivel;
use App\Models\SubNivel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubNivelController extends Controller
{

    public function crearNivel(Request $request)
    {
        // recibimos los datos
        $input = $request->all();

        // mandamos a validar los datos

        $validatedata = $this->validaDatos($input);

        // hacemos el return de los errores en caso de que hay

        if($validatedata->fails()){
            return $this->errorResponse('Validacion errors', $validatedata->errors() ) ;
        }

        // si la validacion es correcta hacemos el insert

        $nivel = SubNivel::create($input);

        // retornamos los datos y el mensaje de exito

        return $this->successResponse($nivel, 'Subnivel creado exitosamente', true);

    }

    public function show()
    {   
        return SubNivel::with('nivel')->get();
    }

    public function showNivel($id)
    {
        return SubNivel::where('id_subnivel', $id)->first();
    }

    public function showPorNivel()
    {   
        $sub = SubNivel::where('estado_id','=', 1)->get();
        $sub->load('nivel');
        return $sub;
    }


    public function update(Request $request, $id)
    {

        $input = $request->all();

        $validatedata = $this->validaDatos($input);

        if($validatedata->fails()){
            return $this->errorResponse('Validacion errors', $validatedata->errors() ) ;
        }

        $nivel = SubNivel::where('id_subnivel',$id)->update([
            'nombre' => $input["nombre"],
            'ano_generacion' => $input["ano_generacion"]
        ]);

        if($nivel){

            return $this->successResponse($nivel, 'Subnivel Editado exitosamente',true);
        }else{

            return $this->successResponse($nivel, 'Error al Editar el Subnivel',false);

        }

    }

    public function updateStatus($id, $status)
    {

        $nivel = SubNivel::where('id_subnivel',$id)->update([
            'estado_id' =>$status
        ]);

        if($nivel){

            if($status == 1){

                return $this->successResponse($nivel, 'Subnivel Activado exitosamente',true);
            }else{

                return $this->successResponse($nivel, 'Subnivel Desactivado exitosamente',true);
            }

        }else{

            if($status == 1){

                return $this->successResponse($nivel, 'Error al Activar el Subnivel',false);

            }else{

                return $this->successResponse($nivel, 'Error al Desactivar el Subnivel',false);

            }
        }
    }

    public function destroy(SubNivel $subnivel)
    {   
        $subnivel->delete();
        return $this->successResponse('Subnivel Desactivado exitosamente',true);
    }

    public function validaDatos($datos){

        $input = $datos;

        $validatedata =  Validator::make($input,[
            'nombre' => ['required'],
            'ano_generacion' => ['required', 'integer','min:4'],
            'nivel_id' => ['required','exists:nivels,id_nivel']
            ],
            [

            'nombre.required'       => 'Debes ingresar un nombre para el subnivel.',
            'ano_generacion.required' => 'Debes ingresar un año de generacion.',
            'ano_generacion.integer' => 'Debe ser un numero.',
            'ano_generacion.min' => 'Debe contener 4 numeros.',
            'nivel_id.required'  => 'Debes seleccionar un nivel.',
            'nivel_id.exists'  => 'No se encuentra ese nivel.'

              ]
        );

        return $validatedata;

    }

}
