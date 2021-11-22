<script src="./asiento.js"></script>

<template>
  <Layout>
    <div class="row">
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
                <div class="col-md-3">
                    <div class="mb-3">
                        <label id="comprobante">Tipo Comprobante</label>
                        <multiselect
                            id="comprobante"
                            v-model="form.comprobante"
                            placeholder="Seleccionar"
                            :options="comprobantes"
                            track-by="id_tipocomprobante"
                            :custom-label="customLabel"
                            :class="{
                            'is-invalid': submitted && $v.form.comprobante.$error,
                            }"
                        ></multiselect>
                        <div
                            v-if="submitted && $v.form.comprobante.$error"
                            class="invalid-feedback"
                        >
                            <span v-if="!$v.form.comprobante.required"
                            >Comprobante requerido.</span
                            >
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3">
                        <label for="fecha_comprobante">Fecha comprobante</label>
                        <input
                            id="fecha_comprobante"
                            v-model="form.fecha_comprobante"
                            type="date"
                            class="form-control"
                            :class="{
                            'is-invalid': submitted && $v.form.fecha_comprobante.$error,
                            }"
                        />
                        <div
                            v-if="submitted && $v.form.fecha_comprobante.$error"
                            class="invalid-feedback"
                        >
                            <span v-if="!$v.form.fecha_comprobante.required"
                            >Fecha requerido.</span
                            >
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label id="comprobante">Unidad Negocio</label>
                        <multiselect
                            id="comprobante"
                            v-model="form.unidadnegocio"
                            placeholder="Seleccionar"
                            :options="unidadnegocios"
                            track-by="id_unidadnegocio"
                            :custom-label="customLabelNegocio"
                            :class="{
                            'is-invalid': submitted && $v.form.unidadnegocio.$error,
                            }"
                        ></multiselect>
                        <div
                            v-if="submitted && $v.form.unidadnegocio.$error"
                            class="invalid-feedback"
                        >
                            <span v-if="!$v.form.unidadnegocio.required"
                            >Comprobante requerido.</span
                            >
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
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
            </div>

            <div class="btnCreate" v-if="divButton === true">
              <button class="btn btn-success btn-soft-success float-end btnSubmit" type="submit"> 
                  <i class="far fa-save"></i> Ingresar Comprobante
              </button>
            </div>
            <div class="btnUpdate" v-else>
              <button class="btn btn-success btn-soft-success float-end btnSubmit" style="margin-left: 10px;" type="submit" disabled> 
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
                    <li
                      class="list-inline-item"
                    >
                      <router-link
                        :to="'../comprobanteDetalle/' + data.item.codigo"
                      >
                        <a class="px-2 text-primary" title="Detalle Comprobante">
                          <i class="uil uil-notes font-size-18"></i>
                        </a>
                      </router-link>
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
