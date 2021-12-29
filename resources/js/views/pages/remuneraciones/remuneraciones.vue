<script src="./remuneraciones.js"></script>

<template>
    <Layout>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Listado Remuneraciones</h4>

                        <div class="row mt-5">
                            <div class="col-12">
                                <button
                                    type="button"
                                    class="
                                        btn btn-success
                                        waves-effect waves-light
                                        float-end
                                    "
                                    v-b-modal.remuneracion
                                    @click="modalNuevo"
                                >
                                    <i class="fas fa-plus-circle"></i>
                                    Crear Remuneración
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
                                <div
                                    id="tickets-table_length"
                                    class="dataTables_length"
                                >
                                    <label
                                        class="d-inline-flex align-items-center"
                                    >
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
                                    <label
                                        class="d-inline-flex align-items-center"
                                    >
                                        Buscar:
                                        <b-form-input
                                            v-model="filter"
                                            type="search"
                                            placeholder="Buscar..."
                                            class="
                                                form-control form-control-sm-sm
                                                ms-2
                                            "
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
                                                v-b-modal.remuneracion
                                                data-toggle="modal"
                                                data-target=".bs-example-remuneracion"
                                                v-b-tooltip.hover
                                                title="Editar"
                                            >
                                                <i
                                                    class="
                                                        uil uil-pen
                                                        font-size-18
                                                    "
                                                ></i>
                                            </a>
                                        </li>
                                        <!-- <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        v-on:click="eliminar(data.item)"
                        class="px-2 text-danger"
                        v-b-tooltip.hover
                        title="Eliminar"
                      >
                        <i class="uil uil-power font-size-18"></i>
                      </a>
                    </li> -->
                                    </ul>
                                </template>
                            </b-table>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div
                                    class="
                                        dataTables_paginate
                                        paging_simple_numbers
                                        float-end
                                    "
                                >
                                    <ul
                                        class="
                                            pagination pagination-rounded
                                            mb-0
                                        "
                                    >
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
                id="remuneracion"
                size="xl"
                :title="titlemodal"
                title-class="font-18"
                hide-footer
                v-if="modal"
            >
                <form class="needs-validation" @submit.prevent="formSubmit">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="mb-3">
                                <label for="trabajador">Trabajador</label>
                                <multiselect
                                    class="form-control-sm"
                                    v-model="form.trabajador_id"
                                    :options="options"
                                    track-by="trabajador_id"
                                    :custom-label="customLabel"
                                    @input="infotrabajador()"
                                ></multiselect>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="sueldo_base">Sueldo Base</label>
                                <input
                                    id="sueldo_base"
                                    v-model="form.sueldo_base"
                                    type="number"
                                    disabled
                                    class="form-control form-control-sm"
                                />
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="dias_trabajados"
                                    >Dias trabajados</label
                                >
                                <input
                                    id="dias_trabajados"
                                    v-model="form.dias_trabajados"
                                    type="number"
                                    class="form-control form-control-sm"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.form.dias_trabajados.$error,
                                    }"
                                />
                                <div
                                    v-if="
                                        submitted &&
                                        $v.form.dias_trabajados.$error
                                    "
                                    class="invalid-feedback"
                                >
                                    <span
                                        v-if="!$v.form.dias_trabajados.required"
                                        >Dias trabajados.</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="monto">Monto</label>
                                <input
                                    id="monto"
                                    v-model="form.monto"
                                    type="number"
                                    class="form-control form-control-sm"
                                    :class="{
                                        'is-invalid':
                                            submitted && $v.form.monto.$error,
                                    }"
                                />
                                <div
                                    v-if="submitted && $v.form.monto.$error"
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.form.monto.required"
                                        >Monto.</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="col-md-1">
                            <div class="mb-3">
                                <label for="cantidad_horas_extras"
                                    >Nro Horas</label
                                >
                                <input
                                    id="cantidad_horas_extras"
                                    v-model="form.cantidad_horas_extras"
                                    type="number"
                                    class="form-control form-control-sm"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.form.cantidad_horas_extras
                                                .$error,
                                    }"
                                />
                                <div
                                    v-if="
                                        submitted &&
                                        $v.form.cantidad_horas_extras.$error
                                    "
                                    class="invalid-feedback"
                                >
                                    <span
                                        v-if="
                                            !$v.form.cantidad_horas_extras
                                                .required
                                        "
                                        >Nro horas extras requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">

                        <div class="col-md-1">
                            <div class="mb-3">
                                <label for="horas_semanales"
                                   style="white-space: nowrap;" >Hrs semanal</label
                                >
                                <input
                                    id="horas_semanales"
                                    v-model="form.horas_semanales"
                                    type="number"
                                    class="form-control form-control-sm"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.form.horas_semanales.$error,
                                    }"
                                />
                                <div
                                    v-if="
                                        submitted &&
                                        $v.form.horas_semanales.$error
                                    "
                                    class="invalid-feedback"
                                >
                                    <span
                                        v-if="!$v.form.horas_semanales.required"
                                        >Horas semanales.</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="col-md-1">
                            <div class="mb-3">
                                <label for="porcentaje_hora_extra"
                                    >% Extras</label
                                >
                                <input
                                    id="porcentaje_hora_extra"
                                    v-model="form.porcentaje_hora_extra"
                                    type="number"
                                    class="form-control form-control-sm"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.form.porcentaje_hora_extra
                                                .$error,
                                    }"
                                    @change="calculohoraextra()"
                                />
                                <div
                                    v-if="
                                        submitted &&
                                        $v.form.porcentaje_hora_extra.$error
                                    "
                                    class="invalid-feedback"
                                >
                                    <span
                                        v-if="
                                            !$v.form.porcentaje_hora_extra
                                                .required
                                        "
                                        >Porcentaje horas extras
                                        requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="horas_extras_monto"
                                    >Monto Horas Extras</label
                                >
                                <input
                                    id="horas_extras_monto"
                                    v-model="form.horas_extras_monto"
                                    type="number"
                                    class="form-control form-control-sm"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.form.horas_extras_monto.$error,
                                    }"
                                />
                                <div
                                    v-if="
                                        submitted &&
                                        $v.form.horas_extras_monto.$error
                                    "
                                    class="invalid-feedback"
                                >
                                    <span
                                        v-if="
                                            !$v.form.horas_extras_monto.required
                                        "
                                        >Monto horas extras requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="sueldominimo">Sueldo Mínimo</label>
                                <input
                                    id="sueldominimo"
                                    v-model="form.sueldo_minimo"
                                    type="number"
                                    class="form-control form-control-sm"
                                />
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="">Gratificación %</label>
                                <select
                                    class="form-control form-control-sm"
                                    v-model="form.porcentajegratificacion"
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="4.75">4.75%</option>
                                    <option value="25">25%</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="gratificacion">Gratificación</label>
                                <input
                                    id="gratificacion"
                                    v-model="form.gratificacion"
                                    type="number"
                                    class="form-control form-control-sm"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.form.gratificacion.$error,
                                    }"
                                />
                                <div
                                    v-if="
                                        submitted &&
                                        $v.form.gratificacion.$error
                                    "
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.form.gratificacion.required"
                                        >Gratificación requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="participacion">Participación</label>
                                <input
                                    id="participacion"
                                    v-model="form.participacion"
                                    type="number"
                                    class="form-control form-control-sm"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.form.participacion.$error,
                                    }"
                                />
                                <div
                                    v-if="
                                        submitted &&
                                        $v.form.participacion.$error
                                    "
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.form.participacion.required"
                                        >Participación requerido.</span
                                    >
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="row">
                        <div class="col-md-9">
                            <div
                                class="row mb-3"
                                v-for="(bono, i) in bonostemp"
                                :key="bono.id"
                            >
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label for="glosa">Glosa</label>
                                        <input
                                            id="glosa"
                                            v-model="bonostemp[i].glosa"
                                            type="text"
                                            class="form-control form-control-sm"
                                        />
                                        <span
                                            class="text-danger"
                                            v-if="
                                                !bonostemp[i].glosa && summitedB
                                            "
                                            >Glosa requerida.</span
                                        >
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label for="monto">Monto</label>
                                        <input
                                            id="monto"
                                            v-model="bonostemp[i].monto"
                                            type="text"
                                            class="form-control form-control-sm"
                                        />
                                        <span
                                            class="text-danger"
                                            v-if="
                                                !bonostemp[i].monto && summitedB
                                            "
                                            >Monto requerida.</span
                                        >
                                    </div>
                                </div>

                                <div class="col-md-4 mt-3">
                                    <div
                                        class="
                                            col-lg-2
                                            align-self-center
                                            d-grid
                                        "
                                    >
                                        <input
                                            type="button"
                                            class="btn btn-primary btn-block"
                                            value="Eliminar"
                                            @click="deleteRow(i)"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <button
                                type="button"
                                class="
                                    btn btn-success
                                    mt-3
                                    mb-3
                                    mt-lg-0
                                    float-end
                                "
                                @click="AddformData"
                            >
                                Agregar Bono
                            </button>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="total_imponible"
                                    >Total Imponible</label
                                >
                                <input
                                    id="total_imponible"
                                    v-model="form.total_imponible"
                                    type="number"
                                    class="form-control form-control-sm"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.form.total_imponible.$error,
                                    }"
                                />
                                <div
                                    v-if="
                                        submitted &&
                                        $v.form.total_imponible.$error
                                    "
                                    class="invalid-feedback"
                                >
                                    <span
                                        v-if="!$v.form.total_imponible.required"
                                        >Total Imponible requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12">
                            <div class="mb-3">
                                <label for="carga">Carga</label>

                                <div
                                    class="row"
                                    v-for="(carga, i) in cargasarray"
                                    :key="i"
                                >
                                    <div class="col-md-4">
                                        <div class="mb-3">
                                            <label for="carga">Carga</label>
                                            <h6>
                                                {{ carga.nombres }}
                                                {{ carga.apellidos }}
                                            </h6>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="mb-3">
                                            <label for="tipocarga"
                                                >Tipo Carga</label
                                            >
                                            <h6>
                                                {{ carga.tipo_carga }}
                                            </h6>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="mb-3">
                                            <label for="montocarga"
                                                >Monto</label
                                            >
                                            <input
                                                id="montocarga"
                                                v-model="cargasarray[i].monto"
                                                type="text"
                                                class="
                                                    form-control form-control-sm
                                                "
                                            />
                                            <span
                                                class="text-danger"
                                                v-if="
                                                    cargasarray[i].monto ==
                                                        '' && submitted
                                                "
                                                >Monto requerido.</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="carga_familiar"
                                    >Nro Carga Familiar</label
                                >
                                <input
                                    id="carga_familiar"
                                    v-model="form.carga_familiar"
                                    type="text"
                                    readonly
                                    class="form-control form-control-sm"
                                />
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="asignacion_familiar"
                                    >Total Asignación Familiar</label
                                >
                                <input
                                    id="asignacion_familiar"
                                    v-model="form.asignacion_familiar"
                                    type="number"
                                    class="form-control form-control-sm"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.form.asignacion_familiar.$error,
                                    }"
                                />
                                <div
                                    v-if="
                                        submitted &&
                                        $v.form.asignacion_familiar.$error
                                    "
                                    class="invalid-feedback"
                                >
                                    <span
                                        v-if="
                                            !$v.form.asignacion_familiar
                                                .required
                                        "
                                        >Total asignación familiar
                                        requerido.</span
                                    >
                                </div>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="colacion">Colación</label>
                                <input
                                    id="colacion"
                                    v-model="form.colacion"
                                    type="number"
                                    class="form-control form-control-sm"
                                    disabled
                                />
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="movilidad">Movilidad</label>
                                <input
                                    id="movilidad"
                                    v-model="form.movilidad"
                                    type="number"
                                    class="form-control form-control-sm"
                                    disabled
                                />
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="viaticos">Viaticos</label>
                                <input
                                    id="viaticos"
                                    v-model="form.viaticos"
                                    type="number"
                                    class="form-control form-control-sm"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.form.viaticos.$error,
                                    }"
                                />
                                <div
                                    v-if="submitted && $v.form.viaticos.$error"
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.form.viaticos.required"
                                        >Viaticos requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="otros">Otros</label>
                                <input
                                    id="otros"
                                    v-model="form.otros"
                                    type="number"
                                    class="form-control form-control-sm"
                                    :class="{
                                        'is-invalid':
                                            submitted && $v.form.otros.$error,
                                    }"
                                />
                                <div
                                    v-if="submitted && $v.form.otros.$error"
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.form.otros.required"
                                        >Otros requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="total_haberes">Total haberes</label>
                                <input
                                    id="total_haberes"
                                    v-model="form.total_haberes"
                                    type="number"
                                    class="form-control form-control-sm"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.form.total_haberes.$error,
                                    }"
                                />
                                <div
                                    v-if="
                                        submitted &&
                                        $v.form.total_haberes.$error
                                    "
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.form.total_haberes.required"
                                        >Total haberes requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="tipo_contrato">Tipo contrato</label>
                                <input
                                    id="tipo_contrato"
                                    v-model="form.tipo_contrato"
                                    type="text"
                                    readonly
                                    class="form-control-plaintext form-control-sm"

                                />
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="afp">AFP Trabajador</label>
                                <input
                                    id="afp"
                                    v-model="form.afp"
                                    type="text"
                                    class="form-control form-control-sm"
                                    disabled
                                />
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="afp">AFP Porcentaje</label>
                                <input
                                    id="afp"
                                    v-model="form.afpporcentaje"
                                    type="text"
                                    class="form-control form-control-sm"
                                />
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="afp_monto">Descuento AFP</label>
                                <input
                                    id="afp_monto"
                                    v-model="form.afp_monto"
                                    type="number"
                                    class="form-control form-control-sm"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.form.afp_monto.$error,
                                    }"
                                />
                                <div
                                    v-if="submitted && $v.form.afp_monto.$error"
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.form.afp_monto.required"
                                        >Descuento AFP requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="salud">Salud Trabajador</label>
                                <input
                                    id="salud"
                                    v-model="form.salud"
                                    type="text"
                                    class="form-control form-control-sm"
                                    disabled
                                />
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="saludporcentaje">Salud %</label>
                                <input
                                    id="saludporcentaje"
                                    v-model="form.saludporcentaje"
                                    type="text"
                                    class="form-control form-control-sm"
                                />
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="isapre_uf">Plan Isapre (UF)</label>
                                <input
                                    id="isapre_uf"
                                    v-model="form.isapre_uf"
                                    type="text"
                                    class="form-control form-control-sm"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="uf">UF</label>
                                <input
                                    id="uf"
                                    v-model="form.uf"
                                    type="number"
                                    class="form-control form-control-sm"
                                    :class="{
                                        'is-invalid':
                                            submitted && $v.form.uf.$error,
                                    }"
                                />
                                <div
                                    v-if="submitted && $v.form.uf.$error"
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.form.uf.required"
                                        >UF requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="salud_monto">Descuento Salud</label>
                                <input
                                    id="salud_monto"
                                    v-model="form.salud_monto"
                                    type="number"
                                    class="form-control form-control-sm"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.form.salud_monto.$error,
                                    }"
                                />
                                <div
                                    v-if="
                                        submitted && $v.form.salud_monto.$error
                                    "
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.form.salud_monto.required"
                                        >Descuento Salu Requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="afc_monto">AFC</label>
                                <input
                                    id="afc_monto"
                                    v-model="form.afc_monto"
                                    type="number"
                                    class="form-control form-control-sm"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.form.afc_monto.$error,
                                    }"
                                />
                                <div
                                    v-if="submitted && $v.form.afc_monto.$error"
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.form.afc_monto.required"
                                        >AFC requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="utm">UTM</label>
                                <input
                                    id="utm"
                                    v-model="form.utm"
                                    type="number"
                                    class="form-control form-control-sm"
                                    @change="impuestounico()"
                                    :class="{
                                        'is-invalid':
                                            submitted && $v.form.utm.$error,
                                    }"
                                />
                                <div
                                    v-if="submitted && $v.form.utm.$error"
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.form.utm.required"
                                        >UTM requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="impuesto_unico"
                                    >Impuesto Unico</label
                                >
                                <input
                                    id="impuesto_unico"
                                    v-model="form.impuesto_unico"
                                    type="number"
                                    class="form-control form-control-sm"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.form.impuesto_unico.$error,
                                    }"
                                />
                                <div
                                    v-if="
                                        submitted &&
                                        $v.form.impuesto_unico.$error
                                    "
                                    class="invalid-feedback"
                                >
                                    <span
                                        v-if="!$v.form.impuesto_unico.required"
                                        >Impuesto Unico requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="alcance_liquido"
                                    >Alcance liquído</label
                                >
                                <input
                                    id="alcance_liquido"
                                    v-model="form.alcance_liquido"
                                    type="number"
                                    class="form-control form-control-sm"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.form.alcance_liquido.$error,
                                    }"
                                />
                                <div
                                    v-if="
                                        submitted &&
                                        $v.form.alcance_liquido.$error
                                    "
                                    class="invalid-feedback"
                                >
                                    <span
                                        v-if="!$v.form.alcance_liquido.required"
                                        >Alcance liquído requerido.</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="anticipo">Anticipo</label>
                                <input
                                    id="anticipo"
                                    v-model="form.anticipo"
                                    type="number"
                                    class="form-control form-control-sm"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.form.anticipo.$error,
                                    }"
                                />
                                <div
                                    v-if="submitted && $v.form.anticipo.$error"
                                    class="invalid-feedback"
                                >
                                    <span v-if="!$v.form.anticipo.required"
                                        >Anticipo requerido.</span
                                    >
                                </div>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <div class="mb-3">
                                <label for="sueldo_liquido"
                                    >Sueldo Liquido</label
                                >
                                <input
                                    id="sueldo_liquido"
                                    v-model="form.sueldo_liquido"
                                    type="number"
                                    class="form-control form-control-sm"
                                    :class="{
                                        'is-invalid':
                                            submitted &&
                                            $v.form.sueldo_liquido.$error,
                                    }"
                                />
                                <div
                                    v-if="
                                        submitted &&
                                        $v.form.sueldo_liquido.$error
                                    "
                                    class="invalid-feedback"
                                >
                                    <span
                                        v-if="!$v.form.sueldo_liquido.required"
                                        >Sueldo Liquido requerido.</span
                                    >
                                </div>
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
                    <button
                        v-else
                        class="btn btn-primary float-end"
                        type="submit"
                    >
                        <i class="fas fa-sync"></i> Actualizar
                    </button>
                </form>
            </b-modal>
        </div>
    </Layout>
</template>
