<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanCuentasTable extends Migration
{
 
    public function up()
    {
        Schema::create('plan_cuentas', function (Blueprint $table) {
            $table->id('id_plan_cuenta');
            $table->unsignedBigInteger('manualcuenta_id')->nullable();
            $table->foreign('manualcuenta_id')->references('id_manual_cuenta')->on('manual_cuenta_siis');
            $table->unsignedBigInteger('mimanualcuenta_id')->nullable();
            $table->foreign('mimanualcuenta_id')->references('id_manual_cuenta')->on('mi_manual_cuentas');
            $table->unsignedBigInteger('empresa_id')->nullable();
            $table->foreign('empresa_id')->references('id_empresa')->on('empresas');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('plan_cuentas');
    }
}
