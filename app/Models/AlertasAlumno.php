<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AlertasAlumno extends Model
{
    use HasFactory;
    protected $primaryKey  = "id_alerta";

    protected $fillable = [
        'mensaje',
        'estudiante_id',
        'tipo_alerta_id',
        'empresa_id'
    ];
}
