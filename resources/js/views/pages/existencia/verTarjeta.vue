<script src="./verTarjeta.js"></script>

<template>
  <Layout>
    <div class="row">
        <div class="col-12">
            <div class="card">
            <div class="card-body row">
                <div class="col-10">
                    <h6><b>EXISTENCIAS:</b> <small>{{Nameproducto}}</small></h6>
                </div>
                <div class="col-2 d-flex justify-content-end">
                    <router-link to="../existencias">
                    <button type="button" class="btn btn-outline-secondary btn-sm"><i class="uil uil-corner-down-left"></i> Volver</button>
                    </router-link>
                </div>
            </div>
            </div>
        </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body row">
            <div class="row mt-4">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Show&nbsp;
                    <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
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
                    Search:
                    <b-form-input
                      v-model="filter"
                      type="search" 
                      placeholder="Search..."
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
              <template v-slot:cell(acción)="data">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <router-link :to="'existencias/'+data.item.sku">
                      <a
                        href="javascript:void(0);"
                        class="px-2 text-success"
                        v-b-tooltip.hover
                        title="Transferir"
                      >
                        <i class="uil uil-edit font-size-18"></i>
                      </a>
                      </router-link>
                    </li>
                    <li class="list-inline-item">
                      <router-link :to="'modificarDocumento/'+data.item.n_interno">
                      <a
                        href="javascript:void(0);"
                        class="px-0 text-danger"
                        v-b-tooltip.hover
                        title="Eliminar"
                      >
                        <i class="uil uil-trash font-size-18"></i>
                      </a>
                      </router-link>
                    </li>
                  </ul>
                </template>
              </b-table>
            </div>
            <div class="row">
              <div class="col">
                <div class="dataTables_paginate paging_simple_numbers float-end">
                  <ul class="pagination pagination-rounded mb-0">
                    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" ></b-pagination>
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
