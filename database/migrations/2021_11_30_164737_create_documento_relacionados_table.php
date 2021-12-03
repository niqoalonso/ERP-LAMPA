<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentoRelacionadosTable extends Migration
{

    public function up()
    {
        Schema::create('documento_relacionados', function (Blueprint $table) {
            $table->id('id_doc_rela');
            $table->unsignedBigInteger('documento_hijo'); 
            $table->foreign('documento_hijo')->references('id_info')->on('info_documentos');
            $table->unsignedBigInteger('documento_padre'); 
            $table->foreign('documento_padre')->references('id_info')->on('info_documentos');
            $table->unsignedBigInteger('documentotributario_id'); 
            $table->foreign('documentotributario_id')->references('id_documento')->on('documento_tributarios');
            $table->unsignedBigInteger('encabezado_id'); 
            $table->foreign('encabezado_id')->references('id_encabezado')->on('encabezado_documentos');
            $table->timestamps();
        });
    }


    public function down()
    {
        Schema::dropIfExists('documento_relacionados');
    }
}
