<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentoTributariosTable extends Migration
{

    public function up()
    {
        Schema::create('documento_tributarios', function (Blueprint $table) {
            $table->id('id_documento');
            $table->string('tipo');
            $table->string('descripcion');
            $table->integer('cod_sii');
            $table->boolean('debe_haber');
            $table->boolean('f_vencimiento');
            $table->boolean('requiere_antecesor'); //Depende de alguna documento aterior
            $table->boolean('requiere_sucesor'); //Documentos que puedo generar a partir de este.
            $table->unsignedBigInteger('tipocomprobante_id')->nullable();
            $table->foreign('tipocomprobante_id')->references('id_tipocomprobante')->on('tipo_comprobantes');
            $table->boolean('ciclo');
            $table->boolean('libro');
            $table->boolean('pago');
            $table->boolean('mueve_existencia');
            $table->boolean('iva_honorario');
            $table->boolean('incrementa_disminuye');
            $table->boolean('anulacion');
            $table->boolean('doc_anulacion');
            $table->unsignedBigInteger('documento_id')->nullable();
            $table->foreign('documento_id')->references('id_documento')->on('documento_tributarios');
            $table->timestamps();
        });

    }

    public function down()
    {
        Schema::dropIfExists('documento_tributarios');
    }
}
