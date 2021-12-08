<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMontoAsignacionFamiliarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('monto_asignacion_familiars', function (Blueprint $table) {
            $table->id('id_monto_asignacion');
            $table->integer('monto');
            $table->integer('renta_minima');
            $table->integer('renta_maxima');
            $table->softDeletes();
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
        Schema::dropIfExists('monto_asignacion_familiars');
    }
}
