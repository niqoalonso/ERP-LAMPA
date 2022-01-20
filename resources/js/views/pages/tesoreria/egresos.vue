<script src="./egresos.js"></script>

<template>
    <Layout>
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body row">
                        <div class="col-10">
                            <h6><b>DOCUMENTOS SIN PAGAR</b></h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <b-tabs
                    justified
                    nav-class="nav-tabs-custom"
                    content-class="p-3 text-muted"
                >
                    <b-tab active>
                        <template v-slot:title>
                            <span class="d-inline-block d-sm-none">
                                <i class="fas fa-home"></i>
                            </span>
                            <span class="d-none d-sm-inline-block"
                                >Compras</span
                            >
                        </template>
                        <div class="card">
                            <div class="card-body row">
                                <div class="row mt-4">
                                    <div class="col-sm-12 col-md-6">
                                        <div
                                            id="tickets-table_length"
                                            class="dataTables_length"
                                        >
                                            <label
                                                class="d-inline-flex align-items-center"
                                            >
                                                Show&nbsp;
                                                <b-form-select
                                                    v-model="perPage"
                                                    size="sm"
                                                    :options="pageOptions"
                                                ></b-form-select
                                                >&nbsp;entries
                                            </label>
                                        </div>
                                    </div>
                                    <!-- Search -->
                                    <div class="col-sm-12 col-md-6">
                                        <div
                                            id="tickets-table_filter"
                                            class="dataTables_filter text-md-end"
                                        >
                                            <label
                                                class="d-inline-flex align-items-center"
                                            >
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
                                                    <a
                                                        href="javascript:void(0);"
                                                        class="px-0 text-success"
                                                        v-on:click="
                                                            aprobarDocumento(
                                                                data.item
                                                            )
                                                        "
                                                        v-b-modal.aprobarpago
                                                        data-toggle="modal"
                                                        data-target=".bs-example-aprobarpago"
                                                        v-b-tooltip.hover
                                                        title="Pagar"
                                                    >
                                                        <i
                                                            class="uil uil-file-check-alt font-size-18"
                                                        ></i>
                                                    </a>
                                                </li>
                                                <li class="list-inline-item">
                                                    <router-link
                                                        :to="
                                                            'modificarDocumento/' +
                                                            data.item.n_interno
                                                        "
                                                    >
                                                        <a
                                                            href="javascript:void(0);"
                                                            class="px-0 text-warning"
                                                            v-b-tooltip.hover
                                                            title="Ver Documentos Asosiados"
                                                        >
                                                            <i
                                                                class="uil uil-file-search-alt font-size-18"
                                                            ></i>
                                                        </a>
                                                    </router-link>
                                                </li>
                                                <li class="list-inline-item">
                                                    <router-link
                                                        :to="
                                                            'modificarDocumento/' +
                                                            data.item.n_interno
                                                        "
                                                    >
                                                        <a
                                                            href="javascript:void(0);"
                                                            class="px-0 text-danger"
                                                            v-b-tooltip.hover
                                                            title="Anular Compra"
                                                        >
                                                            <i
                                                                class="uil uil-file-times-alt font-size-18"
                                                            ></i>
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
                                            <ul
                                                class="pagination pagination-rounded mb-0"
                                            >
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
                    </b-tab>
                    <b-tab>
                        <template v-slot:title>
                            <span class="d-inline-block d-sm-none">
                                <i class="far fa-user"></i>
                            </span>
                            <span class="d-none d-sm-inline-block"
                                >Remuneraciones</span
                            >
                        </template>
                        <div class="card">
                            <div class="card-body row">
                                <div class="row mt-4">
                                    <div class="col-12 mb-2">
                                        <button
                                            type="button"
                                            class="btn btn-success waves-effect waves-light float-end"
                                            v-b-modal.pagarremuneraciones
                                            @click="modalNuevo"
                                        >
                                            Pagar Todas
                                        </button>
                                    </div>
                                    <div class="col-sm-12 col-md-6">
                                        <div
                                            id="tickets-table_length"
                                            class="dataTables_length"
                                        >
                                            <label
                                                class="d-inline-flex align-items-center"
                                            >
                                                Show&nbsp;
                                                <b-form-select
                                                    v-model="perPage"
                                                    size="sm"
                                                    :options="pageOptions"
                                                ></b-form-select
                                                >&nbsp;entries
                                            </label>
                                        </div>
                                    </div>
                                    <!-- Search -->
                                    <div class="col-sm-12 col-md-6">
                                        <div
                                            id="tickets-table_filter"
                                            class="dataTables_filter text-md-end"
                                        >
                                            <label
                                                class="d-inline-flex align-items-center"
                                            >
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
                                        :items="tableDataRemuneraciones"
                                        :fields="fieldsRemuneraciones"
                                        responsive="sm"
                                        :per-page="perPageRemuneraciones"
                                        :current-page="
                                            currentPageRemuneraciones
                                        "
                                        :sort-by.sync="sortByRemuneraciones"
                                        :sort-desc.sync="sortDescRemuneraciones"
                                        :filter="filterRemuneraciones"
                                        :filter-included-fields="
                                            filterOnRemuneraciones
                                        "
                                        @filtered="onFilteredRemuneraciones"
                                    >
                                    </b-table>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div
                                            class="dataTables_paginate paging_simple_numbers float-end"
                                        >
                                            <ul
                                                class="pagination pagination-rounded mb-0"
                                            >
                                                <b-pagination
                                                    v-model="
                                                        currentPageRemuneraciones
                                                    "
                                                    :total-rows="
                                                        totalRowsRemuneraciones
                                                    "
                                                    :per-page="
                                                        perPageRemuneraciones
                                                    "
                                                ></b-pagination>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-tab>
                </b-tabs>
            </div>
        </div>

        <!-- MODAL DE PAGO -->

        <b-modal
            id="aprobarpago"
            size="lg"
            :title="titlemodal"
            title-class="font-18"
            hide-footer
            v-if="modalAprobacion"
        >
            <form
                class="needs-validation"
                @submit.prevent="formSubmitAprobarPago"
            >
                <div class="row">
                    <div class="col-md-2">
                        <div class="mb-3">
                            <label for="compra">N° COMPRA</label>
                            <input
                                id="compra"
                                v-model="formAprobacion.n_encabezado"
                                type="text"
                                class="form-control form-control-sm"
                                readonly
                            />
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="mb-3">
                            <label for="proveedor">PROVEEDOR</label>
                            <input
                                id="proveedor"
                                v-model="formAprobacion.proveedor"
                                type="text"
                                class="form-control form-control-sm"
                                readonly
                            />
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="mb-3">
                            <label for="fecha">FECHA EMISIÓN</label>
                            <input
                                id="fecha"
                                v-model="formAprobacion.f_emision"
                                type="text"
                                class="form-control form-control-sm"
                                readonly
                            />
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label>CUENTA ORIGEN</label>
                            <multiselect
                                v-model="formAprobacion.origen"
                                placeholder="Seleccionar"
                                :options="optionsOrigen"
                                track-by="id_plan_cuenta"
                                label="nombre"
                            ></multiselect>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label>CUENTA DESTINO</label>
                            <multiselect
                                v-model="formAprobacion.destino"
                                placeholder="Seleccionar"
                                :options="optionsDestino"
                                track-by="id_plan_cuenta"
                                label="nombre"
                            ></multiselect>
                        </div>
                    </div>
                </div>

                <button class="btn btn-primary float-end" type="submit">
                    <i class="far fa-save"></i> Aprobar
                </button>
            </form>
        </b-modal>


        <!-- modal pagar remuneraciones -->

      <b-modal
      id="pagarremuneraciones"
      size="lg"
      title="Pagar Remuneraciones"
      title-class="font-18"
      hide-footer
      v-if="modal"
    >
      <form class="needs-validation" @submit.prevent="formSubmitRemuneraciones">

        <div class="row">


          <div class="col-md-6">
            <div class="mb-3">
              <label for="fecha">Fecha</label>
              <input
                id="fecha"
                v-model="formRemuneraciones.fecha"
                type="date"
                class="form-control"
                :class="{
                  'is-invalid': submitted && $v.formRemuneraciones.fecha.$error,
                }"
              />
              <div
                v-if="submitted && $v.formRemuneraciones.fecha.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.formRemuneraciones.fecha.required"
                  >Fecha requeridos.</span
                >
              </div>
            </div>
          </div>


          <div class="col-md-6">
            <div class="mb-3">
              <label>Cuenta</label>
              <multiselect
                v-model="formRemuneraciones.cuenta"
                :options="optionsCuentas"
                track-by=""
                :custom-label="customLabelCuenta"

              ></multiselect>
              <span
              class="text-danger"
                  v-if="
                    !formRemuneraciones.cuenta && submitted
                  "
                  >Cuenta requerida.</span
                >
            </div>
          </div>


        </div>




        <button class="btn btn-primary float-end" type="submit">
          <i class="far fa-save"></i> Pagar
        </button>

      </form>
    </b-modal>


      <!-- modal modal pagar remuneraciones -->
    </Layout>
</template>
