<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Remuneraciones extends Model
{
    use HasFactory;
    protected $primaryKey = 'id_remuneracion';
    protected $fillable = [
        'monto',
        'sueldo_liquido',
        'sueldo_bruto',
        'cantidad_horas_extras',
        'horas_extras_monto',
        'dias_trabajados',
        'afp_monto',
        'fonasa_monto',
        'monto_carga_familiar',
        'asignacion_familiar',
        'fecha',
        'trabajador_id'
    ];

    public function trabajador(){

        return $this->belongsTo(Trabajador::class,'trabajador_id');
    }
}
