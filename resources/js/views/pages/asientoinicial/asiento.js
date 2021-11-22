import Layout from "../../layouts/main";
import Swal from "sweetalert2";
import Vue from 'vue';


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
        idEmpresa: JSON.parse(Vue.prototype.$globalEmpresasSelected),  
        comprobante: "",
        fecha_comprobante: new Date().toISOString().slice(0,10),
        unidadnegocio : "",
        glosa: "",
      },
      idEmpresa: JSON.parse(Vue.prototype.$globalEmpresasSelected),
      comprobantes: [],
      unidadnegocios: [], 
      
      submitted: false,
      typeform: "create", 
      divButton: true, //Para actualizar y crear

      // permiso

      crearproveedor: this.$CrearProveedor,
      listarproveedor: this.$ListarProveedor,
      editarproveedor: this.$EditarProveedor,
      eliminarproveedor: this.$EliminarProveedor,

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
          label: "Codigo",
          key: "codigo",
          sortable: true,
        },
        {
          label: "Tipo Comprobante",
          key: "comprobante",
          sortable: true,
        },
        {
          label: "Glosa",
          key: "glosa",
          sortable: true,
        },
        {
          labe: "Unidad Negocio",
          key: "unidad",
          sortable: true,
        },
        {
          label: "Tipo Comprobante",
          key: "comprobante",
          sortable: true,
        },
        {
            label: "Deber",
            key: "deber",
            sortable: true,
        },
        {
            label: "Haber",
            key: "haber",
            sortable: true,
        },
        "action",
      ],
    };
  },
  validations: {
    form: {
      glosa: {
        required,
      },
      fecha_comprobante: {
        required,
      },
      comprobante: {
        required,
      },
      unidadnegocio: {
        required,
      }
    },
  },

  mounted() {
    this.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    this.traerData();
    this.traerComprobantes();

    this.totalRows = this.items.length;
    
  },
  methods: {

    traerData() {
      this.axios
        .get(`/api/getInicialAsiento/`+this.idEmpresa.id_empresa)
        .then((response) => {
            this.comprobantes = response.data.tipos;
            this.unidadnegocios = response.data.unidad;
            
        });
    },

    traerComprobantes() {
        this.axios
          .get(`/api/getComprobantes/`+this.idEmpresa.id_empresa)
          .then((response) => {
              console.log(response);
              response.data.map((p) => {
                p["unidad"] = p.unidad_negocio.nombre;
                p["comprobante"] = p.tipo_comprobante.nombre;
                // retornar el nuevo objeto
                return p;
              });
              this.tableData = response.data;
          });
      },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    customLabel({ nombre}) {
      return nombre;
    },

    customLabelNegocio({ nombre, codigo}) {
        return `( ${codigo} ) - ${nombre}`;
      },

    formSubmit() {
      
      this.submitted = true;

      this.$v.$touch();
 
      if (!this.$v.$invalid) {
        if (this.typeform == "create") {
          this.axios
            .post(`/api/storeAsiento`, this.form)
            .then((res) => {
              if (res.data.success) {
                const title = "Nuevo  Comprobante";
                const message = "Comprobante creado exitosamente.";
                const type = "success";

                this.form = {
                    idEmpresa: JSON.parse(Vue.prototype.$globalEmpresasSelected),  
                    comprobante: "",
                    fecha_comprobante: new Date().toISOString().slice(0,10),
                    unidadnegocio : "",
                    glosa: "",
                };

                this.$v.form.$reset();

                this.traerComprobantes();
                this.successmsg(title, message, type);
              }
            })
            .catch(error => {
                console.clear();
            });
        } else if (this.typeform == "edit") {
          this.axios
            .put(
              `/api/updateProveedor/${this.form.id_proveedor}`,
              this.form
            )
            .then((res) => {
              if (res.data.success) {
                const title = "Proveedor";
                const message = "Actualizado Exitosamente";
                const type = "success";

                this.form = {
                  id_proveedor: "",
                  rut: "",
                  nombre: "",
                  celular: "",
                  correo: "",
                  direccion: "",
                  giro: "",
                };

                this.traerData();
                this.$v.form.$reset();
                this.divButton = true,

                this.successmsg(title, message, type);
                $('.inputRUT').attr('style', 'border: 1px solid #ced4da !important');
                $('.btnSubmit').prop('disabled',  true);
              }
            })
            .catch((error) => {
                console.clear();
            });
        }
      }
    },
 
    successmsg(title, message, type) {
      Swal.fire(title, message, type);
    },

    editar(datos) {
      this.typeform = "edit";
      this.form.id_proveedor  = datos.id_proveedor;
      this.form.rut           = datos.rut;
      this.form.nombre        = datos.razon_social;
      this.form.celular       = datos.celular;
      this.form.correo        = datos.email;
      this.form.direccion     = datos.direccion;
      this.form.giro          = datos.giro;
      this.divButton = false;
    },

    cancelar()
    {
      this.form = {
        id_proveedor: "",
        rut: "",
        nombre: "",
        celular: "",
        correo: "",
        direccion: "",
        giro: "",
      };
      this.divButton = true;
      this.typeform = "create";
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
