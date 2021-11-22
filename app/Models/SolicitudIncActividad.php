<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SolicitudIncActividad extends Model
{
    use HasFactory;

    protected $primaryKey  = "id_solicitud";

    protected $fillable = [
        'docente_id',
        'inicio_form_id',
        'subnivel_id'
    ];

    public function inicioActividad()
    {
        return $this->belongsTo(InicioActividadForm::class,'inicio_form_id');
    }
}
