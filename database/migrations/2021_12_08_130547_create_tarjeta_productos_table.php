<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTarjetaProductosTable extends Migration
{

    public function up()
    {
        Schema::create('tarjeta_productos', function (Blueprint $table) {
            $table->id('id_tarjeta');
            $table->string('nombre');
            $table->unsignedBigInteger('empresa_id');
            $table->foreign('empresa_id')->references('id_empresa')->on('empresas'); 
            $table->timestamps();
        });
    }
 
    public function down()
    {
        Schema::dropIfExists('tarjeta_existencias');
    }
}
