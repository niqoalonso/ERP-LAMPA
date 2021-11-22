<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentoAntecesorsTable extends Migration
{

    public function up()
    {
        Schema::create('documento_antecesors', function (Blueprint $table) {
            $table->id('id_antecesor');
            $table->unsignedBigInteger('docantecesor_id')->nullable(); 
            $table->foreign('docantecesor_id')->references('id_documento')->on('documento_tributarios');
            $table->unsignedBigInteger('docactual_id')->nullable(); 
            $table->foreign('docactual_id')->references('id_documento')->on('documento_tributarios');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('documento_antecesors');
    }
}
