<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGirosTable extends Migration
{

    public function up()
    {
        Schema::create('giros', function (Blueprint $table) {
            $table->id('id_giro');
            $table->integer('codigo');
            $table->string('nombre');
            $table->unsignedBigInteger('iva_id'); 
            $table->foreign('iva_id')->references('id_estado')->on('estados');
            $table->unsignedBigInteger('categoria_id'); 
            $table->foreign('categoria_id')->references('id_estado')->on('estados');
            $table->string('impuesto_adicional')->nullable();  
            $table->timestamps();
        });

        DB::table('giros')->insert(['codigo' => '011101', 'nombre' => 'CULTIVO DE TRIGO', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '011102', 'nombre' => 'CULTIVO DE MAÍZ', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '011103', 'nombre' => 'CULTIVO DE AVENA', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '011104', 'nombre' => 'CULTIVO DE CEBADA', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '011105', 'nombre' => 'CULTIVO DE OTROS CEREALES (EXCEPTO TRIGO, MAÍZ, AVENA Y CEBADA)', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '011106', 'nombre' => 'CULTIVO DE POROTOS', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '011107', 'nombre' => 'CULTIVO DE LUPINO', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '011108', 'nombre' => 'CULTIVO DE OTRAS LEGUMBRES (EXCEPTO POROTOS Y LUPINO)', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '011109', 'nombre' => 'CULTIVO DE SEMILLAS DE RAPS', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '011110', 'nombre' => 'CULTIVO DE SEMILLAS DE MARAVILLA (GIRASOL)', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '011111', 'nombre' => 'CULTIVO DE SEMILLAS DE CEREALES, LEGUMBRES Y OLEAGINOSAS (EXCEPTO SEMILLAS DE RAPS Y MARAVILLA)', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '011200', 'nombre' => 'CULTIVO DE ARROZ', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '011301', 'nombre' => 'CULTIVO DE PAPAS', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '011302', 'nombre' => 'CULTIVO DE CAMOTES', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '011303', 'nombre' => 'CULTIVO DE OTROS TUBÉRCULOS (EXCEPTO PAPAS Y CAMOTES)', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '011304', 'nombre' => 'CULTIVO DE REMOLACHA AZUCARERA', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '011305', 'nombre' => 'CULTIVO DE SEMILLAS DE HORTALIZAS', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '011306', 'nombre' => 'CULTIVO DE HORTALIZAS Y MELONES ', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '011400', 'nombre' => 'CULTIVO DE CAÑA DE AZÚCAR', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '011500', 'nombre' => 'CULTIVO DE TABACO', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '011600', 'nombre' => 'CULTIVO DE PLANTAS DE FIBRA', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '011901', 'nombre' => 'CULTIVO DE FLORES', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '011902', 'nombre' => 'CULTIVOS FORRAJEROS EN PRADERAS MEJORADAS O SEMBRADAS; CULTIVOS SUPLEMENTARIOS FORRAJEROS', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '011903', 'nombre' => 'CULTIVOS DE SEMILLAS DE FLORES; CULTIVO DE SEMILLAS DE PLANTAS FORRAJERAS', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '012111', 'nombre' => 'CULTIVO DE UVA DESTINADA A LA PRODUCCIÓN DE PISCO Y AGUARDIENTE', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '012112', 'nombre' => 'CULTIVO DE UVA DESTINADA A LA PRODUCCIÓN DE VINO', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '012120', 'nombre' => 'CULTIVO DE UVA PARA MESA', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '012200', 'nombre' => 'CULTIVO DE FRUTAS TROPICALES Y SUBTROPICALES (INCLUYE EL CULTIVO DE PALTAS)', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '012300', 'nombre' => 'CULTIVO DE CÍTRICOS', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '012400', 'nombre' => 'CULTIVO DE FRUTAS DE PEPITA Y DE HUESO', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '012501', 'nombre' => 'CULTIVO DE SEMILLAS DE FRUTAS', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '012502', 'nombre' => 'CULTIVO DE OTROS FRUTOS Y NUECES DE ÁRBOLES Y ARBUSTOS', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '012600', 'nombre' => 'CULTIVO DE FRUTOS OLEAGINOSOS (INCLUYE EL CULTIVO DE ACEITUNAS)', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '012700', 'nombre' => 'CULTIVO DE PLANTAS CON LAS QUE SE PREPARAN BEBIDAS (INCLUYE EL CULTIVO DE CAFÉ, TÉ Y MATE)', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '012801', 'nombre' => 'CULTIVO DE ESPECIAS', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '012802', 'nombre' => 'CULTIVO DE PLANTAS AROMÁTICAS, MEDICINALES Y FARMACÉUTICAS', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '012900', 'nombre' => 'CULTIVO DE OTRAS PLANTAS PERENNES', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '013000', 'nombre' => 'CULTIVO DE PLANTAS VIVAS INCLUIDA LA PRODUCCIÓN EN VIVEROS (EXCEPTO VIVEROS FORESTALES)', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '014101', 'nombre' => 'CRÍA DE GANADO BOVINO PARA LA PRODUCCIÓN LECHERA', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '014102', 'nombre' => 'CRÍA DE GANADO BOVINO PARA LA PRODUCCIÓN DE CARNE O COMO GANADO REPRODUCTOR', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '014200', 'nombre' => 'CRÍA DE CABALLOS Y OTROS EQUINOS', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '014300', 'nombre' => 'CRÍA DE LLAMAS, ALPACAS, VICUÑAS, GUANACOS Y OTROS CAMÉLIDOS', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '014410', 'nombre' => 'CRÍA DE OVEJAS (OVINOS)', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '014420', 'nombre' => 'CRÍA DE CABRAS (CAPRINOS)', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '014500', 'nombre' => 'CRÍA DE CERDOS', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '014601', 'nombre' => 'CRÍA DE AVES DE CORRAL PARA LA PRODUCCIÓN DE CARNE', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '014602', 'nombre' => 'CRÍA DE AVES DE CORRAL PARA LA PRODUCCIÓN DE HUEVOS', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '014901', 'nombre' => 'APICULTURA', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '014909', 'nombre' => 'CRÍA DE OTROS ANIMALES N.C.P.', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '015000', 'nombre' => 'CULTIVO DE PRODUCTOS AGRÍCOLAS EN COMBINACIÓN CON LA CRÍA DE ANIMALES (EXPLOTACIÓN MIXTA)', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '016100', 'nombre' => 'ACTIVIDADES DE APOYO A LA AGRICULTURA', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '016200', 'nombre' => 'ACTIVIDADES DE APOYO A LA GANADERÍA', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '016300', 'nombre' => 'ACTIVIDADES POSCOSECHA', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '016400', 'nombre' => 'TRATAMIENTO DE SEMILLAS PARA PROPAGACIÓN', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '017000', 'nombre' => 'CAZA ORDINARIA Y MEDIANTE TRAMPAS Y ACTIVIDADES DE SERVICIOS CONEXAS', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '021001', 'nombre' => 'EXPLOTACIÓN DE VIVEROS FORESTALES', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '021002', 'nombre' => 'SILVICULTURA Y OTRAS ACTIVIDADES FORESTALES (EXCEPTO EXPLOTACIÓN DE VIVEROS FORESTALES)', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '022000', 'nombre' => 'EXTRACCIÓN DE MADERA', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '023000', 'nombre' => 'RECOLECCIÓN DE PRODUCTOS FORESTALES DISTINTOS DE LA MADERA', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '024001', 'nombre' => 'SERVICIOS DE FORESTACIÓN A CAMBIO DE UNA RETRIBUCIÓN O POR CONTRATA', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '024002', 'nombre' => 'SERVICIOS DE CORTA DE MADERA A CAMBIO DE UNA RETRIBUCIÓN O POR CONTRATA', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '024003', 'nombre' => 'SERVICIOS DE EXTINCIÓN Y PREVENCIÓN DE INCENDIOS FORESTALES', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '024009', 'nombre' => 'OTROS SERVICIOS DE APOYO A LA SILVICULTURA N.C.P.', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '031110', 'nombre' => 'PESCA MARÍTIMA INDUSTRIAL, EXCEPTO DE BARCOS FACTORÍA', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '031120', 'nombre' => 'PESCA MARÍTIMA ARTESANAL', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '031130', 'nombre' => 'RECOLECCIÓN Y EXTRACCIÓN DE PRODUCTOS MARINOS', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '031140', 'nombre' => 'SERVICIOS RELACIONADOS CON LA PESCA MARÍTIMA', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '031200', 'nombre' => 'PESCA DE AGUA DULCE', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '032110', 'nombre' => 'CULTIVO Y CRIANZA DE PECES MARINOS', 'iva_id' => 6, 'categoria_id' => 8]);  
        DB::table('giros')->insert(['codigo' => '032120', 'nombre' => 'CULTIVO, REPRODUCCIÓN Y MANEJO DE ALGAS MARINAS', 'iva_id' => 6, 'categoria_id' => 8]);  
        DB::table('giros')->insert(['codigo' => '032130', 'nombre' => 'REPRODUCCIÓN Y CRÍA DE MOLUSCOS, CRUSTÁCEOS Y GUSANOS MARINOS', 'iva_id' => 6, 'categoria_id' => 8]);  
        DB::table('giros')->insert(['codigo' => '032140', 'nombre' => 'SERVICIOS RELACIONADOS CON LA ACUICULTURA MARINA', 'iva_id' => 6, 'categoria_id' => 8]);  
        DB::table('giros')->insert(['codigo' => '032200', 'nombre' => 'ACUICULTURA DE AGUA DULCE', 'iva_id' => 6, 'categoria_id' => 8]);  
        DB::table('giros')->insert(['codigo' => '040000', 'nombre' => 'EXTRACCIÓN Y PROCESAMIENTO DE COBRE', 'iva_id' => 6, 'categoria_id' => 8]);  
        DB::table('giros')->insert(['codigo' => '051000', 'nombre' => 'EXTRACCIÓN DE CARBÓN DE PIEDRA', 'iva_id' => 6, 'categoria_id' => 8]);  
        DB::table('giros')->insert(['codigo' => '052000', 'nombre' => 'EXTRACCIÓN DE LIGNITO', 'iva_id' => 6, 'categoria_id' => 8]);  
        DB::table('giros')->insert(['codigo' => '061000', 'nombre' => 'EXTRACCIÓN DE PETRÓLEO CRUDO', 'iva_id' => 6, 'categoria_id' => 8]);  
        DB::table('giros')->insert(['codigo' => '062000', 'nombre' => 'EXTRACCIÓN DE GAS NATURAL', 'iva_id' => 6, 'categoria_id' => 8]);  
        DB::table('giros')->insert(['codigo' => '071000', 'nombre' => 'EXTRACCIÓN DE MINERALES DE HIERRO', 'iva_id' => 6, 'categoria_id' => 8]);  
        DB::table('giros')->insert(['codigo' => '072100', 'nombre' => 'EXTRACCIÓN DE MINERALES DE URANIO Y TORIO', 'iva_id' => 6, 'categoria_id' => 8]);  
        DB::table('giros')->insert(['codigo' => '072910', 'nombre' => 'EXTRACCIÓN DE ORO Y PLATA', 'iva_id' => 6, 'categoria_id' => 8]);  
        DB::table('giros')->insert(['codigo' => '072991', 'nombre' => 'EXTRACCIÓN DE ZINC Y PLOMO', 'iva_id' => 6, 'categoria_id' => 8]);  
        DB::table('giros')->insert(['codigo' => '072992', 'nombre' => 'EXTRACCIÓN DE MANGANESO', 'iva_id' => 6, 'categoria_id' => 8]);  
        DB::table('giros')->insert(['codigo' => '072999', 'nombre' => 'EXTRACCIÓN DE OTROS MINERALES METALÍFEROS NO FERROSOS N.C.P. (EXCEPTO ZINC, PLOMO Y MANGANESO)', 'iva_id' => 6, 'categoria_id' => 8]);  
        DB::table('giros')->insert(['codigo' => '081000', 'nombre' => 'EXTRACCIÓN DE PIEDRA, ARENA Y ARCILLA', 'iva_id' => 6, 'categoria_id' => 8]);  
        DB::table('giros')->insert(['codigo' => '089110', 'nombre' => 'EXTRACCIÓN Y PROCESAMIENTO DE LITIO', 'iva_id' => 6, 'categoria_id' => 8]);  
        DB::table('giros')->insert(['codigo' => '089190', 'nombre' => 'EXTRACCIÓN DE MINERALES PARA LA FABRICACIÓN DE ABONOS Y PRODUCTOS QUÍMICOS N.C.P.', 'iva_id' => 6, 'categoria_id' => 8]);  
        DB::table('giros')->insert(['codigo' => '089200', 'nombre' => 'EXTRACCIÓN DE TURBA', 'iva_id' => 6, 'categoria_id' => 8]);  
        DB::table('giros')->insert(['codigo' => '089300', 'nombre' => 'EXTRACCIÓN DE SAL', 'iva_id' => 6, 'categoria_id' => 8]);  
        DB::table('giros')->insert(['codigo' => '089900', 'nombre' => 'EXPLOTACIÓN DE OTRAS MINAS Y CANTERAS N.C.P.', 'iva_id' => 6, 'categoria_id' => 8]);  
        DB::table('giros')->insert(['codigo' => '091001', 'nombre' => 'ACTIVIDADES DE APOYO PARA LA EXTRACCIÓN DE PETRÓLEO Y GAS NATURAL PRESTADOS POR EMPRESAS', 'iva_id' => 6, 'categoria_id' => 8]);  
        DB::table('giros')->insert(['codigo' => '091002', 'nombre' => 'ACTIVIDADES DE APOYO PARA LA EXTRACCIÓN DE PETRÓLEO Y GAS NATURAL PRESTADOS POR PROFESIONALES', 'iva_id' => 7, 'categoria_id' => 8]);  
        DB::table('giros')->insert(['codigo' => '099001', 'nombre' => 'ACTIVIDADES DE APOYO PARA LA EXPLOTACIÓN DE OTRAS MINAS Y CANTERAS PRESTADOS POR EMPRESAS', 'iva_id' => 6, 'categoria_id' => 8]);  
        DB::table('giros')->insert(['codigo' => '099002', 'nombre' => 'ACTIVIDADES DE APOYO PARA LA EXPLOTACIÓN DE OTRAS MINAS Y CANTERAS PRESTADOS POR PROFESIONALES', 'iva_id' => 7, 'categoria_id' => 8]);  
        DB::table('giros')->insert(['codigo' => '101011', 'nombre' => 'EXPLOTACIÓN DE MATADEROS DE BOVINOS, OVINOS, EQUINOS, CAPRINOS, PORCINOS Y CAMÉLIDOS ', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '101019', 'nombre' => 'EXPLOTACIÓN DE MATADEROS DE AVES Y DE OTROS TIPOS DE ANIMALES N.C.P.', 'iva_id' => 6, 'categoria_id' => 8]);
        DB::table('giros')->insert(['codigo' => '101020', 'nombre' => 'ELABORACIÓN Y CONSERVACIÓN DE CARNE Y PRODUCTOS CÁRNICOS', 'iva_id' => 6, 'categoria_id' => 8]);
        

    }

    public function down()
    {
        Schema::dropIfExists('giros');
    }
}
