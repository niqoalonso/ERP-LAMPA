<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductoProveedorsTable extends Migration
{

    public function up()
    {
        Schema::create('producto_proveedors', function (Blueprint $table) {
            $table->id('id_prod_proveedor');
            $table->string('nombre');
            $table->string('sku'); //Aleatoreo
            $table->integer('precio_neto'); //Precio sin iva
            $table->integer('iva');
            $table->integer('precio_bruto'); // Precio con iva
            $table->text('descripcion')->nullable();
            $table->unsignedBigInteger('proveedor_id'); 
            $table->foreign('proveedor_id')->references('id_proveedor')->on('proveedors'); 
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('producto_proveedors');
    }
}
