<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateComunasTable extends Migration
{

    public function up()
    {
        Schema::create('comunas', function (Blueprint $table) {
            $table->bigIncrements('COM_ID');
            $table->string('COM_NOMBRE',50);
            $table->unsignedBigInteger('COM_REGION_ID');
            
            $table->foreign('COM_REGION_ID')->references('REG_ID')->on('regiones');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('comunas');
    }
}
