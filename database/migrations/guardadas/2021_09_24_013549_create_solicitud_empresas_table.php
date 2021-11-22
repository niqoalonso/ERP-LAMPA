<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSolicitudEmpresasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('solicitud_empresas', function (Blueprint $table) {
            $table->id('id_solicitud');
            $table->unsignedBigInteger('docente_id');
            $table->text('observacion')->nullable();
            $table->foreign('docente_id')->references('id_docente')->on('docentes');
            $table->unsignedBigInteger('empresa_id');
            $table->foreign('empresa_id')->references('id_empresa')->on('empresas');
            $table->unsignedBigInteger('estado_id')->nullable()->default(10);
            $table->foreign('estado_id')->references('id_estado')->on('estados');
            $table->unsignedBigInteger('subnivel_id');
            $table->foreign('subnivel_id')->references('id_subnivel')->on('sub_nivels');
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
        Schema::dropIfExists('solicitud_empresas');
    }
}
