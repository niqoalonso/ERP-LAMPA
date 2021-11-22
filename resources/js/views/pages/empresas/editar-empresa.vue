<script src="./editar.js"></script>

<template>
  <Layout>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-6"></div>
              <div class="col-6">
                <label for="">Seleccione el tipo de empresa</label>
                <multiselect
                  v-model="form.tipo_empresa"
                  track-by="id_tipoempresa"
                  label="nombre"
                  :options="options"
                  class="helo"
                ></multiselect>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="form.tipo_empresa">
      <div class="col-lg-12 mb-4">
        <button
          type="button"
          class="btn btn-warning waves-effect waves-light float-end"
          v-b-modal.vermotivo
          @click="traermotivo()"
        >
          Ver motivo
        </button>
      </div>
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <form class="needs-validation" @submit.prevent="formSubmit">
              <div class="row">
                <div
                  class="col-md-6"
                  v-if="form.tipo_empresa.id_tipoempresa == 1"
                >
                  <div class="mb-3">
                    <label for="rut_empresa">RUT Empresa</label>
                    <input
                      id="rut_empresa"
                      v-model="form.rut_empresa"
                      type="text"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="rut_representante">RUT Representante</label>
                    <input
                      id="rut_representate"
                      v-model="form.rut_represetante"
                      type="text"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="razon_social">Razon Social</label>
                    <input
                      id="razon_social"
                      v-model="form.razon_social"
                      type="text"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="nombre_fantasia">Nombre Fantasia</label>
                    <input
                      id="nombre_fantasia"
                      v-model="form.nombre_fantasia"
                      type="text"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="celular">Telefono</label>
                    <input
                      id="celular"
                      v-model="form.celular"
                      type="text"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="email">Email</label>
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="capital_inicial">Capital Inicial</label>
                    <input
                      id="capital_inicial"
                      v-model="form.capital_inicial"
                      type="number"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="docente">Docente</label>

                    <multiselect
                      v-model="form.docente"
                      :options="optionsDocente"
                      track-by="docente_id"
                      :custom-label="customLabel"
                    ></multiselect>
                  </div>
                </div>
              </div>

              <button class="btn btn-primary float-end" type="submit">
                Guardar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <b-modal
      id="vermotivo"
      title="Motivo de Rechaza"
      title-class="font-18"
    >
      <p>
        {{observacion}}
      </p>
    </b-modal>
  </Layout>
</template>
