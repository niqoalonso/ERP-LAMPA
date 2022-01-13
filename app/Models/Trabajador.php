<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Trabajador extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $primaryKey =  "id_trabajador";
    protected $fillable = [
        'nombres',
        'apellidos',
        'email',
        'direccional',
        'estado_civil',
        'nacionalidad',
        'carga_familiar',
        'salud',
        'rut',
        'celular',
        'fecha_nacimiento',
        'edad',
        'fecha_desvinculacion',
        'motivo_desvinculacion',
        'fecha_contrato',
        'fecha_fin_contrato',
        'tipo_contrato',
        'sueldo_base',
        'colacion',
        'movilidad',
        'url_pdf',
        'afp_id',
        'comuna_id',
        'empresa_id'
    ];

    public function trabajorcarga()
    {
        return $this->belongsToMany(Parentezco::class,'cargas_trabajadors', 'trabajador_id', 'parentezco_id',)->withPivot('nombres','apellidos','rut','email','nacionalidad','fecha_nacimiento','tipo_carga');
    }

    public function comuna(){

        return $this->belongsTo(Comunas::class,'comuna_id');
    }

    public function afp(){

        return $this->belongsTo(Afp::class,'afp_id');
    }
}
