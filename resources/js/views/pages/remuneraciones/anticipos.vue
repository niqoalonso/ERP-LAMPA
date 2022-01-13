<script src="./anticipos.js"></script>

<template>
  <Layout>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Anticipo Mes Actual</h4>

            <div class="row mt-5">

              <div class="col-12 col-lg-6">
                <button
                  type="button"
                  class="btn btn-success waves-effect waves-light float-start"
                  v-b-modal.crearanticipo
                  @click="modalNuevo"
                >
                  <i class="fas fa-plus-circle"></i>
                  Crear Anticipo
                </button>
              </div>

              <div class="col-12 col-lg-6">
                <button
                  type="button"
                  class="btn btn-success waves-effect waves-light float-end"
                  v-if="xpagar == 1"
                  @click="pagaranticipo()"
                >
                  Pagar Anticipos
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
                  <ul class="list-inline mb-0" v-if="data.item.estado_pago == 0">
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        v-on:click="editar(data.item)"
                        class="px-2 text-primary"
                        v-b-modal.crearanticipo
                        data-toggle="modal"
                        data-target=".bs-example-crearanticipo"
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

          </div>

        </div>
      </div>

      <!-- modal -->

      <b-modal
      id="crearanticipo"
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
              <label>Trabajador</label>
              <multiselect
                v-model="form.trabajador"
                :options="optionsTrabajador"
                track-by="id_trabajador"
                :custom-label="customLabel"
                @input="sueldobase()"
              ></multiselect>

              <span
              class="text-danger"
                  v-if="
                    !form.trabajador && submitted
                  "
                  >Trabajador requerido.</span
                >
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label>Cuenta</label>
              <multiselect
                v-model="form.cuenta"
                :options="options"
                track-by=""
                :custom-label="customLabelCuenta"

              ></multiselect>
              <span
              class="text-danger"
                  v-if="
                    !form.cuenta && submitted
                  "
                  >Cuenta requerida.</span
                >
            </div>
          </div>


        </div>


        <div class="row">

            <div class="col-md-6">
            <div class="mb-3">
              <label for="sueldobase">Sueldo Base</label>
              <input
                id="sueldobase"
                v-model="sueldo_base"
                type="text"
                class="form-control"
                readonly

              />
            </div>
          </div>

          <div class="col-md-6">
            <div class="mb-3">
              <label for="monto">Monto</label>
              <input
                id="monto"
                v-model="form.monto"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid': submitted && $v.form.monto.$error,
                }"
              />
              <div
                v-if="submitted && $v.form.monto.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.form.monto.required"
                  >Monto requeridos.</span
                >
              </div>
            </div>
          </div>

        </div>

        <button v-if="btnCreate === true" class="btn btn-primary float-end" type="submit">
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
