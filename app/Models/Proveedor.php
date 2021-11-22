<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_proveedor';

    protected $fillable = ['rut', 'razon_social', 'celular', 'email', 'direccion', 'giro_id'];

    public function Giro()
    {
        return $this->belongsTo(Giro::class, 'giro_id', 'id_giro');
    }

    public function Producto()
    {
        return $this->hasMany(ProductoProveedor::class, 'proveedor_id', 'id_proveedor');
    }
}
