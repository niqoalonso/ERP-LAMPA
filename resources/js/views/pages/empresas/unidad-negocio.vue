<script src="./unidadNegocio.js"></script>

<template>
  <Layout>

    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
          <h5>Unidaded de Negocio</h5>
          <hr>
            <form class="needs-validation" @submit.prevent="formSubmit">
                <input v-model="form.id" hidden="" />
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="rut_empresa">Nombre</label>
                    <input
                      id="rut_empresa"
                      v-model="form.nombre"
                      type="text"
                      class="form-control form-control-sm"
                      :class="{'is-invalid': submitted && $v.form.nombre.$error,}" />

                      <div
                        v-if="submitted && $v.form.nombre.$error"
                        class="invalid-feedback">
                        <span v-if="!$v.form.nombre.required"
                        >Nombre requerido.</span>
                    </div>
                  </div>
                </div>
              </div>
                <hr>
              <button class="btn btn-success float-end" type="submit">
                <i class="uil uil-plus-circle" ></i>
                Añadir Negocio
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-6">
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
                        class="px-2 text-warning"
                        v-b-modal.crearnegocio
                        data-toggle="modal"
                        data-target=".bs-example-crearalumno"
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
                        <i class="uil uil-trash font-size-18"></i>
                      </a>
                    </li>
                  </ul>
                </template>
              </b-table>
            </div>
          </div>
        </div>
    </div>

    <b-modal
      id="crearnegocio"
      size="lg"
      :title="titlemodal"
      title-class="font-18"
      hide-footer
      v-if="modal">
      
      <form class="needs-validation" @submit.prevent="formSubmit">
        <div class="row">
            <div class="col-md-6">
                    <input v-model="formE.idUnidad" hidden=""/>
                <div class="mb-3">
                    <label for="codigo">Codigo</label>
                    <input
                        id="codigo"
                        v-model="formE.codigo"
                        readonly
                        type="text"
                        class="form-control form-control-sm"/>
                </div>
            </div>
            <div class="col-md-6">
                <div class="mb-3">
                    <label for="nombre">Nombre</label>
                    <input
                        id="nombre"
                        v-model="formE.nombre"
                        type="text"
                        class="form-control form-control-sm"
                        :class="{
                        'is-invalid': submitted && $v.formE.nombre.$error,
                        }"
                    />

                    <div
                        v-if="submitted && $v.formE.nombre.$error"
                        class="invalid-feedback">
                        <span v-if="!$v.formE.nombre.required"
                        >Nombre requerido.</span>
                    </div>
                </div>
            </div>

        </div>

        <button class="btn btn-primary float-end" type="submit">
          <i class="fas fa-sync"></i> Actualizar
        </button>
        
      </form>
    </b-modal>

  </Layout>
</template>
