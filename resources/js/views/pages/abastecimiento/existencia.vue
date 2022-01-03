<script src="./existencia.js"></script>

<template>
  <Layout>
    
        <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card-body row">
                    <div class="col-10">
                        <h6><small> Mover Existencia: </small> <b>{{documentoName}}</b></h6>
                    </div>
                    <div class="col-2 d-flex justify-content-end">
                        <router-link to="../emitirDocumento">
                        <button type="button" class="btn btn-outline-secondary btn-sm"><i class="uil uil-corner-down-left"></i> Volver</button>
                        </router-link>
                    </div>
                </div>
                </div>
            </div>

            <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Detalle</h4> 
                            <form @submit.prevent="formSubmit">
                                <div class="row">
                                    <div class="mb-3 col-2">
                                        <label><small> Nombre </small></label> 
                                    </div> 
                                    <div class="mb-3 col-1">
                                        <label><small> Cantidad</small></label> 
                                    </div> 
                                    <div class="mb-3 col-2">
                                        <label><small> Precio</small></label> 
                                    </div> 
                                    <div class="mb-3 col-2">
                                        <label><small> Total</small></label> 
                                    </div> 
                                    <div class="col-3">
                                        <label for=""><small> Tarjeta Existencia </small></label>
                                    </div>
                                </div>
                                <div class="row" v-for="item  in detalles" :key="item.id_detalle">
                                    <div class="mb-3 col-2"> 
                                        <input type="text" class="form-control form-control-sm" :value="item.producto.nombre">
                                    </div> 
                                    <div class="mb-3 col-1"> 
                                        <input type="number" class="form-control form-control-sm" :value="item.cantidad" readonly>
                                    </div> 
                                    <div class="mb-3 col-2">
                                        <input type="number" class="form-control form-control-sm" :value="item.precio" readonly >
                                    </div> 
                                    <div class="mb-3 col-2">
                                        <input type="text" class="form-control form-control-sm" :value="item.total" readonly>
                                    </div> 
                                    <div class="mb-3 col-3">
                                            <multiselect
                                            @input="inputNombreChange(item.id_detalle)"
                                            v-model="tarjetas[item.id_detalle]"
                                            placeholder="Seleccionar" 
                                            :options="selectExistencias"
                                            track-by="id_tarjeta"
                                            label="nombre">
                                            </multiselect>
                                    </div>
                                    <div class="mb-3 col-2">
                                            <input type="text" class="form-control form-control-sm" :id="'nameT'+item.id_detalle" v-model="nombreTarjeta[item.id_detalle]" disabled>
                                    </div>
                                </div>
                                <hr>
                                <div class="mb-3 col-12 d-flex justify-content-end">
                                    <button type="submit" class="btn btn-success btn-sm"><i class="uil uil-save"></i> Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
            </div>
        </div>
       
  </Layout>
</template>
