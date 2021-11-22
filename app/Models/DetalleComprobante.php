<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetalleComprobante extends Model
{
    use HasFactory;

    protected $primaryKey = "id_detallecomprobante";

    protected $fillable  = [
                'glosa',
                'comprobante_id',
                'n_detalle',
                'plancuenta_id',
                'centrocosto_id',
                'unidadnegocio_id',
                'cliente_id',
                'proveedor_id',
                'debe',
                'haber'

    ];

    public function Comprobante()
    {
        return $this->belongsTo(Comprobante::class,'comprobante_id', 'id_comprobante');
    }

    public function CentroCosto()
    {
        return $this->belongsTo(CentroCosto::class,'centrocosto_id', 'id_centrocosto');
    }

    public function PlanCuenta()
    {
        return $this->belongsTo(PlanCuenta::class,'plancuenta_id', 'id_plan_cuenta');
    }
}
