<?php

namespace App\Http\Controllers;

use App\Models\AlertasAlumno;
use App\Models\Docente;
use App\Models\DocenteSubnivel;
use App\Models\Empresa;
use App\Models\Estudiante;
use App\Models\PersonalAccessTokens;
use App\Models\SolicitudEmpresa;
use App\Models\SubNivel;
use App\Models\UnidadNegocio;
use App\Models\PlanCuenta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\DB;

class EmpresaController extends Controller
{

    public function index()
    {
        //
    }


    public function obtenermotivorechazo($id)
    {
        $idsolicitud = SolicitudEmpresa::where('empresa_id', $id)->orderby('id_solicitud','DESC')->take(1)->first();

        return $idsolicitud;
    }


    public function store(Request $request)
    {
        // validamos si el usuario está logueado

        $userlogin = Auth::user();

        if($userlogin){
            // traemos el estudiante
            $estudiante = Estudiante::where('user_id', $userlogin->id)->first();

            $arrayAlertas = [];
            if($request->tipo_empresa["id_tipoempresa"] == 1){
                // es una empresa natural rut empresa = rut representante

                if($request->rut_empresa != $request->rut_represetante){

                    array_push($arrayAlertas, ["mensaje"=>"Rut de empresa y Rut de representante son distintos","estudiante_id"=>$estudiante->id_estudiante,"id_tipo_alerta" => 1]);
                }
            }else{

                if($request->razon_social){

                    $razonsocial = trim($request->razon_social);

                    $palabra = 'E.I.R.L';

                    $pos = strpos($razonsocial, $palabra);

                    if ($pos === false) {

                        array_push($arrayAlertas, ["mensaje"=>"No incluyo el E.I.R.L en la razon social","estudiante_id"=>$estudiante->id_estudiante,"id_tipo_alerta" => 1]);

                    } else {
                        $array = explode(" ", $razonsocial);
                        $ultimoelement = end($array);

                        if (strcmp($palabra, $ultimoelement) !== 0) {

                            array_push($arrayAlertas, ["mensaje"=>"Incluyo el E.I.R.L, pero no al final de la razon social","estudiante_id"=>$estudiante->id_estudiante,"id_tipo_alerta" => 1]);

                        }
                    }
                }
            }

            if($request->capital_inicial < 500000){

                array_push($arrayAlertas, ["mensaje"=>"Capital Inicial menor a 500000","estudiante_id"=>$estudiante->id_estudiante,"id_tipo_alerta" => 1]);
            }

            if(!$request->razon_social){

                array_push($arrayAlertas, ["mensaje"=>"No ingresó la razon social","estudiante_id"=>$estudiante->id_estudiante,"id_tipo_alerta" => 1]);
            }

            if(!$request->nombre_fantasia){

                array_push($arrayAlertas, ["mensaje"=>"No ingresó la nombre fantasia","estudiante_id"=>$estudiante->id_estudiante,"id_tipo_alerta" => 1]);
            }

            if(!$request->celular){

                array_push($arrayAlertas, ["mensaje"=>"No ingresó el telefono","estudiante_id"=>$estudiante->id_estudiante,"id_tipo_alerta" => 1]);
            }

            if(!$request->email){

                array_push($arrayAlertas, ["mensaje"=>"No ingresó el correo electronico","estudiante_id"=>$estudiante->id_estudiante,"id_tipo_alerta" => 1]);
            }

            // registrar empresa

            $registrar_empresa = Empresa::create([
                'rut_empresa' => $request->rut_empresa,
                'rut_representante' => $request->rut_represetante,
                'razon_social' => $request->razon_social ,
                'nombre_fantasia' => $request->nombre_fantasia,
                'celular' => $request->celular ,
                'correo' => $request->email,
                'capital_inicial' => $request->capital_inicial,
                'tipoempresa_id' => $request->tipo_empresa["id_tipoempresa"],
                'estudiante_id' => $estudiante->id_estudiante,
                'direccion'     => $request->direccion,

            ]);

            UnidadNegocio::create([
                'codigo'        => 100,
                'nombre'        =>  "Casa Matriz",
                'empresa_id'    =>  $registrar_empresa->id_empresa,
            ]);

            if($registrar_empresa){

                // si existen alertas la registramos

                if(!empty($arrayAlertas)){

                    foreach ($arrayAlertas as $key => $value) {

                        AlertasAlumno::create([
                            'mensaje' => $value["mensaje"],
                            'estudiante_id' => $value["estudiante_id"],
                            'tipo_alerta_id' => $value["id_tipo_alerta"],
                            'empresa_id' => $registrar_empresa->id_empresa
                        ]);
                    }
                }

                SolicitudEmpresa::create([
                    'docente_id'=> $request->docente["id_docente"],
                    'empresa_id' => $registrar_empresa->id_empresa,
                    'subnivel_id' => $estudiante->subnivel_id
                ]);

                return $this->successResponse($registrar_empresa, 'Empresa creada exitosamente', true);

            }else{

                return $this->successResponse($registrar_empresa, 'Empresa creada exitosamente', false);
            }
        }
    }

