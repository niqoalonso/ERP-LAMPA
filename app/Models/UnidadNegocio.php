<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UnidadNegocio extends Model
{
    use HasFactory;

    protected $primaryKey = "id_unidadnegocio";

    protected $fillable = ['codigo', 'nombre', 'empresa_id'];

    public function Empresa()
    {
        return $this->belongsTo(Empresa::class,'empresa_id', 'id_empresa');
    }
}
