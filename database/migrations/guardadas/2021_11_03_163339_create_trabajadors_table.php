<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrabajadorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trabajadors', function (Blueprint $table) {
            $table->id('id_trabajador');
            $table->string('nombres');
            $table->string('apellidos');
            $table->string('email');
            $table->string('direccional');
            $table->string('estado_civil');
            $table->string('nacionalidad');
            $table->integer('carga_familiar');
            $table->string('salud');
            $table->string('rut');
            $table->string('celular');
            $table->date('fecha_nacimiento');
            $table->string('edad');
            $table->string('fecha_desvinculacion')->nullable();
            $table->string('motivo_desvinculacion')->nullable();
            $table->date('fecha_contrato');
            $table->integer('sueldo_base');
            $table->integer('colacion');
            $table->integer('movilidad');
            $table->string('url_pdf');
            $table->unsignedBigInteger('afp_id');
            $table->foreign('afp_id')->references('id_afp')->on('afps');
            $table->unsignedBigInteger('comuna_id');
            $table->foreign('comuna_id')->references('COM_ID')->on('comunas');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('trabajadors');
    }
}