    public function show()
    {

        $userlogin = Auth::user();

        if($userlogin){

            $estudiante = Estudiante::where('user_id', $userlogin->id)->first();

            $empresas = Empresa::where('estudiante_id', $estudiante->id_estudiante)->with('estado','tipoEmpresa')->get();

            return $empresas;
        }
    }

    public function empresaAlumno($id){

        return Empresa::where('id_empresa', $id)->with('solicitud')->get();
    }

    public function docentealumno(){
        $userlogin = Auth::user();

        if($userlogin){
            $estudiante = Estudiante::where('user_id', $userlogin->id)->first();

            $docentes = SubNivel::where('id_subnivel', $estudiante->subnivel_id )->with('docente')->get();

            return $docentes;
        }
    }

    public function editar(Request $request)
    {

        // validamos si el usuario está logueado

        $userlogin = Auth::user();

        if($userlogin){

            // traemos el estudiante para validar su id
            $estudiante = Estudiante::where('user_id', $userlogin->id)->first();

            if($estudiante->id_estudiante == $request->id_estudiante){

                $arrayAlertas = [];
                if($request->tipo_empresa["id_tipoempresa"] == 1){
                    // es una empresa natural rut empresa = rut representante

                    if($request->rut_empresa != $request->rut_represetante){

                        array_push($arrayAlertas, ["mensaje"=>"Rut de empresa y Rut de representante son distintos","estudiante_id"=>$estudiante->id_estudiante,"id_tipo_alerta" => 1]);
                    }
                }else{

                    if($request->razon_social){

                        $razonsocial = trim($request->razon_social);

                        $palabra = 'E.I.R.L';

                        $pos = strpos($razonsocial, $palabra);

                        if ($pos === false) {

                            array_push($arrayAlertas, ["mensaje"=>"No incluyo el E.I.R.L en la razon social","estudiante_id"=>$estudiante->id_estudiante,"id_tipo_alerta" => 1]);

                        } else {
                            $array = explode(" ", $razonsocial);
                            $ultimoelement = end($array);

                            if (strcmp($palabra, $ultimoelement) !== 0) {

                                array_push($arrayAlertas, ["mensaje"=>"Incluyo el E.I.R.L, pero no al final de la razon social","estudiante_id"=>$estudiante->id_estudiante,"id_tipo_alerta" => 1]);

                            }
                        }

                    }

                }

                if($request->capital_inicial < 500000){

                    array_push($arrayAlertas, ["mensaje"=>"Capital Inicial menor a 500000","estudiante_id"=>$estudiante->id_estudiante,"id_tipo_alerta" => 1]);
                }

                if(!$request->razon_social){

                    array_push($arrayAlertas, ["mensaje"=>"No ingresó la razon social","estudiante_id"=>$estudiante->id_estudiante,"id_tipo_alerta" => 1]);
                }

                if(!$request->nombre_fantasia){

                    array_push($arrayAlertas, ["mensaje"=>"No ingresó la nombre fantasia","estudiante_id"=>$estudiante->id_estudiante,"id_tipo_alerta" => 1]);
                }

                if(!$request->celular){

                    array_push($arrayAlertas, ["mensaje"=>"No ingresó el telefono","estudiante_id"=>$estudiante->id_estudiante,"id_tipo_alerta" => 1]);
                }

                if(!$request->email){

                    array_push($arrayAlertas, ["mensaje"=>"No ingresó el correo electronico","estudiante_id"=>$estudiante->id_estudiante,"id_tipo_alerta" => 1]);

                }

                // actualizar empresa

                $upd_empresa = Empresa::where('id_empresa',$request->id_empresa)->update([
                    'rut_empresa' => $request->rut_empresa,
                    'rut_representante' => $request->rut_represetante,
                    'razon_social' => $request->razon_social ,
                    'nombre_fantasia' => $request->nombre_fantasia,
                    'celular' => $request->celular ,
                    'correo' => $request->email,
                    'capital_inicial' => $request->capital_inicial,
                    'tipoempresa_id' => $request->tipo_empresa["id_tipoempresa"],
                    'estudiante_id' => $estudiante->id_estudiante,
                    'estado_id' => 4,
                    'direccion' => $request->direccion,
                ]);

                if($upd_empresa){
                    // si existen alertas la registramos
                    if(!empty($arrayAlertas)){

                        foreach ($arrayAlertas as $key => $value) {

                            AlertasAlumno::create([
                                'mensaje' => $value["mensaje"],
                                'estudiante_id' => $value["estudiante_id"],
                                'tipo_alerta_id' => $value["id_tipo_alerta"],
                                'empresa_id' => $request->id_empresa
                            ]);
                        }
                    }
                    SolicitudEmpresa::create([
                        'docente_id'=> $request->docente["id_docente"],
                        'empresa_id' => $request->id_empresa,
                        'subnivel_id' => $estudiante->subnivel_id
                    ]);
                    return $this->successResponse($upd_empresa, 'Empresa editada exitosamente', true);
                }else{

                    return $this->successResponse($upd_empresa, 'Empresa editada exitosamente', false);
                }
            }
        }
    }

