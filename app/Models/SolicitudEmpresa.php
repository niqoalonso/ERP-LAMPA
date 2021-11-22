<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SolicitudEmpresa extends Model
{
    use HasFactory;
    protected $primaryKey  = "id_solicitud";

    protected $fillable = [
        'docente_id',
        'empresa_id',
        'subnivel_id'
    ];

    public function empresa()
    {
        return $this->belongsTo(Empresa::class,'empresa_id');
    }
}
