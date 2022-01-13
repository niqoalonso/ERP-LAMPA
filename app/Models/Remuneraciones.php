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
        'total_imponible',
        'total_haberes',
        'total_descuentos',
        'afc_monto',
        'impuesto_unico',
        'alcance_liquido',
        'anticipo',
        'viaticos',
        'otros',
        'porcentaje_hora_extra',
        'uf',
        'utm',
        'gratificacion',
        'participacion',
        'cantidad_horas_extras',
        'horas_extras_monto',
        'dias_trabajados',
        'afp_monto',
        'fonasa_monto',
        'isapre_uf',
        'monto_carga_familiar',
        'asignacion_familiar',
        'fecha',
        'trabajador_id',
        'empresa_id'
    ];

    public function trabajador(){

        return $this->belongsTo(Trabajador::class,'trabajador_id');
    }

    public function bonos(){

        return $this->hasMany(BonosRemuneracion::class,'remuneracion_id', 'id_remuneracion');
    }

}
