<script src="./libro-mayor.js"></script>
<template>
    <Layout>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row row-cols-2 row-cols-md-4 g-4">
                            <div class="col-md-3 col-sm-6" v-for="(item, i) in infodata"
                                    :key="i">
                                <div class="card mt-3 h-100">
                                    <div class="card-body">
                                        <h5 class="card-title text-center text-uppercase mb-4">{{item.manual_cuenta.nombre}}</h5>
                                        <div class="row">

                                            <div class="col-6 text-center fw-bold">DEBE</div>
                                            <div class="col-6 text-center fw-bold">HABER</div>

                                        </div>
                                        <div class="row border-bottom" v-for="(item2, j) in item.detalle_comprobantes" :key ="j">
                                            <div class="col-6 text-center">{{item2.debe | toCurrency}}</div>
                                            <div class="col-6 text-center">{{item2.haber | toCurrency}}</div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-6 text-center">{{item.totaldebe | toCurrency}}</div>
                                            <div class="col-6 text-center">{{item.totalhaber | toCurrency}}</div>
                                        </div>
                                        <div class="row mt-2 border" v-if="item.saldodeudor > 0">
                                            <div class="col-6 text-center fw-bold">Saldo Deudor</div>
                                            <div class="col-6 text-center">{{item.saldodeudor | toCurrency}}</div>
                                        </div>
                                        <div class="row mt-2 border" v-if="item.sa > 0">
                                            <div class="col-6 text-center">{{item.sa | toCurrency}}</div>
                                            <div class="col-6 text-center fw-bold">Saldo Acreedor</div>
                                        </div>
                                        <div class="row mt-2 border" v-if="item.sa == item.saldodeudor">
                                            <div class="col-12 text-center fw-bold">Cuenta Saldada</div>
                                        </div>
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
