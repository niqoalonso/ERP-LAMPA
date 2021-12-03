<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBonosRemuneracionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bonos_remuneracions', function (Blueprint $table) {
            $table->id('id_bono');
            $table->string('glosa');
            $table->integer('monto');
            $table->unsignedBigInteger('remuneracion_id');
            $table->foreign('remuneracion_id')->references('id_remuneracion')->on('remuneraciones');
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
        Schema::dropIfExists('bonos_remuneracions');
    }
}
