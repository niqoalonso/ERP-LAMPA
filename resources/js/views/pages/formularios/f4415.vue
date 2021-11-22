<script src="./f4415.js"></script>

<template>
  <Layout>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <form class="needs-validation" @submit.prevent="formSubmit">
              <div class="row">
                <div class="col-12 mb-3">
                  <h4 class="card-title text-center">
                    INSCRIPCIÓN AL ROL ÚNICO TRIBUTARIO Y/O DECLARACION JURADA
                    DE INICIO DE ACTIVIDADES
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
                             
                              <div
                                class="form-check form-check-right mt-2 "
                              >
                                
                                <b-form-checkbox size="lg"
                                  v-on:input="asignarRut()"
                                  v-model="form.solcitud_rut"
                                  value="1"
                                  unchecked-value="0"
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
                             
                              <div
                                class="form-check form-check-right"
                              >
                                
                                <b-form-checkbox size="lg"
                                  v-model="form.inicio_actividad"
                                  value="1"
                                  unchecked-value="0"
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
                                  v-model="form.f_inicio_actividad"
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
                                  v-model="form.rol_tributario"
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
                    <div
                      class="col"
                      v-for="(regimens, i) in regiments"
                      :key="i"
                    >
                      <div class="card">
                        <div class="card-body">
                          <div class="row">
                            <div
                              class="col colorcolum d-flex justify-content-center"
                            >
                              <b-form-radio
                                class="form-check-right mt-3 labelsize mb-3"
                                v-model="form.regimen_id"
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
                                  v-model="form.razon_social"
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
                                  v-model="form.apellido_p"
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
                                  v-model="form.apellido_m"
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
                                  v-model="form.nombres"
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
                              v-model="form.nombre_fantasia"
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
                                      v-model="form.n_insc_comercio"
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
                                      v-model="form.f_insc_comercio"
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
                                  v-model="form.calle_pasaje"
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
                                  v-model="form.numero_casa"
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
                                  v-model="form.of_depto"
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
                                  v-model="form.bloque"
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
                                  v-model="form.villa_poblacion"
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
                                  v-model="form.rol_propietario"
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
                                  v-model="form.comuna"
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
                                  v-model="form.cuidad"
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
                                  v-model="form.region"
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
                                  v-model="form.telefono_fijo"
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
                                  v-model="form.telefono_movil"
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
                                          v-model="
                                            form.descripcion_act_economica
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
                                        v-model="form.giro_id"
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
                                          v-model="form.enterado"
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
                                          v-model="form.por_enterar"
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
                                          v-model="form.total"
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
                                          v-model="form.f_por_enterar"
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
                                <div class="card-body p-2">
                                  <div class="row">
                                    <div class="col ">
                                      <b-form-group>
                                        <b-form-input
                                          v-model="form.socio_nombre"
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
                                          v-model="form.socio_rut"
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
                                              v-model="form.socio_enterado"
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
                                              v-model="form.socio_por_enterar"
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
                                              v-model="form.socio_f_enterar"
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
                                          v-model="form.socio_porcentaje"
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
                                          v-model="form.representante_rut"
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
                                          v-model="
                                            form.representante_apellido_p
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
                                          v-model="
                                            form.representante_apellido_m
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
                                          v-model="form.representante_nombre"
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
                                  value=""
                                  type="date"
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
                                          <b-form-checkbox
                                            value="accepted"
                                            unchecked-value="not_accepted"
                                            class="mb-3"
                                            checked
                                            plain
                                            >1</b-form-checkbox
                                          >
                                        </div>
                                        <div class="col-12 col-md-3">
                                          <b-form-checkbox
                                            value="accepted"
                                            unchecked-value="not_accepted"
                                            class="mb-3"
                                            checked
                                            plain
                                            >2</b-form-checkbox
                                          >
                                        </div>
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
                                            value="a"
                                            plain
                                            >AFECTA</b-form-radio
                                          >
                                        </div>
                                        <div class="col-12 col-md-5">
                                          <b-form-radio
                                            class="mb-3"
                                            value="a"
                                            plain
                                            >NO AFECTA</b-form-radio
                                          >
                                        </div>
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
                                            value="a"
                                            plain
                                            >SI</b-form-radio
                                          >
                                        </div>
                                        <div class="col-12 col-md-4">
                                          <b-form-radio
                                            class="mb-3"
                                            value="a"
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
                    <div class="col-12 col-md-4">
                      <div class="card h-100">
                        <div class="card-header fw-bold">
                          DATO OBLIGATORIO
                        </div>
                        <div class="card-body d-flex  align-items-end">
                          <div class="row text-center">
                            <div class="col-12">
                              <h6>
                                INDIQUE SI EMITIRÁ DOCUMENTOS QUE RESPALDAN EL
                                USO DE CRÉDITO FISCAL
                              </h6>
                            </div>
                            <div class="col-12 d-flex justify-content-center">
                              <div class="row">
                                <div class="col-12 col-md-6">
                                  <b-form-radio
                                    class="mb-3"
                                    v-model="form.credito_fiscal"
                                    value="1"
                                    plain
                                    >SI</b-form-radio
                                  >
                                </div>
                                <div class="col-12 col-md-6">
                                  <b-form-radio
                                    class="mb-3"
                                    v-model="form.credito_fiscal"
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

                <div class="col-12 mb-3">
                  <div class="row">
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
  </Layout>
</template>
