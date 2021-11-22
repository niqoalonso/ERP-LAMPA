<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EncabezadoDocumento extends Model
{
    use HasFactory;

    protected $primaryKey = "id_encabezado";

    protected $fillable = ['num_encabezado', 'proveedor_id', 'unidadnegocio_id', 'ciclo'];

    public function Proveedor()
    {
        return $this->belongsTo(Proveedor::class, 'proveedor_id', 'id_proveedor');
    }

    public function UnidadNegocio()
    {
        return $this->belongsTo(UnidadNegocio::class, 'unidadnegocio_id', 'id_unidadnegocio');
    }

    public function infoDocumento()
    {
        return $this->hasMany(InfoDocumento::class, 'encabezado_id', 'id_encabezado');
    }
}