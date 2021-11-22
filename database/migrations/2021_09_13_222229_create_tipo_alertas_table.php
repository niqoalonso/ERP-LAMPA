<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTipoAlertasTable extends Migration
{

    public function up()
    {
        Schema::create('tipo_alertas', function (Blueprint $table) {
            $table->id('id_tipo_alerta');
            $table->string('nombre');
            $table->timestamps();
        });

        DB::table('tipo_alertas')->insert(['nombre' => 'Escritura Simple']);
        DB::table('tipo_alertas')->insert(['nombre' => 'Formulario 4415']);
        DB::table('tipo_alertas')->insert(['nombre' => 'Formulario 29']);
        DB::table('tipo_alertas')->insert(['nombre' => 'Asiento Inicial']);

    }

    public function down()
    {
        Schema::dropIfExists('tipo_alertas');
    }
}
