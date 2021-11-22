<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CentroCosto extends Model
{
    use HasFactory;

    protected $primaryKey = "id_centrocosto";

    protected $fillable = [
                'nombre,'
    ];
}
