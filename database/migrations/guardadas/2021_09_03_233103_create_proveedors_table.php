<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProveedorsTable extends Migration
{

    public function up()
    {
        Schema::create('proveedors', function (Blueprint $table) {
            $table->id('id_proveedor');
            $table->string('rut');
            $table->string('razon_social');
            $table->string('direccion');
            $table->integer('celular');
            $table->string('email');
            $table->unsignedBigInteger('giro_id'); 
            $table->foreign('giro_id')->references('id_giro')->on('giros'); 
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('proveedors');
    }
}
