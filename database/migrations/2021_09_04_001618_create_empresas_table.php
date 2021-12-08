<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmpresasTable extends Migration
{

    public function up()
    {
        //Razon Social
        //Natural: Nicolas Antonio Alonso Olate - RUT propio 11.567.567-5
        //Juridica E.I.R.L : Nicolas Anotonio Alonso Olate E.I.R.L = RUT nuevo 77.567.346-3 (76 - 77 - 92 - 96)

        Schema::create('empresas', function (Blueprint $table) {
            $table->id('id_empresa');
            $table->string('rut_empresa')->nullable(); //Natural: usar Rut persona - Juridica: solicitar RUT a SII "4415",
            $table->string('rut_representante')->nullable(); //RUT del carnet
            $table->string('razon_social')->nullable();
            $table->string('nombre_fantasia')->nullable(); //Utilizar en publicidad
            $table->string('celular')->nullable();
            $table->string('direccion');
            $table->string('correo')->nullable();
            $table->integer('capital_inicial')->nullable(); // minimo $500.000
            $table->unsignedBigInteger('tipoempresa_id');
            $table->foreign('tipoempresa_id')->references('id_tipoempresa')->on('tipo_empresas');
            $table->unsignedBigInteger('estado_id')->nullable()->default(4);
            $table->foreign('estado_id')->references('id_estado')->on('estados');
            $table->unsignedBigInteger('estudiante_id');
            $table->foreign('estudiante_id')->references('id_estudiante')->on('estudiantes');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('empresas');
    }
}
