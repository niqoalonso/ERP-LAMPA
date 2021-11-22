<script src="./js.js"></script>

<template>
  <Layout>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Gestión Docentes</h4>

            <button
              type="button"
              class="btn btn-success waves-effect waves-light float-end"
              v-b-modal.creardocente
              v-if="pcreardocente"
              @click="modal=true"
            ><i class="fas fa-plus-circle"></i>
              Nuevo Docente
            </button>
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
                    <li class="list-inline-item" v-if="editardocente">
                      <a
                        href="javascript:void(0);"
                        v-on:click="editar(data.item)"
                        class="px-2 text-primary"
                        v-b-modal.creardocente
                        data-toggle="modal"
                        data-target=".bs-example-creardocente"
                        v-b-tooltip.hover
                        title="Editar"
                      >
                        <i class="uil uil-pen font-size-18"></i>
                      </a>
                    </li>
                    <li class="list-inline-item" v-if="eliminardocente">
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
    </div>

    <b-modal
      id="creardocente"
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
              <label for="nombres">Nombres</label>
              <input
                id="nombres"
                v-model="form.nombres"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid': submitted && $v.form.nombres.$error,
                }"
              />

              <div
                v-if="submitted && $v.form.nombres.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.form.nombres.required"
                  >Nombres requeridos.</span
                >
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="apellidos">Apellidos</label>
              <input
                id="apellidos"
                v-model="form.apellidos"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid': submitted && $v.form.apellidos.$error,
                }"
              />
              <div
                v-if="submitted && $v.form.apellidos.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.form.apellidos.required"
                  >Apellidos requeridos.</span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label for="email">Email</label>
              <input
                id="email"
                v-model="form.email"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid': submitted && $v.form.email.$error,
                }"
                @input="validarEmail($event)"
              />

              <div
                v-if="submitted && $v.form.email.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.form.email.required">Email requerido.</span>
                <span v-if="!$v.form.email.email"
                  >Ingrese un email valido.</span
                >
              
              </div>

              
                <span class="text-danger" v-if="emailexist"
                  >Este email ya está en uso.</span
                >
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="password">Contraseña</label>
              <input
                id="password"
                v-model="form.password"
                type="password"
                class="form-control"
                :class="{
                  'is-invalid': submitted && $v.form.password.$error,
                }"
              />
              <div
                v-if="submitted && $v.form.password.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.form.password.required"
                  >Contraseña requerida.</span
                >
                <span v-if="!$v.form.password.minLength"
                  >Debe contener mínimo 6 caracteres</span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label>Subnivel</label>
              <multiselect
                v-model="form.subnivel_id"
                :options="options"
                track-by="id_subnivel"
                :custom-label="customLabel"
                :multiple="true"
                :class="{
                  'is-invalid': submitted && $v.form.subnivel_id.$error,
                }"
              ></multiselect>
            </div>
          </div>
        </div>
        <button class="btn btn-primary float-end" type="submit">
          Guardar
        </button>
      </form>
    </b-modal>
  </Layout>
</template>
