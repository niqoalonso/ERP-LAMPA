<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocenteSubnivel extends Model
{
    use HasFactory;
    protected $table = 'docente_sub_nivel';

    protected $fillable = [
        'docente_id',
        'subnivel_id'
    ];

    public function docente()
    {
        return $this->hasMany(Docente::class,'id_docente', 'docente_id');
    }

}
