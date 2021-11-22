<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InicioActividadForm extends Model
{
    use HasFactory;

    protected $primaryKey="id_inicio_form";

    protected $fillable = [

        'solcitud_rut',
        'inicio_actividad',
        'f_inicio_actividad',
        'rol_tributario',
        'regimen_id',
        'nombres',
        'apellido_p',
        'apellido_m',
        'razon_social',
        'nombre_fantasia',
        'n_insc_comercio',
        'f_insc_comercio',
        'calle_pasaje',
        'numero_casa',
        'of_depto',
        'bloque',
        'villa_poblacion',
        'rol_propietario',
        'comuna',
        'cuidad',
        'region',
        'telefono_movil',
        'telefono_fijo',
        'giro_id',
        'descripcion_act_economica',
        'enterado',
        'por_enterar',
        'total',
        'f_por_enterar',
        'socio_nombre',
        'socio_rut',
        'socio_enterado',
        'socio_por_enterar',
        'socio_f_enterar',
        'socio_porcentaje',
        'representante_rut',
        'representante_nombre',
        'representante_apellido_p',
        'representante_apellido_m',
        'credito_fiscal',
        'empresa_id'
    ];


    public function empresa()
    {
        return $this->belongsTo(Empresa::class,'empresa_id');
    }

    public function solicitud()
    {
        return $this->belongsToMany(Docente::class,'solicitud_inc_actividads', 'inicio_form_id', 'docente_id');
    }
}
