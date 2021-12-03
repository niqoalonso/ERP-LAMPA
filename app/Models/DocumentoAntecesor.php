<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentoAntecesor extends Model
{
    use HasFactory;

    protected $primaryKey = "id_antecesor";

    protected $fillable = ['docantecesor_id', 'docactual_id'];
}
 