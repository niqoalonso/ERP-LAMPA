<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEncabezadoDocumentosTable extends Migration
{

    public function up()
    {
        Schema::create('encabezado_documentos', function (Blueprint $table) {
            $table->id('id_encabezado');
            $table->integer('num_encabezado');
            $table->unsignedBigInteger('proveedor_id');
            $table->foreign('proveedor_id')->references('id_proveedor')->on('proveedors');
            $table->unsignedBigInteger('unidadnegocio_id');
            $table->foreign('unidadnegocio_id')->references('id_unidadnegocio')->on('unidad_negocios');
            $table->boolean('ciclo');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('encabezado_documentos');
    }
}
