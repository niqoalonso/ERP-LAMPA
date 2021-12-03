<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInfoDocumentosTable extends Migration
{
    public function up()
    {
        Schema::create('info_documentos', function (Blueprint $table) {
            $table->id('id_info');
            $table->string('n_documento'); 
            $table->integer('n_interno'); //Creado porque el n_documento se repite y me traer documento erroneo y lo unico que lo difrencia es el tipo de documeto tributario
            $table->date('fecha_emision');
            $table->date('fecha_vencimiento')->nullable();
            $table->string('glosa');
            $table->unsignedBigInteger('empresa_id');
            $table->foreign('empresa_id')->references('id_empresa')->on('empresas');
            $table->unsignedBigInteger('documento_id');
            $table->foreign('documento_id')->references('id_documento')->on('documento_tributarios');
            $table->unsignedBigInteger('estado_id');
            $table->foreign('estado_id')->references('id_estado')->on('estados');
            $table->unsignedBigInteger('encabezado_id');
            $table->foreign('encabezado_id')->references('id_encabezado')->on('encabezado_documentos');
            $table->integer('total_documento')->default(0);
            $table->integer('total_iva')->default(0);
            $table->integer('total_retenciones')->default(0);
            $table->integer('total_afecto')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('info_documentos');
    }
}
