<script src="./empresa.js"></script>

<template>
  <Layout>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Listado de Empresa</h4>

            <div class="row mt-1">
              <div class="col-12">
                <router-link to="crear-empresa"
                  ><button
                    type="button"
                    class="btn btn-success waves-effect waves-light float-end"
                  >
                    Crear empresa
                  </button>
                </router-link>
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
                    <li
                      class="list-inline-item"
                      v-if="
                        data.item.estado_id == 5 || data.item.estado_id == 3
                      "
                    >
                      <router-link
                        :to="'unidadNegocio/' + data.item.id_empresa"
                      >
                        <a class="px-2 text-primary" title="Unidad Negocio">
                          <i class="uil uil-sitemap font-size-18"></i>
                        </a>
                      </router-link>
                    </li>
                    <li
                      class="list-inline-item"
                      v-if="
                        data.item.estado_id == 5 || data.item.estado_id == 3
                      "
                    >
                      <router-link
                        :to="'unidadNegocio/' + data.item.id_empresa"
                      >
                        <a class="px-2 text-warning" title="Editar">
                          <i class="uil uil-pen font-size-18"></i>
                        </a>
                      </router-link>
                    </li>
                    <li
                      class="list-inline-item"
                      v-if="data.item.estado_id == 3"
                    >
                      <router-link :to="'f4415/' + data.item.id_empresa">
                        <a class="px-2 text-success" title="Formulario 4415">
                          <i class="uil uil-clipboard font-size-18"></i>
                        </a>
                      </router-link>
                    </li>
                  </ul>
                </template>
              </b-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
