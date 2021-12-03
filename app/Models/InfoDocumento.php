<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InfoDocumento extends Model
{
    use HasFactory;

    protected $primaryKey = "id_info";

    protected $fillable = ['n_documento', 'n_interno','fecha_emision', 'fecha_vencimiento',  'glosa', 'documento_id', 'estado_id', 'empresa_id', 'total_afecto',
                            'total_iva', 'total_retenciones', 'total_documento', 'encabezado_id'];
    
    public function Encabezado()
    {
        return $this->belongsTo(EncabezadoDocumento::class, 'encabezado_id', 'id_encabezado');
    }
    
    public function DocumentoTributario()
    {
        return $this->belongsTo(DocumentoTributario::class, 'documento_id', 'id_documento');
    }

    public function detalleDocumento()
    {
        return $this->hasMany(DetalleDocumento::class, 'info_id', 'id_info');
    }
}
