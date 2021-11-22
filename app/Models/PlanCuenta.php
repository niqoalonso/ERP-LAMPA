<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlanCuenta extends Model
{
    use HasFactory;

    protected $primaryKey = "id_plan_cuenta";

    protected $fillable = [
        'empresa_id',
        'manualcuenta_id',
        'mimanualcuenta_id'
    ];
    
    public function ManualCuenta()
    {
        return $this->belongsTo(ManualCuentaSii::class,'manualcuenta_id');
    }

    public function MiManualCuenta()
    {
        return $this->belongsTo(MiManualCuenta::class,'mimanualcuenta_id');
    }
}
