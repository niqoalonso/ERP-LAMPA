<script src="./libro-diario.js"></script>

<template>
    <Layout>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row mb-4">
                            <div class="col-3">
                                <h6>Fecha</h6>
                            </div>
                            <div class="col-3">
                                <h6>Cuenta</h6>
                            </div>
                            <div class="col-3">
                                <h6>Debe</h6>
                            </div>
                            <div class="col-3">
                                <h6>Haber</h6>
                            </div>
                        </div>
                        <div
                            class="row"
                            v-for="(item, k) in tableData"
                            :key="k"
                            style="border: 1px solid #eee"
                        >
                            <div class="col-3 mt-2">
                                <h6>{{ item.fecha_comprobante }}</h6>
                            </div>
                            <div class="col-3 mt-2">
                                <ul
                                    v-for="(item2, j) in item.detalle_comprobantes"
                                    :key="k + j"
                                    style="list-style: none; padding: 0;"
                                >
                                    <li
                                        v-if="
                                            item2.plan_cuenta.manual_cuenta
                                                .nombre
                                        "
                                    >
                                        {{
                                            item2.plan_cuenta.manual_cuenta
                                                .nombre
                                        }}
                                    </li>
                                    <li v-else>
                                        {{
                                            item2.plan_cuenta.manual_cuenta
                                                .nombre
                                        }}
                                    </li>
                                </ul>
                            </div>
                            <div class="col-3 mt-2">
                                <ul
                                    v-for="(item2, j) in item.detalle_comprobantes"
                                    :key="k + j"
                                    style="list-style: none; padding: 0;"
                                >
                                    <li class="nav-item">{{ item2.debe | toCurrency }}</li>
                                </ul>
                            </div>
                            <div class="col-3 mt-2">
                                <ul
                                    v-for="(item2, j) in item.detalle_comprobantes"
                                    :key="k + j"
                                    style="list-style: none; padding: 0;"
                                >
                                    <li>{{ item2.haber | toCurrency}}</li>
                                </ul>
                            </div>

                            <div class="col-12">
                                <div class="row mb-4">
                                    <div class="col-3">
                                        <h6></h6>
                                    </div>
                                    <div class="col-3">
                                        <h6>Totales</h6>
                                    </div>
                                    <div class="col-3">
                                        <h6>{{ item.deber | toCurrency}}</h6>
                                    </div>
                                    <div class="col-3">
                                        <h6>{{ item.haber | toCurrency}}</h6>
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
