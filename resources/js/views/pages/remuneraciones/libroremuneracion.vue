<script src="./libroremuneracion.js"></script>

<template>
    <Layout>
        <div class="row">
            <div class="col-4">
                <div class="form-group mb-3">
                    <label>Selecciona el mes</label>
                    <br />
                    <date-picker
                        v-model="mesbusqueda"
                        type="month"
                        lang="es"
                        confirm
                        placeholder="Selecciona mes"
                        @input="busqueda()"
                    ></date-picker>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row mt-4">
                            <!-- Search -->
                            <div class="col-sm-12 col-md-6">
                                <div
                                    id="tickets-table_filter"
                                    class="dataTables_filter text-md-end"
                                >
                                    <label
                                        class="d-inline-flex align-items-end"
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
                                :sticky-header="stickyHeader"
                                :sort-by.sync="sortBy"
                                :sort-desc.sync="sortDesc"
                                :filter="filter"
                                :filter-included-fields="filterOn"
                                @filtered="onFiltered"
                                foot-clone
                            >
                            <template v-slot:cell(sis)="data">

                                {{data.item.trabajador.afp.sis}}
                            </template>
                                <template #foot()>
                                    <span></span>
                                </template>
                                <template v-slot:foot(dias_trabajados)>
                                    <span>Totales</span>
                                </template>
                                <template v-slot:foot(Sueldo Base)>
                                    <span>{{ sueldo_base | toCurrency }}</span>
                                </template>
                                <template v-slot:foot(horas_extras_monto)>
                                    <span>{{ horas_extras | toCurrency }}</span>
                                </template>
                                <template v-slot:foot(participacion)>
                                    <span>{{
                                        participacion | toCurrency
                                    }}</span>
                                </template>
                                <template v-slot:foot(gratificacion)>
                                    <span>{{
                                        gratificacion | toCurrency
                                    }}</span>
                                </template>
                                <template v-slot:foot(total_imponible)>
                                    <span>{{
                                        total_imponible | toCurrency
                                    }}</span>
                                </template>
                                <template v-slot:foot(BonoMovilizacion)>
                                    <i>{{ movilidad | toCurrency }}</i>
                                </template>
                                <template v-slot:foot(BonoColacion)>
                                    <span>{{ colacion | toCurrency }}</span>
                                </template>
                                <template v-slot:foot(total_haberes)>
                                    <span>{{
                                        total_haberes | toCurrency
                                    }}</span>
                                </template>
                                <template v-slot:foot(AFP)>
                                    <span></span>
                                </template>
                                <template v-slot:foot(afp_monto)>
                                    <span>{{ afp_monto | toCurrency }}</span>
                                </template>
                                <template v-slot:foot(fonasa_monto)>
                                    <span>{{ salud_monto | toCurrency }}</span>
                                </template>
                                <template v-slot:foot(afc_monto)>
                                    <span>{{ afc_monto | toCurrency }}</span>
                                </template>
                                <template v-slot:foot(impuesto_unico)>
                                    <span>{{
                                        impuesto_unico | toCurrency
                                    }}</span>
                                </template>
                                <template v-slot:foot(total_descuentos)>
                                    <span>{{
                                        total_descuentos | toCurrency
                                    }}</span>
                                </template>
                                <template v-slot:foot(alcance_liquido)>
                                    <span>{{
                                        alcance_liquido | toCurrency
                                    }}</span>
                                </template>
                                <template v-slot:foot(sueldo_liquido)>
                                    <span>{{
                                        sueldo_liquido | toCurrency
                                    }}</span>
                                </template>
                                <template #foot(SIS)>
                                    <span></span>
                                </template>
                            </b-table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>
