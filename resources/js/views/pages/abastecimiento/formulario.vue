<script src="./formulario.js"></script>

<template>
  <Layout>
    
        <div class="row" v-if="divFormulario === false">
                <div class="card">
                    <div class="card-body" v-if="divDocumentoDisponible === true">
                        <div class="row">
                            <h6>{{mensajeError}}</h6>
                        </div>
                    </div>
                    <div class="card-body" v-else>
                        <div class="row">
                            <div class="col-10">
                                <h6> <small> Seleccionar documento: </small> <b> {{documentSelectName}} </b></h6>
                            </div>
                            <div class="col-2 d-flex justify-content-end">
                                <router-link to="../abastecimiento_emitir">
                                    <button type="button" class="btn btn-outline-secondary btn-sm"><i class="uil uil-corner-down-left"></i> Volver</button>
                                </router-link>
                            </div>
                        </div>
                        <hr>
                        <div class="row mt-4">
                            <div class="col-sm-12 col-md-6">
                                <div id="tickets-table_length" class="dataTables_length">
                                <label class="d-inline-flex align-items-center">
                                    Show&nbsp;
                                    <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
                                </label>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <div id="tickets-table_filter" class="dataTables_filter text-md-end">
                                    <label class="d-inline-flex align-items-center">
                                        Search:
                                        <b-form-input
                                        v-model="filter"
                                        type="search"
                                        placeholder="Search..."
                                        class="form-control form-control-sm ms-2"
                                        ></b-form-input>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive mb-0">
                            <b-table
                                :items="tableDataDocumentos"
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
                                <template v-slot:cell(acción)="data">
                                    <ul class="list-inline mb-0">
                                        <li class="list-inline-item">
                                        <a
                                            href="javascript:void(0);"
                                            class="px-2 text-success"
                                            v-b-tooltip.hover
                                            title="Ir Documento"
                                            v-on:click="CrearNuevoDocumento(data.item.id_info)" 
                                        >
                                            <i class="uil uil-file-plus-alt font-size-18"></i>
                                        </a>
                                        </li>
                                        
                                    </ul>
                                </template>
                            </b-table>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="dataTables_paginate paging_simple_numbers float-end">
                                <ul class="pagination pagination-rounded mb-0">
                                    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" ></b-pagination>
                                </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>

        <div class="row"  v-else>
            <div class="col-12">
                <div class="card">
                <div class="card-body row">
                    <div class="col-10">
                        <h6><small> Emisión de Documento: </small> <b>{{documentoName}}</b></h6>
                    </div>
                    <div class="col-2 d-flex justify-content-end">
                        <router-link to="../abastecimiento_emitir">
                        <button type="button" class="btn btn-outline-secondary btn-sm"><i class="uil uil-corner-down-left"></i> Volver</button>
                        </router-link>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Información Empresa</h4> 
                            <form @submit.prevent="formSubmit">
                                <div class="row">
                                    <div class="mb-3 col-2">
                                        <label><small> N° Documento</small></label> 
                                        <input type="text" class="form-control form-control-sm" v-model="form.n_documento" readonly>
                                    </div> 
                                    <div class="mb-3 col-6">
                                        <label><small> Proveedor </small></label> 
                                        <multiselect
                                        @input="onChangeProveedor"
                                        v-model="form.proveedor"
                                        placeholder="Seleccionar"
                                        :options="proveedores"
                                        track-by="id_proveedor"
                                        label="razon_social">
                                        </multiselect>
                                    </div> 
                                    <div class="mb-3 col-2">
                                        <label><small> Fecha documento</small></label> 
                                        <input type="date" class="form-control form-control-sm" v-model="form.fechadoc">
                                    </div> 
                                    <div class="mb-3 col-2">
                                        <label><small> Fecha vencimiento</small></label> 
                                        <input type="date" class="form-control form-control-sm" v-model="form.fechaven" v-if="inputFechaVencimiento">
                                        <input type="date" class="form-control form-control-sm" v-model="form.fechaven" v-else disabled>
                                    </div> 
                                    <div class="mb-3 col-5">
                                        <label><small> Dirección</small></label> 
                                        <input type="text" class="form-control form-control-sm" v-model="form.direccion" readonly>
                                    </div> 
                                    <div class="mb-3 col-4">
                                        <label><small> Unidad de Negocio</small></label> 
                                        <multiselect
                                        v-model="form.unidad"
                                        placeholder="Seleccionar" 
                                        :options="unidades"
                                        track-by="id_unidadnegocio"
                                        label="nombre">
                                        </multiselect>
                                    </div>
                                    <div class="mb-3 col-12">
                                        <label><small> Glosa</small></label> 
                                        <input type="text" class="form-control form-control-sm" v-model="form.glosa">
                                    </div> 
                                    <div class="mb-3 col-12 d-flex justify-content-end">
                                        <button type="submit" class="btn btn-success btn-sm"><i class="uil uil-save"></i> Guardar</button>
                                    </div>
                                </div> 
                            </form>
                        </div>
                    </div>
            </div>
        </div>
       

  </Layout>
</template>
