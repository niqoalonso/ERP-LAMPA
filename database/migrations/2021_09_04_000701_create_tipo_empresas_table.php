<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTipoEmpresasTable extends Migration
{

    public function up()
    {
        Schema::create('tipo_empresas', function (Blueprint $table) {
            $table->id('id_tipoempresa');
            $table->string('nombre');
            $table->timestamps();
        });

        DB::table('tipo_empresas')->insert(['nombre' => 'Natural']);
        DB::table('tipo_empresas')->insert(['nombre' => 'Juridica']);
    }

    public function down()
    {
        Schema::dropIfExists('tipo_empresas');
    }
}
