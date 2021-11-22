<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEstadosTable extends Migration
{
    public function up()
    {
        Schema::create('estados', function (Blueprint $table) {
            $table->id('id_estado');
            $table->string('nombre');
            $table->timestamps();
        });

        DB::table('estados')->insert(['nombre' => 'Activo']);
        DB::table('estados')->insert(['nombre' => 'Inactivo']);
        DB::table('estados')->insert(['nombre' => 'Aprobado']);
        DB::table('estados')->insert(['nombre' => 'En Revisión']);
        DB::table('estados')->insert(['nombre' => 'Rechazado']);
        DB::table('estados')->insert(['nombre' => 'SI']);
        DB::table('estados')->insert(['nombre' => 'NO']);
        DB::table('estados')->insert(['nombre' => '1°']);
        DB::table('estados')->insert(['nombre' => '2°']);
        DB::table('estados')->insert(['nombre' => 'Pendiente']);
        DB::table('estados')->insert(['nombre' => 'Finalizado']);
        DB::table('estados')->insert(['nombre' => 'Ingreso']);
        DB::table('estados')->insert(['nombre' => 'Aprobado']);
        DB::table('estados')->insert(['nombre' => 'Emitido']);
        DB::table('estados')->insert(['nombre' => 'No Aprobado']);
        

    }

    public function down()
    {
        Schema::dropIfExists('estados');
    }
}
