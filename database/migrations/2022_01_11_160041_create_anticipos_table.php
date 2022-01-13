<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnticiposTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('anticipos', function (Blueprint $table) {
            $table->id('id_anticipo');
            $table->integer('monto');
            $table->unsignedBigInteger('trabajador_id');
            $table->foreign('trabajador_id')->references('id_trabajador')->on('trabajadors');
            $table->unsignedBigInteger('plancuenta_id');
            $table->foreign('plancuenta_id')->references('id_plan_cuenta')->on('plan_cuentas');
            $table->unsignedBigInteger('empresa_id')->nullable();
            $table->foreign('empresa_id')->references('id_empresa')->on('empresas');
            $table->integer('estado_pago')->nullable()->default(0);
            $table->date('fecha');
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
        Schema::dropIfExists('anticipos');
    }
}
