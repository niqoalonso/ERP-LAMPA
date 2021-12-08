import Layout from "../../layouts/main.vue";
import Swal from "sweetalert2";
import { required } from "vuelidate/lib/validators";

export default {
  components: { Layout },

  page: {
    title: "Impuesto UTM",
  },

  data() {
    return {
      urlbackend: this.$urlBackend,
      form: {
        desde: "",
        hasta:"",
        factor:"",
        rebaja : "",
        id_impuesto_utm: "",
      },
      submitted: false,
      typeform: "create",
      titlemodal: "Crear Impuesto UTM",
      modal: false,
      btnCreate: true,
      // tabla

      tableData: [],

      title: "Impuesto UTM",
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
      sortBy: "desde",
      sortDesc: false,
      fields: [
        {
          key: "desde",
          label:'Desde (UTM)',
          sortable: true,
        },
        {
            key: "hasta",
            label:'Hasta (UTM)',
            sortable: true,
          },
          {
            key: "factor",
            label:'Factor (%)',
            sortable: true,
          },
          {
            key: "rebaja",
            label:'Rebaja (UTM)',
            sortable: true,
          },
        "action",
      ],
    };
  },
  validations: {
    form: {
      desde: {
        required,
      },
      hasta: {
        required,
      },
      rebaja: {
        required,
      },
      factor: {
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
    this.traerImpuestoUtm();
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    traerImpuestoUtm() {
      this.axios
        .get(`/api/obtenerimpuestoutm`)
        .then((response) => {
          this.tableData = response.data;
        });
    },

    eliminar(data) {

        console.log(data)

        if (data.deleted_at == null) {
            var estado = 2;
            var title = "Desactivar Impuesto UTM";
            var text = `¿Esta seguro de desativar ?`;
          } else {
            estado = 1;
            title = "Activar Impuesto UTM";
            text = `¿Esta seguro de activar ?`;
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
                  `/api/eliminarimpuestoutm/${data.id_impuesto_utm}`
                )
                .then((res) => {
                  console.log(res);
                  if (res.data) {
                    var message = "Impuesto UTM ha sido desactivada";
                    var type = "success";
                  } else {
                    if (estado == 1) {
                      message = "Error al activar Impuesto UTM";
                    } else {
                      message = "Error al desactivar Impuesto UTM";
                    }
                    type = "error";
                  }

                  this.successmsg(title, message, type);

                  this.traerImpuestoUtm();
                });
            }
          });
    },

    editar(data) {
      this.form.desde = data.desde;
      this.form.hasta = data.hasta;
      this.form.rebaja = data.rebaja;
      this.form.factor = data.factor;
      this.form.id_impuesto_utm = data.id_impuesto_utm;
      this.modal = true;
      this.btnCreate = false;
    },

    formSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.axios
          .post(
            `/api/crearimpuestoutm`,
            this.form
          )
          .then((res) => {
            let title = "";
            let message = "";
            let type = "";
            if (res.data) {
              if (this.form.id_impuesto_utm == '') {
                title = "Crear Impuesto UTM";
                message = "Impuesto UTM creada con exito";
                type = "success";
              } else {
                title = "Editar Impuesto UTM";
                message = "Impuesto UTM editada con exito";
                type = "success";
              }
              this.modal = false;
              this.btnCreate = false;

              this.$v.form.$reset();
              this.traerImpuestoUtm();
              this.successmsg(title, message, type);

            }
          })
          .catch((error) => {
            console.log("error", error);

            let title = "";
            let message = "";
            let type = "";

            if (this.form.id_impuesto_utm) {
              title = "Crear Impuesto UTM";
              message = "Impuesto UTM creada con exito";
              type = "error";
            } else {
              title = "Editar Impuesto UTM";
              message = "Impuesto UTM editada con exito";
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
      this.titlemodal = "Crear Impuesto UTM";
      (this.typeform = "create"),
        (this.form = {
          desde: "",
          hasta:"",
          rebaja:"",
          factor:"",
          id_impuesto_utm: "",
        });
      this.btnCreate = true;
    },
    successmsg(title, message, type) {
      Swal.fire(title, message, type);
    },
  },
};
