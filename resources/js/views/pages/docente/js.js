import Layout from "../../layouts/main";
import Swal from "sweetalert2";

import { required, email, minLength } from "vuelidate/lib/validators";
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
        nombres: "",
        apellidos: "",
        email: "",
        subnivel_id: null,
        password: "",
      },
      nivel: "",
      options: [],
      optionsNivel: [],
      submitted: false,
      typeform: "create",
      titlemodal: "Nuevo Docente",
      modal: false,
      emailexist: false,
      // permiso

      pcreardocente: this.$CrearDocente,
      editardocente: this.$EditarDocente,
      eliminardocente: this.$EliminarDocente,

      // tabla

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
          key: "nombres",
          sortable: true,
        },
        {
          key: "apellidos",
          sortable: true,
        },
        {
          key: "estado",
          sortable: true,
        },
        "action",
      ],
    };
  },
  validations: {
    form: {
      nombres: {
        required,
      },
      apellidos: {
        required,
      },
      email: {
        required,
        email,
      },
      subnivel_id: {
        required,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  mounted() {
    this.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
    this.traerData();
    this.traerSubnivel();
    this.totalRows = this.items.length;
  },
  methods: {

    traerData() {
      this.axios
        .get(`/api/obtenerdocente`)
        .then((response) => {
          console.log(response);
          response.data.map((p) => {
            if (p.user.estado_id == 1) {
              p.user.estado_id = "Activo";
            } else {
              p.user.estado_id = "Desactivado";
            }
            // crear nueva propiedad y asigno el valor
            p["estado"] = p.user.estado_id;
            // remover la propiedad actual
            delete p.user.estado_id;
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

    customLabel({ nombre, nivel, ano_generacion }) {
      return `( ${nivel.nombre} - ${ano_generacion} ) ${nombre}`;
    },
    
    formSubmit() {
      this.submitted = true;
      
      this.$v.$touch();

      if (!this.$v.$invalid && !this.emailexist) {
        if (this.typeform == "create") {
          this.axios
            .post(`/api/creardocente`, this.form)
            .then((res) => {
              if (res.data.success) {
                const title = "Nuevo docente";
                const message = "Docente creado exitosamente";
                const type = "success";

                this.modal = false;
                this.emailexist = false;

                this.$v.form.$reset();
                this.traerData();
                this.successmsg(title, message, type);
              }
            })
            .catch((error) => {
              console.clear();
             
            });
        } else if (this.typeform == "edit") {
          this.axios
            .put(
              `/api/editardocente/${this.form.id_docente}`,
              this.form
            )
            .then((res) => {
              if (res.data.success) {
                const title = "Docente actualizado";
                const message = "Docente actualizado con exito";
                const type = "success";

                this.form = {
                  nombres: "",
                  apellidos: "",
                  email: "",
                  subnivel_id: null,
                  password: "",
                };

                this.modal = false;
                this.emailexist = false;
                this.traerData();
                this.$v.form.$reset();

                this.successmsg(title, message, type);
              }
            })
            .catch((error) => {
              console.log("error", error);
              const title = "Crear Docente";
              const message = "Error al crear el Docente";
              const type = "error";

              this.modal = false;
              this.$v.form.$reset();

              this.successmsg(title, message, type);
            });
        }
      }
    },

    validarEmail($event) {
      if (this.$v.form.email.email) {
        this.axios
          .get(`/api/validaremail/${$event.target.value}`)
          .then((response) => {
            if (response.data == 1) {
              this.emailexist = true;
            } else {
              this.emailexist = false;
            }
          });
      }
    },

    traerSubnivel() {
      this.axios
        .get(`/api/obtenersubnivelesporNivel`)
        .then((response) => {
          this.options = response.data;
        });
    },

    successmsg(title, message, type) {
      Swal.fire(title, message, type);
    },

    editar(datos) {
      this.modal = true;

      this.typeform = "edit";
      this.form.id_docente = datos.id_docente;
      this.form.nombres = datos.nombres;
      this.form.apellidos = datos.apellidos;
      this.form.nombres = datos.nombres;
      this.form.email = datos.user.email;
      (this.form.subnivel_id = datos.docentenivel),
        (this.titlemodal = "Edición Docente");
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
