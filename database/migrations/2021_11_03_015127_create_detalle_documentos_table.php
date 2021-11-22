<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetalleDocumentosTable extends Migration
{

    public function up() 
    {
        Schema::create('detalle_documentos', function (Blueprint $table) {
            $table->id('id_detalle');
            $table->integer('sku');
            $table->unsignedBigInteger('producto_id');
            $table->foreign('producto_id')->references('id_prod_proveedor')->on('producto_proveedors');
            $table->unsignedBigInteger('centrocosto_id');
            $table->foreign('centrocosto_id')->references('id_centrocosto')->on('centro_costos');
            $table->integer('cantidad');
            $table->integer('precio');
            $table->integer('descuento_porcentaje')->nullable();
            $table->integer('precio_descuento')->nullable();
            $table->text('descripcion_adicional')->nullable();
            $table->unsignedBigInteger('info_id');
            $table->foreign('info_id')->references('id_info')->on('info_documentos');
            $table->integer('total');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('detalle_documentos');
    }
}
