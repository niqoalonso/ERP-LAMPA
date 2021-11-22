<script src="./proveedor.js"></script>

<template>
  <Layout>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
        
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                  <h4 class="card-title">Gestión Proveedores</h4>
              </div>
              <div class="col-6 d-flex flex-row-reverse bd-highlight">
                  <h4 v-if="divButton === true && crearproveedor" class="card-title">Nuevo Proveedor</h4>
                  <h4 v-if="divButton === false && editarproveedor" class="card-title">Editar Proveedor</h4>
              </div>
            </div>
            
            <hr>
            <form class="needs-validation" @submit.prevent="formSubmit">
            <div class="row">
            <div class="col-md-4">
                <input v-model="form.id_proveedor" type="number" class="form-control" hidden=""/>
                <div class="mb-3">
                  <label for="rut">RUT</label>
                  <input 
                      maxlength = "10"
                      id="rut"
                      v-model="form.rut"
                      type="text"
                      class="form-control inputRUT"
                      :class="{
                      'is-invalid': submitted && $v.form.rut.$error,
                      }"
                  />
                  <div
                      v-if="submitted && $v.form.rut.$error"
                      class="invalid-feedback"
                  >
                      <span v-if="!$v.form.rut.required"
                      >RUT requerido.</span
                      >
                  </div> 
                </div>
            </div>
            <div class="col-md-8">
                <div class="mb-3">
                <label for="nombre">Nombre ó Razón Social</label>
                <input
                    id="nombre"
                    v-model="form.nombre"
                    type="text"
                    class="form-control"
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
            </div>

            <div class="row">
                <div class="col-md-4">
                <label for="celular">Celular</label>
                <div class="input-group mb-3">
                  
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">+56 9</span>
                  </div>
                    <input   
                        maxlength = "8"
                        id="celular"
                        v-model="form.celular"
                        type="text"
                        class="form-control"
                        :class="{
                        'is-invalid': submitted && $v.form.celular.$error,
                        }"
                      />
                    <div
                            v-if="submitted && $v.form.celular.$error"
                            class="invalid-feedback"
                        >
                            <span v-if="!$v.form.celular.required"
                            >Celular requerido.</span
                            >
                        </div>
                      <div
                            v-if="submitted && $v.form.celular.$error"
                            class="invalid-feedback"
                        >
                            <span v-if="!$v.form.celular.numeric"
                            >Solo numeros.</span
                            >
                        </div>
                </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3">
                        <label for="correo">Correo Electronico</label>
                        <input
                            id="correo"
                            v-model="form.correo"
                            type="text"
                            class="form-control"
                            :class="{
                            'is-invalid': submitted && $v.form.correo.$error,
                            }"
                        />

                        <div
                            v-if="submitted && $v.form.correo.$error"
                            class="invalid-feedback"
                        >
                            <span v-if="!$v.form.correo.required"
                            >Correo requerido.</span
                            >
                        </div>
                        <div
                            v-if="submitted && $v.form.correo.$error"
                            class="invalid-feedback"
                        >
                            <span v-if="!$v.form.correo.email"
                            >Correo no valido.</span
                            >
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3">
                        <label>Giros</label>
                        <multiselect
                            id="giro"
                            v-model="form.giro"
                            placeholder="Seleccionar"
                            :options="giros"
                            track-by="id_giro"
                            :custom-label="customLabel"
                            :class="{
                            'is-invalid': submitted && $v.form.giro.$error,
                            }"
                        ></multiselect>
                        <div
                            v-if="submitted && $v.form.giro.$error"
                            class="invalid-feedback"
                        >
                            <span v-if="!$v.form.giro.required"
                            >Giro requerido.</span
                            >
                        </div>
                    </div>
                    
                </div>
                <div class="col-md-12">
                    <div class="mb-3">
                        <label for="direccion">Dirección</label>
                        <input
                            id="direccion"
                            v-model="form.direccion"
                            type="text"
                            class="form-control"
                            :class="{
                            'is-invalid': submitted && $v.form.direccion.$error,
                            }"
                        />

                        <div
                            v-if="submitted && $v.form.direccion.$error"
                            class="invalid-feedback"
                        >
                            <span v-if="!$v.form.direccion.required"
                            >Dirección requerido.</span
                            >
                        </div>
                    </div>
                </div>
            </div>
            <div class="btnCreate" v-if="divButton === true">
              <button class="btn btn-primary float-end btnSubmit" type="submit"> 
                  <i class="far fa-save"></i> Crear Proveedor
              </button>
            </div>
            <div class="btnUpdate" v-else>
              <button class="btn btn-primary float-end btnSubmit" style="margin-left: 10px;" type="submit"> 
                  <i class="fas fa-sync"></i> Actualizar Proveedor
              </button>
              <button class="btn btn-danger float-end" type="button" v-on:click="cancelar"> 
                  <i class="fas fa-ban"></i> Cancelar
              </button>
            </div>
            
            
            </form>
          </div>
        
        </div>
      </div>
      <div class="col-lg-12" v-if="listarproveedor">
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
                    <li class="list-inline-item" v-if="editarproveedor">
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
                        <i class="uil uil-pen font-size-18"></i>
                      </a>
                    </li>
                    <li class="list-inline-item" v-if="eliminarproveedor">
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
  </Layout>
</template>
