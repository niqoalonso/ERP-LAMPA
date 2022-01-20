<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompraController;
use App\Http\Controllers\EncabezadoDocumentoController;
use App\Http\Controllers\ComprobanteController;
use App\Http\Controllers\DetalleDocumentoController;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\InicioActividadFormController;
use App\Http\Controllers\RegimenTributarioController;
use App\Http\Controllers\TipoEmpresaController;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\GiroController;
use App\Http\Controllers\ManualCuentaSiiController;
use App\Http\Controllers\MiManualCuentaController;
use App\Http\Controllers\PlanCuentaController;
use App\Http\Controllers\NivelController;
use App\Http\Controllers\SubNivelController;
use App\Http\Controllers\AfpController;
use App\Http\Controllers\AnticipoController;
use App\Http\Controllers\ProveedorController;
use App\Http\Controllers\ProductoProveedorController;
use App\Http\Controllers\RemuneracionesController;
use App\Http\Controllers\DocumentoTributarioController;
use App\Http\Controllers\TrabajadorController;
use App\Http\Controllers\UnidadNegocioController;
use App\Http\Controllers\DetalleComprobanteController;
use App\Http\Controllers\ImpuestoUtmController;
use App\Http\Controllers\MontoAsignacionFamiliarController;
use App\Http\Controllers\TesoreriaController;
use App\Http\Controllers\ExistenciaController;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Login
Route::post('login',[AuthController::class,'login'])->name('login');
Route::get('/getDocumento/{idInfo}', [CompraController::class, 'getDocumento']);

