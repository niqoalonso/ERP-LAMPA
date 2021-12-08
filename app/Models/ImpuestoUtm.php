<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ImpuestoUtm extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $primaryKey = 'id_impuesto_utm';
    protected $fillable = [
        'desde',
        'hasta',
        'factor',
        'rebaja'
    ];
}
