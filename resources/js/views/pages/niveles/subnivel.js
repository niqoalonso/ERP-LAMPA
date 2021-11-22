import Layout from "../../layouts/main";
import Swal from "sweetalert2";
import {
  required,
  maxLength,
  minLength,
  numeric,
} from "vuelidate/lib/validators";

export default {
  components: { Layout, Swal },
  data() {
    return {
      urlbackend: this.$urlBackend,
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
          key: "nombre",
          sortable: true,
        },
        {
          key: "nivel",
          sortable: true,
        },
        {
          key: "estado",
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
          key: "nombre",
          sortable: true,
        },
        "action",
      ],
      form: {
        nombrenivel: "",
        nombre: "",
        ano_generacion: "",
        nivel_id: "",
        typeform: "",
        id_subnivel: "",
      },
      submitted: false,
      submitform: false,
      submit: false,
      typesubmit: false,
      modal: false,
      titlemodal: "",

       // permiso

       crearsubnivel: this.$CrearSubNivel,
       listarsubnivel: this.$ListarSubNivel,
       editarsubnivel: this.$EditarSubnivel,
       eliminarsubnivel: this.$EliminarSubnivel,
    };
  },

  mounted() {
    this.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
    this.traerDataSubnivel();
    this.totalRows = this.items.length;

    // niveles

    this.traerDataNivel();
    // Set the initial number of items
    this.totalRowsN = this.itemsN.length;
  },

  validations: {
    form: {
      nombre: {
        required,
      },
      ano_generacion: {
        required,
        numeric,
        minLength: minLength(4),
        maxLength: maxLength(4),
      },
    },
  },

  methods: {
    //   creado por defecto para la tabla
    onFilteredN(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRowsN = filteredItems.length;
      this.currentPageN = 1;
    },
    //
    traerDataNivel() {
      this.axios
        .get(`api/obtenernivel`)
        .then((response) => {
          this.tableDataNivel = response.data;
        });
    },

    //   creado por defecto para la tabla
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    //
    traerDataSubnivel() {
      this.axios
        .get(`api/obtenersubniveles`)
        .then((response) => {
          response.data.map((p) => {
            if (p.estado_id == 1) {
              p.estado_id = "Activo";
            } else {
              p.estado_id = "Desactivado";
            }
            // crear nueva propiedad y asigno el valor
            p["estado"] = p.estado_id;
            p["nivel"] = p.nivel.nombre;

            // remover la propiedad actual
            delete p.estado_id;
            // retornar el nuevo objeto
            return p;
          });

          this.tableData = response.data;
        });
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
    
    eliminar(datos) {
      console.log(datos);

      if (datos.estado == "Activo") {
       var estado = 2;
       var title = "Desactivar subnivel";
       var text = `Esta seguro de desactivar el subnivel ${datos.nombre}`;
      } else {
         estado = 1;
         title = "Activar subnivel";
         text = `Esta seguro de activar el subnivel ${datos.nombre}`;
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
              `api/deleteSubNivel/${datos.id_subnivel}`
            )
            .then((res) => {
              console.log(res);
              if (res.data.success) {
                
                  var message = "Subnivel activado con exito";

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

              this.traerDataSubnivel();
            });
        }
      });
    },
    creasubnivel(id_nivel, nombre) {
      this.form.nivel_id = id_nivel;
      this.form.nombrenivel = nombre;
      this.form.typeform = "create";
      this.modal = true;
      this.titlemodal = "Crear Subnivel";
    },

    // validacion

    formSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (!this.$v.$invalid) {
        if (this.form.typeform == "create") {
          this.axios
            .post(`api/crearsubnivel`, this.form)
            .then((res) => {
              if (res.data.success) {
                const title = "Crear subnivel";
                const message = "Subnivel creado con exito";
                const type = "success";

                this.form = {
                  nombrenivel: "",
                  nombre: "",
                  ano_generacion: "",
                  nivel_id: "",
                  typeform: "",
                };

                this.modal = false;
                this.$v.form.$reset();

                this.successmsg(title, message, type);

                this.traerDataSubnivel();
              }
            })
            .catch((error) => {
              console.log("error", error);
              const title = "Crear subnivel";
              const message = "Error al crear el subnivel";
              const type = "error";

              this.modal = false;
              this.$v.form.$reset();

              this.successmsg(title, message, type);
            });
        } else {
          this.axios
            .put(
              `api/updatesubnivel/${this.form.id_subnivel}`,
              this.form
            )
            .then((res) => {
              if (res.data.success) {
                const title = "Editar subnivel"; 
                const message = "Subnivel editado con exito";
                const type = "success";

                this.form = {
                  nombrenivel: "",
                  nombre: "",
                  ano_generacion: "",
                  nivel_id: "",
                  typeform: "",
                };

                this.modal = false;
                this.$v.form.$reset();

                this.successmsg(title, message, type);

                this.traerDataSubnivel();
              }
            })
            .catch((error) => {
              console.log("error", error);
              const title = "Editar subnivel";
              const message = "Error al editar el subnivel";
              const type = "error";
              this.modal = false;
              this.$v.form.$reset();

              this.successmsg(title, message, type);
            });
        }
      }
    },

    successmsg(title, message, type) {
      Swal.fire(title, message, type);
    },
  },
};
