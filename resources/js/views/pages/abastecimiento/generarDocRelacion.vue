<script src="./generarDocRelacion.js"></script>

<template>
  <Layout>

    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title"> <small>Generar</small>: {{documentoName}}</h4>
            <hr>
            <b-tabs
              justified
              nav-class="nav-tabs-custom"
              content-class="p-3 text-muted"
            >
              <b-tab active>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="fas fa-home"></i>
                  </span>
                  <span class="d-none d-sm-inline-block">Encabezado</span>
                </template> 
                <form @submit.prevent="formSubmitEncabezado">
                    <div class="row">
                        <div class="mb-3 col-2">
                            <label><small> N° Documento</small></label>
                            <input type="text" class="form-control form-control-sm" v-model="form.n_documento" readonly>
                        </div>
                        <div class="mb-3 col-6">
                            <label><small> Proveedor </small></label>
                            <input type="text" class="form-control form-control-sm" v-model="form.proveedor" readonly>
                        </div>
                        <div class="mb-3 col-2">
                            <label><small> Fecha documento</small></label>
                            <input type="date" class="form-control form-control-sm" v-model="form.fechadoc">
                        </div>
                        <div class="mb-3 col-2">
                            <label><small> Fecha vencimiento</small></label>
                            <input type="date" class="form-control form-control-sm" v-model="form.fechaven" v-if="inputFechaVencimiento === true">
                            <input type="date" class="form-control form-control-sm" v-else disabled>
                        </div>
                        <div class="mb-3 col-5">
                            <label><small> Dirección</small></label>
                            <input type="text" class="form-control form-control-sm" v-model="form.direccion" readonly>
                        </div>
                        <div class="mb-3 col-4">
                            <label><small> Unidad de Negocio</small></label>
                            <input type="text" class="form-control form-control-sm" v-model="form.unidad" readonly>
                        </div>
                        <div class="mb-3 col-12">
                            <label><small> Glosa</small></label>
                            <input type="text" class="form-control form-control-sm" v-model="form.glosa" readonly />
                        </div>
                    </div>
                </form>
              </b-tab>

              <!-- <b-tab>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="far fa-user"></i>
                  </span>
                  <span class="d-none d-sm-inline-block">Detalle</span>
                </template>

                <form class="needs-validation" @submit.prevent="formSubmitDetalle">
                    <div class="row">
                        <div class="mb-3 col-2">
                            <label for="sku"><small> Codigo</small></label>
                            <input id="sku" type="number" class="form-control form-control-sm" v-model="formDetalle.sku"
                                 >

                        </div>
                        <div class="mb-3 col-8">
                            <label><small> Producto </small></label>
                            <multiselect
                            @input="onChangeProducto"
                            v-model="formDetalle.producto"
                            placeholder="Seleccionar"
                            :options="productos"
                            track-by="id_prod_proveedor"
                            label="nombre">
                            </multiselect>
                        </div>
                        <div class="mb-3 col-2">
                            <label><small> Cantidad</small></label>
                            <input type="number" class="form-control form-control-sm" @input="changeCantidad" v-model="formDetalle.cantidad">
                        </div>
                        <div class="mb-3 col-2">
                            <label><small> Precio</small></label>
                            <input type="number" class="form-control form-control-sm" v-model="formDetalle.precio" readonly>
                        </div>
                        <div class="mb-3 col-2">
                            <label><small> Porcentaje</small></label>
                            <input type="number" @input="calcularDescuento" class="form-control form-control-sm" v-model="formDetalle.descuento_porcentaje">
                        </div>
                        <div class="mb-3 col-2">
                            <label><small> Precio Descuento</small></label>
                            <input type="number" class="form-control form-control-sm" v-model="formDetalle.precio_descuento" readonly>
                        </div>
                        <div class="mb-3 col-6">
                            <label><small> Descripción</small></label>
                            <input type="text" class="form-control form-control-sm" v-model="formDetalle.descripcion" readonly>
                        </div>
                        <div class="mb-3 col-4">
                            <label><small> Centro de Costo</small></label>
                            <multiselect
                            v-model="formDetalle.centro_costo"
                            placeholder="Seleccionar"
                            :options="centros"
                            track-by="id_centrocosto"
                            label="nombre">
                            </multiselect>
                        </div>
                        <div class="mb-3 col-8">
                            <label><small> Descripcion adicional</small></label>
                            <input class="form-control form-control-sm" v-model="formDetalle.descripcion_adicional" />
                        </div>
                        <div class="mb-3 col-12 d-flex justify-content-end">
                            <button type="submit" class="btn btn-primary btn-sm"><i class="uil uil-plus-circle"></i> Agregar</button>
                        </div>
                    </div>
                </form>

              </b-tab> -->

              <b-tab>
                <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="far fa-envelope"></i>
                  </span>
                  <span class="d-none d-sm-inline-block">Documentos Asociados</span>
                </template>
                <p>Hola</p>
              </b-tab>
            </b-tabs>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
            <div class="col-3">
              <label><small>Monto Afecto</small></label>
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">$</span>
                <input type="text" class="form-control" :value="m_afecto" readonly>
              </div>
            </div>
            <div class="col-3">
              <label><small>Monto IVA</small></label>
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">$</span>
                <input type="text" class="form-control" :value="m_iva" readonly>
              </div>
            </div>
            <div class="col-3">
              <label><small>Retenciones</small></label>
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">$</span>
                <input type="text" class="form-control" :value="retenciones" readonly>
              </div>
            </div>
            <div class="col-3">
              <label><small>Total</small></label>
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">$</span>
                <input type="text" class="form-control" :value="total" readonly>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                <h5>Detalle Documento</h5>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-4">
                  <label>Producto</label>
              </div>
              <div class="col-1">
                  <label>Cantidad</label>
              </div>
              <div class="col-2">
                  <label>Precio</label>
              </div>
              <div class="col-1">
                  <label>Porcentaje</label>
              </div>
              <div class="col-2">
                  <label>Precio Descuento</label>
              </div>
              <div class="col-1">
                  <label>Total</label>
              </div>
              <div class="col-1">
                  <label>Acción</label>
              </div>
            </div>

            <hr>
            <div class="row" v-for="(detalle, index) in detalles" :key="index"  style="border-bottom: 1px solid ##8d8b8b; margin-top: 0px; margin-bottom: 0px;">
              <div class="col-4">
                  <p>{{detalle.producto.nombre}}</p>
              </div>
               <div class="col-1">
                  <p>{{detalle.cantidad}}</p>
              </div>
              <div class="col-2">
                  <p>${{detalle.precio}}</p>
              </div>
              <div class="col-1" v-if="detalle.descuento_porcentaje != null ">
                  <p>{{detalle.descuento_porcentaje}}%</p>
              </div>
              <div class="col-1" v-else>
                  <p>-</p>
              </div>
              <div class="col-2" v-if="detalle.precio_descuento != null ">
                  <p>${{detalle.precio_descuento}}</p>
              </div>
              <div class="col-2" v-else>
                  <p>-</p>
              </div>
              <div class="col-1">
                  <p>${{detalle.total}}</p>
              </div>
              <div class="col-1">
                  <button type="button" class="btn btn-warning btn-sm"><i class="uil uil-info-circle"></i></button>
              </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-12 d-flex justify-content-end">
                    <button type="button" class="btn btn-success btn-sm" v-on:click="GenerarDocumento"><i class="uil uil-save"></i> Generar Documento</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </Layout>
</template>