Route::middleware('auth:sanctum')->group(function () {

    //Abastecimiento - compras
    Route::get('getInicialEmitir/{tipo}/{empresa}', [CompraController::class, 'getInicial']);
    Route::get('verificarDocumentoFormulario/{tipo}/{empresa}', [CompraController::class, 'verificarDocumentoFormulario']);
    Route::get('getInicialDetalle/{ndocumento}', [CompraController::class, 'getInicialDetalle']);
    Route::get('/getDocumentoModificar/{empresa}', [CompraController::class, 'getDocumentoModificar']);
    Route::get('getDocumentoAprobar/{empresa}', [CompraController::class, 'getDocumentoAprobar']);
    Route::get('aprobarDocumento/{id}', [CompraController::class, 'aprobarDocumento']);
    Route::get('getDocumentoEmitir/{empresa}', [CompraController::class, 'getDocumentoEmitir']);
    Route::get('MueveExistenciaComprobar/{id}', [CompraController::class, 'MueveExistenciaComprobar']);
    Route::get('emitirDocumento/{id}', [CompraController::class, 'emitirDocumento']);
    Route::get('getDocumentoEmitido/{empresa}', [CompraController::class, 'getDocumentosEmitidos']);
    Route::post('encabezadoSave', [EncabezadoDocumentoController::class, 'storeEncabezado']);
    Route::get('getCodigoDocumento/{documento}/{empresa}', [CompraController::class, 'getCodigoDocumento']);
    Route::get('generarInfoDocumentoRelacionado/{documento}/{tipo}', [CompraController::class, 'generarInfoDocumentoRelacionado']);
    Route::post('generarDocumentoPosterior', [CompraController::class, 'generarDocumentoPosterior']);
    Route::get('/VerificarDocumentoRelacionadoExistente/{idDocumento}/{TipoDocumento}', [CompraController::class, 'VerificarDocumentoRelacionadoExistente']);
    Route::post('updateFechaEmision', [CompraController::class, 'updateFechaEmision']);

    //ExistenciaEmitir
    Route::get('getDetalleExistencia/{documento}/{empresa}', [ExistenciaController::class, 'getDetalleExistencia']);
    Route::post('emitirDocumentoWithExistencia', [ExistenciaController::class, 'emitirDocumentoWithExistencia']);


    //DetalleDocumento
    Route::post('guardarDetalle',[DetalleDocumentoController::class,'store']);

    //Comprobantes
    Route::get('getInicialAsiento/{id}',[ComprobanteController::class,'getInicial']);
    Route::get('getComprobantes/{id}', [ComprobanteController::class , 'getComprobantes']);
    Route::post('storeAsiento', [ComprobanteController::class, 'store']);

    //DetalleComprobante
    Route::get('getInicial/{id}/{empresa}',[DetalleComprobanteController::class,'getInicial']);
    Route::get('getdetalle/{id}', [DetalleComprobanteController::class, 'getDetalle']);
    Route::post('store', [DetalleComprobanteController::class, 'store']);

    //Docente
    Route::get('obtenerdocente',[DocenteController::class,'show']);
    Route::post('creardocente',[DocenteController::class,'store']);
    Route::put('editardocente/{docente}',[DocenteController::class,'update']);
    Route::get('validaremail/{email}',[DocenteController::class,'validarEmail']);
    Route::delete('eliminarDocente/{docente}', [DocenteController::class, 'destroy']);

    //Empresa
    Route::get('obtenertipoempresa',[TipoEmpresaController::class,'show']);
    Route::get('obtenerempresa',[EmpresaController::class,'show']);
    Route::post('crearempresa',[EmpresaController::class,'store']);
    Route::get('obtenerdocentealumno',[EmpresaController::class,'docentealumno']);
    Route::get('obtenerempresaalumno/{id}',[EmpresaController::class,'empresaAlumno']);
    Route::post('editarempresa',[EmpresaController::class,'editar']);
    Route::get('obtenersolicitud/{id_subnivel}',[EmpresaController::class,'solicitudEmpresa']);
    Route::get('obtenerempresasolicitud/{id}',[EmpresaController::class,'obtenerempresasolicitud']);
    Route::get('alertaempresa/{id}/{tipo}',[EmpresaController::class,'alertaempresa']);
    Route::get('aprobarempresa/{id}/{idsolicitud}',[EmpresaController::class,'aprobarempresa']);
    Route::post('rechazarempresa',[EmpresaController::class,'rechazarempresa']);
    Route::get('obtenermotivorechazo/{id}',[EmpresaController::class,'obtenermotivorechazo']);

    //Regimen
    Route::get('obtenerregimen',[RegimenTributarioController::class,'show']);

    //Crear form f4415
    Route::post('crearf4415',[InicioActividadFormController::class,'store']);
    Route::get('obtenerform4415/{id}',[InicioActividadFormController::class,'index']);
    Route::get('solicitudform4415/{id}',[InicioActividadFormController::class,'solicitudForm']);
    Route::put('aprobarf4415/{id}',[InicioActividadFormController::class,'aprobar']);
    Route::post('rechazarf4415',[InicioActividadFormController::class,'rechazar']);

    //Estudiantes
    Route::post('crearestudiante',[EstudianteController::class,'store']);
    Route::get('obtenerestudiante/{subnivel}',[EstudianteController::class,'show']);
    Route::put('editarestudiante/{estudiante}',[EstudianteController::class,'update']);
    Route::delete('eliminarestudiante/{estudiante}', [EstudianteController::class, 'destroy']);

    //Giro
    Route::get('obtenerIva',[GiroController::class,'getIva']);
    Route::get('obtenerCategorias',[GiroController::class,'getCategorias']);
    Route::post('creargiro', [GiroController::class, 'store']);
    Route::put('updategiro/{giro}', [GiroController::class, 'update']);
    Route::get('obtenerGiros', [GiroController::class, 'obtegerGiros']);

    //ManualDeCuenta- SII
    Route::get('obterDatosSii',[ManualCuentaSiiController::class,'getDatos']);
    Route::get('obtenerInformacion', [ManualCuentaSiiController::class, 'getInformacion']);
    Route::post('storeSii', [ManualCuentaSiiController::class, 'store']);
    Route::put('updateSii/{id}', [ManualCuentaSiiController::class, 'update']);

    //MiManualdeCuenta
    Route::get('getDatosMisCuenta', [MiManualCuentaController::class, 'getDatos']);
    Route::get('getSubClasificacion/{id}', [MiManualCuentaController::class, 'getSubClasificacion']);
    Route::post('storeMiCuenta', [MiManualCuentaController::class, 'store']);
    Route::put('update2/{id}', [MiManualCuentaController::class, 'update']);
    Route::put('update/{id}', [ManualCuentaSiiController::class, 'update']);

    //MiPlandeCuenta
    Route::get('obterDatosPlan',[ManualCuentaSiiController::class,'getDatos']);
    Route::post('addMiPlanCuenta',[PlanCuentaController::class, 'addMiPlanCuenta']);
    Route::get('obtenerInformacion', [ManualCuentaSiiController::class, 'getInformacion']);
    Route::post('storePlan', [ManualCuentaSiiController::class, 'store']);
    Route::put('update/{id}', [ManualCuentaSiiController::class, 'update']);

    //Nivel
    Route::get('obtenernivel',[NivelController::class,'show']);

    //Subnivel
    Route::get('obtenersubniveles',[SubNivelController::class,'show']);
    Route::get('obtenersubniveles/{id}',[SubNivelController::class,'showNivel']);
    Route::get('obtenersubnivelesporNivel',[SubNivelController::class,'showPorNivel']);
    Route::post('crearsubnivel',[SubNivelController::class,'crearNivel']);
    Route::put('updatesubnivel/{id}',[SubNivelController::class,'update']);
    Route::get('updatesubnivel/{id}/{status}',[SubNivelController::class,'updateStatus']);
    Route::delete('deleteSubNivel/{subnivel}', [SubNivelController::class, 'destroy']);

    //PlandeCuenta
    Route::get('obterDatosPlan',[PlanCuentaController::class,'getDatos']);
    Route::post('/addPlanCuenta',[PlanCuentaController::class, 'addPlanCuenta']);
    Route::post('/addPlanCuentaMiManual', [PlanCuentaController::class, 'addPlanCuentaMiManual']);
    Route::post('/deleteCuenta',[PlanCuentaController::class, 'deleteCuenta']);
    Route::get('/getPlanCuenta/{id}',[PlanCuentaController::class, 'getPlanCuenta']);

    //Previsiones
    Route::get('obtenerprevision',[AfpController::class,'show']);
    Route::get('validarnombre/{nombre}',[AfpController::class,'validarnombre']);
    Route::post('crearprevision',[AfpController::class,'store']);
    Route::delete('eliminarprevision/{afp}',[AfpController::class,'destroy']);

    //Proveedor
    Route::get('getGirosProveedor', [ProveedorController::class, 'obtenerGiros']);
    Route::post('crearProveedor', [ProveedorController::class, 'store']);
    Route::get('obtenerProveedores', [ProveedorController::class, 'getProveedores']);
    Route::put('updateProveedor/{proveedor}', [ProveedorController::class, 'update']);

    //ProductoProveedor
    Route::get('getProveedor', [ProductoProveedorController::class, 'obtenerProveedores']);
    Route::get('getProductoProveedor/{id}', [ProductoProveedorController::class, 'obtenerProductoProveedor']);
    Route::post('crearProducto', [ProductoProveedorController::class, 'store']);
    Route::put('actualizarProducto/{producto}', [ProductoProveedorController::class, 'update']);

    //Remuneraciones
    Route::get('obtenerremuneracion/{id}',[RemuneracionesController::class,'show']);
    Route::get('obtenerremuneracion/nopagadas/{id}',[RemuneracionesController::class,'shownopagadas']);
    Route::post('crearremuneracion',[RemuneracionesController::class,'store']);
    Route::get('obtenerremuneracionmes/{id}',[RemuneracionesController::class,'remuneracionmes']);
    Route::get('obtenerremuneracion/{date}/{id}',[RemuneracionesController::class,'busquedaremuneracion']);
    Route::post('pagarremuneraciones',[RemuneracionesController::class,'pagarremuneraciones']);


    //TipoDocumento
    Route::get('getInicialDocumento',[DocumentoTributarioController::class,'getInicial']);
    Route::get('getDocumentoRelaciones/{tipo}', [DocumentoTributarioController::class, 'getDocumentoRelaciones']);
    Route::get('getDocumento/{tipo}', [DocumentoTributarioController::class, 'getDocumento']);
    Route::get('getTablaCompra', [DocumentoTributarioController::class, 'getTablaCompra']);
    Route::post('storeDocumento', [DocumentoTributarioController::class, 'store']);
    Route::put('updateDocumento/{id}', [DocumentoTributarioController::class, 'update']);
    Route::get('getRelacionesInicial/{id}', [DocumentoTributarioController::class, 'getRelacionesIniciales']);
    Route::post('storeRelacionAntecesor', [DocumentoTributarioController::class, 'storeAntecesor']);
    Route::post('storeRelacionSucesor', [DocumentoTributarioController::class, 'storeSucesor']);

    //Trabajadores
    Route::get('obtenertrabajador/{id}',[TrabajadorController::class,'show']);
    Route::get('validarrut/{rut}',[TrabajadorController::class,'validarrut']);
    Route::post('creartrabajador',[TrabajadorController::class,'store']);
    Route::post('crearcarga',[TrabajadorController::class,'storeCarga']);
    Route::delete('eliminartrabajador/{trabajador}',[TrabajadorController::class,'destroy']);

    //Regiones
    Route::get('regiones',[TrabajadorController::class,'showregiones']);
    Route::get('afp',[TrabajadorController::class,'showafp']);
    Route::get('comuna/{id}',[TrabajadorController::class,'showcomuna']);
    Route::get('parentezco',[TrabajadorController::class,'showparentezco']);

    //UnidaddeNegocio
    Route::get('getInicialUnidad/{id}', [UnidadNegocioController::class, 'getInicial']);
    Route::post('storeNegocio', [UnidadNegocioController::class, 'store']);
    Route::put('update/{id}', [UnidadNegocioController::class, 'update']);

    //Tesoreria
    Route::get('getTesoreriaComprasIncial/{empresa}', [TesoreriaController::class, 'getInicialCompras']);
    Route::post('aprobarPago', [TesoreriaController::class, 'aprobarPago']);

    //Impuesto UTM
    Route::get('obtenerimpuestoutm',[ImpuestoUtmController::class,'show']);
    Route::post('crearimpuestoutm',[ImpuestoUtmController::class,'store']);
    Route::delete('eliminarimpuestoutm/{impuestoutm}',[ImpuestoUtmController::class,'destroy']);

    // asignacion familiar

    Route::get('obtenerasignacionfamiliar',[MontoAsignacionFamiliarController::class,'show']);

    //Logout
    Route::post('/logout',[AuthController::class,'logout']);

    //Existencias
    Route::get('getProductoExistencia/{empresa}', [ExistenciaController::class, 'getInicial']);
    Route::get('getInicialTarjetas/{sku}', [ExistenciaController::class, 'getTarjetasProducto']);

    // anticipo

    Route::post('crearanticipo',[AnticipoController::class,'store']);
    Route::get('obteneranticipo/{id}',[AnticipoController::class,'show']);
    Route::delete('eliminaranticipo/{anticipo}', [AnticipoController::class, 'destroy']);
    Route::get('pagaranticipo/{id}',[AnticipoController::class,'pagaranticipo']);

    // libro caja

    Route::get('obtenerinfocaja/{id}/{cuenta}',[ComprobanteController::class,'librocajames']);
    Route::get('obtenerinfocaja/{date}/{id}/{cuenta}',[ComprobanteController::class,'busquedalibraocaja']);

});

