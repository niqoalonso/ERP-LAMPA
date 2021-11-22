<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSolicitudIncActividadsTable extends Migration
{

    public function up()
    {
        Schema::create('solicitud_inc_actividads', function (Blueprint $table) {
            $table->id('id_solicitud');
            $table->unsignedBigInteger('docente_id');
            $table->text('observacion')->nullable();
            $table->foreign('docente_id')->references('id_docente')->on('docentes');
            $table->unsignedBigInteger('inicio_form_id');
            $table->foreign('inicio_form_id')->references('id_inicio_form')->on('inicio_actividad_forms');
            $table->unsignedBigInteger('estado_id')->nullable()->default(10);
            $table->foreign('estado_id')->references('id_estado')->on('estados');
            $table->unsignedBigInteger('subnivel_id');
            $table->foreign('subnivel_id')->references('id_subnivel')->on('sub_nivels');
            $table->timestamps();
        });
    }


    public function down()
    {
        Schema::dropIfExists('solicitud_inc_actividads');
    }
}
