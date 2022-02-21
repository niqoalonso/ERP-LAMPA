<script src="./libro-caja.js"></script>

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
            <div class="col-4"></div>
            <div class="col-4">
                <button
                    type="button"
                    class="btn btn-success waves-effect waves-light float-end"
                    @click="cerrarcaja()"
                >
                    Cerrar Caja
                </button>
            </div>
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 text-center">
                                <h6>CAJA</h6>
                            </div>
                            <div class="col-md-6 col-12 text-center">
                                <h6 class="mb-2">DEBE</h6>

                                <div class="row mb-4">
                                    <div class="col-3">
                                        <h6>Fecha</h6>
                                    </div>
                                    <div class="col-3">
                                        <h6>Operacion</h6>
                                    </div>
                                    <div class="col-3">
                                        <h6>Cuenta</h6>
                                    </div>
                                    <div class="col-3">
                                        <h6>Monto</h6>
                                    </div>
                                </div>

                                <div
                                    class="row mb-4"
                                    v-for="(item, k) in infodata"
                                    :key="k"
                                >
                                    <div
                                        class="col-3"
                                        v-if="
                                            item.haber > 0 &&
                                            item.plan_cuenta.manual_cuenta
                                                .id_manual_cuenta != 1 &&
                                            item.plan_cuenta.manual_cuenta
                                                .id_manual_cuenta != 2
                                        "
                                    >
                                        <h6>{{ item.fecha_comprobante }}</h6>
                                    </div>
                                    <div
                                        class="col-3"
                                        v-if="
                                            item.haber > 0 &&
                                            item.plan_cuenta.manual_cuenta
                                                .id_manual_cuenta != 1 &&
                                            item.plan_cuenta.manual_cuenta
                                                .id_manual_cuenta != 2
                                        "
                                    >
                                        <h6>{{ item.glosa_comprobante }}</h6>
                                    </div>
                                    <div
                                        class="col-3"
                                        v-if="
                                            item.haber > 0 &&
                                            item.plan_cuenta.manual_cuenta
                                                .id_manual_cuenta != 1 &&
                                            item.plan_cuenta.manual_cuenta
                                                .id_manual_cuenta != 2
                                        "
                                    >
                                        <h6>
                                            {{
                                                item.plan_cuenta.manual_cuenta
                                                    .nombre
                                            }}
                                        </h6>
                                    </div>
                                    <div
                                        class="col-3"
                                        v-if="
                                            item.haber > 0 &&
                                            item.plan_cuenta.manual_cuenta
                                                .id_manual_cuenta != 1 &&
                                            item.plan_cuenta.manual_cuenta
                                                .id_manual_cuenta != 2
                                        "
                                    >
                                        <h6>{{ item.haber | toCurrency }}</h6>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-12 text-center">
                                <h6 class="mb-2">HABER</h6>

                                <div class="row mb-4">
                                    <div class="col-3">
                                        <h6>Fecha</h6>
                                    </div>
                                    <div class="col-3">
                                        <h6>Operacion</h6>
                                    </div>
                                    <div class="col-3">
                                        <h6>Cuenta</h6>
                                    </div>
                                    <div class="col-3">
                                        <h6>Monto</h6>
                                    </div>
                                </div>

                                <div
                                    class="row mb-4"
                                    v-for="(item, k) in infodata"
                                    :key="k"
                                >
                                    <div class="col-3" v-if="item.debe > 0">
                                        <h6>{{ item.fecha_comprobante }}</h6>
                                    </div>
                                    <div class="col-3" v-if="item.debe > 0">
                                        <h6>{{ item.glosa_comprobante }}</h6>
                                    </div>
                                    <div class="col-3" v-if="item.debe > 0">
                                        <h6>
                                            {{
                                                item.plan_cuenta.manual_cuenta
                                                    .nombre
                                            }}
                                        </h6>
                                    </div>
                                    <div class="col-3" v-if="item.debe > 0">
                                        <h6>{{ item.debe | toCurrency }}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-12 text-center">
                                <div class="row mb-4">
                                    <div class="col-3">
                                        <h6></h6>
                                    </div>
                                    <div class="col-3">
                                        <h6></h6>
                                    </div>
                                    <div class="col-3">
                                        <h6></h6>
                                    </div>
                                    <div class="col-3">
                                        <h6>{{ totaldebe | toCurrency }}</h6>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6 col-12 text-center">
                                <div class="row mb-4">
                                    <div class="col-3">
                                        <h6></h6>
                                    </div>
                                    <div class="col-3">
                                        <h6></h6>
                                    </div>
                                    <div class="col-3">
                                        <h6></h6>
                                    </div>
                                    <div class="col-3">
                                        <h6>{{ totalhaber | toCurrency }}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>
