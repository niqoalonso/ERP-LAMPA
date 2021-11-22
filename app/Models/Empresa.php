<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    use HasFactory;

    protected $primaryKey  = "id_empresa";

    protected $fillable = [
        'rut_empresa',
        'rut_representante',
        'razon_social',
        'nombre_fantasia',
        'celular',
        'correo',
        'capital_inicial',
        'tipoempresa_id',
        'estudiante_id',
        'direccion'
    ];

    public function estado()
    {
        return $this->hasOne(Estado::class,'id_estado','estado_id');
    }

    public function tipoEmpresa()
    {
        return $this->hasOne(TipoEmpresa::class,'id_tipoempresa','tipoempresa_id');
    }

    public function solicitud()
    {
        return $this->belongsToMany(Docente::class,'solicitud_empresas', 'empresa_id', 'docente_id')->wherePivot('estado_id','=',11);
    }

    public function solicitudEmpresa()
    {
        return $this->belongsToMany(Docente::class,'solicitud_empresas', 'empresa_id', 'docente_id');
    }

    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class,'estudiante_id');
    }

    public function inicioActividad(){

        return $this->hasMany(InicioActividadForm::class,'empresa_id');
    }

   
}
