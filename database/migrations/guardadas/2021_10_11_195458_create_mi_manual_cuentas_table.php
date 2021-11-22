<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMiManualCuentasTable extends Migration
{
    public function up()
    {
        Schema::create('mi_manual_cuentas', function (Blueprint $table) {
            $table->id('id_manual_cuenta');
            $table->string('codigo')->unique();
            $table->string('codigo1');
            $table->string('codigo2');
            $table->string('codigo3');
            $table->string('codigo4');
            $table->string('nombre');
            $table->text('descripcion');
            $table->unsignedBigInteger('clasificacion_id')->nullable();
            $table->foreign('clasificacion_id')->references('id_clasificacion')->on('clasificacions');
            $table->unsignedBigInteger('subclasificacion_id')->nullable();
            $table->foreign('subclasificacion_id')->references('id_subclasificacion')->on('sub_clasificacions');
            $table->text('cargos')->nullable();
            $table->text('abonos')->nullable();
            $table->text('saldo_deudor')->nullable();
            $table->text('saldo_acreedor')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('mi_manual_cuentas');
    }
}
