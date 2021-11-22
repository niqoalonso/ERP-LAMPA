<script src="./manual.js"></script>

<template>
  <Layout>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Manual de Cuentas - SII</h4>

            <button
              type="button"
              class="btn btn-success waves-effect waves-light float-end"
              v-b-modal.creargiro
              @click="modalNuevo"
            >
              <i class="fas fa-plus-circle"></i> Nueva Cuenta
            </button>
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">

            <div class="row mt-4">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Mostrar&nbsp;
                    <b-form-select
                      v-model="perPage"
                      size="sm"
                      :options="pageOptions"
                    ></b-form-select
                    >&nbsp;entradas
                  </label>
                </div>
              </div>
              <!-- Search -->
              <div class="col-sm-12 col-md-6">
                <div
                  id="tickets-table_filter"
                  class="dataTables_filter text-md-end"
                >
                  <label class="d-inline-flex align-items-center">
                    Buscar:
                    <b-form-input
                      v-model="filter"
                      type="search"
                      placeholder="Buscar..."
                      class="form-control form-control-sm ms-2"
                    ></b-form-input>
                  </label>
                </div>
              </div>
              <!-- End search -->
            </div>

            <div class="table-responsive mb-0">
              <b-table
                :items="tableData"
                :fields="fields"
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :filter="filter"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
              >
                <template v-slot:cell(action)="data">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        v-on:click="verCuenta(data.item)"
                        class="px-2 text-primary"
                        v-b-modal.verinformacion
                        v-b-tooltip.hover
                        title="Eliminar"
                      >
                        <i class="uil uil-eye font-size-18"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        v-on:click="editar(data.item)"
                        class="px-2 text-warning"
                        v-b-modal.creargiro
                        data-toggle="modal"
                        data-target=".bs-example-creargiro"
                        v-b-tooltip.hover
                        title="Editar"
                      >
                        <i class="uil uil-pen font-size-18"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        v-on:click="eliminar(data.item)"
                        class="px-2 text-danger"
                        v-b-tooltip.hover
                        title="Eliminar"
                      >
                        <i class="uil uil-power font-size-18"></i>
                      </a>
                    </li>
                  </ul>
                </template>
              </b-table>
            </div>
            <div class="row">
              <div class="col">
                <div
                  class="dataTables_paginate paging_simple_numbers float-end"
                >
                  <ul class="pagination pagination-rounded mb-0">
                    <!-- pagination -->
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="totalRows"
                      :per-page="perPage"
                    ></b-pagination>
                  </ul>
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </div>

    <b-modal
      id="creargiro"
      size="lg"
      :title="titlemodal"
      title-class="font-18"
      hide-footer
      v-if="modal"
    >
      <form class="needs-validation" @submit.prevent="formSubmit">
        <div class="row">
            <input type="number" v-model="form.id_cuenta" hidden="" />
            <div class="col-md-4">
                <div class="mb-3">
                <label for="codigo">Código</label>
                <input
                    id="codigo"
                    v-model="form.codigo"
                    type="text"
                    class="form-control form-control-sm"
                    :class="{
                    'is-invalid': submitted && $v.form.codigo.$error,
                    }"
                />
                <div v-if="submitted && $v.form.codigo.$error" class="invalid-feedback" >
                    <span v-if="!$v.form.codigo.required"
                    >Codigo requeridos.</span
                    >
                </div>
                <div v-if="submitted && $v.form.codigo.$error" class="invalid-feedback" >
                    <span v-if="!$v.form.codigo.numeric"
                    >Solo numeros.</span
                    >
                </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="mb-3">
                <label for="nombre">Nombre</label>
                <input
                    id="nombre"
                    v-model="form.nombre"
                    type="text"
                    class="form-control form-control-sm"
                    :class="{
                    'is-invalid': submitted && $v.form.nombre.$error,
                    }"
                />

                <div
                    v-if="submitted && $v.form.nombre.$error"
                    class="invalid-feedback"
                >
                    <span v-if="!$v.form.nombre.required"
                    >Nombre requerido.</span
                    >
                </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="mb-3">
                <label for="codigo">Descripción</label>
                <textarea 
                    class ="form-control form-control-sm"
                    v-model="form.descripcion" 
                    >
                </textarea>
                <div v-if="submitted && $v.form.codigo.$error" class="invalid-feedback" >
                    <span v-if="!$v.form.codigo.required"
                    >Codigo requeridos.</span
                    >
                </div>
                <div v-if="submitted && $v.form.codigo.$error" class="invalid-feedback" >
                    <span v-if="!$v.form.codigo.numeric"
                    >Solo numeros.</span
                    >
                </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="mb-3">
                <label>Clasificacion</label>
                <multiselect
                    v-model="form.clasificacion"
                    placeholder="Seleccionar"
                    :options="clasificacion"
                    track-by="id_clasificacion"
                    label="nombre"
                    :class="{
                    'is-invalid': submitted && $v.form.categoria.$error,
                    }"
                ></multiselect>
                <div
                    v-if="submitted && $v.form.categoria.$error"
                    class="invalid-feedback"
                >
                    <span v-if="!$v.form.categoria.required"
                    >Categoria requerido.</span
                    >
                </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="mb-3">
                <label>SubClafisicacion</label>
                <multiselect
                    v-model="form.subclasificacion"
                    placeholder="Seleccionar"
                    :options="subclasificacion"
                    track-by="id_subclasificacion"
                    label = "nombre"
                    :class="{
                    'is-invalid': submitted && $v.form.iva.$error,
                    }"
                ></multiselect>
                <div
                    v-if="submitted && $v.form.iva.$error"
                    class="invalid-feedback"
                >
                    <span v-if="!$v.form.iva.required"
                    >IVA requerido.</span
                    >
                </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="mb-3">
                <label for="codigo">Cargos</label>
                <input
                    id="nombre"
                    v-model="form.cargos"
                    type="text"
                    class="form-control form-control-sm"
                    :class="{
                    'is-invalid': submitted && $v.form.nombre.$error,
                    }"
                />
                <div v-if="submitted && $v.form.codigo.$error" class="invalid-feedback" >
                    <span v-if="!$v.form.codigo.required"
                    >Codigo requeridos.</span
                    >
                </div>
                <div v-if="submitted && $v.form.codigo.$error" class="invalid-feedback" >
                    <span v-if="!$v.form.codigo.numeric"
                    >Solo numeros.</span
                    >
                </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="mb-3">
                <label for="codigo">Abonos</label>
                <input
                    id="nombre"
                    v-model="form.abonos"
                    type="text"
                    class="form-control form-control-sm"
                    :class="{
                    'is-invalid': submitted && $v.form.nombre.$error,
                    }"
                />
                <div v-if="submitted && $v.form.codigo.$error" class="invalid-feedback" >
                    <span v-if="!$v.form.codigo.required"
                    >Codigo requeridos.</span
                    >
                </div>
                <div v-if="submitted && $v.form.codigo.$error" class="invalid-feedback" >
                    <span v-if="!$v.form.codigo.numeric"
                    >Solo numeros.</span
                    >
                </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="mb-3">
                <label for="codigo">Saldo Deudor</label>
                <input
                    id="nombre"
                    v-model="form.saldoDeudor"
                    type="text"
                    class="form-control form-control-sm"
                    :class="{
                    'is-invalid': submitted && $v.form.nombre.$error,
                    }"
                />
                <div v-if="submitted && $v.form.codigo.$error" class="invalid-feedback" >
                    <span v-if="!$v.form.codigo.required"
                    >Codigo requeridos.</span
                    >
                </div>
                <div v-if="submitted && $v.form.codigo.$error" class="invalid-feedback" >
                    <span v-if="!$v.form.codigo.numeric"
                    >Solo numeros.</span
                    >
                </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="mb-3">
                <label for="codigo">Saldo Acreedor</label>
                <input
                    id="nombre"
                    v-model="form.saldoAcreedor"
                    type="text"
                    class="form-control form-control-sm"
                    :class="{
                    'is-invalid': submitted && $v.form.nombre.$error,
                    }"
                />
                <div v-if="submitted && $v.form.codigo.$error" class="invalid-feedback" >
                    <span v-if="!$v.form.codigo.required"
                    >Codigo requeridos.</span
                    >
                </div>
                <div v-if="submitted && $v.form.codigo.$error" class="invalid-feedback" >
                    <span v-if="!$v.form.codigo.numeric"
                    >Solo numeros.</span
                    >
                </div>
                </div>
            </div>
            
        </div>

        <button v-if="btnCreate === true" class="btn btn-primary float-end" type="submit">
          <i class="far fa-save"></i> Crear
        </button>
        <button v-else class="btn btn-primary float-end" type="submit">
          <i class="fas fa-sync"></i> Actualizar
        </button>
        
      </form>
    </b-modal>

    <b-modal
      id="verinformacion"
      size="lg"
      :title="titlemodalV"
      title-class="font-18"
      hide-footer
      v-if="modalVer"
    >
        <div class="row">
            <input type="number" v-model="form.id_cuenta" hidden="" />
            <div class="col-md-4">
                <div class="mb-3">
                    <label for="codigo">CÓDIGO</label>
                    <p><i>{{info.codigo}}</i></p>
                </div>
            </div>
            <div class="col-md-8">
                <div class="mb-3">
                    <label for="nombre">NOMBRE</label>
                    <p><i>{{info.nombre}}</i></p>
                </div>
            </div>
            <div class="col-md-12">
                <div class="mb-3">
                    <label for="codigo">DESCRIPCIÓN</label>
                    <p><i>{{info.descripcion}}</i></p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="mb-3">
                    <label>CLASIFICACIÓN</label>
                    <p><i>{{info.clasificacion}}</i></p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="mb-3">
                    <label>SUBCLASIFICACIÓN</label>
                    <p><i>{{info.subclasificacion}}</i></p>
                </div>
            </div>
            <div class="col-md-12">
                <div class="mb-3">
                    <label for="codigo">CARGOS</label>
                    <p><i>{{info.cargos}}</i></p>
                </div>
            </div>
            <div class="col-md-12">
                <div class="mb-3">
                    <label for="codigo">ABONOS</label>
                    <p><i>{{info.abonos}}</i></p>
                </div>
            </div>
            <div class="col-md-12">
                <div class="mb-3">
                    <label for="codigo">SALDO DEUDOR</label>
                    <p><i>{{info.saldoDeudor}}</i></p>
                </div>
            </div>
            <div class="col-md-12">
                <div class="mb-3">
                    <label for="codigo">SALDO ACREEDOR</label>
                    <p><i>{{info.saldoAcreedor}}</i></p>
                </div>
            </div>
        </div>
        
        <button class="btn btn-danger float-end" v-on:click="cerrarModalInfo()" type="button">
          <i class="fa fa-ban"></i> Cerrar
        </button>

    </b-modal>
  </Layout>
</template>
