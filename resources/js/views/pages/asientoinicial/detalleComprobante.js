import Layout from "../../layouts/main";
import Swal from "sweetalert2";
import Vue from 'vue';


import { required, numeric} from "vuelidate/lib/validators";
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
        idComprobante: this.$route.params.id,  
        cuenta: "",
        centro: "",
        unidad : "",
        glosa: "",
        cliente: "",
        proveedor: "",
        deber: "",
        haber: "",
      },
      info:{
        glosa: "",
        fecha_comprobante: "",
        tipocomprobante: "",
      },
      id: this.$route.params.id,
      idEmpresa: JSON.parse(Vue.prototype.$globalEmpresasSelected),
      cuentas: [],
      centros: [], 
      
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
          label: "Cuenta Contable",
          key: "cuenta",
          sortable: true,
        },
        {
          label: "Centro Costos",
          key: "centro",
          sortable: true,
        },

        {
          label: "Cliente",
          key: "cliente",
          sortable: true,
        },
        {
            label: "Proveedor",
            key: "proveedor",
            sortable: true,
        },
        {
            label: "Debe",
            key: "debe",
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
      cuenta: {
        required,
      },
      centro: {
        required,
      },
      deber: {
        numeric,
      },
      haber: {
        numeric,
      },
      idComprobante: {
        required,
      }

    },
  },

  mounted() {
    this.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    this.traerData();
    this.traerDetalleComprobantes();

    this.totalRows = this.items.length;
    
  },
  methods: {

    traerData() {
      this.axios
        .get(`/api/getInicial/`+this.id+'/'+this.idEmpresa.id_empresa)
        .then((response) => {
            console.log(response);
            
            this.info.tipocomprobante = response.data.info.tipo_comprobante.nombre;
            this.info.glosa = response.data.info.glosa;
            this.info.fecha_comprobante = response.data.info.fecha_comprobante;
            this.info.unidadnegocio = '('+response.data.info.unidad_negocio.codigo+') '+response.data.info.unidad_negocio.nombre;

            this.cuentas = response.data.cuentas;
            this.centros = response.data.centros;
            this.form.unidad = '('+response.data.info.unidad_negocio.codigo+') '+response.data.info.unidad_negocio.nombre;
        });
    },

    traerDetalleComprobantes() {
        this.axios
          .get(`/api/getdetalle/`+this.id)
          .then((response) => {
              console.log(response);
              response.data.map((p) => {
                if(p.plan_cuenta['manual_cuenta'] != null){
                    p["cuenta"] = p.plan_cuenta['manual_cuenta']['nombre'];  
                }else{
                    p["cuenta"] = p.plan_cuenta['mi_manual_cuenta']['nombre'];  
                }
                p["centro"] = p.centro_costo.nombre;
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

    customLabel({id_plan_cuenta}) {
      return id_plan_cuenta;
    },

    customLabelCosto({ nombre}) {
        return nombre;
    },

    formSubmit() {
      
      this.submitted = true;

      this.$v.$touch();
 
      if (!this.$v.$invalid) {
        if (this.typeform == "create") {
          this.axios
            .post(`/api/store`, this.form)
            .then((res) => {
              if (res.data.success) {
                const title = "Nuevo  Detalle";
                const message = "Detalle a sido agregado al comprobante actual.";
                const type = "success";

                this.form = {
                    centro: "",
                    cuenta: "",
                    unidadnegocio : "",
                    glosa: "",
                    deber: "",
                    haber: "",
                    cliente: "",
                    proveedor: "",
                };

                this.$v.form.$reset();
                this.traerDetalleComprobantes();
                this.successmsg(title, message, type);
              }
            })
            .catch(error => {
                console.clear();
            });
        } else if (this.typeform == "edit") {
          this.axios
            .put(
              `${this.urlbackend}/proveedor/updateProveedor/${this.form.id_proveedor}`,
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
              `${this.urlbackend}/docente/eliminarDocente/${datos.id_docente}`
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
