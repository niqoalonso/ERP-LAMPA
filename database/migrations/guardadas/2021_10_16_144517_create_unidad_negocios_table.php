<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnidadNegociosTable extends Migration
{

    public function up()
    {
        Schema::create('unidad_negocios', function (Blueprint $table) {
            $table->id('id_unidadnegocio');
            $table->integer('codigo');
            $table->string('nombre');
            $table->unsignedBigInteger('empresa_id')->nullable();
            $table->foreign('empresa_id')->references('id_empresa')->on('empresas');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('unidad_negocios');
    }
}
