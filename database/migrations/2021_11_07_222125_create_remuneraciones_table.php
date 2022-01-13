<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRemuneracionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('remuneraciones', function (Blueprint $table) {
            $table->id('id_remuneracion');
            $table->integer('monto');
            $table->integer('sueldo_liquido');
            $table->integer('total_imponible');
            $table->integer('total_haberes');
            $table->integer('total_descuentos');
            $table->integer('afc_monto');
            $table->integer('impuesto_unico');
            $table->integer('alcance_liquido');
            $table->integer('anticipo');
            $table->integer('viaticos');
            $table->integer('otros');
            $table->integer('porcentaje_hora_extra');
            $table->integer('uf');
            $table->integer('utm');
            $table->integer('gratificacion');
            $table->integer('participacion');
            $table->integer('cantidad_horas_extras');
            $table->integer('horas_extras_monto');
            $table->integer('dias_trabajados');
            $table->integer('afp_monto');
            $table->integer('fonasa_monto');
            $table->integer('isapre_uf');
            $table->integer('asignacion_familiar');
            $table->date('fecha');
            $table->unsignedBigInteger('trabajador_id');
            $table->foreign('trabajador_id')->references('id_trabajador')->on('trabajadors');
            $table->integer('estado_pago')->nullable()->default(0);
            $table->unsignedBigInteger('empresa_id')->nullable();
            $table->foreign('empresa_id')->references('id_empresa')->on('empresas');
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
        Schema::dropIfExists('remuneraciones');
    }
}
