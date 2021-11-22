<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInicioActividadFormsTable extends Migration
{

    public function up()
    {
        Schema::create('inicio_actividad_forms', function (Blueprint $table) {
            $table->id('id_inicio_form');
            $table->boolean('solcitud_rut')->nullable();
            $table->boolean('inicio_actividad')->nullable();
            $table->date('f_inicio_actividad')->nullable();
            $table->string('rol_tributario')->nullable();
            $table->unsignedBigInteger('regimen_id')->nullable();
            $table->foreign('regimen_id')->references('id_regimen')->on('regimen_tributarios');
            $table->string('nombres')->nullable();
            $table->string('apellido_p')->nullable();
            $table->string('apellido_m')->nullable();
            $table->string('razon_social')->nullable();
            $table->string('nombre_fantasia')->nullable();
            $table->string('n_insc_comercio'); //Aleatorio
            $table->date('f_insc_comercio')->nullable();
            $table->string('calle_pasaje')->nullable();
            $table->string('numero_casa')->nullable();
            $table->string('of_depto')->nullable();
            $table->string('bloque')->nullable();
            $table->string('villa_poblacion')->nullable();
            $table->string('rol_propietario')->nullable();
            $table->string('comuna')->nullable();
            $table->string('cuidad')->nullable();
            $table->string('region')->nullable();
            $table->integer('telefono_movil')->nullable();
            $table->integer('telefono_fijo')->nullable();
            $table->unsignedBigInteger('giro_id')->nullable();
            $table->foreign('giro_id')->references('id_giro')->on('giros');
            $table->text('descripcion_act_economica')->nullable();
            $table->integer('enterado')->nullable();
            $table->integer('por_enterar')->nullable();
            $table->integer('total')->nullable();
            $table->date('f_por_enterar')->nullable();
            $table->string('socio_nombre')->nullable();
            $table->string('socio_rut')->nullable();
            $table->integer('socio_enterado')->nullable();
            $table->integer('socio_por_enterar')->nullable();
            $table->date('socio_f_enterar')->nullable();
            $table->integer('socio_porcentaje')->nullable();
            $table->string('representante_rut')->nullable();
            $table->string('representante_nombre')->nullable();
            $table->string('representante_apellido_p')->nullable();
            $table->string('representante_apellido_m')->nullable();
            $table->boolean('credito_fiscal')->nullable();
            $table->string('profe_categoria')->nullable();
            $table->boolean('profe_iva')->nullable();
            $table->boolean('profe_anexo')->nullable();
            $table->string('profe_fecha_firma')->nullable();
            $table->unsignedBigInteger('estado_id')->nullable()->default(4);
            $table->foreign('estado_id')->references('id_estado')->on('estados');
            $table->unsignedBigInteger('empresa_id');
            $table->foreign('empresa_id')->references('id_empresa')->on('empresas');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('inicio_actividad_forms');
    }
}