    public function solicitudEmpresa($id_subnivel){

        $userlogin = Auth::user();

        if($userlogin){

            // traemos el docente para validar su id
            $docente = Docente::where('user_id', $userlogin->id)->first();

            $solicitud = SolicitudEmpresa::where([['subnivel_id','=', $id_subnivel],['docente_id','=', $docente->id_docente],['estado_id','=', 10]])
                        ->with('empresa.estudiante')->get();

            return $solicitud;

        }

    }

    public function obtenerempresasolicitud($id){
       return $empresa = Empresa::where('id_empresa', $id)->with('tipoEmpresa')->first();

    }

    public function alertaempresa($id, $tipo){

       return $alerta = AlertasAlumno::where([['empresa_id','=',$id],['tipo_alerta_id','=', $tipo]])->get();
    }

    public function aprobarempresa($id,$idsolicitud){


        // cambiamos el estado de la empresa

        $upd_empresa = Empresa::where('id_empresa',$id)->update([
            'estado_id' => 3
        ]);

        if($upd_empresa){
            // solicitud finalizada

            SolicitudEmpresa::where('id_solicitud',$idsolicitud)->update([
                'estado_id' => 11
            ]);

            // pasamos las cuentas por defecto que debe tener cada empresa

            $plancuenta = [13,14,15,16,17,18,19,1,2];

            for ($i=0; $i < count($plancuenta) ; $i++) {
                PlanCuenta::create([
                    'empresa_id' => $id,
                    'manualcuenta_id' => $plancuenta[$i]]);
            }

            return $this->successResponse('Empresa aprobada exitosamente', true);
        }else{

            return $this->successResponse('Error al aprobar la empresa', false);
        }

    }

    public function rechazarempresa(Request $request){

        // cambiamos el estado de la empresa

        $upd_empresa = Empresa::where('id_empresa',$request->id_empresa)->update([
            'estado_id' => 5
        ]);

        if($upd_empresa){
            // solicitud finalizada

            SolicitudEmpresa::where('id_solicitud',$request->id_solicitud)->update([
                'observacion' => $request->motivo,
                'estado_id' => 11
            ]);

            return $this->successResponse('Empresa rechazada exitosamente', true);
        }else{

            return $this->successResponse('Error al rechazar la empresa', false);
        }

    }

    public function destroy(Empresa $empresa)
    {
        //
    }
}
