<script src="./ver-solicitud.js"></script>

<template>
  <Layout>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Solicitud de Registro de Empresa</h4>
          </div>
        </div>
      </div>
      <div class="col-12" v-if="tipo_empresa">
        <div class="row">
          <div class="col-12 col-md-7">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Empresa {{ tipo_empresa }}</h4>

                <div class="row mt-3">
                  <div class="col-12 col-md-6">
                    <h5 class="font-size-16">Rut Empresa</h5>
                    <p>{{ rut_empresa }}</p>
                  </div>
                  <div class="col-12 col-md-6">
                    <h5 class="font-size-16">Rut Representante</h5>
                    <p>{{ rut_represetante }}</p>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-12 col-md-6">
                    <h5 class="font-size-16">Razón Social</h5>
                    <p>{{ razon_social }}</p>
                  </div>
                  <div class="col-12 col-md-6">
                    <h5 class="font-size-16">Nombre Fantasia</h5>
                    <p>{{ nombre_fantasia }}</p>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12 col-md-6">
                    <h5 class="font-size-16">Correo</h5>
                    <p>{{ email }}</p>
                  </div>
                  <div class="col-12 col-md-6">
                    <h5 class="font-size-16">Celular</h5>
                    <p>{{ celular }}</p>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-12 col-md-6">
                    <h5 class="font-size-16">Capital Inicial</h5>
                    <p>{{ capital_inicial }}</p>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-12 mt-4">
                    <button
                      type="button"
                      class="btn btn-danger"
                      v-b-modal.rechazarsolicitud
                    >
                      <i class="uil uil-times me-2"></i> Rechazar
                    </button>
                    <button
                      type="button"
                      class="btn btn-success float-end "
                      v-on:click="aprobarsolicitud(id_empresa)"
                    >
                      <i class="uil uil-check me-2"></i> Aprobar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-5">
            <div>
              <div class="card">
                <div class="card-body">
                  <h5 class="font-size-16 mb-4">Errores</h5>
                  <ul class="activity-feed mb-0 ps-2">
                    <li
                      class="feed-item"
                      v-for="alerta of alertas"
                      :key="alerta.id_alerta"
                    >
                      <div class="feed-item-list">
                        <p class="text-muted mb-1">{{ alerta.mensaje }}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <b-modal
        id="rechazarsolicitud"
        size="lg"
        title="Explicar el motivo del rechazo"
        title-class="font-18"
        hide-footer
      >
        <form class="needs-validation" @submit.prevent="formSubmit">
          <div class="row">
            <div class="col-12">
              <div class="mb-3">
                <label>Motivo</label>
                <div>
                  <textarea
                    v-model="form.motivo"
                    class="form-control"
                    name="motivo"
                    :class="{
                      'is-invalid': submitted && $v.form.motivo.$error,
                    }"
                    rows="5"
                  ></textarea>
                  <div
                    v-if="submitted && $v.form.motivo.$error"
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.form.motivo.required"
                      >El motivo es requerido.</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button class="btn btn-primary float-end" type="submit">
            Guardar
          </button>
        </form>
      </b-modal>
    </div>
  </Layout>
</template>
