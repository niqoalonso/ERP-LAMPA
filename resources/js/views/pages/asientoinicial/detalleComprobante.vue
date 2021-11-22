<script src="./detalleComprobante.js"></script>

<template>
  <Layout>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                  <h4 class="card-title">Encabezado</h4>
              </div>
              <div class="col-6 d-flex justify-content-end">
              <router-link :to="'../asiento-inicial/'">
                    <button class="btn btn-secondary btn-soft-secondary rounded-pill"><i class="uil uil-sign-in-alt"></i> Volver</button>
              </router-link>
                
              </div>
            </div>
            
            <hr>
            <div class="row">
                <div class="col-md-3">
                    <div class="mb-3">
                        <label id="comprobante">Tipo Comprobante</label>
                        <input v-model="info.tipocomprobante" class="form-control form-control-sm" disabled/>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3">
                        <label for="fecha_comprobante">Fecha comprobante</label>
                        <input
                            id="fecha_comprobante"
                            v-model="info.fecha_comprobante"
                            type="date"
                            class="form-control form-control-sm"
                            disabled
                        />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label id="comprobante">Unidad Negocio</label>
                        <input v-model="info.unidadnegocio" class="form-control form-control-sm" disabled/>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="mb-3">
                        <label for="glosa">Glosa - <small>(Descripción General)</small></label>
                        <input
                            id="glosa"
                            v-model="info.glosa"
                            type="text"
                            class="form-control form-control-sm"
                            disabled
                        />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                  <h4 class="card-title">Comprobante Contable</h4>
              </div>
              <div class="col-6 d-flex flex-row-reverse bd-highlight">
                  <h4 v-if="divButton === true && crearproveedor" class="card-title">Nuevo Proveedor</h4>
                  <h4 v-if="divButton === false && editarproveedor" class="card-title">Editar Proveedor</h4>
              </div>
            </div>
            
            <hr>
            <form class="needs-validation" @submit.prevent="formSubmit">
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label id="cuenta">Cuentas Contables</label>
                        <multiselect
                            id="cuenta"
                            v-model="form.cuenta"
                            placeholder="Seleccionar"
                            :options="cuentas"
                            track-by="id_plan_cuenta"
                            :custom-label="customLabel"
                            :class="{
                            'is-invalid': submitted && $v.form.cuenta.$error,
                            }"
                        ></multiselect>
                        <div
                            v-if="submitted && $v.form.cuenta.$error"
                            class="invalid-feedback"
                        >
                            <span v-if="!$v.form.cuenta.required"
                            >Cuenta Contable requerido.</span
                            >
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3">
                        <label id="centro">Centro Costos</label>
                        <multiselect
                            id="centro"
                            v-model="form.centro"
                            placeholder="Seleccionar"
                            :options="centros"
                            track-by="id_centrocosto"
                            :custom-label="customLabelCosto"
                            :class="{
                            'is-invalid': submitted && $v.form.centro.$error,
                            }"
                        ></multiselect>
                        <div
                            v-if="submitted && $v.form.centro.$error"
                            class="invalid-feedback"
                        >
                            <span v-if="!$v.form.centro.required"
                            >Centro Costo requerido.</span
                            >
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3">
                        <label for="unidad">Unidad Negocio</label>
                        <input
                            id="unidad"
                            v-model="form.unidad"
                            type="input"
                            class="form-control"
                            disabled
                        />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="glosa">Glosa - <small>(Descripción General)</small></label>
                        <input
                            id="glosa"
                            v-model="form.glosa"
                            type="text"
                            class="form-control form-control-sm"
                            :class="{
                            'is-invalid': submitted && $v.form.glosa.$error,
                            }"
                        />
                        <div
                            v-if="submitted && $v.form.glosa.$error"
                            class="invalid-feedback"
                        >
                            <span v-if="!$v.form.glosa.required"
                            >Glosa requerido.</span
                            >
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3">
                        <label for="cliente">Cliente</label>
                        <input
                            id="cliente"
                            type="text"
                            class="form-control form-control-sm"
                        />
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3">
                        <label for="cliente">Proveedor</label>
                        <input
                            id="cliente"
                            type="text"
                            class="form-control form-control-sm"
                        />
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3">
                        <label for="cliente">Deber</label>
                        <input
                            id="cliente"
                            v-model="form.deber"
                            type="text"
                            class="form-control form-control-sm"
                            :class="{
                            'is-invalid': submitted && $v.form.deber.$error,
                            }"
                        />
                        <div
                            v-if="submitted && $v.form.deber.$error"
                            class="invalid-feedback"
                        >
                            <span v-if="!$v.form.deber.required"
                            >Deber requerido.</span
                            >
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3">
                        <label for="cliente">Haber</label>
                        <input
                            id="cliente"
                            v-model="form.haber"
                            type="text"
                            class="form-control form-control-sm"
                            :class="{
                            'is-invalid': submitted && $v.form.haber.$error,
                            }"
                        />
                        <div
                            v-if="submitted && $v.form.haber.$error"
                            class="invalid-feedback"
                        >
                            <span v-if="!$v.form.haber.required"
                            >Haber requerido.</span
                            >
                        </div>
                    </div>
                </div>
            </div>

            <div class="btnCreate" v-if="divButton === true">
              <button class="btn btn-primary float-end btnSubmit" type="submit"> 
                  <i class="far fa-save"></i> Ingresar Detalle
              </button>
            </div>
            <div class="btnUpdate" v-else>
              <button class="btn btn-primary float-end btnSubmit" style="margin-left: 10px;" type="submit" disabled> 
                  <i class="fas fa-sync"></i> Actualizar Comprobante
              </button>
              <button class="btn btn-danger float-end" type="button" v-on:click="cancelar"> 
                  <i class="fas fa-ban"></i> Cancelar
              </button>
            </div>
            
            </form>
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
                        v-on:click="editar(data.item)"
                        class="px-2 text-primary"
                        v-b-modal.crearproveedor
                        data-toggle="modal"
                        data-target=".bs-example-crearproveedor"
                        v-b-tooltip.hover
                        title="Editar"
                      >
                        <i class="uil uil-notes font-size-18"></i>
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
                        <i class="uil uil-trash font-size-18"></i>
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
  </Layout>
</template>
