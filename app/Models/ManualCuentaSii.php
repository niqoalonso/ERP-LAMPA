<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManualCuentaSii extends Model
{
    use HasFactory;

    protected $primaryKey = "id_manual_cuenta";

    protected $fillable = [
        'codigo',
        'nombre',
        'descripcion',
        'cargos',
        'abonos',
        'saldo_deudor',
        'saldo_acreedor',
        'clasificacion_id',
        'subclasificacion_id'
    ];

    public function Clasificacion()
    {
        return $this->belongsTo(Clasificacion::class, 'clasificacion_id', 'id_clasificacion');
    }

    public function SubClasificacion()
    {
        return $this->belongsTo(SubClasificacion::class, 'subclasificacion_id', 'id_subclasificacion');
    }
}
