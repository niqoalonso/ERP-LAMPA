<?php

namespace App\Http\Controllers;

use App\Http\Requests\Trabajador\TrabajadorRequest;
use App\Models\Afp;
use App\Models\Comunas;
use App\Models\Estudiante;
use App\Models\Parentezco;
use App\Models\Regiones;
use App\Models\Trabajador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class TrabajadorController extends Controller
{
    public function validarrut($rut)
    {
        $trabajador =  Trabajador::where('rut', $rut)->first();

        if($trabajador){
            return 1;
        }else{

            return 0;
        }
    }

    public function store(TrabajadorRequest $request)
    {

        $userlogin = Auth::user();

        if($userlogin){

            $estudiante = Estudiante::where('user_id', $userlogin->id)->first();

            if( $request->anturlpdf != 'undefined' && !$request->file("url_pdf")){

                $pdf = $request->anturlpdf ;

            }else{

                if($request->file("url_pdf")){

                    if($request->anturlpdf != 'undefined'){
                        unlink(public_path().'/storage/'.$request->anturlpdf);
                    }

                    $path = public_path().'/storage/pdf/';


                        $file = $request->file('url_pdf');
                        $fileName = uniqid().$file->getClientOriginalName();
                        $file->move($path, $fileName);

                    $pdf = "pdf/".$fileName;
                }

            }

            $trabajador = Trabajador::updateOrCreate(['id_trabajador'=>$request->id_trabajador],
                                                    [
                                                        'nombres' =>$request->nombres,
                                                        'apellidos' =>$request->apellidos,
                                                        'email' =>$request->email,
                                                        'direccional' =>$request->direccional,
                                                        'estado_civil' =>$request->estado_civil,
                                                        'nacionalidad' =>$request->nacionalidad,
                                                        'carga_familiar' =>$request->carga_familiar,
                                                        'salud' =>$request->salud,
                                                        'rut' =>$request->rut,
                                                        'celular' =>$request->celular,
                                                        'fecha_nacimiento' =>$request->fecha_nacimiento,
                                                        'edad' =>$request->edad,
                                                        'fecha_desvinculacion' =>$request->fecha_desvinculacion,
                                                        'motivo_desvinculacion' =>$request->motivo_desvinculacion,
                                                        'fecha_contrato' =>$request->fecha_contrato,
                                                        'fecha_fin_contrato' =>$request->fecha_fin_contrato,
                                                        'tipo_contrato'=>$request->tipo_contrato,
                                                        'sueldo_base' =>$request->sueldo_base,
                                                        'colacion' =>$request->colacion,
                                                        'movilidad' =>$request->movilidad,
                                                        'url_pdf' =>$pdf,
                                                        'afp_id' =>$request->afp_id,
                                                        'comuna_id' =>$request->comuna_id,
                                                        'empresa_id' => $request->id_empresa
                                                    ]);

                return $trabajador;
        }
    }

    public function storeCarga(Request $request){


        $trabajador = Trabajador::where('id_trabajador', $request->trabajador["id_trabajador"])->first();

        if($request->datos_carga){

            $arrayCarga = [];

            for ($i=0; $i < count($request->datos_carga) ; $i++) {

                $arraydatos = [
                    'nombres' => $request->datos_carga[$i]["nombres"],
                    'apellidos' => $request->datos_carga[$i]["apellidos"],
                    'rut' => $request->datos_carga[$i]["rut"],
                    'email' => $request->datos_carga[$i]["email"],
                    'nacionalidad' => $request->datos_carga[$i]["nacionalidad"],
                    'fecha_nacimiento' => $request->datos_carga[$i]["fecha_nacimiento"],
                    'tipo_carga' => $request->datos_carga[$i]["tipo_carga"]["tipo"],
                    'parentezco_id'=> $request->datos_carga[$i]["parentezco"]["id_parentezco"],
                    ];

                    array_push($arrayCarga, $arraydatos);

            }

          return  $trabajador->trabajorcarga()->sync($arrayCarga);

        }
    }

    public function show($id)
    {
        // $userlogin = Auth::user();

        // $estudiante = Estudiante::where('user_id', $userlogin->id)->first();

        return Trabajador::where('empresa_id',$id)->with('trabajorcarga','comuna','afp')->get();
    }

    public function destroy(Trabajador $trabajador)
    {
        return $trabajador->delete();
    }

    public function showregiones(){

        return Regiones::all();
    }

    public function showafp(){

        return Afp::all();
    }

    public function showparentezco(){

        return Parentezco::all();
    }

    public function showcomuna($id){

        return Comunas::where('COM_REGION_ID', '=',$id)->get();
    }
}
