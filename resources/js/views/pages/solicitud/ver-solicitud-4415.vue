<script src="./ver-solicitud-4415.js"></script>

<template>
  <Layout>
    <div class="row">
      <div class="col-12 mb-4">
        <button
          type="button"
          class="btn btn-warning waves-effect waves-light float-start"
          v-b-modal.modalverempresa
        >
          Ver empresa
        </button>

        <button
          type="button"
          class="btn btn-danger waves-effect waves-light float-end"
          v-b-modal.modalalerta
          @click="modalAlertas()"
        >
          Ver alertas
        </button>
      </div>
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-12 mb-3">
                <h4 class="card-title text-center">
                  INSCRIPCIÓN AL ROL ÚNICO TRIBUTARIO Y/O DECLARACION JURADA DE
                  INICIO DE ACTIVIDADES
                </h4>
              </div>

              <div class="col-12 mb-3">
                <div class="row">
                  <div class="col">
                    <div class="card ">
                      <div class="card-header text-center fw-bold">
                        TIPO DE SOLICITUD
                      </div>
                      <div class="card-body">
                        <div class="row">
                          <div class="col colorcolum">
                            <div class="form-check form-check-right mt-2 ">
                              <b-form-checkbox
                                size="lg"
                                v-model="data_form.solcitud_rut"
                                value="1"
                                unchecked-value="0"
                                disabled
                                class="mb-3"
                                checked
                                plain
                                >SOLICITUD DE RUT</b-form-checkbox
                              >
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col colorcolum ">
                            <div class="form-check form-check-right">
                              <b-form-checkbox
                                size="lg"
                                v-model="data_form.inicio_actividad"
                                value="1"
                                unchecked-value="0"
                                disabled
                                class="mb-3"
                                checked
                                plain
                                >INICIO DE ACTIVIDADES</b-form-checkbox
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card ">
                      <div class="card-header text-center fw-bold">
                        FECHA DE INICIO DE ACTIVIDADES
                      </div>
                      <div class="card-body">
                        <div class="row">
                          <div class="col ">
                            <b-form-group>
                              <b-form-input
                                v-model="data_form.f_inicio_actividad"
                                readonly
                                id="date"
                                type="date"
                              ></b-form-input>
                            </b-form-group>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card ">
                      <div class="card-header text-center fw-bold">
                        ROL ÚNICO TRIBUTARIO
                      </div>
                      <div class="card-body">
                        <div class="row">
                          <div class="col ">
                            <b-form-group>
                              <b-form-input
                                readonly
                                v-model="data_form.rol_tributario"
                                type="text"
                              ></b-form-input>
                            </b-form-group>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 mb-3">
                <div class="row row-cols-1 row-cols-md-4">
                  <!-- este es el bueno -->
                  <div class="col" v-for="(regimens, i) in regiments" :key="i">
                    <div class="card">
                      <div class="card-body">
                        <div class="row">
                          <div
                            class="col colorcolum d-flex justify-content-center"
                          >
                            <b-form-radio
                              class="form-check-right mt-3 labelsize mb-3"
                              disabled
                              v-model="data_form.regimen_id"
                              :value="regimens.id_regimen"
                              plain
                            >
                              {{ regimens.nombre }}</b-form-radio
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 mb-3">
                <h6>IDENTIFICACIÓN DEL CONTRIBUYENTE</h6>
              </div>
              <div class="col-12 mb-3">
                <div class="row row-cols-2 row-cols-md-4">
                  <div class="col">
                    <div class="card">
                      <div class="card-header text-center fw-bold">
                        RAZÓN SOCIAL
                      </div>
                      <div class="card-body">
                        <div class="row">
                          <div class="col ">
                            <b-form-group>
                              <b-form-input
                                readonly
                                v-model="data_form.razon_social"
                                type="text"
                              ></b-form-input>
                            </b-form-group>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <div class="card-header text-center fw-bold">
                        APELLIDO PATERNO
                      </div>
                      <div class="card-body">
                        <div class="row">
                          <div class="col ">
                            <b-form-group>
                              <b-form-input
                                readonly
                                v-model="data_form.apellido_p"
                                type="text"
                              ></b-form-input>
                            </b-form-group>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <div class="card-header text-center fw-bold">
                        APELLIDO MATERNO
                      </div>
                      <div class="card-body">
                        <div class="row">
                          <div class="col ">
                            <b-form-group>
                              <b-form-input
                                readonly
                                v-model="data_form.apellido_m"
                                type="text"
                              ></b-form-input>
                            </b-form-group>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <div class="card-header text-center fw-bold">
                        NOMBRES
                      </div>
                      <div class="card-body">
                        <div class="row">
                          <div class="col ">
                            <b-form-group>
                              <b-form-input
                                readonly
                                v-model="data_form.nombres"
                                type="text"
                              ></b-form-input>
                            </b-form-group>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 mb-3">
                <div class="card">
                  <div class="card-header fw-bold text-center">
                    NOMBRE FANTASÍA (SOLO PERSONA JURÍCA)
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col ">
                        <b-form-group>
                          <b-form-input
                            readonly
                            v-model="data_form.nombre_fantasia"
                            type="text"
                          ></b-form-input>
                        </b-form-group>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 mb-3">
                <div class="card">
                  <div class="card-header text-center fw-bold">
                    INSCRIPCIÓN EN EL REGISTRO DE COMERCIO
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-12 col-md-6">
                        <div class="card">
                          <div class="card-header fw-bold text-center">
                            N° DE INSCRIPCIÓN
                          </div>
                          <div class="card-body">
                            <div class="row">
                              <div class="col ">
                                <b-form-group>
                                  <b-form-input
                                    readonly
                                    v-model="data_form.n_insc_comercio"
                                    type="text"
                                  ></b-form-input>
                                </b-form-group>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-12 col-md-6">
                        <div class="card">
                          <div class="card-header fw-bold text-center">
                            FECHA
                          </div>
                          <div class="card-body">
                            <div class="row">
                              <div class="col ">
                                <b-form-group>
                                  <b-form-input
                                    readonly
                                    v-model="data_form.f_insc_comercio"
                                    type="date"
                                  ></b-form-input>
                                </b-form-group>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 mb-3">
                <h6>DOMICILIO O CASA MATRIZ</h6>
              </div>
              <div class="col-12 mb-3">
                <div class="row">
                  <div class="col-12 col-md-3">
                    <div class="card">
                      <div class="card-header fw-bold text-center">
                        CALLE
                      </div>
                      <div class="card-body">
                        <div class="row">
                          <div class="col ">
                            <b-form-group>
                              <b-form-input
                                readonly
                                v-model="data_form.calle_pasaje"
                                type="text"
                              ></b-form-input>
                            </b-form-group>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-md-2">
                    <div class="card">
                      <div class="card-header fw-bold text-center">
                        NÚMERO
                      </div>
                      <div class="card-body">
                        <div class="row">
                          <div class="col ">
                            <b-form-group>
                              <b-form-input
                                readonly
                                v-model="data_form.numero_casa"
                                type="text"
                              ></b-form-input>
                            </b-form-group>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-md-2">
                    <div class="card">
                      <div class="card-header fw-bold text-center">
                        OF./DPTO/LOCAL
                      </div>
                      <div class="card-body">
                        <div class="row">
                          <div class="col ">
                            <b-form-group>
                              <b-form-input
                                readonly
                                v-model="data_form.of_depto"
                                type="text"
                              ></b-form-input>
                            </b-form-group>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-2">
                    <div class="card">
                      <div class="card-header fw-bold text-center">
                        BLOCK
                      </div>
                      <div class="card-body">
                        <div class="row">
                          <div class="col ">
                            <b-form-group>
                              <b-form-input
                                readonly
                                v-model="data_form.bloque"
                                type="text"
                              ></b-form-input>
                            </b-form-group>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-3">
                    <div class="card">
                      <div class="card-header  fw-bold text-center">
                        POBLACIÓN /VILLA
                      </div>
                      <div class="card-body">
                        <div class="row">
                          <div class="col ">
                            <b-form-group>
                              <b-form-input
                                readonly
                                v-model="data_form.villa_poblacion"
                                type="text"
                              ></b-form-input>
                            </b-form-group>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 mb-3">
                <div class="row">
                  <div class="col-12 col-md-2">
                    <div class="card">
                      <div class="card-header fw-bold text-center">
                        ROL AVALÚO PROPIEDAD
                      </div>
                      <div class="card-body">
                        <div class="row">
                          <div class="col ">
                            <b-form-group>
                              <b-form-input
                                readonly
                                v-model="data_form.rol_propietario"
                                type="text"
                              ></b-form-input>
                            </b-form-group>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-md-2">
                    <div class="card">
                      <div class="card-header fw-bold text-center">
                        COMUNA
                      </div>
                      <div class="card-body">
                        <div class="row">
                          <div class="col ">
                            <b-form-group>
                              <b-form-input
                                readonly
                                v-model="data_form.comuna"
                                type="text"
                              ></b-form-input>
                            </b-form-group>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-md-2">
                    <div class="card">
                      <div class="card-header fw-bold text-center">
                        CIUDAD
                      </div>
                      <div class="card-body">
                        <div class="row">
                          <div class="col ">
                            <b-form-group>
                              <b-form-input
                                readonly
                                v-model="data_form.cuidad"
                                type="text"
                              ></b-form-input>
                            </b-form-group>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-2">
                    <div class="card">
                      <div class="card-header fw-bold text-center">
                        REGION
                      </div>
                      <div class="card-body">
                        <div class="row">
                          <div class="col ">
                            <b-form-group>
                              <b-form-input
                                readonly
                                v-model="data_form.region"
                                type="text"
                              ></b-form-input>
                            </b-form-group>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-2">
                    <div class="card">
                      <div class="card-header  fw-bold text-center">
                        TELÉFONO FIJO
                      </div>
                      <div class="card-body">
                        <div class="row">
                          <div class="col ">
                            <b-form-group>
                              <b-form-input
                                readonly
                                v-model="data_form.telefono_fijo"
                                type="text"
                              ></b-form-input>
                            </b-form-group>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-2">
                    <div class="card">
                      <div class="card-header  fw-bold text-center">
                        TELÉFONO MÓVIL
                      </div>
                      <div class="card-body">
                        <div class="row">
                          <div class="col ">
                            <b-form-group>
                              <b-form-input
                                readonly
                                v-model="data_form.telefono_movil"
                                type="text"
                              ></b-form-input>
                            </b-form-group>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 mb-3">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-12">
                        <div class="row">
                          <div class="col-12 mb-2">
                            <div class="card">
                              <div class="card-header fw-bold">
                                DESCRIPCIÓN
                              </div>
                              <div class="card-body">
                                <div class="row">
                                  <div class="col ">
                                    <b-form-group>
                                      <b-form-input
                                        readonly
                                        v-model="
                                          data_form.descripcion_act_economica
                                        "
                                        type="text"
                                      ></b-form-input>
                                    </b-form-group>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 mb-3">
                <div class="card ">
                  <div class="card-header fw-bold text-center">
                    CÓDIGO(S) DE ACTIVIDAD(ES)
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-12 ">
                        <div class="row d-flex justify-content-center">
                          <div class="col-12 col-md-10 mb-2 ">
                            <div class="card ">
                              <div class="card-header text-center fw-bold">
                                PRINCIPAL
                              </div>
                              <div class="card-body ">
                                <div class="row ">
                                  <div class="col-12">
                                    <multiselect
                                      id="giro"
                                      v-model="data_form.giro_id"
                                      placeholder="Seleccionar"
                                      :options="options"
                                      track-by="id_giro"
                                      :custom-label="customLabelGiro"
                                    ></multiselect>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 mb-3">
                <h6>IDENTIFICACIÓN DEL SOCIO Y DECLARACIÓN DEL CAPITAL</h6>
              </div>

              <div class="col-12 mb-3">
                <div class="card">
                  <div class="card-header fw-bold text-center">
                    CAPITAL INICIAL DECLARADO POR EL CONTRIBUYENTE (miles $)
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-12">
                        <div class="row">
                          <div class="col-12 col-md-3 mb-2">
                            <div class="card">
                              <div class="card-header text-center fw-bold">
                                ENTERADO
                              </div>
                              <div class="card-body">
                                <div class="row">
                                  <div class="col ">
                                    <b-form-group>
                                      <b-form-input
                                        readonly
                                        v-model="data_form.enterado"
                                        type="number"
                                      ></b-form-input>
                                    </b-form-group>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-12 col-md-3 mb-2">
                            <div class="card">
                              <div class="card-header text-center fw-bold">
                                POR ENTERAR
                              </div>
                              <div class="card-body">
                                <div class="row">
                                  <div class="col ">
                                    <b-form-group>
                                      <b-form-input
                                        readonly
                                        v-model="data_form.por_enterar"
                                        type="number"
                                      ></b-form-input>
                                    </b-form-group>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-12 col-md-3 mb-2">
                            <div class="card">
                              <div class="card-header text-center fw-bold">
                                TOTAL
                              </div>
                              <div class="card-body">
                                <div class="row">
                                  <div class="col ">
                                    <b-form-group>
                                      <b-form-input
                                        readonly
                                        v-model="data_form.total"
                                        type="number"
                                      ></b-form-input>
                                    </b-form-group>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-12 col-md-3 mb-2">
                            <div class="card">
                              <div class="card-header text-center fw-bold">
                                FECHA PREVISTA A ENTERAR
                              </div>
                              <div class="card-body">
                                <div class="row">
                                  <div class="col ">
                                    <b-form-group>
                                      <b-form-input
                                        readonly
                                        v-model="data_form.f_por_enterar"
                                        type="date"
                                      ></b-form-input>
                                    </b-form-group>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 mb-3">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-12">
                        <div class="row">
                          <div class="col-12 col-md-3 mb-2">
                            <div class="card">
                              <div class="card-header text-center fw-bold">
                                RAZÓN SOCIAL/APELLIDO PATERNO APELLIDO MATERNO
                                NOMBRES
                              </div>
                              <div class="card-body">
                                <div class="row">
                                  <div class="col ">
                                    <b-form-group>
                                      <b-form-input
                                        readonly
                                        v-model="data_form.socio_nombre"
                                        type="text"
                                      ></b-form-input>
                                    </b-form-group>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-12 col-md-2 mb-2">
                            <div class="card">
                              <div class="card-header text-center fw-bold">
                                RUT O CEDULA DE IDENTIDAD
                                <br />
                                <br />
                              </div>
                              <div class="card-body">
                                <div class="row">
                                  <div class="col ">
                                    <b-form-group>
                                      <b-form-input
                                        readonly
                                        v-model="data_form.socio_rut"
                                        type="text"
                                      ></b-form-input>
                                    </b-form-group>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-12 col-md-5 mb-2">
                            <div class="card">
                              <div class="card-header text-center fw-bold">
                                APORTES DE CAPITAL DE SOCIOS/ACCIONISTAS
                              </div>
                              <div class="card-body">
                                <div class="row">
                                  <div class="col">
                                    <div class="card">
                                      <div
                                        class="card-header text-center fw-bold"
                                      >
                                        ENTERADO
                                      </div>
                                      <div class="card-body">
                                        <b-form-group>
                                          <b-form-input
                                            readonly
                                            v-model="data_form.socio_enterado"
                                            type="number"
                                          ></b-form-input>
                                        </b-form-group>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col">
                                    <div class="card">
                                      <div
                                        class="card-header text-center fw-bold"
                                      >
                                        POR ENTERAR
                                      </div>
                                      <div class="card-body">
                                        <b-form-group>
                                          <b-form-input
                                            readonly
                                            v-model="
                                              data_form.socio_por_enterar
                                            "
                                            type="number"
                                          ></b-form-input>
                                        </b-form-group>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col">
                                    <div class="card">
                                      <div
                                        class="card-header text-center fw-bold"
                                      >
                                        FECHA A ENTERAR
                                      </div>
                                      <div class="card-body">
                                        <b-form-group>
                                          <b-form-input
                                            readonly
                                            v-model="data_form.socio_f_enterar"
                                            type="date"
                                          ></b-form-input>
                                        </b-form-group>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-12 col-md-2 mb-2">
                            <div class="card">
                              <div class="card-header text-center fw-bold">
                                PARTICIPACION DE UTILIDADES (%)
                                <br />
                                <br />
                              </div>
                              <div class="card-body">
                                <div class="row">
                                  <div class="col ">
                                    <b-form-group>
                                      <b-form-input
                                        readonly
                                        v-model="data_form.socio_porcentaje"
                                        type="number"
                                      ></b-form-input>
                                    </b-form-group>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 mb-3">
                <h6>REPRESENTANTES (en caso de más de dos)</h6>
              </div>

              <div class="col-12 mb-3">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-12">
                        <div class="row">
                          <div class="col-12 col-md-3 mb-2">
                            <div class="card">
                              <div class="card-header text-center fw-bold">
                                RUT/ CEDULA DE IDENTIDAD
                              </div>
                              <div class="card-body">
                                <div class="row">
                                  <div class="col ">
                                    <b-form-group>
                                      <b-form-input
                                        readonly
                                        v-model="data_form.representante_rut"
                                        type="text"
                                      ></b-form-input>
                                    </b-form-group>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-12 col-md-3 mb-2">
                            <div class="card">
                              <div class="card-header text-center fw-bold">
                                APELLIDO PATERNO
                              </div>
                              <div class="card-body">
                                <div class="row">
                                  <div class="col ">
                                    <b-form-group>
                                      <b-form-input
                                        readonly
                                        v-model="
                                          data_form.representante_apellido_p
                                        "
                                        type="text"
                                      ></b-form-input>
                                    </b-form-group>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-12 col-md-3 mb-2">
                            <div class="card">
                              <div class="card-header text-center fw-bold">
                                APELLIDO MATERNO
                              </div>
                              <div class="card-body">
                                <div class="row">
                                  <div class="col ">
                                    <b-form-group>
                                      <b-form-input
                                        readonly
                                        v-model="
                                          data_form.representante_apellido_m
                                        "
                                        type="text"
                                      ></b-form-input>
                                    </b-form-group>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-12 col-md-3 mb-2">
                            <div class="card">
                              <div class="card-header text-center fw-bold">
                                NOMBRES
                              </div>
                              <div class="card-body">
                                <div class="row">
                                  <div class="col ">
                                    <b-form-group>
                                      <b-form-input
                                        readonly
                                        v-model="data_form.representante_nombre"
                                        type="text"
                                      ></b-form-input>
                                    </b-form-group>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 mb-3">
                <div class="row">
                  <div class="col-12 col-md-4 text-center">
                    <div class="card h-100">
                      <div class="card-body">
                        <h6 class="fw-bold">Uso del Profesor</h6>
                        <div class="" style="height:400px"></div>
                        <h6 class="fw-bold ">FIRMA Y TIMBRE</h6>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-4">
                    <div class="card h-100">
                      <div class="card-body">
                        <form class="needs-validation" @submit.prevent="formSubmit">
                        <div class="row">
                          <div class="col-12">
                            <b-form-group
                              label-cols-sm="2"
                              label-cols-lg="2"
                              label="Fecha"
                              label-for="fecharevi"
                              class="mb-3"
                            >
                              <b-form-input
                                id="fecharevi"
                                v-model="form.profe_fecha_firma"
                                value=""
                                type="date"
                                :class="{
                                  'is-invalid': submitted && $v.form.profe_fecha_firma.$error,
                                }"
                              ></b-form-input>
                              
                            </b-form-group>
                          </div>
                          <div class="col-12">
                            <div class="row">
                              <div class="col-12">
                                <div class="card">
                                  <div class="card-header fw-bold">
                                    <div class="row">
                                      <div class="col-12 col-md-6">
                                        CAT.TRIBUTARIA
                                      </div>
                                      
                                      <div class="col-12 col-md-3">
                                        <b-form-radio
                                          class="mb-3"
                                          required
                                          v-model="form.profe_categoria"
                                          value="1"
                                          plain
                                          
                                          >SI</b-form-radio
                                        >
                                      </div>
                                      <div class="col-12 col-md-3">
                                        <b-form-radio
                                          class="mb-3"
                                          v-model="form.profe_categoria"
                                          value="0"
                                          plain
                                          >NO</b-form-radio
                                        >
                                      </div>
                                      <span class="text-danger mt-2" v-if="$v.form.profe_categoria.$error == true"
                                          >CAT Requerida.</span
                                        >
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-12">
                            <div class="row">
                              <div class="col-12">
                                <div class="card">
                                  <div class="card-header fw-bold">
                                    <div class="row">
                                      <div class="col-12 col-md-2">
                                        IVA
                                      </div>
                                      <div class="col-12 col-md-5">
                                        <b-form-radio
                                          class="mb-3"
                                          v-model="form.profe_iva"
                                          value="1"
                                          plain
                                          >AFECTA</b-form-radio
                                        >
                                      </div>
                                      <div class="col-12 col-md-5">
                                        <b-form-radio
                                          class="mb-3"
                                          v-model="form.profe_iva"
                                          value="0"
                                          plain
                                          >NO AFECTA</b-form-radio
                                        >
                                      </div>

                                      <span class="text-danger mt-2" v-if="$v.form.profe_iva.$error == true"
                                          >IVA Requerido.</span
                                        >
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-12">
                            <div class="row">
                              <div class="col-12">
                                <div class="card">
                                  <div class="card-header fw-bold">
                                    <div class="row">
                                      <div class="col-12 col-md-4">
                                        ANEXO
                                      </div>
                                      <div class="col-12 col-md-4">
                                        <b-form-radio
                                          class="mb-3"
                                          v-model="form.profe_anexo"
                                          value="1"
                                          plain
                                          >SI</b-form-radio
                                        >
                                      </div>
                                      <div class="col-12 col-md-4">
                                        <b-form-radio
                                          class="mb-3"
                                          v-model="form.profe_anexo"
                                          value="0"
                                          plain
                                          >NO</b-form-radio
                                        >
                                      </div>
                                      <span class="text-danger mt-2" v-if="$v.form.profe_anexo.$error == true"
                                          >IVA Requerido.</span
                                        >
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-12 mt-5">
                            <button
                              type="button"
                              v-b-modal.rechazar
                              class="btn btn-danger waves-effect waves-light float-start"
                            >
                              <i class="uil uil-times me-2"></i> Rechazar
                            </button>

                            <button
                              type="submit"
                              class="btn btn-success waves-effect waves-light float-end"
                            >
                              <i class="uil uil-check me-2"></i> Aprobar
                            </button>
                          </div>
                        </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-md-4">
                    <div class="card h-100">
                      <div class="card-header fw-bold">
                        DATO OBLIGATORIO
                      </div>
                      <div class="card-body d-flex  align-items-end">
                        <div class="row text-center">
                          <div class="col-12">
                            <h6>
                              INDIQUE SI EMITIRÁ DOCUMENTOS QUE RESPALDAN EL USO
                              DE CRÉDITO FISCAL
                            </h6>
                          </div>
                          <div class="col-12 d-flex justify-content-center">
                            <div class="row">
                              <div class="col-12 col-md-6">
                                <b-form-radio
                                  class="mb-3"
                                  v-model="data_form.credito_fiscal"
                                  disabled
                                  value="1"
                                  plain
                                  >SI</b-form-radio
                                >
                              </div>
                              <div class="col-12 col-md-6">
                                <b-form-radio
                                  class="mb-3"
                                  v-model="data_form.credito_fiscal"
                                  disabled
                                  value="0"
                                  plain
                                  >NO</b-form-radio
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- modal alertas -->

      <b-modal
        id="modalalerta"
        size="lg"
        title="Alertas "
        title-class="font-18"
        hide-footer
      >
        <div class="row">
          <div class="col-12">
            <div>
              <div class="card">
                <div
                  class="card-body"
                  style="height:400px; overflow-y: scroll "
                >
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
      </b-modal>

      <!-- modal alertas -->

      <!-- modal ver empresa -->

      <b-modal
        id="modalverempresa"
        size="lg"
        title="Información Empresa"
        title-class="font-18"
        hide-footer
      >
        <div class="row">
          <div class="col-12">
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
              </div>
            </div>
          </div>
        </div>
      </b-modal>

      <!-- modal ver empresa -->

      <!-- modal rechazar formulario -->

      <b-modal
        id="rechazar"
        size="lg"
        title="Explicar el motivo del rechazo"
        title-class="font-18"
        hide-footer
      >
        <form class="needs-validation" @submit.prevent="rechazar">
          <div class="row">
            <div class="col-12">
              <div class="mb-3">
                <label>Motivo</label>
                <div>
                  <textarea
                    v-model="form_rechazo.motivo"
                    class="form-control"
                    name="motivo"
                    :class="{
                      'is-invalid':
                        submitted_rechazo && $v.form_rechazo.motivo.$error,
                    }"
                    rows="5"
                  ></textarea>
                  <div
                    v-if="submitted_rechazo && $v.form_rechazo.motivo.$error"
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.form_rechazo.motivo.required"
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

      <!-- modal rechazar formulario -->
    </div>
  </Layout>
</template>
