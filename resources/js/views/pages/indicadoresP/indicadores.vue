<script src="./indicadores.js"></script>

<template>
  <Layout>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Listado Prevision</h4>

            <div class="row mt-5">
              <div class="col-12">
                <button
                  type="button"
                  class="btn btn-success waves-effect waves-light float-end"
                  v-b-modal.crearprevision
                  @click="modalNuevo"
                >
                  <i class="fas fa-plus-circle"></i>
                  Crear prevision
                </button>
              </div>
            </div>
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
                        v-b-modal.crearprevision
                        data-toggle="modal"
                        data-target=".bs-example-crearprevision"
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
                      :total-rows="rows"
                      :per-page="perPage"
                    ></b-pagination>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- modal -->

      <b-modal
        id="crearprevision"
        size="lg"
        :title="titlemodal"
        title-class="font-18"
        hide-footer
        v-if="modal"
      >
        <form class="needs-validation" @submit.prevent="formSubmit">
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="nombre">Nombre</label>
                <input
                  id="nombre"
                  v-model="form.nombre"
                  type="text"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.nombre.$error,
                  }"
                  @input="validarNombre($event)"
                />

                <div
                  v-if="submitted && $v.form.nombre.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.nombre.required"
                    >El nombre es requerido.</span
                  >
                </div>

                <span class="text-danger" v-if="previsionexist"
                  >prevision ya creada.</span
                >
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label for="tasa_dependiente">Tasa Dependiente</label>
                <input
                  id="tasa_dependiente"
                  v-model="form.tasa_dependiente"
                  type="text"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.tasa_dependiente.$error,
                  }"
                />

                <div
                  v-if="submitted && $v.form.tasa_dependiente.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.tasa_dependiente.required"
                    >Tasa dependiente es requerido.</span
                  >
                </div>

              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="tasa_independiente">Tasa Independiente</label>
                <input
                  id="tasa_independiente"
                  v-model="form.tasa_independiente"
                  type="text"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.tasa_independiente.$error,
                  }"
                />

                <div
                  v-if="submitted && $v.form.tasa_independiente.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.tasa_independiente.required"
                    >Tasa independiente es requerido.</span
                  >
                </div>

              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label for="sis">SIS</label>
                <input
                  id="sis"
                  v-model="form.sis"
                  type="text"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.sis.$error,
                  }"
                />

                <div
                  v-if="submitted && $v.form.sis.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.sis.required"
                    >SIS es requerido.</span
                  >
                </div>

              </div>
            </div>
          </div>

          <button
            v-if="btnCreate === true"
            class="btn btn-primary float-end"
            type="submit"
          >
            <i class="far fa-save"></i> Crear
          </button>
          <button v-else class="btn btn-primary float-end" type="submit">
            <i class="fas fa-sync"></i> Actualizar
          </button>
        </form>
      </b-modal>

      <!-- modal -->
    </div>
  </Layout>
</template>
