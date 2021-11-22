<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductoProveedor extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $primaryKey = 'id_prod_proveedor';

    protected $fillable = ['nombre', 'sku', 'precio_neto', 'iva', 'precio_bruto', 'descripcion', 'proveedor_id'];
}
