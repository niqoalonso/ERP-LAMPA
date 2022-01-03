<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TarjetaProducto extends Model
{
    use HasFactory;

    
    protected $primaryKey = "id_tarjeta";


    protected $fillable = ['sku', 'nombre', 'empresa_id'];


    public function Existencia()
    {
        return $this->hasMany(Existencia::class, 'tarjeta_id');
    }
}
