<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubClasificacionsTable extends Migration
{

    public function up()
    {
        Schema::create('sub_clasificacions', function (Blueprint $table) {
            $table->id('id_subclasificacion');
            $table->string('nombre');
            $table->integer('asignacion');
            $table->unsignedBigInteger('clasificacion_id')->nullable();
            $table->foreign('clasificacion_id')->references('id_clasificacion')->on('clasificacions');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sub_clasificacions');
    }
}
