import Layout from "../../layouts/main";
import Swal from "sweetalert2";


import { required} from "vuelidate/lib/validators";
import Multiselect from "vue-multiselect";
export default {
  components: {
    Layout,
    Multiselect,
    Swal,
  },
  data() {
    return {
      urlbackend: this.$urlBackend,
      form: {
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
      clasificacion: [],
      subclasificacion: [],
      optiones: 'Mensaje', 
      submitted: false,
      typeform: "create",
      titlemodal: "Nueva Cuenta",
      titlemodalV: "Informacion Cuenta",
      modal: false,
      modalVer: true,
      btnCreate: true,

      // tabla

      tableData: [],

      title: "actividad",
      items: [
        {
          text: "Tables",
        },
        {
          text: "actividad",
          active: true,
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100, 1000],
      filter: null,
      filterOn: [],
      sortBy: "Nivel",
      sortDesc: false,
      fields: [
        {
          label: "Código",
          key: "codigo",
          sortable: true,
        },
        {
          labe: "Nombre",
          key: "nombre",
          sortable: true,
        },
        {
          label: "Clasificación",
          key: "clasificacionD",
          sortable: true,
        },
        {  
          label: "Sub Clasificación",
          key: "subclasificacionD",
          sortable: true,
        },
        "action",
      ],
    };
  },

  validations: {
    form: {
      codigo: {
        required,
      },
      nombre: {
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
    this.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
    this.traerData();
    this.traerInformacion();
    
    this.totalRows = this.items.length;
  },
  methods: {
    
    traerData() {
      this.axios
        .get(`/api/obterDatosSii`)
        .then((response) => {
            this.clasificacion = response.data.clasificacion;
            this.subclasificacion = response.data.subclasificacion;
        
        });
    },

    traerInformacion() {
        this.axios
            .get(`/api/obtenerInformacion`)
            .then((res) => {
              res.data.map((p) => {
                p["clasificacionD"]     = p.clasificacion.nombre;
                p["subclasificacionD"]  = p.sub_clasificacion.nombre;              
                return p;
              });
              this.tableData = res.data;
              this.totalRows = res.data.length;
            })
            .catch(error => {
                console.log(error);
            });
    },

    modalNuevo()
    {
      this.modal = true;
      this.titlemodal = "Nueva Cuenta";
      this.form = {
        codigo: "",
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

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    formSubmit() {
      this.submitted = true;

      this.$v.$touch();

    //   if (!this.$v.$invalid) {
        if (this.typeform == "create") {
          this.axios
            .post(`/api/storeSii`, this.form)
            .then((res) => {
              if (res.data.success) {
                const title = "Nueva Cuenta";
                const message = res.data.success;
                const type = "success";

                this.form = {
                    codigo: "",
                    nombre: "",
                    descripcion: "",
                    clasificacion: "",
                    subclasificacion: "",
                    cargos: "",
                    abonos: "",
                    saldoDeudor: "",
                    saldoAcreedor: "",
                };

                this.modal = false;

                this.$v.form.$reset();
                this.traerInformacion();
                this.successmsg(title, message, type);
              }
            })
            .catch(error => {
                console.clear();
            });
        } else if (this.typeform == "edit") {
          this.axios
            .put(
              `/api/updateSii/${this.form.id_cuenta}`,
              this.form
            )
            .then((res) => {
             
              if (res.data.success) {
                  
                const title     = "Edición Cuenta";
                const message   = "Actualizado Exitosamente";
                const type      = "success";

                this.form = {
                    codigo: "",
                    nombre: "",
                    descripcion: "",
                    clasificacion: "",
                    subclasificacion: "",
                    cargos: "",
                    abonos: "",
                    saldoDeudor: "",
                    saldoAcreedor: "",
                };

                this.modal = false;
                this.titlemodal = "Nueva Cuenta",
                this.traerInformacion();
                this.$v.form.$reset();
                this.btnCreate        = true,

                this.successmsg(title, message, type);
              }
            })
            .catch((error) => {
                console.clear();
            });
        }
    //   }
    },

    successmsg(title, message, type) {
      Swal.fire(title, message, type);
    },

    editar(datos) {
      this.modal = true;

      this.typeform = "edit";
      this.form.id_cuenta                   = datos.id_manual_cuenta;
      this.form.codigo                      = datos.codigo;
      this.form.nombre                      = datos.nombre;
      this.form.descripcion                 = datos.descripcion;
      this.form.clasificacion               = datos.clasificacion;
      this.form.subclasificacion            = datos.sub_clasificacion;
      this.form.cargos                      = datos.cargos;
      this.form.abonos                      = datos.abonos;
      this.form.saldoDeudor                 = datos.saldo_deudor;
      this.form.saldoAcreedor               = datos.saldo_acreedor;
      this.btnCreate        = false,
      (this.titlemodal    = "Editar Cuenta");
    },

    verCuenta(datos){
        this.modalVer = true;
        this.info.codigo            = '-'+datos.codigo;
        this.info.nombre            = '-'+datos.nombre;
        this.info.descripcion       = '-'+datos.descripcion;
        this.info.clasificacion     = '-'+datos.clasificacion.nombre;
        this.info.subclasificacion  = '-'+datos.sub_clasificacion.nombre;
        this.info.cargos            = '-'+datos.cargos;
        this.info.abonos            = '-'+datos.abonos;
        this.info.saldoDeudor       = '-'+datos.saldo_deudor;
        this.info.saldoAcreedor     = '-'+datos.saldo_acreedor;
        (this.titlemodalV    = "Información Cuenta");
    },

    eliminar(datos) {
      if (datos.estado == "Activo") {
        var estado = 2;
        var title = "Desactivar Docente";
        var text = `Esta seguro de desativar al Docente ${datos.nombres} ${datos.apellidos}`;
      } else {
        estado = 1;
        title = "Activar Docente";
        text = `Esta seguro de activar el Docente ${datos.nombres} ${datos.apellidos}`;
      }

      Swal.fire({
        title: title,
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "Si",
      }).then((result) => {
        if (result.value) {
          this.axios
            .delete(
              `/api/eliminarDocente/${datos.id_docente}`
            )
            .then((res) => {
              console.log(res);
              if (res.data.success) {
                var message = "Docente ha sido desactivado";
                var type = "success";
              } else {
                if (estado == 1) {
                  message = "Error al activar el subnivel";
                } else {
                  message = "Error al desactivar el subnivel";
                }
                type = "error";
              }

              this.successmsg(title, message, type);

              this.traerData();
            });
        }
      });
    },

  },
};
