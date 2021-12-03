<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentoRelacionado extends Model
{
    use HasFactory;

    protected $primaryKey = "id_doc_rela";

    protected $fillable = ['documento_hijo', 'documento_padre', 'documentotributario_id', 'encabezado_id'];
}
