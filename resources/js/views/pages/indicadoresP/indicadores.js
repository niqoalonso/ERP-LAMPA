import Layout from "../../layouts/main.vue";
import Swal from "sweetalert2";
import { required } from "vuelidate/lib/validators";

export default {
  components: { Layout },

  page: {
    title: "Previsión",
  },

  data() {
    return {
      urlbackend: this.$urlBackend,
      form: {
        nombre: "",
        tasa_dependiente:"",
        sis:"",
        tasa_independiente : "",
        id_afp: "",
      },
      submitted: false,
      typeform: "create",
      titlemodal: "Crear Prevision",
      modal: false,
      previsionexist: false,
      btnCreate: true,
      // tabla

      tableData: [],

      title: "Previsión",
      items: [
        {
          text: "Tables",
        },
        {
          text: "Prevision",
          active: true,
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "nombre",
      sortDesc: false,
      fields: [
        {
          key: "nombre",
          sortable: true,
        },
        {
            key: "tasa_dependiente",
            sortable: true,
          },
          {
            key: "sis",
            sortable: true,
          },
          {
            key: "tasa_independiente",
            sortable: true,
          },
        "action",
      ],
    };
  },
  validations: {
    form: {
      nombre: {
        required,
      },
      tasa_dependiente: {
        required,
      },
      tasa_independiente: {
        required,
      },
      sis: {
        required,
      },
    },
  },
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.tableData.length;
    },
  },
  mounted() {
    this.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
    this.totalRows = this.items.length;
    this.traerPrevision();
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    traerPrevision() {
      this.axios
        .get(`/api/obtenerprevision`)
        .then((response) => {
          this.tableData = response.data;
        });
    },

    eliminar(data) {

        console.log(data)

        if (data.deleted_at == null) {
            var estado = 2;
            var title = "Desactivar Previsión";
            var text = `¿Esta seguro de desativar la prevision ${data.nombre}?`;
          } else {
            estado = 1;
            title = "Activar Previsión";
            text = `¿Esta seguro de activar la prevision ${data.nombre}?`;
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
                  `/api/eliminarprevision/${data.id_afp}`
                )
                .then((res) => {
                  console.log(res);
                  if (res.data) {
                    var message = "Previsión ha sido desactivada";
                    var type = "success";
                  } else {
                    if (estado == 1) {
                      message = "Error al activar Previsión";
                    } else {
                      message = "Error al desactivar Previsión";
                    }
                    type = "error";
                  }
    
                  this.successmsg(title, message, type);
    
                  this.traerPrevision();
                });
            }
          });
    },

    editar(data) {
      this.form.nombre = data.nombre;
      this.form.tasa_dependiente = data.tasa_dependiente;
      this.form.tasa_independiente = data.tasa_independiente;
      this.form.sis = data.sis;
      this.form.id_afp = data.id_afp;
      this.modal = true;
      this.btnCreate = false;
    },

    formSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (!this.$v.$invalid && !this.previsionexist) {
        this.axios
          .post(
            `/api/crearprevision`,
            this.form
          )
          .then((res) => {
            let title = "";
            let message = "";
            let type = "";
            if (res.data) {
              if (this.form.id_afp == '') {
                title = "Crear Previsión";
                message = "Previsión creada con exito";
                type = "success";
              } else {
                title = "Editar Previsión";
                message = "Previsión editada con exito";
                type = "success";
              }
              this.modal = false;
              this.previsionexist = false;
              this.btnCreate = false;

              this.$v.form.$reset();
              this.traerPrevision();
              this.successmsg(title, message, type);
              
            }
          })
          .catch((error) => {
            console.log("error", error);

            let title = "";
            let message = "";
            let type = "";

            if (this.form.id_afp) {
              title = "Crear Previsión";
              message = "Previsión 1 creada con exito";
              type = "error";
            } else {
              title = "Editar Previsión";
              message = "Previsión 1 editada con exito";
              type = "error";
            }

            this.modal = false;
            this.btnCreate = false;
            this.$v.form.$reset();

            this.successmsg(title, message, type);
          });
      }
    },

    modalNuevo() {
      this.modal = true;
      this.titlemodal = "Crear Previsión";
      (this.typeform = "create"),
        (this.form = {
          nombre: "",
          tasa_dependiente:"",
          tasa_independiente:"",
          sis:"",
          id_afp: "",
        });
      this.btnCreate = true;
    },

    validarNombre($event) {
      if ($event.target.value.length > 4) {
        this.axios
          .get(
            `/api/validarnombre/${$event.target.value}`
          )
          .then((response) => {
            if (response.data == 1) {
              this.previsionexist = true;
            } else {
              this.previsionexist = false;
            }

          });
      }
    },

    successmsg(title, message, type) {
      Swal.fire(title, message, type);
    },
  },
};
