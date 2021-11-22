<?php

namespace App\Http\Controllers;

use App\Models\AlertasAlumno;
use App\Models\Docente;
use App\Models\Estudiante;
use App\Models\InicioActividadForm;
use App\Models\SolicitudIncActividad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InicioActividadFormController extends Controller
{

    public function index($id)
    {
        // buscamos la solicitud a la que pertenece la empresa

        return InicioActividadForm::where('empresa_id', $id)->with('solicitud','empresa.tipoEmpresa')->first();

    }


    public function solicitudForm($id_subnivel){

        $userlogin = Auth::user();

        if($userlogin){

            // traemos el docente para validar su id
            $docente = Docente::where('user_id', $userlogin->id)->first();

            $solicitud = SolicitudIncActividad::where([['subnivel_id','=', $id_subnivel],['docente_id','=', $docente->id_docente],['estado_id','=', 10]])
                        ->with('inicioActividad.empresa.estudiante')->get();

            return $solicitud;

        }

    }

    public function store(Request $request)
    {
       
        $userlogin = Auth::user();

        if($userlogin){
            //IMPORTANTE: VALIDAR QUEL A EMPRES QUE TRAER SEA LA MISMA QUE TIENE GUARDADA
            $estudiante = Estudiante::where('user_id', $userlogin->id)->with('empresa')->first();
            
            if((int)$request->id_empresa){

                $arrayAlertas = [];

                if($estudiante["empresa"][0]["tipoempresa_id"] == 1){

                    // es una empresa natural no debe tener marcado solicitud de rut

                    if($request->solcitud_rut){

                        array_push($arrayAlertas, ["mensaje"=>"Selecciono solicitud de RUT y es una Empresa Natural",
                                                   "estudiante_id"=>$estudiante["id_estudiante"],
                                                   "id_tipo_alerta" => 2]);
                    }
                    if(!$request->inicio_actividad){

                        array_push($arrayAlertas, ["mensaje"=>"No selecciono Inicio de Actividades",
                                                   "estudiante_id"=>$estudiante["id_estudiante"],
                                                   "id_tipo_alerta" => 2]);
                    }

                    if(!$request->rol_tributario){

                        array_push($arrayAlertas, ["mensaje"=>"No ingreso el ROL Tributario",
                                                   "estudiante_id"=>$estudiante["id_estudiante"],
                                                   "id_tipo_alerta" => 2]);

                    }else{

                        if($request->rol_tributario != $estudiante["empresa"][0]["rut_empresa"]){

                            array_push($arrayAlertas, ["mensaje"=>"ROL Tributario al RUT de la Empresa Natural",
                                                   "estudiante_id"=>$estudiante["id_estudiante"],
                                                   "id_tipo_alerta" => 2]);
                        }
                    }

                    if(!$request->regimen_id){

                        array_push($arrayAlertas, ["mensaje"=>"No selecciono el Regimen",
                                                   "estudiante_id"=>$estudiante["id_estudiante"],
                                                   "id_tipo_alerta" => 2]);
                    }

                    if($request->razon_social){

                        array_push($arrayAlertas, ["mensaje"=>"Ingreso Razon Social y es una Empresa Natural",
                                                   "estudiante_id"=>$estudiante["id_estudiante"],
                                                   "id_tipo_alerta" => 2]);
                    }

                    if(!$request->nombres){

                        array_push($arrayAlertas, ["mensaje"=>"No ingreso los Nombres",
                                                   "estudiante_id"=>$estudiante["id_estudiante"],
                                                   "id_tipo_alerta" => 2]);
                    }

                    if(!$request->apellido_p){

                        array_push($arrayAlertas, ["mensaje"=>"No ingreso el Apellido Paterno",
                                                   "estudiante_id"=>$estudiante["id_estudiante"],
                                                   "id_tipo_alerta" => 2]);
                    }

                    if(!$request->apellido_m){

                        array_push($arrayAlertas, ["mensaje"=>"No ingreso el Apellido Materno",
                                                   "estudiante_id"=>$estudiante["id_estudiante"],
                                                   "id_tipo_alerta" => 2]);
                    }

                }else{

                    if($request->solcitud_rut){

                        array_push($arrayAlertas, ["mensaje"=>"Selecciono solicitud de RUT",
                                                   "estudiante_id"=>$estudiante["id_estudiante"],
                                                   "id_tipo_alerta" => 2]);
                    }

                    if(!$request->inicio_actividad){

                        array_push($arrayAlertas, ["mensaje"=>"No selecciono Inicio de Actividades",
                                                   "estudiante_id"=>$estudiante["id_estudiante"],
                                                   "id_tipo_alerta" => 2]);
                    }

                    if(!$request->rol_tributario){

                        array_push($arrayAlertas, ["mensaje"=>"No ingreso el ROL Tributario",
                                                   "estudiante_id"=>$estudiante["id_estudiante"],
                                                   "id_tipo_alerta" => 2]);
                    }

                    if($request->razon_social){

                        if($request->razon_social != $estudiante["empresa"][0]["razon_social"]){

                            array_push($arrayAlertas, ["mensaje"=>"La Razon Social no coincide con la Razon Social de la Escritura",
                                                   "estudiante_id"=>$estudiante["id_estudiante"],
                                                   "id_tipo_alerta" => 2]);
                        }

                    }else{

                        array_push($arrayAlertas, ["mensaje"=>"No ingreso Razon Social y es una Empresa Juridica",
                                                   "estudiante_id"=>$estudiante["id_estudiante"],
                                                   "id_tipo_alerta" => 2]);
                    }

                    if($request->nombres){

                        array_push($arrayAlertas, ["mensaje"=>"Ingreso los Nombres y es una Empresa Juridica",
                                                   "estudiante_id"=>$estudiante["id_estudiante"],
                                                   "id_tipo_alerta" => 2]);
                    }

                    if($request->apellido_p){

                        array_push($arrayAlertas, ["mensaje"=>"Ingreso el Apellido Paterno y es una Empresa Juridica",
                                                   "estudiante_id"=>$estudiante["id_estudiante"],
                                                   "id_tipo_alerta" => 2]);
                    }

                    if($request->apellido_m){

                        array_push($arrayAlertas, ["mensaje"=>"Ingreso el Apellido Materno y es una Empresa Juridica",
                                                   "estudiante_id"=>$estudiante["id_estudiante"],
                                                   "id_tipo_alerta" => 2]);
                    }

                }

                if($request->f_inicio_actividad){

                    $daterequest = date_create($request->f_inicio_actividad);

                    $fecharequest = date_format($daterequest,"Y-m-d");

                    $dateempresa = date_create($estudiante["empresa"][0]["created_at"]);

                    $fechaempresa = date_format($dateempresa,"Y-m-d");

                    if( $fecharequest  < $fechaempresa){

                        array_push($arrayAlertas, ["mensaje"=>"La fecha de Inicio de Actividades debe ser mayor a la fecha de la escritura de la Empresa",
                                                    "estudiante_id"=>$estudiante["id_estudiante"],
                                                    "id_tipo_alerta" => 2]);
                    }

                }else{

                    array_push($arrayAlertas, ["mensaje"=>"No ingreso la fecha de Inicio de Actividades",
                                                    "estudiante_id"=>$estudiante["id_estudiante"],
                                                    "id_tipo_alerta" => 2]);
                }

                if(!$request->nombre_fantasia){

                    array_push($arrayAlertas, ["mensaje"=>"No ingreso Nombre de Fantasia",
                                               "estudiante_id"=>$estudiante["id_estudiante"],
                                               "id_tipo_alerta" => 2]);
                }

                if(!$request->f_insc_comercio){

                    array_push($arrayAlertas, ["mensaje"=>"No ingreso la Fecha de Inscripcion en el Registro de Comercio",
                                               "estudiante_id"=>$estudiante["id_estudiante"],
                                               "id_tipo_alerta" => 2]);
                }

                if(!$request->calle_pasaje){

                    array_push($arrayAlertas, ["mensaje"=>"No ingreso la Calle del Domicilio o Casa Matriz",
                                               "estudiante_id"=>$estudiante["id_estudiante"],
                                               "id_tipo_alerta" => 2]);
                }

                if(!$request->numero_casa){

                    array_push($arrayAlertas, ["mensaje"=>"No ingreso el Numero del Domicilio o Casa Matriz",
                                               "estudiante_id"=>$estudiante["id_estudiante"],
                                               "id_tipo_alerta" => 2]);
                }

                if(!$request->of_depto){

                    array_push($arrayAlertas, ["mensaje"=>"No ingreso el OF./DPTO/LOCAL del Domicilio o Casa Matriz",
                                               "estudiante_id"=>$estudiante["id_estudiante"],
                                               "id_tipo_alerta" => 2]);
                }

                if(!$request->rol_propietario){

                    array_push($arrayAlertas, ["mensaje"=>"No ingreso el ROL AVALUO PROPIEDAD del Domicilio o Casa Matriz",
                                               "estudiante_id"=>$estudiante["id_estudiante"],
                                               "id_tipo_alerta" => 2]);
                }

                if(!$request->comuna){

                    array_push($arrayAlertas, ["mensaje"=>"No ingreso la Comuna del Domicilio o Casa Matriz",
                                               "estudiante_id"=>$estudiante["id_estudiante"],
                                               "id_tipo_alerta" => 2]);
                }

                if(!$request->ciudad){

                    array_push($arrayAlertas, ["mensaje"=>"No ingreso la Ciudad del Domicilio o Casa Matriz",
                                               "estudiante_id"=>$estudiante["id_estudiante"],
                                               "id_tipo_alerta" => 2]);
                }

                if(!$request->region){

                    array_push($arrayAlertas, ["mensaje"=>"No ingreso la Region del Domicilio o Casa Matriz",
                                               "estudiante_id"=>$estudiante["id_estudiante"],
                                               "id_tipo_alerta" => 2]);
                }

                if(!$request->descripcion_act_economica){

                    array_push($arrayAlertas, ["mensaje"=>"No ingreso la Descripcion de la Actividad Economica",
                                               "estudiante_id"=>$estudiante["id_estudiante"],
                                               "id_tipo_alerta" => 2]);
                }

                if(!$request->giro_id){

                    array_push($arrayAlertas, ["mensaje"=>"No ingreso el Codigo de Actividad",
                                               "estudiante_id"=>$estudiante["id_estudiante"],
                                               "id_tipo_alerta" => 2]);
                }

                if(!$request->enterado){

                    array_push($arrayAlertas, ["mensaje"=>"No ingreso el enterado del Capital Inicial",
                                               "estudiante_id"=>$estudiante["id_estudiante"],
                                               "id_tipo_alerta" => 2]);
                }

                if($request->por_enterar){

                    if($request->por_enterar > 0){

                        if(!$request->f_por_enterar){

                            array_push($arrayAlertas, ["mensaje"=>"No ingreso la Fecha Prevista a Enterar, y tiene un monton por Enterar del Capital Inicial",
                                               "estudiante_id"=>$estudiante["id_estudiante"],
                                               "id_tipo_alerta" => 2]);
                        }
                    }
                }

                if(!$request->total){

                    array_push($arrayAlertas, ["mensaje"=>"No ingreso el Total a Enterar del Capital Inicial",
                                       "estudiante_id"=>$estudiante["id_estudiante"],
                                       "id_tipo_alerta" => 2]);
                }

                if($request->f_por_enterar){

                    if(!$request->f_por_enterar || $request->por_enterar < 0){

                        array_push($arrayAlertas, ["mensaje"=>"No ingreso el monton por Enterar, y tiene una Fecha Prevista a Enterar del Capital Inicial",
                                               "estudiante_id"=>$estudiante["id_estudiante"],
                                               "id_tipo_alerta" => 2]);
                    }
                }

                if(!$request->socio_nombre){

                    array_push($arrayAlertas, ["mensaje"=>"No Ingreso la Razon Social o Nombre del Socio",
                                       "estudiante_id"=>$estudiante["id_estudiante"],
                                       "id_tipo_alerta" => 2]);

                }

                if(!$request->socio_rut){

                    array_push($arrayAlertas, ["mensaje"=>"No Ingreso el RUT del Socio",
                                       "estudiante_id"=>$estudiante["id_estudiante"],
                                       "id_tipo_alerta" => 2]);
                }

                if(!$request->socio_enterado || !$request->socio_por_enterar ){

                    array_push($arrayAlertas, ["mensaje"=>"No Ingreso el Enterado del Socio o Por Enterar",
                                       "estudiante_id"=>$estudiante["id_estudiante"],
                                       "id_tipo_alerta" => 2]);
                }

                if($request->socio_enterado || $request->socio_por_enterar ){

                    if(!$request->socio_porcentaje ){

                    array_push($arrayAlertas, ["mensaje"=>"No Ingreso el porcentaje de Participacion de Utilizades del Socio",
                                       "estudiante_id"=>$estudiante["id_estudiante"],
                                       "id_tipo_alerta" => 2]);
                    }
                }

                if($request->socio_por_enterar){

                    if($request->socio_por_enterar > 0){

                        if(!$request->socio_f_enterar){

                            array_push($arrayAlertas, ["mensaje"=>"No ingreso la Fecha Prevista a Enterar, y tiene un monton por Enterar del Socio",
                                               "estudiante_id"=>$estudiante["id_estudiante"],
                                               "id_tipo_alerta" => 2]);
                        }
                    }
                }

                if(!$request->representante_rut){

                    array_push($arrayAlertas, ["mensaje"=>"No Ingreso el RUT del Representante",
                                       "estudiante_id"=>$estudiante["id_estudiante"],
                                       "id_tipo_alerta" => 2]);
                }

                if(!$request->representante_apellido_p){

                    array_push($arrayAlertas, ["mensaje"=>"No Ingreso el Apellido Paterno del Representante",
                                       "estudiante_id"=>$estudiante["id_estudiante"],
                                       "id_tipo_alerta" => 2]);
                }

                if(!$request->representante_apellido_m){

                    array_push($arrayAlertas, ["mensaje"=>"No Ingreso el Apellido Materno del Representante",
                                       "estudiante_id"=>$estudiante["id_estudiante"],
                                       "id_tipo_alerta" => 2]);
                }

                if(!$request->representante_nombre){

                    array_push($arrayAlertas, ["mensaje"=>"No Ingreso el Apellido Materno del Representante",
                                       "estudiante_id"=>$estudiante["id_estudiante"],
                                       "id_tipo_alerta" => 2]);
                }

                if(!$request->credito_fiscal){

                    array_push($arrayAlertas, ["mensaje"=>"No Ingreso si emitira documentos que respaldan el uso de Credito Fiscal",
                                       "estudiante_id"=>$estudiante["id_estudiante"],
                                       "id_tipo_alerta" => 2]);
                }

                // registramos el formulario

                $registroForm = InicioActividadForm::updateOrCreate(
                    ['empresa_id'=> $estudiante["empresa"][0]["id_empresa"]],
                    [
                        'solcitud_rut' => $request->solcitud_rut,
                        'inicio_actividad' => $request->inicio_actividad,
                        'f_inicio_actividad' => $request->f_inicio_actividad,
                        'rol_tributario' => $request->rol_tributario,
                        'regimen_id'  => $request->regimen_id,
                        'nombres' => $request->nombres,
                        'apellido_p' => $request->apellido_p,
                        'apellido_m' => $request->apellido_m,
                        'razon_social' => $request->razon_social,
                        'nombre_fantasia' => $request->nombre_fantasia,
                        'n_insc_comercio' => $request->n_insc_comercio,
                        'f_insc_comercio' => $request->f_insc_comercio,
                        'calle_pasaje' => $request->calle_pasaje,
                        'numero_casa' => $request->numero_casa,
                        'of_depto' => $request->of_depto,
                        'bloque' => $request->bloque,
                        'villa_poblacion' => $request->villa_poblacion,
                        'rol_propietario' => $request->rol_propietario,
                        'comuna' => $request->comuna,
                        'cuidad' => $request->cuidad,
                        'region' => $request->region,
                        'telefono_movil' => $request->telefono_movil,
                        'telefono_fijo' => $request->telefono_fijo,
                        'giro_id' => $request->giro_id["id_giro"],
                        'descripcion_act_economica' => $request->descripcion_act_economica,
                        'enterado' => $request->enterado,
                        'por_enterar' => $request->por_enterar,
                        'total' => $request->total,
                        'f_por_enterar' => $request->f_por_enterar,
                        'socio_nombre' => $request->socio_nombre,
                        'socio_rut' => $request->socio_rut,
                        'socio_enterado' => $request->socio_enterado,
                        'socio_por_enterar' => $request->socio_por_enterar,
                        'socio_f_enterar' => $request->socio_f_enterar,
                        'socio_porcentaje' => $request->socio_porcentaje,
                        'representante_rut' => $request->representante_rut,
                        'representante_nombre' => $request->representante_nombre,
                        'representante_apellido_p' => $request->representante_apellido_p,
                        'representante_apellido_m' => $request->representante_apellido_m,
                        'credito_fiscal' => $request->credito_fiscal,
                        'empresa_id' => $estudiante["empresa"][0]["id_empresa"]
                    ]
                );

                if($registroForm){

                    // si existen alertas la registramos

                    if(!empty($arrayAlertas)){

                        foreach ($arrayAlertas as $key => $value) {

                            AlertasAlumno::create([
                                'mensaje' => $value["mensaje"],
                                'estudiante_id' => $value["estudiante_id"],
                                'tipo_alerta_id' => $value["id_tipo_alerta"],
                                'empresa_id' => $estudiante["empresa"][0]["id_empresa"]
                            ]);
                        }
                    }

                    // creo la solicitud Ins Actividades

                    SolicitudIncActividad::create([
                        'docente_id'=> $request->docente["id_docente"],
                        'inicio_form_id' => $registroForm->id_inicio_form,
                        'subnivel_id' => $estudiante["id_estudiante"]
                    ]);

                    return $this->successResponse($registroForm, 'Inicio de actividades creado exitosamente', true);

                }else{

                    return $this->successResponse('Corrio un error al registrar el formulario', false);
                }


            }else{

                return $this->successResponse('Error la empresa seleccionada no le pertenece o ingresó una empresa invalida', false);
            }

        }else{

            return $this->successResponse('Error no estás logueado', false);
        }

    }


    public function show(InicioActividadForm $inicioActividadForm)
    {
        //
    }


    public function edit(InicioActividadForm $inicioActividadForm)
    {
        //
    }


    public function aprobar(Request $request, $id)
    {

        // actualizamos la información del inicio de actividad y su estado
        $inicio_act = InicioActividadForm::updateOrCreate(['empresa_id'=> $id],[
            'profe_categoria'=> $request->profe_categoria,
            'profe_iva'=> $request->profe_iva,
            'profe_anexo'=> $request->profe_anexo,
            'profe_fecha_firma'=> $request->profe_fecha_firma,
            'estado_id' => 3
        ]);

        if($inicio_act){

            // finalizar la solicitud

            SolicitudIncActividad::where('inicio_form_id', $inicio_act->id_inicio_form)->update([
                'estado_id' => 11
            ]);

            return $this->successResponse('Fomulario F4415 aprobado exitosamente', true);
        }else{

            return $this->successResponse('Error al aprobar Fomulario F4415', false);
        }

    }

    public function rechazar(Request $request){

        // cambiamos el estado del inicio de actividad 

        $upd_empresa = InicioActividadForm::where('id_inicio_form',$request->id_inicio_form)->update([
            'estado_id' => 5
        ]);

        if($upd_empresa){
            // solicitud finalizada

            SolicitudIncActividad::where('inicio_form_id',$request->id_inicio_form)->update([
                'observacion' => $request->motivo,
                'estado_id' => 11
            ]);

            return $this->successResponse('Fomulario F4415 rechazado exitosamente', true);
        }else{

            return $this->successResponse('Error al rechazar Fomulario F4415', false);
        }

    }


    public function destroy(InicioActividadForm $inicioActividadForm)
    {
        //
    }
}
