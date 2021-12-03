<script src="./trabajadores.js"></script>

<template>
  <Layout>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Listado Trabajadores</h4>

            <div class="row mt-5">
              <div class="col-12">
                <button
                  type="button"
                  class="btn btn-success waves-effect waves-light float-end"
                  v-b-modal.trabajadores
                  @click="modalNuevo"
                >
                  <i class="fas fa-plus-circle"></i>
                  Crear Trabajadores
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
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        v-on:click="editar(data.item)"
                        class="px-2 text-primary"
                        v-b-modal.trabajadores
                        data-toggle="modal"
                        data-target=".bs-example-trabajadores"
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
            <div class="row">
              <div class="col">
                <div
                  class="dataTables_paginate paging_simple_numbers float-end"
                >
                  <ul class="pagination pagination-rounded mb-0">
                    <!-- pagination -->
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="rows"
                      :per-page="perPage"
                    ></b-pagination>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- modal -->

      <b-modal
        id="trabajadores"
        size="xl"
        :title="titlemodal"
        title-class="font-18"
        hide-footer
        v-if="modal"
      >
        <form
          class="needs-validation"
          @submit.prevent="formSubmit"
          enctype="multipart/form-data"
        >
          <div class="row">
            <div class="col-md-4">
              <div class="mb-3">
                <label for="rut">Rut</label>
                <input
                  id="rut"
                  v-model="form.rut"
                  type="text"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.rut.$error,
                  }"
                  @input="validarrut($event)"
                />

                <div
                  v-if="submitted && $v.form.rut.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.rut.required">El rut es requerido.</span>
                </div>

                <span class="text-danger" v-if="rutexist">Rut en uso.</span>
              </div>
            </div>
            <div class="col-md-4">
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
                    >Nombre es requerido.</span
                  >
                </div>
              </div>
            </div>
            <div class="col-md-4">
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
                    >Apellidos es requerido.</span
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <div class="mb-3">
                <label for="email">Email</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.email.$error,
                  }"
                />

                <div
                  v-if="submitted && $v.form.email.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.email.required"
                    >email es requerido.</span
                  >
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="mb-3">
                <label for="celular">Celular</label>
                <input
                  id="celular"
                  v-model="form.celular"
                  type="text"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.celular.$error,
                  }"
                />

                <div
                  v-if="submitted && $v.form.celular.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.celular.required"
                    >Celular es requerido.</span
                  >
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="mb-3">
                <label for="fecha_nacimiento">Fecha Nacimiento</label>
                <input
                  id="fecha_nacimiento"
                  v-model="form.fecha_nacimiento"
                  type="date"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.fecha_nacimiento.$error,
                  }"
                />

                <div
                  v-if="submitted && $v.form.fecha_nacimiento.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.fecha_nacimiento.required"
                    >Fecha Nacimiento es requerida.</span
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <div class="mb-3">
                <label for="edad">Edad</label>
                <input
                  id="edad"
                  v-model="form.edad"
                  type="number"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.edad.$error,
                  }"
                />

                <div
                  v-if="submitted && $v.form.edad.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.edad.required">Edad es requerido.</span>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="mb-3">
                <label for="estado_civil">Estado Civil</label>
                <input
                  id="estado_civil"
                  v-model="form.estado_civil"
                  type="text"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.estado_civil.$error,
                  }"
                />

                <div
                  v-if="submitted && $v.form.estado_civil.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.estado_civil.required"
                    >Estado Civil es requerido.</span
                  >
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="mb-3">
                <label for="direccional">Direccional</label>
                <input
                  id="direccional"
                  v-model="form.direccional"
                  type="text"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.direccional.$error,
                  }"
                />

                <div
                  v-if="submitted && $v.form.direccional.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.direccional.required"
                    >Direccional es requerido.</span
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <div class="mb-3">
                <label for="region">Region</label>
                <multiselect
                  v-model="form.region_id"
                  :options="options"
                  track-by="REG_ID"
                  label="REG_NOMBRE"
                  @input="traerComunas()"
                ></multiselect>
              </div>
            </div>
            <div class="col-md-4">
              <div class="mb-3">
                <label for="comuna">Comuna</label>
                <multiselect
                  v-model="form.comuna_id"
                  :options="optionsComuna"
                  track-by="COM_ID"
                  label="COM_NOMBRE"
                ></multiselect>
              </div>
            </div>
            <div class="col-md-4">
              <div class="mb-3">
                <label for="salud">Salud</label>
                <multiselect
                  v-model="form.salud"
                  :options="optionsSalud"
                  track-by="name"
                  label="name"
                ></multiselect>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <div class="mb-3">
                <label for="afp">AFP</label>
                <multiselect
                  v-model="form.afp_id"
                  :options="optionsAfp"
                  track-by="nombre"
                  label="nombre"
                ></multiselect>
              </div>
            </div>
            <div class="col-md-4">
              <div class="mb-3">
                <label for="nacionalidad">Nacionalidad</label>
                <input
                  id="nacionalidad"
                  v-model="form.nacionalidad"
                  type="text"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.nacionalidad.$error,
                  }"
                />

                <div
                  v-if="submitted && $v.form.nacionalidad.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.nacionalidad.required"
                    >Nacionalidad es requerido.</span
                  >
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="mb-3">
                <label for="estado_civil">Carga Familiar</label>
                <div class="row">
                  <div class="col-12 col-md-6">
                    <b-form-radio
                      class="mb-3"
                      v-model="form.carga_familiar"
                      value="1"
                      v-b-modal.carga
                      @input="datoscarga()"
                      plain
                      >SI</b-form-radio
                    >
                  </div>
                  <div class="col-12 col-md-6">
                    <b-form-radio
                      class="mb-3"
                      checked
                      v-model="form.carga_familiar"
                      @input="datoscarga()"
                      value="0"
                      plain
                      >NO</b-form-radio
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- carga -->
          <div class="row" v-if="formcarga && form.carga_familiar == '1'">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="carga">Carga</label>

                <ul class="list-group lista_estudiantes">
                  <li
                    class="list-group-item d-flex justify-content-between"
                    v-for="(carga, i) in formcarga"
                    :key="i"
                  >
                    <span> {{ carga.nombres }} {{ carga.apellidos }}</span>
                    <div>
                      <i
                        class="far fa-edit mr-1"
                        v-b-modal.carga
                        @click="editarRow(carga, i)"
                      ></i>
                      <i class="far fa-trash-alt" @click="deleteRow(i)"></i>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-md-6">
              <div class="mb-3">
                <button
                  type="button"
                  class="btn btn-success waves-effect waves-light float-end"
                  v-b-modal.carga
                  @click="AddCarga()"
                >
                  <i class="fas fa-plus-circle"></i>
                  Crear carga
                </button>
              </div>
            </div>
          </div>
          <!-- carga -->
          <div class="row">
            <div class="col-md-4">
              <div class="mb-3">
                <label for="sueldo_base">Sueldo Base</label>
                <input
                  id="sueldo_base"
                  v-model="form.sueldo_base"
                  type="number"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.sueldo_base.$error,
                  }"
                />

                <div
                  v-if="submitted && $v.form.sueldo_base.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.sueldo_base.required"
                    >Sueldo base es requerido.</span
                  >
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="mb-3">
                <label for="colacion">Colación</label>
                <input
                  id="colacion"
                  v-model="form.colacion"
                  type="number"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.colacion.$error,
                  }"
                />

                <div
                  v-if="submitted && $v.form.colacion.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.colacion.required"
                    >Colación es requerido.</span
                  >
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="mb-3">
                <label for="movilidad">Movilidad</label>
                <input
                  id="movilidad"
                  v-model="form.movilidad"
                  type="number"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.movilidad.$error,
                  }"
                />

                <div
                  v-if="submitted && $v.form.movilidad.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.movilidad.required"
                    >Movilidad es requerido.</span
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <div class="mb-3">
                <label for="contrato">Adjuntar contrato</label>
                <input
                  id="url_pdf"
                  type="file"
                  class="form-control"
                  @change="onFileChange($event)"
                />
              </div>
            </div>
            <div class="col-md-4">
              <div class="mb-3">
                <label for="fecha_contrato">Fecha Contrato</label>
                <input
                  id="fecha_contrato"
                  v-model="form.fecha_contrato"
                  type="date"
                  class="form-control"
                />
              </div>
            </div>
            <div class="col-md-4">
              <div class="mb-3">
                <label for="fecha_fin_contrato">Fecha Fin Contrato</label>
                <input
                  id="fecha_fin_contrato"
                  v-model="form.fecha_fin_contrato"
                  type="date"
                  class="form-control"
                />
              </div>
            </div>
            <div class="col-md-6" v-if="form.anturlpdf">
              <div class="mb-3">
                <a
                  class="btn btn-success waves-effect waves-light float-end"
                  :href="urlbackend + '/storage/' + form.anturlpdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  >ver Contrato</a
                >
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <div class="mb-3">
                <label for="tipo_contrato">Tipo Contrato</label>
                <multiselect
                  v-model="form.tipo_contrato"
                  :options="optionsTipoContrato"
                  track-by="tipo"
                  label="tipo"
                ></multiselect>
                <span
                  v-if="
                    !$v.form.tipo_contrato.$invalid && submitted
                  "
                  >Tipo Contrato es requerido.</span
                >
              </div>
            </div>
            <div class="col-md-4">
              <div class="mb-3">
                <label for="fecha_desvinculacion">Fecha Desvinculación</label>
                <input
                  id="fecha_desvinculacion"
                  v-model="form.fecha_desvinculacion"
                  type="date"
                  class="form-control"
                />
              </div>
            </div>
            <div class="col-md-4">
              <div class="mb-3">
                <label for="motivo_desvinculacion">motivo Desvinculacion</label>
                <input
                  id="motivo_desvinculacion"
                  v-model="form.motivo_desvinculacion"
                  type="text"
                  class="form-control"
                />
              </div>
            </div>
          </div>

          <button
            v-if="btnCreate === true"
            class="btn btn-primary float-end"
            type="submit"
          >
            <i class="far fa-save"></i> Crear
          </button>
          <button v-else class="btn btn-primary float-end" type="submit">
            <i class="fas fa-sync"></i> Actualizar
          </button>
        </form>
      </b-modal>

      <!-- modal -->

      <b-modal
        id="carga"
        size="md"
        title="Agregar Carga"
        title-class="font-18"
        hide-footer
        v-if="modaldatos"
      >
        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label for="rut">Rut</label>
              <input
                id="rut"
                v-model="formacargatemp.rut"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid':
                    submittedformcarga && $v.formacargatemp.rut.$invalid,
                }"
              />

              <div
                v-if="submittedformcarga && $v.formacargatemp.rut.$invalid"
                class="invalid-feedback"
              >
                <span v-if="!$v.formacargatemp.rut.required"
                  >El rut es requerido.</span
                >
              </div>

              <span class="text-danger" v-if="rutexist">Rut en uso.</span>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="nombres">Nombres</label>
              <input
                id="nombres"
                v-model="formacargatemp.nombres"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid':
                    submittedformcarga && $v.formacargatemp.nombres.$invalid,
                }"
              />

              <div
                v-if="submittedformcarga && $v.formacargatemp.nombres.$invalid"
                class="invalid-feedback"
              >
                <span v-if="!$v.formacargatemp.nombres.required"
                  >Nombre es requerido.</span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label for="apellidos">Apellidos</label>
              <input
                id="apellidos"
                v-model="formacargatemp.apellidos"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid':
                    submittedformcarga && $v.formacargatemp.apellidos.$invalid,
                }"
              />

              <div
                v-if="
                  submittedformcarga && $v.formacargatemp.apellidos.$invalid
                "
                class="invalid-feedback"
              >
                <span v-if="!$v.formacargatemp.apellidos.required"
                  >Apellidos es requerido.</span
                >
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="email">Email</label>
              <input
                id="email"
                v-model="formacargatemp.email"
                type="email"
                class="form-control"
                :class="{
                  'is-invalid':
                    submittedformcarga && $v.formacargatemp.email.$invalid,
                }"
              />

              <div
                v-if="submittedformcarga && $v.formacargatemp.email.$invalid"
                class="invalid-feedback"
              >
                <span v-if="!$v.formacargatemp.email.required"
                  >email es requerido.</span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label for="fecha_nacimiento">Fecha Nacimiento</label>
              <input
                id="fecha_nacimiento"
                v-model="formacargatemp.fecha_nacimiento"
                type="date"
                class="form-control"
                :class="{
                  'is-invalid':
                    submittedformcarga &&
                    $v.formacargatemp.fecha_nacimiento.$invalid,
                }"
              />

              <div
                v-if="
                  submittedformcarga &&
                    $v.formacargatemp.fecha_nacimiento.$invalid
                "
                class="invalid-feedback"
              >
                <span v-if="!$v.formacargatemp.fecha_nacimiento.required"
                  >Fecha Nacimiento es requerida.</span
                >
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="nacionalidad">Nacionalidad</label>
              <input
                id="nacionalidad"
                v-model="formacargatemp.nacionalidad"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid':
                    submittedformcarga &&
                    $v.formacargatemp.nacionalidad.$invalid,
                }"
              />

              <div
                v-if="
                  submittedformcarga && $v.formacargatemp.nacionalidad.$invalid
                "
                class="invalid-feedback"
              >
                <span v-if="!$v.formacargatemp.nacionalidad.required"
                  >Nacionalidad es requerido.</span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label for="parentezco">Parentezco</label>
              <multiselect
                v-model="formacargatemp.parentezco"
                :options="optionsParentezco"
                track-by="nombre"
                label="nombre"
              ></multiselect>
              <span
                v-if="
                  !$v.formacargatemp.parentezco.$invalid && submittedformcarga
                "
                >Parentezco es requerido.</span
              >
            </div>
          </div>
          <div class="col-md-6">
              <div class="mb-3">
                <label for="tipo_carga">Tipo Carga</label>
                <multiselect
                  v-model="formacargatemp.tipo_carga"
                  :options="optionsTipoCarga"
                  track-by="tipo"
                  label="tipo"
                ></multiselect>
                <span
                  v-if="
                    !$v.formacargatemp.tipo_carga.$invalid && submitted
                  "
                  >Tipo Carga es requerido.</span
                >
              </div>
            </div>
        </div>

        <button
          class="btn btn-primary float-end"
          type="button"
          @click="guardar()"
        >
          <i class="far fa-save"></i> Crear
        </button>
      </b-modal>
    </div>
  </Layout>
</template>
