<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTipoComprobantesTable extends Migration
{

    public function up()
    {
        Schema::create('tipo_comprobantes', function (Blueprint $table) {
            $table->id('id_tipocomprobante');
            $table->string('nombre');
            $table->timestamps();
        });

        DB::table('tipo_comprobantes')->insert(['nombre' => 'Apertura']);
        DB::table('tipo_comprobantes')->insert(['nombre' => 'Egreso']);
        DB::table('tipo_comprobantes')->insert(['nombre' => 'Ingreso']);
        DB::table('tipo_comprobantes')->insert(['nombre' => 'Traspaso']);
    }

    public function down()
    {
        Schema::dropIfExists('tipo_comprobantes');
    }
}
