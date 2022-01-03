<script src="./documento.js"></script>

<template>
  <Layout>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body row">
            <div class="col-10">
                <h6>Tipo de Documentos</h6>
            </div>
            <div class="col-2 d-flex justify-content-end">
                <button class="btn btn-success btn-sm" v-b-modal.nuevoDoc data-toggle="modal" data-target=".bs-example-nuevoDoc" v-on:click="nuevoDocumento()"><i class="fa fa-plus"></i> Nuevo Documento</button>
            </div>
            <div class="row mt-4">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Show&nbsp;
                    <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
                  </label>
                </div> 
              </div> 
              <!-- Search -->
              <div class="col-sm-12 col-md-6"> 
                <div
                  id="tickets-table_filter"
                  class="dataTables_filter text-md-end" 
                >
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
                    <li class="list-inline-item" >
                      <router-link :to="'documentos_tributario/'+data.item.tipo">
                        <a
                          href="javascript:void(0);"
                          class="px-2 text-primary"
                          v-b-tooltip.hover
                          title="Relaciones"
                        >
                          <i class="uil uil-arrows-resize-h font-size-18"></i>
                        </a>
                      </router-link>
                    </li>
                    <li class="list-inline-item" >
                      <a
                        href="javascript:void(0);"
                        v-on:click="editar(data.item)"
                        class="px-2 text-warning"
                        v-b-modal.nuevoDoc
                        data-toggle="modal"
                        data-target=".bs-example-nuevoDoc"
                        v-b-tooltip.hover 
                        title="Editar"
                      >
                        <i class="uil uil-pen font-size-18"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        v-on:click="eliminar(data.item)"
                        class="px-2 text-danger"
                        v-b-tooltip.hover
                        title="Eliminar"
                      >
                        <i class="uil uil-power font-size-18"></i>
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
    </div>


    <b-modal id="nuevoDoc" size="xl" :title="titlemodal" title-class="font-15" hide-footer v-if="modal">
        <form class="needs-validation" @submit.prevent="formSubmit">
            <div class="row">
                <div class="col-md-2">
                    <div class="mb-3">
                        <label for="tipo">Tipo Documento</label>
                        <input id="tipo" v-model="form.tipo"  type="text" class="form-control form-control-sm"/>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="descripcion">Descripción</label>
                        <input id="descripcion" v-model="form.descripcion"  type="text" class="form-control form-control-sm"/>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="mb-3">
                        <label for="codigo">Codigo SII</label>
                        <input id="codigo" v-model="form.codigo"  type="text" class="form-control form-control-sm"/>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="mb-3">
                        <label for="ciclo">Ciclo</label>
                        <select class="form-control form-control-sm" v-model="form.ciclo">
                            <option value="0">Seleccionar</option>
                            <option value="1">Compra</option>
                            <option value="2">Venta</option>
                            <option value="3">Reumenación</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="mb-3">
                        <label for="nivel">Debe - Haber</label>
                        <select class="form-control form-control-sm" v-model="form.debe_haber">
                            <option value="0">Seleccionar</option>
                            <option value="1">Debe</option>
                            <option value="2">Haber</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3">
                        <label for="nivel">Tipo Comprobante</label>
                        <multiselect
                            v-model="form.comprobante"
                            placeholder="Seleccionar"
                            :options="Tipocomprobantes"
                            track-by="id_tipocomprobante"
                            label="nombre"
                        ></multiselect>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="mb-3">
                        <label for="vencimiento">Fecha Vencimiento</label>
                        <select class="form-control form-control-sm" v-model="form.vencimiento">
                            <option value="0">Seleccionar</option>
                            <option value="1">SI</option>
                            <option value="2">NO</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3">
                        <label for="pago">Pago</label>
                        <select class="form-control form-control-sm" v-model="form.pago" v-on:change="mueveExistencia()">
                            <option value="0">Seleccionar</option>
                            <option value="1">Requiere</option>
                            <option value="2">NO Requiere</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="mb-3">
                        <label for="pago">Mueve Existencia</label>
                        <select class="form-control form-control-sm" v-model="form.existencia" v-if="inputExistencia == true">
                            <option value="0">Seleccionar</option>
                            <option value="1">SI</option>
                            <option value="2">NO</option>
                        </select>
                        <select class="form-control form-control-sm" v-model="form.existencia" v-else disabled="">
                            <option value="1">SI</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-1">
                    <div class="mb-3">
                        <label for="pago">Libro</label>
                        <select class="form-control form-control-sm" v-model="form.libro">
                            <option value="0">Seleccionar</option>
                            <option value="1">Compra</option>
                            <option value="2">Venta</option>
                            <option value="3">Reumenación</option>
                            <option value="4">No requiere</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="mb-3">
                        <label for="pago">IVA / Honorario</label>
                        <select class="form-control form-control-sm" v-model="form.impuesto">
                            <option value="0">Seleccionar</option>
                            <option value="1">Afecto IVA</option>
                            <option value="2">Exento IVA</option>
                            <option value="3">Retención</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="mb-3">
                        <label for="pago">Incrementa / Disminuye</label>
                        <select class="form-control form-control-sm" v-model="form.incrementa_disminuye">
                            <option value="0">Seleccionar</option>
                            <option value="1">Incrementa</option>
                            <option value="2">Disminuye</option>
                            <option value="3">No requiere</option>
                        </select>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="mb-3">
                        <label for="pago">Requiere antecesor</label>
                        <select class="form-control form-control-sm" v-model="form.requiere_antecesor">
                            <option value="0">Seleccionar</option>
                            <option value="1">SI</option>
                            <option value="2">NO</option>
                        </select>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="mb-3">
                        <label for="pago">Requiere sucesor</label>
                        <select class="form-control form-control-sm" v-model="form.requiere_sucesor">
                            <option value="0">Seleccionar</option>
                            <option value="1">SI</option>
                            <option value="2">NO</option>
                        </select>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="mb-3">
                        <label for="pago">Anulacion</label>
                        <select class="form-control form-control-sm" v-model="form.anulacion" v-on:change="DocumentoAnulacion()">
                            <option value="0">Seleccionar</option>
                            <option value="1">SI <small>(Anular)</small></option>
                            <option value="2">NO <small>(Eliminar)</small></option>
                        </select>
                    </div>
                </div>
                
                <div class="col-md-3" v-if="selectDocumentoAnulacion">
                    <div class="mb-3">
                        <label for="pago">Documento Anulación</label>
                        <select class="form-control form-control-sm" v-model="form.doc_anulacion" v-on:change="requireDocumentoAnulacion()">
                            <option value="0">Seleccionar</option>
                            <option value="1">SI requiere</option>
                            <option value="2">NO requiere</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-4" v-if="selectDocumentoTriburario">
                    <div class="mb-3">
                        <label for="nivel">Documento para anular</label>
                        <multiselect
                            v-model="form.doc_paraanular"
                            placeholder="Seleccionar"
                            :options="TipoDocumentoTributarios"
                            track-by="id_documento"
                            label="descripcion"
                        ></multiselect>
                    </div>
                </div>

            </div>
            <!-- <div class="row">

              <div class="col-md-6">
                <div class="mb-3"  v-if="seletAntecesor === true">
                  <h6>Seleccione documentos antesesor:</h6>
                  <multiselect
                    v-model="form.DocAntecesor"
                    :options="optionsAntecesor"
                    track-by="id_documento"
                    :custom-label="customLabelAntecesor"
                    :multiple="true"
                  ></multiselect>
                </div>
              </div>

              <div class="col-md-6">
                <div class="mb-3" v-if="seletSucesor === true">
                  <h6>Seleccione documentos sucesor:</h6>
                  <multiselect
                    v-model="form.DocSucesor"
                    :options="optionsSucesor"
                    track-by="id_documento"
                    :custom-label="customLabelSucesor"
                    :multiple="true"
                  ></multiselect>
                </div>
              </div>

            </div> -->
            <hr>
            <div class="row">
                <div class="col-md-12 d-flex justify-content-end">
                    <div class="mb-3" v-if="buttonForm">
                        <button class="btn btn-primary" type="submit"><i class="uil uil-save"></i> Agregar</button>
                    </div>
                    <div class="mb-3" v-else>
                        <button class="btn btn-primary" type="submit"><i class="uil uil-save"></i> Actualizar</button>
                    </div>
                </div>
            </div>
        </form>
    </b-modal>

  </Layout>
</template>
