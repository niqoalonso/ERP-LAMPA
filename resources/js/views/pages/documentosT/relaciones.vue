<script src="./relaciones.js"></script>

<template>
  <Layout>
    <div class="row">
      <div class="col-6">
        <div class="card"  v-if="divAntecesor === true">
          <div class="card-body row">
            <div class="col-8">
                <h6>Relaciones Antecesoras</h6>
            </div>
            <div class="col-4 d-flex justify-content-end">
                <button class="btn btn-success btn-sm" v-b-modal.modalAntecesor data-toggle="modal" data-target=".bs-example-modalAntecesor" v-on:click="nuevoAntecesor()"><i class="fa fa-plus"></i> Nueva Relación</button>
            </div>
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
                :items="tableDataAntecesor"
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
      <div class="col-6" >
        <div class="card" v-if="divSucesor === true">
          <div class="card-body row">
            <div class="col-8">
                <h6>Relaciones Sucesoras</h6>
            </div>
            <div class="col-4 d-flex justify-content-end">
                <button class="btn btn-success btn-sm" v-b-modal.modalSucesor data-toggle="modal" data-target=".bs-example-modalSucesor" v-on:click="nuevoSucesor()"><i class="fa fa-plus"></i> Nueva Relación</button>
            </div>
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
                :items="tableDataSucesor"
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


    <b-modal id="modalAntecesor" size="lg" :title="titlemodalAntecesor" title-class="font-15" hide-footer v-if="modalAntecesor">
        <form class="needs-validation" @submit.prevent="formSubmitAntecesor">
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <h6>Seleccione documentos antesesor:</h6>
                  <multiselect
                    v-model="formAntecesor.select"
                    :options="optionsAntecesor"
                    track-by="id_documento"
                    :custom-label="customLabelAntecesor"
                    :multiple="true"
                  ></multiselect>
                </div>
              </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-md-12 d-flex justify-content-end">
                    <div class="mb-3">
                        <button class="btn btn-primary" type="submit"><i class="uil uil-save"></i> Guardar</button>
                    </div>
                </div>
            </div>
        </form>
    </b-modal>


    <b-modal id="modalSucesor" size="lg" :title="titlemodalSucesor" title-class="font-15" hide-footer v-if="modalSucesor">
        <form class="needs-validation" @submit.prevent="formSubmitSucesor">
            <div class="row">

              <div class="col-md-12">
                <div class="mb-3">
                  <h6>Seleccione documentos antesesor:</h6>
                  <multiselect
                    v-model="formSucesor.select"
                    :options="optionsAntecesor"
                    track-by="id_documento"
                    :custom-label="customLabelAntecesor"
                    :multiple="true"
                  ></multiselect>
                </div>
              </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-md-12 d-flex justify-content-end">
                    <div class="mb-3">
                        <button class="btn btn-primary" type="submit"><i class="uil uil-save"></i> Guardar</button>
                    </div>
                </div>
            </div>
        </form>
    </b-modal>


  </Layout>
</template>
