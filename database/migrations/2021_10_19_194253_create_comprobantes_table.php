<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComprobantesTable extends Migration
{

    public function up()
    {
        Schema::create('comprobantes', function (Blueprint $table) {
            $table->id('id_comprobante');
            $table->integer('codigo')->unique();
            $table->date('fecha_comprobante');
            $table->string('glosa');
            $table->integer('deber')->default(0);
            $table->integer('haber')->default(0);
            $table->unsignedBigInteger('tipocomprobante_id')->nullable();
            $table->foreign('tipocomprobante_id')->references('id_tipocomprobante')->on('tipo_comprobantes');
            $table->unsignedBigInteger('unidadnegocio_id')->nullable();
            $table->foreign('unidadnegocio_id')->references('id_unidadnegocio')->on('unidad_negocios');
            $table->unsignedBigInteger('estado_id')->nullable();
            $table->foreign('estado_id')->references('id_estado')->on('estados');
            $table->unsignedBigInteger('empresa_id')->nullable();
            $table->foreign('empresa_id')->references('id_empresa')->on('empresas');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('comprobantes');
    }
}
