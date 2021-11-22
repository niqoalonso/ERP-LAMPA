<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentoSucesorTable extends Migration
{

    public function up()
    {
        Schema::create('documento_sucesor', function (Blueprint $table) {
            $table->id('id_sucesor');
            $table->unsignedBigInteger('docsucesor_id')->nullable(); 
            $table->foreign('docsucesor_id')->references('id_documento')->on('documento_tributarios');
            $table->unsignedBigInteger('docactual_id')->nullable(); 
            $table->foreign('docactual_id')->references('id_documento')->on('documento_tributarios');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('documento_sucesor');
    }
}
