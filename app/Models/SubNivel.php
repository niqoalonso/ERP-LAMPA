<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SubNivel extends Model
{
    use HasFactory;

    use SoftDeletes;

    protected $primaryKey  = "id_subnivel";

    protected $fillable = [
        'nombre',
        'ano_generacion',
        'nivel_id'
    ];

    public function nivel()
    {
        return $this->belongsTo(Nivel::class, 'nivel_id');
    }

    public function docente()
    {
        return $this->belongsToMany(Docente::class,'docente_sub_nivel', 'subnivel_id', 'docente_id');
    }
}
