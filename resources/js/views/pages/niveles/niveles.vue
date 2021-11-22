<script src="./subnivel.js"></script>

<template>
  <Layout>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Niveles y Subniveles</h4>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="card ">
          <div class="card-header ">
            Niveles
          </div>
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
                      v-model="filterN"
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
                :items="tableDataNivel"
                :fields="fieldsN"
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPageN"
                :sort-by.sync="sortByN"
                :sort-desc.sync="sortDescN"
                :filter="filterN"
                :filter-included-fields="filterOnN"
                @filtered="onFiltered"
              >
                <template v-slot:cell(action)="data">
                  <button
                    class="btn btn-success waves-effect waves-light"
                    type="button"
                    v-b-modal.crearnivel
                    data-toggle="modal"
                    data-target=".bs-example-crearnivel"
                    v-if="crearsubnivel"
                    v-on:click="
                      creasubnivel(data.item.id_nivel, data.item.nombre)
                    "
                  >
                    Crear Subnivel
                  </button>
                </template>
              </b-table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6"  v-if="listarsubnivel">
        <div class="card ">
          <div class="card-header">
            Subniveles
          </div>
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
                    <li class="list-inline-item" v-if="editarsubnivel">
                      <a
                        href="javascript:void(0);"
                        v-on:click="editar(data.item)"
                        class="px-2 text-primary"
                        v-b-modal.crearnivel
                        data-toggle="modal"
                        data-target=".bs-example-crearnivel"
                        v-b-tooltip.hover
                        title="Editar"
                      >
                        <i class="uil uil-pen font-size-18"></i>
                      </a>
                    </li>
                    <li class="list-inline-item" v-if="eliminarsubnivel">
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
          </div>
        </div>

                  <b-modal
                    id="crearnivel"
                    centered
                    :title="titlemodal"
                    title-class="font-15"
                    hide-footer
                    v-if="modal">

                    <form class="needs-validation" @submit.prevent="formSubmit">
                    
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="nivel">Nivel</label>
                                    <input
                                    id="nivel"
                                    v-model="form.nombrenivel"
                                    type="text"
                                    class="form-control"
                                    readonly
                                    
                                    />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="nombre">Nombre Subnivel</label>
                                    <input
                                    id="nombre"
                                    v-model="form.nombre"
                                    type="text"
                                    class="form-control"
                                    placeholder="Seccion A"
                                    :class="{
                                        'is-invalid': submitted && $v.form.nombre.$error,
                                    }"
                                    />
                                    <div
                                        v-if="submitted && $v.form.nombre.$error"
                                        class="invalid-feedback"
                                        >
                                        <span v-if="!$v.form.nombre.required"
                                            >El nombre es requerido.</span
                                        >
                                        </div>
                                   
                                </div>
                            </div>
                        </div>
                        <div class="row">

                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="year">Año de Generación</label>
                                    <input
                                    id="year"
                                    v-model="form.ano_generacion"
                                    type="number"
                                    class="form-control"
                                    placeholder="2021"
                                    :class="{
                                        'is-invalid': submitted && $v.form.ano_generacion.$error,
                                    }"
                                    />
                                    <div
                                        v-if="submitted && $v.form.ano_generacion.$error"
                                        class="invalid-feedback"
                                        >
                                        <span v-if="!$v.form.ano_generacion.required"
                                            >El año de generacion es requerido.</span
                                        >
                                        <span v-if="!$v.form.ano_generacion.numeric"
                                            >El año debe ser numerico.</span
                                        >
                                        <span v-if="!$v.form.ano_generacion.maxLength"
                                            >Debe contener máximo 4 numeros.</span
                                        >
                                        <span v-if="!$v.form.ano_generacion.minLength"
                                            >Debe contener mínimo 4 numeros.</span
                                        >
                                        </div>
                                   
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label></label>
                                    <button class="btn btn-primary float-end" data-dismiss="modal" type="submit">Guardar</button>

                                
                                </div>
                            </div>

                        </div>
                    </form>
                  </b-modal>
      </div>
    </div>
  </Layout>
</template>
