<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCentroCostosTable extends Migration
{

    public function up()
    {
        Schema::create('centro_costos', function (Blueprint $table) {
            $table->id('id_centrocosto');
            $table->string('nombre');
            $table->timestamps();
        });

        DB::table('centro_costos')->insert(['nombre' => 'Gerencia General']);
        DB::table('centro_costos')->insert(['nombre' => 'Gerencia de Administración y Finanzas']);
        DB::table('centro_costos')->insert(['nombre' => 'Gerencia Comercial']);
        DB::table('centro_costos')->insert(['nombre' => 'Gerencia de Adquisiciones']);
        DB::table('centro_costos')->insert(['nombre' => 'Centro de Bodega']);
        DB::table('centro_costos')->insert(['nombre' => 'Sala de Ventas']);
    }

    public function down()
    {
        Schema::dropIfExists('centro_costos');
    }
}
