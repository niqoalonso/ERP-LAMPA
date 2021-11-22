<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Giro extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_giro';

    protected $fillable = ['codigo', 'nombre', 'categoria_id', 'iva_id', 'impuesto_adicional'];

    public function estadoIva()
    {
        return $this->belongsTo(Estado::class, 'iva_id', 'id_estado');
    }

    public function estadoCategoria()
    {
        return $this->belongsTo(Estado::class, 'categoria_id', 'id_estado');
    }
}
