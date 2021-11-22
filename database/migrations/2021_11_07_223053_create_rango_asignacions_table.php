<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRangoAsignacionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rango_asignacions', function (Blueprint $table) {
            $table->id('id_rango_asignacion');
            $table->integer('minimo_sueldo');
            $table->integer('maximo_sueldo');
            $table->integer('monto');
            $table->timestamps();
        });

        DB::table('rango_asignacions')->insert(['minimo_sueldo' => 353356,'maximo_sueldo' => 353356,'monto' => 13832]);
        DB::table('rango_asignacions')->insert(['minimo_sueldo' => 353356,'maximo_sueldo' => 516114,'monto' => 8488]);
        DB::table('rango_asignacions')->insert(['minimo_sueldo' => 516114,'maximo_sueldo' => 804962,'monto' => 2683]);
        DB::table('rango_asignacions')->insert(['minimo_sueldo' => 804962,'maximo_sueldo' => 804962,'monto' => 0]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rango_asignacions');
    }
}
