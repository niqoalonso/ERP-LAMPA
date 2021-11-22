<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Estudiante extends Model
{
    use HasFactory;

    use SoftDeletes;

    protected $primaryKey = 'id_estudiante';

    protected $fillable = ['rut', 'nombres', 'apellidos', 'subnivel_id', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }
    public function subnivel()
    {
        return $this->belongsTo(SubNivel::class,'subnivel_id');
    }

    public function empresa(){

        return $this->hasMany(Empresa::class,'estudiante_id');
    }
}
