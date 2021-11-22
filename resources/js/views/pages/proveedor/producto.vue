<script src="./producto.js"></script>

<template>
  <Layout>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Gestión Producto</h4>
            <hr>
            <div class="row">
            <div class="col-md-6"> 
                    <div class="mb-3">
                        <label>Seleccionar Proveedor</label>
                        <multiselect
                            @input="onChange"
                            :value="proveedores"
                            id="proveedor"
                            v-model="form.proveedor"
                            placeholder="Seleccionar"
                            :options="proveedores"
                            track-by="id_proveedor" 
                            :custom-label="customLabel"
                            :class="{
                            'is-invalid': submitted && $v.form.proveedor.$error,
                            }"
                        ></multiselect>
                    </div>
                </div> 
            </div>
            <hr>
            <div v-if="modeSelectProveedor === true">
              <div class="d-flex justify-content-center">
                  <h4 class="card-title" v-if="divButton === true">Nuevo Producto</h4>
                  <h4 class="card-title" v-else>Editar Producto</h4>
              </div>
            <hr>
            <form class="needs-validation" @submit.prevent="formSubmit">
            <div class="row">
            <input id="id_proveedor" v-model="form.id_proveedor" type="number" class="form-control"
                    :class="{'is-invalid': submitted && $v.form.id_proveedor.$error,}"
                hidden=""/>
                <div class="col-md-2">
                    <div class="mb-3">
                        <label for="sku">SKU - <small>(opcional)</small> </label>
                        <input
                            id="sku"
                            v-model="form.sku"
                            type="text"
                            class="form-control"
                        />
                    </div>
                </div>
            <div class="col-md-4">
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
                />
                <div
                    v-if="submitted && $v.form.nombre.$error"
                    class="invalid-feedback"
                >
                    <span v-if="!$v.form.nombre.required"
                    >Nombre requeridos.</span
                    >
                </div>
                </div>
            </div>
            <div class="col-md-2">
                <label for="p_neto">Precio Neto</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">$</span>
                  </div>
                    <input
                        v-on:input="calcularIVABRUTO(this)"
                        id="p_neto"
                        v-model="form.p_neto"
                        type="text"
                        class="form-control"
                        :class="{
                        'is-invalid': submitted && $v.form.p_neto.$error,
                        }"
                    />
                    <div v-if="submitted && $v.form.p_neto.$error" class="invalid-feedback">
                            <span v-if="!$v.form.p_neto.required">Precio Neto requerido.</span>
                    </div>
                </div>
            </div>
            <div class="col-md-2">
                <label for="iva">IVA</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">$</span>
                  </div>
                    <input
                        readonly
                        id="iva"
                        v-model="form.iva"
                        type="text"
                        class="form-control"
                        :class="{
                        'is-invalid': submitted && $v.form.iva.$error,
                        }"
                    />
                    <div v-if="submitted && $v.form.iva.$error" class="invalid-feedback">
                        <span v-if="!$v.form.iva.required">IVA requerido.</span>
                    </div>
                </div>
            </div>
            <div class="col-md-2">
              <label for="p_bruto">Precio Bruto</label>
              <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">$</span>
                  </div>
                    <input
                      readonly
                      id="p_bruto"
                      v-model="form.p_bruto"
                      type="text"
                      class="form-control"
                      :class="{
                      'is-invalid': submitted && $v.form.p_bruto.$error,
                      }"
                    />
                  <div v-if="submitted && $v.form.p_bruto.$error" class="invalid-feedback">
                      <span v-if="!$v.form.p_bruto.required">Precio requerido.</span>
                  </div>
              </div>
            </div>
          </div>

            <div class="row">                
                <div class="col-md-12">
                    <div class="mb-3">
                        <label for="descripcion">Descripcion - <small>(opcional)</small></label>
                        <input
                            id="descripcion"
                            v-model="form.descripcion"
                            type="text"
                            class="form-control"
                        />
                    </div>
                </div>
            </div>

            <div v-if="divButton === true">
              <button class="btn btn-primary float-end" type="submit">
                Crear Producto
              </button>
            </div>
            <div v-else>
              <button class="btn btn-primary float-end" style="margin-left: 10px;" type="submit">
                Actualizar Producto
              </button>
              <button class="btn btn-danger float-end" type="button" v-on:click="cancelar">
                Cancelar
              </button>
            </div>
      
            </form>
           </div>
          </div>
        </div>
      </div>


      <div class="col-lg-12" v-if="modeSelectProveedor === true && listarproductoproveedor">
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
                    <li class="list-inline-item" v-if="editarproductoproveedor">
                      <a
                        href="javascript:void(0);"
                        v-on:click="editar(data.item)"
                        class="px-2 text-primary"
                        v-b-modal.creargiro
                        data-toggle="modal"
                        data-target=".bs-example-creargiro"
                        v-b-tooltip.hover
                        title="Editar"
                      >
                        <i class="uil uil-pen font-size-18"></i>
                      </a>
                    </li>
                    <li class="list-inline-item" v-if="eliminarproductoproveedor">
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
