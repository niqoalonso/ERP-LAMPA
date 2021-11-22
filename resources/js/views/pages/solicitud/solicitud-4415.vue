<script src="./solicitud-4415.js"></script>

<template>
  <Layout> 
      <div class="row">
        <div class="col-lg-12">
            <div class="card">
            <div class="card-body">
                <h4 class="card-title">Listado Subnivel</h4>

                <div class="row mt-5">
                    <div class="col-12 col-lg-6">
                        <div class="mb-3">
                        <label>Buscar por</label>
                        <multiselect
                            v-model="subnivelbusqueda"
                            :options="options"
                            track-by="id_subnivel"
                            :custom-label="customLabel"
                            @input="traerbusqueda()"
                        ></multiselect>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>

        <div class="col-lg-12" v-if="subnivelbusqueda">
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
                      <router-link :to="'ver-solicitud-4415/' + data.item.inicio_actividad.empresa_id">
                        <a class="px-2 text-primary" title="ver solicitud">
                          <i class="uil uil-eye font-size-18"></i>
                        </a>
                      </router-link>
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
