<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCargasTrabajadorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cargas_trabajadors', function (Blueprint $table) {
            $table->id('id_carga');
            $table->string('nombres');
            $table->string('apellidos');
            $table->string('rut');
            $table->string('email');
            $table->string('nacionalidad');
            $table->date('fecha_nacimiento');
            $table->string('tipo_carga');
            $table->unsignedBigInteger('trabajador_id');
            $table->foreign('trabajador_id')->references('id_trabajador')->on('trabajadors');
            $table->unsignedBigInteger('parentezco_id');
            $table->foreign('parentezco_id')->references('id_parentezco')->on('parentezcos');
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
        Schema::dropIfExists('cargas_trabajadors');
    }
}
