<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comprobante extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_comprobante';

    protected $fillable = [
                    'codigo',
                    'glosa',
                    'fecha_comprobante',
                    'tipocomprobante_id',
                    'unidadnegocio_id',
                    'empresa_id',
                    'haber',
                    'deber',
    ];

    public function TipoComprobante()
    {
        return $this->belongsTo(TipoComprobante::class,'tipocomprobante_id', 'id_tipocomprobante');
    }

    public function UnidadNegocio()
    {
        return $this->belongsTo(UnidadNegocio::class,'unidadnegocio_id', 'id_unidadnegocio');
    }
}
