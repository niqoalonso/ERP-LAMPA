<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExistenciasTable extends Migration
{

    public function up()
    {
        Schema::create('existencias', function (Blueprint $table) {
            $table->id('id_existencia');
            $table->datetime('fecha');
            $table->unsignedBigInteger('info_id');
            $table->foreign('info_id')->references('id_info')->on('info_documentos');
            $table->unsignedBigInteger('encabezado_id');
            $table->foreign('encabezado_id')->references('id_encabezado')->on('encabezado_documentos');
            $table->unsignedBigInteger('tarjeta_id');
            $table->foreign('tarjeta_id')->references('id_tarjeta')->on('tarjeta_productos');
            $table->boolean('tipo_operacion');
            $table->integer('precio');
            $table->integer('cant_entrada')->nullable();
            $table->integer('cant_salida')->nullable();
            $table->integer('total_cant');
            $table->integer('total_entrada')->nullable();
            $table->integer('total_salida')->nullable();
            $table->integer('total_existencia');
            $table->integer('control_stock');
            $table->boolean('stock_estado')->default(1); //Uno quiere decir que hay stock
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('existencias');
    }
}
