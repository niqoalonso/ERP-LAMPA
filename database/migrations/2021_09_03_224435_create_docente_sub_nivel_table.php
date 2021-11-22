<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocenteSubNivelTable extends Migration
{

    public function up()
    {
        Schema::create('docente_sub_nivel', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('docente_id'); 
            $table->foreign('docente_id')->references('id_docente')->on('docentes'); 
            $table->unsignedBigInteger('subnivel_id'); 
            $table->foreign('subnivel_id')->references('id_subnivel')->on('sub_nivels'); 
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('docente_sub_nivel');
    }
}
