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
            $table->integer('afc_monto');
            $table->integer('impuesto_unico');
            $table->integer('alcance_liquido');
            $table->integer('anticipo');
            $table->integer('desgaste_herramientas');
            $table->integer('otros');
            $table->integer('porcentaje_hora_extra');
            $table->integer('uf');
            $table->integer('gratificacion');
            $table->integer('participacion');
            $table->integer('cantidad_horas_extras');
            $table->integer('horas_extras_monto');
            $table->integer('dias_trabajados');
            $table->integer('afp_monto');
            $table->integer('fonasa_monto');
            $table->integer('asignacion_familiar');
            $table->date('fecha');
            $table->unsignedBigInteger('trabajador_id');
            $table->foreign('trabajador_id')->references('id_trabajador')->on('trabajadors');
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
