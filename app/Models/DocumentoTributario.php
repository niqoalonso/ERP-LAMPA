<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentoTributario extends Model
{
    use HasFactory;

    protected $primaryKey = "id_documento";

    protected $fillable = ['tipo', 'descripcion', 'cod_sii', 'debe_haber', 'tipocomprobante_id', 'f_vencimiento', 'ciclo', 'libro', 'pago', 'iva_honorario', 'afecto_iva', 'documento_id', 'requiere_antecesor','requiere_sucesor', 'incrementa_disminuye'];

    

    public function TipoComprobante()
    {
        return $this->belongsTo(TipoComprobante::class,'tipocomprobante_id');
    }

    public function RelacionSucesor()
    {
        return $this->belongsToMany(DocumentoTributario::class, 'documento_sucesor', 'docactual_id', 'docsucesor_id')->select('id_documento');
    }

    public function RelacionAntecesor()
    {
        return $this->belongsToMany(DocumentoTributario::class, 'documento_antecesors', 'docactual_id', 'docantecesor_id');
    }

    public function InfoDocumento()
    {
        return $this->hasMany(InfoDocumento::class, 'documento_id', 'id_documento');
    }
}
