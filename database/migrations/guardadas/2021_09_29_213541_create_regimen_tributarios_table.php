<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegimenTributariosTable extends Migration
{

    public function up()
    {
        Schema::create('regimen_tributarios', function (Blueprint $table) {
            $table->id('id_regimen');
            $table->string('nombre');
            $table->timestamps();
        });

        DB::table('regimen_tributarios')->insert(['nombre' => 'TRIBUTACIÓN SIMPLIFICADA 14 TER']);
        DB::table('regimen_tributarios')->insert(['nombre' => 'RENTA PRESUNTA']);
        DB::table('regimen_tributarios')->insert(['nombre' => 'RENTA ATRIBUIDA (Art. 14A)']);
        DB::table('regimen_tributarios')->insert(['nombre' => 'SEMI INTEGRADA (Art. 14B)']);
    }

    public function down()
    {
        Schema::dropIfExists('regimen_tributarios');
    }
}
