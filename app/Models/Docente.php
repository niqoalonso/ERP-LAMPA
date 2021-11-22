<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Docente extends Model
{
    use HasFactory;

    use SoftDeletes;

    protected $primaryKey  = "id_docente";
 
    protected $fillable = [
        'nombres',
        'apellidos',
        'user_id'
    ];

    public function getRouteKeyName()
    {
        return 'id_docente';
    }

    public function docentenivel()
    {
        return $this->belongsToMany(Subnivel::class,'docente_sub_nivel', 'docente_id', 'subnivel_id',);
    }
    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

}
