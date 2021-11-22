import Layout from "../../layouts/main";
import Swal from "sweetalert2";


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
        codigo: "",
        nombre: "",
        categoria: null,
        iva: null,
        impuesto_adicional: "",
      },
      options: [],
      categorias: [],
      optiones: 'Mensaje', 
      submitted: false,
      typeform: "create",
      titlemodal: "Nueva Actividad Económica",
      modal: false,
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
          labe: "Descripcion",
          key: "nombre",
          sortable: true,
        },
        {
          label: "Categoria",
          key: "categoria",
          sortable: true,
        },
        {  
          label: "Afecto IVA",
          key: "iva",
          sortable: true,
        },
        {  
          label: "Imp. Adicional",
          key: "impuesto",
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
        numeric,
      },
      nombre: {
        required,
      },
      categoria: {
        required,
      },
      iva: {
        required,
      },
    },
  },
  mounted() {
    this.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
    this.traerData();
    this.traerAfectoIva();
    this.traerCategorias();

    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {

    traerData() {
      this.axios
        .get(`/api/obtenerGiros`)
        .then((response) => {
          response.data.map((p) => {
            
            p["categoria"] = p.estado_categoria.nombre+" CAT";
            p["iva"] = p.estado_iva.nombre;
            if(p.impuesto_adicional != null){ p['impuesto'] = p.impuesto_adicional+'%';}else{p['impuesto'] = '-';}
            // retornar el nuevo objeto
            return p;
          });
          this.tableData = response.data;
          this.totalRows = response.data.length;
        });
    },
    modalNuevo()
    {
      this.modal = true;
      this.titlemodal = "Nueva Actividad Económica";
      this.form = {
        codigo: "",
        nombre: "",
        categoria: "",
        iva: "",
        impuesto_adicional: "",
      };
      this.btnCreate        = true;

    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    customLabelIva({nombre}) {
      return `${nombre}`;
    },
    customLabelCat({nombre}) {
        return `${nombre}`+ " Categoria";
      },

    formSubmit() {
      this.submitted = true;

      this.$v.$touch();

      if (!this.$v.$invalid) { 
        if (this.typeform == "create") {
          this.axios
            .post(`/api/creargiro`, this.form)
            .then((res) => {
              if (res.data.success) {
                const title = "Nueva Actividad Económica";
                const message = res.data.success;
                const type = "success";

                this.form = {
                  codigo: "",
                  nombre: "",
                  categoria: "",
                  iva: "",
                };

                this.modal = false;

                this.$v.form.$reset();
                this.traerData();
                this.successmsg(title, message, type);
              }
            })
            .catch(error => {
                console.clear();
            });
        } else if (this.typeform == "edit") {
          this.axios
            .put(
              `/api/updategiro/${this.form.id_giro}`,
              this.form
            )
            .then((res) => {
              if (res.data.success) {
                const title = "Actividad Económica";
                const message = "Actualizado Exitosamente";
                const type = "success";

                this.form = {
                  id_giro: "",
                  codigo: "",
                  nombre: "",
                  categoria: "",
                  iva: "",
                };

                this.modal = false;
                this.titlemodal = "Nueva Actividad Económica",
                this.traerData();
                this.$v.form.$reset();
                this.btnCreate        = true,

                this.successmsg(title, message, type);
              }
            })
            .catch((error) => {
                console.clear();
            });
        }
      }
    },

    traerAfectoIva() {
      this.axios
        .get(`/api/obtenerIva`)
        .then((response) => {
            this.options = response.data;
        });
    },

    traerCategorias() {
        this.axios
          .get(`/api/obtenerCategorias`)
          .then((response) => {
              this.categorias = response.data;
          });
    },

    successmsg(title, message, type) {
      Swal.fire(title, message, type);
    },

    editar(datos) {
      this.modal = true;
      this.typeform = "edit";
      this.form.id_giro  = datos.id_giro;
      this.form.nombre      = datos.nombre;
      this.form.codigo      = datos.codigo;
      this.form.categoria   = datos.estado_categoria;
      this.form.iva         = datos.estado_iva;
      this.btnCreate        = false,
    (this.titlemodal    = "Editar Actividad Económica");
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
