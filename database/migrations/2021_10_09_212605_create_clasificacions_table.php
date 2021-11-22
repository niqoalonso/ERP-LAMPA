<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClasificacionsTable extends Migration
{

    public function up()
    {
        Schema::create('clasificacions', function (Blueprint $table) {
            $table->id('id_clasificacion');
            $table->string('nombre');
            $table->integer('asignacion');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('clasificacions');
    }
}
