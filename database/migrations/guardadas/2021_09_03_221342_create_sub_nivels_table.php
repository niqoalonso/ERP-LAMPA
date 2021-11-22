<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubNivelsTable extends Migration
{

    public function up()
    {
        Schema::create('sub_nivels', function (Blueprint $table) {
            $table->id('id_subnivel');
            $table->string('nombre');
            $table->year('ano_generacion');
            $table->unsignedBigInteger('nivel_id');
            $table->foreign('nivel_id')->references('id_nivel')->on('nivels');
            $table->unsignedBigInteger('estado_id')->nullable()->default(1);
            $table->foreign('estado_id')->references('id_estado')->on('estados');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sub_nivels');
    }
}
