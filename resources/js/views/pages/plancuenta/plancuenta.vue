<script src="./plancuenta.js"></script>

<template>
  <Layout>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body row">
            <div class="col-7">
                <h4 class="card-title">Cento Contable</h4>
            </div>
            <div class="col-5 row d-flex justify-content-end">
                <div class="col-4 d-flex justify-content-end">
                    <button class="btn btn-success" v-b-modal.crearcuenta @click="modalNuevo" ><i class="fa fa-plus-circle"></i> Crear Cuenta</button>
                </div>
                <div class="col-5 d-flex justify-content-end">
                    <button class="btn btn-warning" v-b-modal.modelMiCUenta @click="modalMiCuenta"><i class="fa fa-list"></i> Mis Cuentas</button>                    
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="card ">
          <div class="card-header">
                Mi Plan de Cuentas Contable
          </div>
          <div class="card-body">
            <div class="row mt-4">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
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
                  <label class="d-inline-flex align-items-center">
                    Buscar:
                    <b-form-input
                      v-model="filterN"
                      type="search"
                      placeholder="Buscar..." 
                      class="form-control form-control-sm ms-2"
                    ></b-form-input>
                  </label>
                </div>
              </div>
              <!-- End search -->
            </div>

            <div class="table-responsive mb-0">
              <b-table
                :items="plancuentaData"
                :fields="fieldsN"
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPageN"
                :sort-by.sync="sortByN"
                :sort-desc.sync="sortDescN"
                :filter="filterN"
                :filter-included-fields="filterOnN"
                @filtered="onFiltered"
              >
                <template v-slot:cell(action)="data">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        v-on:click="verInformacion(data.item)"
                        class="px-2 text-info"
                        v-b-modal.informacionManual
                        data-toggle="modal"
                        data-target=".bs-example-informacionManual"
                        v-b-tooltip.hover
                        title="Ver"
                      >
                        <i class="uil uil-notes font-size-18"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        v-on:click="deleteCuenta(data.item)"
                        class="px-2 text-danger"
                        v-b-tooltip.hover
                        title="Eliminar"
                      >
                        <i class="uil uil-minus-circle font-size-18"></i>
                      </a>
                    </li>
                  </ul>
                </template>
              </b-table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="card ">
          <div class="card-header">
            Cuentas Contables
          </div>
          <div class="card-body">
            <div class="row mt-4">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
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
                  <label class="d-inline-flex align-items-center">
                    Buscar:
                    <b-form-input
                      v-model="filter"
                      type="search"
                      placeholder="Buscar..."
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
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        v-on:click="verInformacion(data.item)"
                        class="px-2 text-info"
                        v-b-modal.informacionManual
                        data-toggle="modal"
                        data-target=".bs-example-informacionManual"
                        v-b-tooltip.hover
                        title="Ver"
                      >
                        <i class="uil uil-notes font-size-18"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        v-on:click="addPlanCuenta(data.item)"
                        class="px-2 text-success"
                        v-b-tooltip.hover
                        title="Eliminar"
                      >
                        <i class="uil uil-plus-circle font-size-18"></i>
                      </a>
                    </li>
                  </ul>
                </template>
              </b-table>
            </div>
          </div>
        </div>


        <b-modal id="crearcuenta" size="lg" :title="titlemodal" title-class="font-18" hide-footer v-if="modal">
            <form class="needs-validation" @submit.prevent="formSubmit">
                <div class="row">
                    <input type="number" v-model="form.id_cuenta" hidden="" />
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label for="codigo">Código</label>
                            <div class="row">
                                <div class="col-3">
                                    <input
                                    id="codigo"
                                    v-model="form.codigo1"
                                    type="text"
                                    class="form-control form-control-sm"
                                    :class="{
                                    'is-invalid': submitted && $v.form.codigo1.$error,
                                    }"
                                    />
                                    <div v-if="submitted && $v.form.codigo1.$error" class="invalid-feedback" >
                                        <span v-if="!$v.form.codigo1.required"
                                        >Codigo requeridos.</span
                                        >
                                    </div>
                                    <div v-if="submitted && $v.form.codigo1.$error" class="invalid-feedback" >
                                        <span v-if="!$v.form.codigo1.numeric"
                                        >Solo numeros.</span
                                        >
                                    </div>
                                </div>
                                <div class="col-3">
                                    <input
                                    id="codigo"
                                    v-model="form.codigo2"
                                    type="text"
                                    class="form-control form-control-sm"
                                    :class="{
                                    'is-invalid': submitted && $v.form.codigo2.$error,
                                    }"
                                    />
                                    <div v-if="submitted && $v.form.codigo2.$error" class="invalid-feedback" >
                                        <span v-if="!$v.form.codigo2.required"
                                        >Codigo requeridos.</span
                                        >
                                    </div>
                                    <div v-if="submitted && $v.form.codigo2.$error" class="invalid-feedback" >
                                        <span v-if="!$v.form.codigo2.numeric"
                                        >Solo numeros.</span
                                        >
                                    </div>
                                </div>
                                <div class="col-3">
                                    <input
                                    id="codigo"
                                    v-model="form.codigo3"
                                    type="text"
                                    class="form-control form-control-sm"
                                    :class="{
                                    'is-invalid': submitted && $v.form.codigo3.$error,
                                    }"
                                    />
                                    <div v-if="submitted && $v.form.codigo3.$error" class="invalid-feedback" >
                                        <span v-if="!$v.form.codigo3.required"
                                        >Codigo requeridos.</span
                                        >
                                    </div>
                                    <div v-if="submitted && $v.form.codigo3.$error" class="invalid-feedback" >
                                        <span v-if="!$v.form.codigo3.numeric"
                                        >Solo numeros.</span
                                        >
                                    </div>
                                </div>
                                <div class="col-3">
                                    <input
                                    id="codigo"
                                    v-model="form.codigo4"
                                    type="text"
                                    class="form-control form-control-sm"
                                    :class="{
                                    'is-invalid': submitted && $v.form.codigo4.$error,
                                    }"
                                    />
                                    <div v-if="submitted && $v.form.codigo4.$error" class="invalid-feedback" >
                                        <span v-if="!$v.form.codigo4.required"
                                        >Codigo requeridos.</span
                                        >
                                    </div>
                                    <div v-if="submitted && $v.form.codigo4.$error" class="invalid-feedback" >
                                        <span v-if="!$v.form.codigo4.numeric"
                                        >Solo numeros.</span
                                        >
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="mb-3">
                        <label for="nombre">Nombre</label>
                        <input
                            id="nombre"
                            v-model="form.nombre"
                            type="text"
                            class="form-control form-control-sm"
                            :class="{
                            'is-invalid': submitted && $v.form.nombre.$error,
                            }"
                        />

                        <div
                            v-if="submitted && $v.form.nombre.$error"
                            class="invalid-feedback"
                        >
                            <span v-if="!$v.form.nombre.required"
                            >Nombre requerido.</span
                            >
                        </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="mb-3">
                        <label for="codigo">Descripción</label>
                        <textarea 
                            class ="form-control form-control-sm"
                            v-model="form.descripcion" 
                            >
                        </textarea>
                        <div v-if="submitted && $v.form.descripcion.$error" class="invalid-feedback" >
                            <span v-if="!$v.form.descripcion.required"
                            >Codigo requeridos.</span
                            >
                        </div>
                        <div v-if="submitted && $v.form.descripcion.$error" class="invalid-feedback" >
                            <span v-if="!$v.form.descripcion.numeric"
                            >Solo numeros.</span
                            >
                        </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                        <label>Clasificacion</label>
                        <multiselect
                            v-model="form.clasificacion"
                            placeholder="Seleccionar"
                            :options="clasificacion"
                            track-by="id_clasificacion"
                            label="nombre"
                            @input="getSubClasificacion()"
                            :class="{
                            'is-invalid': submitted && $v.form.clasificacion.$error,
                            }"
                        ></multiselect>
                        <div
                            v-if="submitted && $v.form.clasificacion.$error"
                            class="invalid-feedback"
                        >
                            <span v-if="!$v.form.clasificacion.required"
                            >Categoria requerido.</span
                            >
                        </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                        <label>SubClafisicacion</label>
                        <multiselect
                            v-model="form.subclasificacion"
                            placeholder="Seleccionar"
                            :options="subclasificacion"
                            track-by="id_subclasificacion"
                            label = "nombre"
                            :class="{
                            'is-invalid': submitted && $v.form.subclasificacion.$error,
                            }"
                        ></multiselect>
                        <div
                            v-if="submitted && $v.form.subclasificacion.$error"
                            class="invalid-feedback"
                        >
                            <span v-if="!$v.form.subclasificacion.required"
                            >IVA requerido.</span
                            >
                        </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="mb-3">
                        <label for="codigo">Cargos</label>
                        <input
                            id="nombre"
                            v-model="form.cargos"
                            type="text"
                            class="form-control form-control-sm"
                            :class="{
                            'is-invalid': submitted && $v.form.nombre.$error,
                            }"
                        />
                        <div v-if="submitted && $v.form.nombre.$error" class="invalid-feedback" >
                            <span v-if="!$v.form.nombre.required"
                            >Codigo requeridos.</span
                            >
                        </div>
                        <div v-if="submitted && $v.form.nombre.$error" class="invalid-feedback" >
                            <span v-if="!$v.form.nombre.numeric"
                            >Solo numeros.</span
                            >
                        </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="mb-3">
                        <label for="codigo">Abonos</label>
                        <input
                            id="nombre"
                            v-model="form.abonos"
                            type="text"
                            class="form-control form-control-sm"
                            :class="{
                            'is-invalid': submitted && $v.form.nombre.$error,
                            }"
                        />
                        <div v-if="submitted && $v.form.nombre.$error" class="invalid-feedback" >
                            <span v-if="!$v.form.nombre.required"
                            >Codigo requeridos.</span
                            >
                        </div>
                        <div v-if="submitted && $v.form.nombre.$error" class="invalid-feedback" >
                            <span v-if="!$v.form.nombre.numeric"
                            >Solo numeros.</span
                            >
                        </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="mb-3">
                        <label for="codigo">Saldo Deudor</label>
                        <input
                            id="nombre"
                            v-model="form.saldoDeudor"
                            type="text"
                            class="form-control form-control-sm"
                            :class="{
                            'is-invalid': submitted && $v.form.nombre.$error,
                            }"
                        />
                        <div v-if="submitted && $v.form.nombre.$error" class="invalid-feedback" >
                            <span v-if="!$v.form.nombre.required"
                            >Codigo requeridos.</span
                            >
                        </div>
                        <div v-if="submitted && $v.form.nombre.$error" class="invalid-feedback" >
                            <span v-if="!$v.form.nombre.numeric"
                            >Solo numeros.</span
                            >
                        </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="mb-3">
                        <label for="codigo">Saldo Acreedor</label>
                        <input
                            id="nombre"
                            v-model="form.saldoAcreedor"
                            type="text"
                            class="form-control form-control-sm"
                            :class="{
                            'is-invalid': submitted && $v.form.nombre.$error,
                            }"
                        />
                        <div v-if="submitted && $v.form.nombre.$error" class="invalid-feedback" >
                            <span v-if="!$v.form.nombre.required"
                            >Codigo requeridos.</span
                            >
                        </div>
                        <div v-if="submitted && $v.form.nombre.$error" class="invalid-feedback" >
                            <span v-if="!$v.form.nombre.numeric"
                            >Solo numeros.</span
                            >
                        </div>
                        </div>
                    </div>
                    
                </div>

                <button v-if="btnCreate === true" class="btn btn-primary float-end" type="submit">
                <i class="far fa-save"></i> Crear
                </button>
                <button v-else class="btn btn-primary float-end" type="submit">
                <i class="fas fa-sync"></i> Actualizar
                </button>
                
            </form>
        </b-modal>

        <b-modal
                id="informacionManual"
                centered
                size="lg"
                :title="titlemodal"
                title-class="font-15"
                hide-footer
                v-if="modalInfo">

                <div class="row">
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label for="codigo">CÓDIGO</label>
                            <p><i>{{info.codigo}}</i></p>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="mb-3">
                            <label for="nombre">NOMBRE</label>
                            <p><i>{{info.nombre}}</i></p>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="mb-3">
                            <label for="codigo">DESCRIPCIÓN</label>
                            <p><i>{{info.descripcion}}</i></p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label>CLASIFICACIÓN</label>
                            <p><i>{{info.clasificacion}}</i></p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label>SUBCLASIFICACIÓN</label>
                            <p><i>{{info.subclasificacion}}</i></p>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="mb-3">
                            <label for="codigo">CARGOS</label>
                            <p><i>{{info.cargos}}</i></p>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="mb-3">
                            <label for="codigo">ABONOS</label>
                            <p><i>{{info.abonos}}</i></p>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="mb-3">
                            <label for="codigo">SALDO DEUDOR</label>
                            <p><i>{{info.saldoDeudor}}</i></p>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="mb-3">
                            <label for="codigo">SALDO ACREEDOR</label>
                            <p><i>{{info.saldoAcreedor}}</i></p>
                        </div>
                    </div>
                </div>
        </b-modal>
        
        <b-modal
        id="modelMiCUenta"
        centered
        size="lg"
        :title="titlemodalLista"
        title-class="font-15"
        hide-footer
        v-if="modalListaMiCuenta">
            <div class="row">
                <div class="table-responsive mb-0">
              <b-table
                :items="tableDataMiManual"
                :fields="fieldsMa"
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
                        v-on:click="editarMiCuenta(data.item)"
                        class="px-2 text-warning"
                        v-b-modal.crearcuenta
                        data-toggle="modal"
                        data-target=".bs-example-informacionManual"
                        v-b-tooltip.hover
                        title="Ver"
                      >
                        <i class="uil uil-edit font-size-18"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        v-on:click="verInformacion(data.item)"
                        class="px-2 text-info"
                        v-b-modal.informacionManual
                        data-toggle="modal"
                        data-target=".bs-example-informacionManual"
                        v-b-tooltip.hover
                        title="Ver"
                      >
                        <i class="uil uil-notes font-size-18"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        v-on:click="addMiPlanCuenta(data.item)"
                        class="px-2 text-success"
                        v-b-tooltip.hover
                        title="Eliminar"
                      >
                        <i class="uil uil-plus-circle font-size-18"></i>
                      </a>
                    </li>
                  </ul>
                </template>
              </b-table>
            </div>
            </div>
        </b-modal>

      </div>
    </div>
  </Layout>
</template>
