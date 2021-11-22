<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetalleComprobantesTable extends Migration
{

    public function up()
    {
        Schema::create('detalle_comprobantes', function (Blueprint $table) {
            $table->id('id_detallecomprobante');
            $table->unsignedBigInteger('comprobante_id');
            $table->foreign('comprobante_id')->references('id_comprobante')->on('comprobantes');
            $table->integer('n_detalle');
            $table->unsignedBigInteger('plancuenta_id');
            $table->foreign('plancuenta_id')->references('id_plan_cuenta')->on('plan_cuentas');
            $table->unsignedBigInteger('centrocosto_id');
            $table->foreign('centrocosto_id')->references('id_centrocosto')->on('centro_costos');
            $table->string('glosa');
            $table->unsignedBigInteger('unidadnegocio_id');
            $table->foreign('unidadnegocio_id')->references('id_unidadnegocio')->on('unidad_negocios');
            $table->unsignedBigInteger('cliente_id')->nullable();
            $table->foreign('cliente_id')->references('id_cliente')->on('clientes');
            $table->unsignedBigInteger('proveedor_id')->nullable();
            $table->foreign('proveedor_id')->references('id_proveedor')->on('proveedors');
            $table->integer('debe')->nullable();
            $table->integer('haber')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('detalle_comprobantes');
    }
}
