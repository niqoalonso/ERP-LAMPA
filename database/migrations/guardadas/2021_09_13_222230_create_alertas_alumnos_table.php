<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAlertasAlumnosTable extends Migration
{
    public function up()
    {
        Schema::create('alertas_alumnos', function (Blueprint $table) {
            $table->id('id_alerta');
            $table->string('mensaje');
            $table->unsignedBigInteger('estudiante_id'); 
            $table->foreign('estudiante_id')->references('id_estudiante')->on('estudiantes'); 
            $table->unsignedBigInteger('tipo_alerta_id'); 
            $table->foreign('tipo_alerta_id')->references('id_tipo_alerta')->on('tipo_alertas');
            $table->unsignedBigInteger('empresa_id'); 
            $table->foreign('empresa_id')->references('id_empresa')->on('empresas'); 
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('alertas_alumnos');
    }
}
