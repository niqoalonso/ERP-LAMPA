<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Existencia extends Model
{
    use HasFactory;

    protected $primaryKey = "id_existencia";

    protected $fillable     = [ 'precio', 'cant_entrada', 'cant_salida', 'total_cant', 
                                'total_entrada', 'total_salida', 'total_precio', 
                                'fecha', 'info_id', 'encabezado_id', 
                                'tarjeta_id', 'tipo_operacion', 'tarjeta_id', 'control_stock', 'stock_estado'];
}
