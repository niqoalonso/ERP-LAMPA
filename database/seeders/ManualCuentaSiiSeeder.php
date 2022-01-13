<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ManualCuentaSii;

class ManualCuentaSiiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ManualCuentaSii::create(['codigo'               => '1.1.10.1',
                                 'nombre'               =>  'Caja',
                                 'descripcion'          => 'Fondos en caja tanto en moneda nacional como extranjera de disponibilidad inmediata.',
                                 'clasificacion_id'     =>  1,
                                 'subclasificacion_id'  =>  1,
                                 'cargos'               =>  'Aporte de los dueños, por recaudación de las ventas, devoluciones de impuesto en efectivo',
                                 'abonos'               =>  'Por pago de deudas (obligaciones con terceros), pago de proveedores, pago de arriendos, pago de sueldos, por pago de impuestos, etc.',
                                 'saldo_deudor'         =>  'Disponible en caja o saldada',
                                 'saldo_acreedor'       =>  'No Tiene.']);

        ManualCuentaSii::create(['codigo'               => '1.1.20.1',
                                 'nombre'               =>  'Banco',
                                 'descripcion'          => 'Representa los valores disponibles en la cuenta corriente que la empresa mantiene en el banco. ',
                                 'clasificacion_id'     =>  1,
                                 'subclasificacion_id'  =>  1,
                                 'cargos'               =>  'Cuando se efectúan depósitos, traslados de fondos, nota de créditos del Banco, recaudación de cobranza y cualquier otro documento que incremente los ingresos.',
                                 'abonos'               =>  'Emisión de giros, cheques,  notas de débitos del Banco, cargos bancarios efectuados por el banco como comisiones, impuestos  y cualquier otra forma de pago que signifique un egreso de dicha cuenta',
                                 'saldo_deudor'         =>  'Representa dinero disponible  en la cuenta corriente.',
                                 'saldo_acreedor'       =>  'No Tiene.']);

        ManualCuentaSii::create(['codigo'               => '1.1.30.1',
                                 'nombre'               =>  'Insumos',
                                 'descripcion'          => 'En este  rubro se incorpora los  bienes consumibles que son utilizados en el proceso productivo de otro bien, es término equivalente materia prima, recursos productivos factores de producción. Pierden sus propiedades y características para transformarse y formar parte del producto final.',
                                 'clasificacion_id'     =>  1,
                                 'subclasificacion_id'  =>  1,
                                 'cargos'               =>  'Se carga por compras, notas de débito, devoluciones de ventas etc.',
                                 'abonos'               =>  'Se abona por consumos de insumos requisiciones.',
                                 'saldo_deudor'         =>  'Representa  las existencias de insumos en bodega a la fecha del informe respectivo.',
                                 'saldo_acreedor'       =>  'No Tiene.']);

        ManualCuentaSii::create(['codigo'               =>  '1.1.40.1',
                                 'nombre'               =>  'Productos en Proceso',
                                 'descripcion'          =>  'En este    rubro deberá incluirse bienes y servicios producidos (o pendientes de terminación) que son utilizados como imputs en algún proceso productivo posterior, para poder concluir su etapa de elaboración, es decir, artículos que se intercambian entre las unidades de producción.',
                                 'clasificacion_id'     =>  1,
                                 'subclasificacion_id'  =>  1,
                                 'cargos'               =>  'Se carga por la producción de estos productos.',
                                 'abonos'               =>  'Se abona por consumo de los productos en proceso.',
                                 'saldo_deudor'         =>  'Representa    las existencias de productos en proceso en bodega a la fecha del informe respectivo.',
                                 'saldo_acreedor'       =>  'No Tiene.']);

        ManualCuentaSii::create(['codigo'               =>  '1.1.50.1',
                                 'nombre'               =>  'Mercaderías',
                                 'descripcion'          =>  'En este  rubro se incluye los productos fabricados por la empresa y destinadas a al consumo final o a su utilización por otras empresas, así mismo en esta cuenta se incluye mercaderías adquiridas por la empresa y destinadas a la venta sin transformación.',
                                 'clasificacion_id'     =>  1,
                                 'subclasificacion_id'  =>  1,
                                 'cargos'               =>  'Se carga por compras, notas de débito, devoluciones de ventas etc.',
                                 'abonos'               =>  'Se abona por las ventas a precio de costo, notas de créditos y devoluciones por compras.',
                                 'saldo_deudor'         =>  'Representa    las existencias de mercaderías en bodega a la fecha del informe respectivo.',
                                 'saldo_acreedor'       =>  'No Tiene.']);

        ManualCuentaSii::create(['codigo'               =>  '1.1.60.1',
                                 'nombre'               =>  'Depósito a Plazo',
                                 'descripcion'          =>  'Representa fondos depositados en bancos e instituciones financieras , no sujetos a restricciones de ningún tipo',
                                 'clasificacion_id'     =>  1,
                                 'subclasificacion_id'  =>  1,
                                 'cargos'               =>  'Se carga por los depósitos efectuados.',
                                 'abonos'               =>  'Se abona por los retiros parciales o totales de los depósitos.',
                                 'saldo_deudor'         =>  'Representa valor depósitos por recuperar.',
                                 'saldo_acreedor'       =>  'No Tiene.']);

        ManualCuentaSii::create(['codigo'               =>  '1.1.70.1',
                                 'nombre'               =>  'Valores Negociables',
                                 'descripcion'          =>  'En este rubro se incluyen inversiones en acciones , títulos de deuda, cuotas de fondos mutuos u otros títulos de oferta pública que representen la inversión de fondos disponibles para las operaciones corrientes de la empresa.',
                                 'clasificacion_id'     =>  1,
                                 'subclasificacion_id'  =>  1,
                                 'cargos'               =>  'Se carga por inversiones efectuadas.',
                                 'abonos'               =>  'Se abona con  la liquidación o renovación de las inversiones.',
                                 'saldo_deudor'         =>  'Representa inversiones realizadas a la fecha del informe.',
                                 'saldo_acreedor'       =>  'No Tiene.']);

        ManualCuentaSii::create(['codigo'               =>  '1.1.80.1',
                                 'nombre'               =>  'Deudores por Ventas',
                                 'descripcion'          =>  'Cuentas por cobrar provenientes de las operaciones comerciales de la empresa.',
                                 'clasificacion_id'     =>  1,
                                 'subclasificacion_id'  =>  1,
                                 'cargos'               =>  'Se carga por las deudas que han emitido y aceptado a la empresa y/o aquellas personas (clientes) que han aceptado la deuda al crédito simple.',
                                 'abonos'               =>  'Se abona por aquellas deudas que se han cancelado o enviado y/o cuando el cliente paga total o parcialmente la cuenta, devuelve la mercancía o se le concede alguna rebaja.',
                                 'saldo_deudor'         =>  'Representa las deudas aceptadas por terceros  para ser cancelados en un tiempo estipulado y/o al momento de emitirse una factura a favor del cliente cobrándole el producto o servicio.',
                                 'saldo_acreedor'       =>  'No Tiene.']);

        ManualCuentaSii::create(['codigo'               =>  '1.1.90.1',
                                 'nombre'               =>  'Documentos por cobrar',
                                 'descripcion'          =>  'Cuentas por cobrar documentas a través de letras, pagarés, cheques, facturas u otros documentos, provenientes de operaciones comerciales de la empresa .',
                                 'clasificacion_id'     =>  1,
                                 'subclasificacion_id'  =>  1,
                                 'cargos'               =>  'Se carga por los documentos que han emitido y aceptado a la empresa y/o aquellas personas (clientes) que han aceptado la deuda al crédito simple..',
                                 'abonos'               =>  'Se abona por aquellos documentos que se han cancelado o enviado y/o cuando el cliente paga total o parcialmente la cuenta, devuelve la mercancía o se le concede alguna rebaja.',
                                 'saldo_deudor'         =>  'Representa los documentos que terceros firman para ser cancelados en un tiempo estipulado y/o al momento de emitirse una factura a favor del cliente cobrándole el producto o servicio.',
                                 'saldo_acreedor'       =>  'No Tiene.']);

        ManualCuentaSii::create(['codigo'               =>  '1.1.100.1',
                                 'nombre'               =>  'Documentos por cobrar de Terceros',
                                 'descripcion'          =>  'Corresponde a cuentas por cobrar que han sido documentadas y que sirve de garantía  por  ventas de mercaderías en consignación.',
                                 'clasificacion_id'     =>  1,
                                 'subclasificacion_id'  =>  1,
                                 'cargos'               =>  null,
                                 'abonos'               =>  null,
                                 'saldo_deudor'         =>  null,
                                 'saldo_acreedor'       =>  'No Tiene.']);

        ManualCuentaSii::create(['codigo'               =>  '1.1.110.1',
                                 'nombre'               =>  'Documentos y Cuentas  por cobrar a Empresas Relacionadas',
                                 'descripcion'          =>  'Documentos y Cuentas por cobrar a Empresas Relacionadas, descontando los intereses no devengados que provengan o no de operaciones comerciales y cuyo plazo de recuperación no excede a un año a contar de la fecha de los estados financieros.',
                                 'clasificacion_id'     =>  1,
                                 'subclasificacion_id'  =>  1,
                                 'cargos'               =>  'Se carga por los documentos que han emitido y aceptado a la empresa o bien han aceptado la deuda al crédito simple.',
                                 'abonos'               =>  'Se abona por aquellos documentos que se han cancelado o enviado y/o cuando la empresa paga total o parcialmente la cuenta, devuelve la mercancía o se le concede alguna rebaja.',
                                 'saldo_deudor'         =>  'Representa los documentos que las empresas relacionadas firman para ser cancelados en un tiempo estipulado y/o al momento de emitirse una factura a favor de la empresa cobrándole el producto o servicio.',
                                 'saldo_acreedor'       =>  'No Tiene.']);

        ManualCuentaSii::create(['codigo'               =>  '1.1.120.1',
                                 'nombre'               =>  'Documentos y Cuentas  por cobrar a Empresas No  Relacionadas',
                                 'descripcion'          =>  'Documentos y Cuentas por cobrar a Empresas No Relacionadas, descontando los intereses no devengados que provengan o no de operaciones comerciales y cuyo plazo de recuperación no excede a un año a contar de la fecha de los estados financieros.',
                                 'clasificacion_id'     =>  1,
                                 'subclasificacion_id'  =>  1,
                                 'cargos'               =>  'Se carga por los documentos que han emitido y aceptado a la empresa o bien han aceptado la deuda al crédito simple.',
                                 'abonos'               =>  'Se abona por aquellos documentos que se han cancelado o enviado y/o cuando la empresa paga total o parcialmente la cuenta, devuelve la mercancía o se le concede alguna rebaja.',
                                 'saldo_deudor'         =>  'Representa los documentos que las Empresas No Relacionadas firman para ser cancelados en un tiempo estipulado y/o al momento de emitirse una factura a favor de la empresa cobrándole el producto o servicio.',
                                 'saldo_acreedor'       =>  'No Tiene.']);

        ManualCuentaSii::create(['codigo'               =>  '1.1.110.2',
                                 'nombre'               =>  'Remuneraciones',
                                 'descripcion'          =>  'Remuneraciones.',
                                 'clasificacion_id'     =>  1,
                                 'subclasificacion_id'  =>  1,
                                 'cargos'               =>  'Se carga por los documentos que han emitido y aceptado a la empresa o bien han aceptado la deuda al crédito simple.',
                                 'abonos'               =>  'Se abona por aquellos documentos que se han cancelado o enviado y/o cuando la empresa paga total o parcialmente la cuenta, devuelve la mercancía o se le concede alguna rebaja.',
                                 'saldo_deudor'         =>  'Representa los documentos que las empresas relacionadas firman para ser cancelados en un tiempo estipulado y/o al momento de emitirse una factura a favor de la empresa cobrándole el producto o servicio.',
                                 'saldo_acreedor'       =>  'No Tiene.']);

        ManualCuentaSii::create(['codigo'               =>  '1.1.110.3',
                                 'nombre'               =>  'Asig FAM',
                                 'descripcion'          =>  'Asig FAM.',
                                 'clasificacion_id'     =>  1,
                                 'subclasificacion_id'  =>  1,
                                 'cargos'               =>  'Se carga por los documentos que han emitido y aceptado a la empresa o bien han aceptado la deuda al crédito simple.',
                                 'abonos'               =>  'Se abona por aquellos documentos que se han cancelado o enviado y/o cuando la empresa paga total o parcialmente la cuenta, devuelve la mercancía o se le concede alguna rebaja.',
                                 'saldo_deudor'         =>  'Representa los documentos que las empresas relacionadas firman para ser cancelados en un tiempo estipulado y/o al momento de emitirse una factura a favor de la empresa cobrándole el producto o servicio.',
                                 'saldo_acreedor'       =>  'No Tiene.']);

        ManualCuentaSii::create(['codigo'               =>  '1.1.110.4',
                                 'nombre'               =>  'Leyes Sociales',
                                 'descripcion'          =>  'Leyes Sociales.',
                                 'clasificacion_id'     =>  1,
                                 'subclasificacion_id'  =>  1,
                                 'cargos'               =>  'Se carga por los documentos que han emitido y aceptado a la empresa o bien han aceptado la deuda al crédito simple.',
                                 'abonos'               =>  'Se abona por aquellos documentos que se han cancelado o enviado y/o cuando la empresa paga total o parcialmente la cuenta, devuelve la mercancía o se le concede alguna rebaja.',
                                 'saldo_deudor'         =>  'Representa los documentos que las empresas relacionadas firman para ser cancelados en un tiempo estipulado y/o al momento de emitirse una factura a favor de la empresa cobrándole el producto o servicio.',
                                 'saldo_acreedor'       =>  'No Tiene.']);

        ManualCuentaSii::create(['codigo'               =>  '1.1.110.5',
                                 'nombre'               =>  'Intitucion PREV.',
                                 'descripcion'          =>  'Intitucion PREV..',
                                 'clasificacion_id'     =>  1,
                                 'subclasificacion_id'  =>  1,
                                 'cargos'               =>  'Se carga por los documentos que han emitido y aceptado a la empresa o bien han aceptado la deuda al crédito simple.',
                                 'abonos'               =>  'Se abona por aquellos documentos que se han cancelado o enviado y/o cuando la empresa paga total o parcialmente la cuenta, devuelve la mercancía o se le concede alguna rebaja.',
                                 'saldo_deudor'         =>  'Representa los documentos que las empresas relacionadas firman para ser cancelados en un tiempo estipulado y/o al momento de emitirse una factura a favor de la empresa cobrándole el producto o servicio.',
                                 'saldo_acreedor'       =>  'No Tiene.']);

        ManualCuentaSii::create(['codigo'               =>  '1.1.110.6',
                                 'nombre'               =>  'Impuesto Unico',
                                 'descripcion'          =>  'Impuesto Unico.',
                                 'clasificacion_id'     =>  1,
                                 'subclasificacion_id'  =>  1,
                                 'cargos'               =>  'Se carga por los documentos que han emitido y aceptado a la empresa o bien han aceptado la deuda al crédito simple.',
                                 'abonos'               =>  'Se abona por aquellos documentos que se han cancelado o enviado y/o cuando la empresa paga total o parcialmente la cuenta, devuelve la mercancía o se le concede alguna rebaja.',
                                 'saldo_deudor'         =>  'Representa los documentos que las empresas relacionadas firman para ser cancelados en un tiempo estipulado y/o al momento de emitirse una factura a favor de la empresa cobrándole el producto o servicio.',
                                 'saldo_acreedor'       =>  'No Tiene.']);

        ManualCuentaSii::create(['codigo'               =>  '1.1.110.7',
                                 'nombre'               =>  'Anticipo',
                                 'descripcion'          =>  'Anticipo.',
                                 'clasificacion_id'     =>  1,
                                 'subclasificacion_id'  =>  1,
                                 'cargos'               =>  'Se carga por los documentos que han emitido y aceptado a la empresa o bien han aceptado la deuda al crédito simple.',
                                 'abonos'               =>  'Se abona por aquellos documentos que se han cancelado o enviado y/o cuando la empresa paga total o parcialmente la cuenta, devuelve la mercancía o se le concede alguna rebaja.',
                                 'saldo_deudor'         =>  'Representa los documentos que las empresas relacionadas firman para ser cancelados en un tiempo estipulado y/o al momento de emitirse una factura a favor de la empresa cobrándole el producto o servicio.',
                                 'saldo_acreedor'       =>  'No Tiene.']);

        ManualCuentaSii::create(['codigo'               =>  '1.1.110.8',
                                 'nombre'               =>  'Remuneraciones por pagar',
                                 'descripcion'          =>  'Remuneraciones por pagar.',
                                 'clasificacion_id'     =>  1,
                                 'subclasificacion_id'  =>  1,
                                 'cargos'               =>  'Se carga por los documentos que han emitido y aceptado a la empresa o bien han aceptado la deuda al crédito simple.',
                                 'abonos'               =>  'Se abona por aquellos documentos que se han cancelado o enviado y/o cuando la empresa paga total o parcialmente la cuenta, devuelve la mercancía o se le concede alguna rebaja.',
                                 'saldo_deudor'         =>  'Representa los documentos que las empresas relacionadas firman para ser cancelados en un tiempo estipulado y/o al momento de emitirse una factura a favor de la empresa cobrándole el producto o servicio.',
                                 'saldo_acreedor'       =>  'No Tiene.']);
    }
}
