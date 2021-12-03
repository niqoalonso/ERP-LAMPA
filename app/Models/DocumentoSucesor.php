<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentoSucesor extends Model
{
    use HasFactory;

    protected $table = 'documento_sucesor';

    protected $primaryKey = "id_sucesor";

    protected $fillable = ['docsucesor_id', 'docactual_id'];
}
 