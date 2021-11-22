<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEstudiantesTable extends Migration
{

    public function up()
    {
        Schema::create('estudiantes', function (Blueprint $table) {
            $table->id('id_estudiante'); 
            $table->string('rut');
            $table->string('nombres');
            $table->string('apellidos');
            $table->unsignedBigInteger('subnivel_id'); 
            $table->foreign('subnivel_id')->references('id_subnivel')->on('sub_nivels'); 
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->softDeletes(); 
            $table->timestamps();
        });
    }

 
    public function down()
    {
        Schema::dropIfExists('estudiantes');
    }
}
