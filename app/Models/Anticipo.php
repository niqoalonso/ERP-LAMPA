<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Anticipo extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_anticipo';
    protected $fillable = [
        'monto',
        'trabajador_id',
        'plancuenta_id',
        'empresa_id',
        'fecha'
    ];

    public function trabajador()
    {
        return $this->hasOne(Trabajador::class,'id_trabajador', 'trabajador_id');
    }

    public function plancuenta()
    {
        return $this->hasOne(PlanCuenta::class,'id_plan_cuenta', 'plancuenta_id');
    }
}
