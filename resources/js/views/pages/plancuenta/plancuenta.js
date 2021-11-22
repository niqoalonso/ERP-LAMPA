import Layout from "../../layouts/main";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import Vue from 'vue';

import { required, numeric} from "vuelidate/lib/validators";

export default {
  components: { Layout, Swal, Multiselect },
  data() {
    return {
      urlbackend: this.$urlBackend,
      tableDataMiManual: [],

      titleMa: "SubNiveles",
      itemsMa: [
        {
          text: "Tables",
        },
        {
          text: "SubNiveles",
          active: true,
        },
      ],
      totalRowsMa: 1,
      currentPageMa: 1,
      perPageMa: 10,
      pageOptionsMa: [10, 25, 50, 100],
      filterMa: null,
      filterOnMa: [],
      sortByMa: "Nivel",
      sortDescMa: false,
      fieldsMa: [
        {
          key: "codigo",
          sortable: true,
        },
        {
          key: "nombre",
          sortable: true,
        },
        "action",
      ],
      tableData: [],

      title: "SubNiveles",
      items: [
        {
          text: "Tables",
        },
        {
          text: "SubNiveles",
          active: true,
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "Nivel",
      sortDesc: false,
      fields: [
        {
          key: "codigo",
          sortable: true,
        },
        {
          key: "nombre",
          sortable: true,
        },
        "action",
      ],
      // tabla niveles
      tableDataNivel: [],
      itemsN: [
        {
          text: "Tables",
        },
        {
          text: "SubNiveles",
          active: true,
        },
      ],
      totalRowsN: 1,
      currentPageN: 1,
      perPageN: 10,
      pageOptionsN: [10, 25, 50, 100],
      filterN: null,
      filterOnN: [],
      sortByN: "Nivel",
      sortDescN: false,
      fieldsN: [
        {
          key: "codigo",
          sortable: true,
        },
        {
          key: "nombre",
          sortable: true,
        },
        "action",
      ],
      form: {
        codigo1: "", 
        codigo2: "", 
        codigo3: "", 
        codigo4: "", 
        nombre: "",
        descripcion: "",
        clasificacion: null,
        subclasificacion: null,
        cargos: "",
        abonos: "",
        saldoDeudor: "",
        saldoAcreedor: "",
      },
      info: {
        codigo: "", 
        nombre: "",
        descripcion: "",
        clasificacion: null,
        subclasificacion: null,
        cargos: "",
        abonos: "",
        saldoDeudor: "",
        saldoAcreedor: "",
      },
      formAdd: {
        manual: "",
        empresa: "",
      },
      formAddMiManual: {
        manual: "",
        empresa: "",
      },
      submitted: false,
      submitform: false,
      submit: false,
      typesubmit: false,
      modalInfo: false,
      modalListaMiCuenta: false,
      titlemodal: "Información",
      titlemodalLista: "Listado Mi Manual Cuenta",
      typeform: "create",
      options: [],
      plancuentaSelect: "",
      plancuentaData: [],
      modal: false,
      clasificacion: [],
      subclasificacion: [],

    };
  },
  validations: {
    form: {
      codigo1:{
        required,
        numeric
      },
      codigo2:{
        required,
        numeric
      },
      codigo3:{
        required,
        numeric
      },
      codigo4:{
        required,
        numeric
      },
      nombre: {
        required,
      },
      descripcion:{
        required,
      },
      clasificacion: {
        required,
      },
      subclasificacion: {
        required,
      },
      abonos: {
        required,
      },
      cargos: {
        required,
      },
      salgoDeudor: {
        required,
      },
      saldoAcreedor: {
        required,
      },
    },
  },
  
  mounted() {

    this.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    this.traerDataInicial();
    this.traerplanCuenta();

  },

  methods: {

    traerDataInicial() {
        this.axios
          .get(`/api/obterDatosPlan`)
          .then((response) => {
            console.log(response);
            this.tableData = response.data.datos;
            this.tableDataMiManual = response.data.datosMiManual;
            this.options = response.data.empresas;
            this.clasificacion = response.data.clasificacion;
          });
    },

    getSubClasificacion() {
      if(this.form.clasificacion == null){
        this.subclasificacion = [];
        return false;
      }
      this.axios
        .get(`/api/getSubClasificacion/`+this.form.clasificacion.id_clasificacion)
        .then((response) => {
            
            this.subclasificacion = response.data;
     
        });
    },
  
    verInformacion(datos){
          this.modalInfo = true;
  
          this.info.codigo            = '-'+datos.codigo;
          this.info.nombre            = '-'+datos.nombre;
          this.info.descripcion       = '-'+datos.descripcion;
          this.info.clasificacion     = '-'+datos.clasificacion.nombre;
          this.info.subclasificacion  = '-'+datos.subclasificacion.nombre;
          this.info.cargos            = '-'+datos.cargos;
          this.info.abonos            = '-'+datos.abonos;
          this.info.saldoDeudor       = '-'+datos.saldo_deudor;
          this.info.saldoAcreedor     = '-'+datos.saldo_acreedor;
    },

    addPlanCuenta(datos)
    {   
        this.formAdd.empresa = JSON.parse(Vue.prototype.$globalEmpresasSelected)
        this.formAdd.manual  = datos.id_manual_cuenta;

        this.axios
            .post(`/api/addPlanCuenta`, this.formAdd)
            .then((res) => {
              if (res.data.success) {
                const title = "Plan de Cuenta";
                const message = "cuenta añadida exitosamente";
                const type = "success";

                this.formAdd = {
                  empresa: "",
                  manual: "",
                };

                this.successmsg(title, message, type);

                this.traerplanCuenta();
              }
            })
            .catch((error) => {
                console.clear();
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 4000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                Toast.fire({
                    icon: 'warning',
                    title: error.response.data.errors,
                })
            });
        
    },
    
    addMiPlanCuenta(datos)
    {   
        this.formAdd.empresa = JSON.parse(Vue.prototype.$globalEmpresasSelected)
        this.formAdd.manual  = datos.id_manual_cuenta;

        this.axios
            .post(`/api/addMiPlanCuenta`, this.formAdd)
            .then((res) => {
              
              if (res.data.success) {
                const title = "Plan de Cuenta Contable";
                const message = "cuenta añadida exitosamente";
                const type = "success";

                this.formAdd = {
                  empresa: "",
                  manual: "",
                };

                this.successmsg(title, message, type);

                this.traerplanCuenta();
              }
            })
            .catch((error) => {
                console.clear();
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 4000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                Toast.fire({
                    icon: 'warning',
                    title: error.response.data.errors,
                })
            });
        
    },

    editarMiCuenta(datos)
    {   
      this.axios
        .get(`/api/getSubClasificacion/`+datos.clasificacion.id_clasificacion)
        .then((response) => {
            this.subclasificacion = response.data;
      });

      this.modal = true;
      this.titlemodal = "Editar Cuenta";
      this.typeform =  "edit";
      this.form = {
        idManual: datos.id_manual_cuenta,
        codigo1: datos.codigo1,
        codigo2: datos.codigo2,
        codigo3: datos.codigo3,
        codigo4: datos.codigo4,
        nombre:  datos.nombre,
        descripcion: datos.descripcion,
        clasificacion: datos.clasificacion,
        subclasificacion: datos.sub_clasificacion,
        cargos: datos.cargos,
        abonos: datos.abonos,
        saldoDeudor: datos.saldo_deudor,
        saldoAcreedor: datos.saldo_acreedor,
      };
      this.btnCreate        = true;
    },

    traerplanCuenta(){
        var selected = JSON.parse(Vue.prototype.$globalEmpresasSelected);
        this.axios
        .get(`/api/getPlanCuenta/`+selected.id_empresa)
        .then((response) => {
            response.data.map((p) => {
                if(p.manual_cuenta != null){
                  p["codigo"]     = '(S) '+p.manual_cuenta.codigo;
                  p["nombre"]     = p.manual_cuenta.nombre;  
                }else if(p.mi_manual_cuenta != null){
                  p["codigo"]     = '(M) '+p.mi_manual_cuenta.codigo;
                  p["nombre"]     = p.mi_manual_cuenta.nombre;  
                }
                            
                return p;
              });
          this.plancuentaData = response.data;
        });
        
    },

    deleteCuenta(datos) {
        
        this.formAdd.empresa = this.plancuentaSelect.id_empresa;
        this.formAdd.manual = datos.manual_cuenta.id_manual_cuenta;

        this.axios
        .post(`/api/deleteCuenta`, this.formAdd)
        .then((res) => {
          console.log(res);
        });

       
    },

    modalNuevo()
    {
      this.modal = true;
      this.typeform =  "create";
      this.titlemodal = "Nueva Cuenta";
      this.form = {
        codigo1: "",
        codigo2: "",
        codigo3: "",
        codigo4: "",
        nombre: "",
        descripcion: "",
        clasificacion: "",
        subclasificacion: "",
        cargos: "",
        abonos: "",
        saldoDeudor: "",
        saldoAcreedor: "",
      };
      this.btnCreate        = true;

    },

    modalMiCuenta()
    {
        this.modalListaMiCuenta = true;

        this.axios
            .get(`/api/getDatosMisCuenta`, this.form)
            .then((res) => {
              this.tableDataMiManual = res.data;
            })
            .catch(error => {
                console.clear();
            });
    },

    formSubmit() {
      this.submitted = true;
      
      this.$v.$touch();

        if (this.typeform == "create") {
          this.axios
            .post(`/api/storeMiCuenta`, this.form)
            .then((res) => {
              if (res.data.success) {
                const title = "Nueva Cuenta";
                const message = "Cuenta Creada Exitosamente";
                const type = "success";

                this.form = {
                    codigo1: "", 
                    codigo2: "", 
                    codigo3: "", 
                    codigo4: "", 
                    nombre: "",
                    descripcion: "",
                    clasificacion: null,
                    subclasificacion: null,
                    cargos: "",
                    abonos: "",
                    saldoDeudor: "",
                    saldoAcreedor: "",
                };

                this.modal = false;

                this.$v.form.$reset();
                this.successmsg(title, message, type);
              }
            })
            .catch(error => {
              console.clear();
              const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 4000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
              })
              Toast.fire({
                  icon: 'warning',
                  title: error.response.data.errors,
              })
            });
        } else if (this.typeform == "edit") {
          
          this.axios
            .put(
              `/api/update2/${this.form.idManual}`,
              this.form
            )
            .then((res) => {
          
              if (res.data.success) {
                  
                const title     = "Edición Cuenta";
                const message   = "Actualizado Exitosamente";
                const type      = "success";

                this.form = {
                  codigo1: "", 
                  codigo2: "", 
                  codigo3: "", 
                  codigo4: "", 
                  nombre: "",
                  descripcion: "",
                  clasificacion: null,
                  subclasificacion: null,
                  cargos: "",
                  abonos: "",
                  saldoDeudor: "",
                  saldoAcreedor: "",
              };
  
                this.modal = false;
                this.titlemodal = "Nueva Cuenta",
              
                this.successmsg(title, message, type);
                this.axios
                  .get(`/api/getDatos`, this.form)
                  .then((res) => {
                    this.tableDataMiManual = res.data;
                  })
                  .catch(error => {
                      console.log(error);
                  });
                
              }
            })
            .catch((error) => {
              console.clear();
              const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 4000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
              })
              Toast.fire({
                  icon: 'warning',
                  title: error.response.data.errors,
              })
            });
        }
    },

    onFilteredN(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRowsN = filteredItems.length;
      this.currentPageN = 1;
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    editar(datos) {
      this.form.typeform = "edit";
      this.form.nombre = datos.nombre;
      this.form.ano_generacion = datos.ano_generacion;
      this.form.nivel_id = datos.nivel_id;
      this.form.nombrenivel = datos.nivel;
      this.modal = true;
      this.titlemodal = "Editar Subnivel";
      this.form.id_subnivel = datos.id_subnivel;
    },
 
    successmsg(title, message, type) {
      Swal.fire(title, message, type);
    },

  },
};
