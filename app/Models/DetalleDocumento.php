<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetalleDocumento extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_detalle';

    protected $fillable = ['producto_id', 'centrocosto_id', 'cantidad', 'precio', 'descuento_porcentaje', 'precio_descuento', 'descripcion_adicional', 'info_id', 'total', 'sku'];

    public function Producto()
    {
        return $this->belongsTo(ProductoProveedor::class, 'producto_id', 'id_prod_proveedor');
    }

    public function CentroCosto()
    {
        return $this->belongsTo(CentroCosto::class, 'centrocosto_id', 'id_centrocosto');
    }
}
