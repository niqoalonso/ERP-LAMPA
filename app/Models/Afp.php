<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Afp extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $primaryKey =  "id_afp";
    protected $fillable = [
        'nombre',
        'tasa_dependiente',
        'sis',
        'tasa_independiente'
    ];
}
