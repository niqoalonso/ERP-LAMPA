import Layout from "../../layouts/main";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import { required } from "vuelidate/lib/validators";

export default {
  components: { Layout, Multiselect },

  data() {
    return {
      urlbackend: this.$urlBackend,
      form: {
        trabajador_id: "",
        sueldo_base: "",
        dias_trabajados: "",
        monto: "",
        afp: "",
        afp_monto: "",
        salud: "",
        salud_monto: "",
        carga_familiar: "",
        monto_carga_familiar: "",
        asignacion_familiar: "",
        cantidad_horas_extras: "",
        horas_extras_monto: "",
        colacion: "",
        movilidad: "",
        sueldo_bruto: "",
        sueldo_liquido: "",
        id_remuneracion: "",
      },
      submitted: false,
      typeform: "create",
      titlemodal: "Crear Remuneración",
      modal: false,
      btnCreate: true,
      options: [],
      // tabla

      tableData: [],
      title: "Remuneraciones",
      items: [
        {
          text: "Tables",
        },
        {
          text: "Remuneraciones",
          active: true,
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "trabajador",
      sortDesc: false,
      fields: [
        {
          key: "trabajador",
          sortable: true,
          label: "Trabajador",
          formatter: (trabajador) => {
            return `${trabajador.nombres} ${trabajador.apellidos}`;
          },
        },
        {
          key: "sueldo_bruto",
          sortable: true,
          label: "Sueldo Bruto",
          formatter: (sueldo_bruto) => {
            var formatter = new Intl.NumberFormat("es-CL", {
              style: "currency",
              currency: "CLP",
              minimumFractionDigits: 0,
            });
            return formatter.format(sueldo_bruto);
          },
        },
        {
          key: "sueldo_liquido",
          sortable: true,
          label: "Sueldo Liquido",
          formatter: (sueldo_liquido) => {
            var formatter = new Intl.NumberFormat("es-CL", {
              style: "currency",
              currency: "CLP",
              minimumFractionDigits: 0,
            });
            return formatter.format(sueldo_liquido);
          },
        },
        {
          key: "fecha",
          sortable: true,
        },
        "action",
      ],
    };
  },
  validations: {
    form: {
      dias_trabajados: {
        required,
      },
      monto: {
        required,
      },
      afp_monto: {
        required,
      },
      salud_monto: {
        required,
      },
      monto_carga_familiar: {
        required,
      },
      asignacion_familiar: {
        required,
      },
      cantidad_horas_extras: {
        required,
      },
      horas_extras_monto: {
        required,
      },
      sueldo_bruto: {
        required,
      },
      sueldo_liquido: {
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
    this.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    this.traerTrabajador();
    this.traerRemuneracion();
    this.totalRows = this.items.length;
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    customLabel({ nombres, apellidos }) {
      return `${nombres} ${apellidos}`;
    },
    traerTrabajador() {
      this.axios
        .get(`/api/obtenertrabajador/`)
        .then((response) => {
          console.log(response);
          this.options = response.data;
        });
    },
    traerRemuneracion() {
      this.axios
        .get(`/api/obtenerremuneracion`)
        .then((response) => {
          console.log(response);
          this.tableData = response.data;
        });
    },
    modalNuevo() {
      this.modal = true;
      this.formcarga = [];
      this.titlemodal = "Crear Remuneración";
      this.typeform = "create";
      this.vaciarform();
      this.btnCreate = true;
    },
    formSubmit() {
      this.submitted = true;
      this.$v.form.$touch();

      if (!this.$v.form.$invalid) {
        console.log(this.form);

        this.axios
          .post(
            `/api/crearremuneracion`,
            this.form
          )
          .then((res) => {
            console.log(res);

            let title = "";
            let message = "";
            let type = "";
            if (res.data) {
              if (this.form.id_remuneracion == "") {
                title = "Crear Remuneración";
                message = "Remuneración creada con exito";
                type = "success";
              } else {
                title = "Editar Remuneración";
                message = "Remuneración editada con exito";
                type = "success";
              }
              this.modal = false;
              this.btnCreate = false;
              this.submitted = false;

              this.$v.form.$reset();
              this.traerRemuneracion();
              this.successmsg(title, message, type);
            }
          })
          .catch((error) => {
            console.log("error", error);

            let title = "";
            let message = "";
            let type = "";

            if (this.form.id_remuneracion == "") {
              title = "Crear Remuneración";
              message = "Remuneración  creada con exito";
              type = "error";
            } else {
              title = "Editar Remuneración";
              message = "Remuneración  editada con exito";
              type = "error";
            }

            this.modal = false;
            this.btnCreate = false;
            this.submitted = false;
            this.$v.form.$reset();
            this.traerRemuneracion();
            this.successmsg(title, message, type);
          });
      }
    },
    infotrabajador() {
      this.form.sueldo_base = this.form.trabajador_id.sueldo_base;
      this.form.afp = this.form.trabajador_id.afp.nombre;
      this.form.salud = this.form.trabajador_id.salud;
      this.form.carga_familiar = this.form.trabajador_id.trabajorcarga.length;
      this.form.colacion = this.form.trabajador_id.colacion;
      this.form.movilidad = this.form.trabajador_id.movilidad;
    },
    editar(data) {
      console.log(data);
      this.form.trabajador_id = data.trabajador;
      this.form.sueldo_base = data.trabajador.sueldo_base;
      this.form.dias_trabajados = data.dias_trabajados;
      this.form.monto = data.monto;
      this.form.afp = data.trabajador.afp.nombre;
      this.form.afp_monto = data.afp_monto;
      this.form.salud = data.fonasa_monto;
      this.form.salud_monto = data.fonasa_monto;
      this.form.carga_familiar = data.trabajador.trabajorcarga.length;
      this.form.monto_carga_familiar = data.monto_carga_familiar;
      this.form.asignacion_familiar = data.asignacion_familiar;
      this.form.cantidad_horas_extras = data.cantidad_horas_extras;
      this.form.horas_extras_monto = data.horas_extras_monto;
      this.form.colacion = data.trabajador.colacion;
      this.form.movilidad = data.trabajador.movilidad;
      this.form.sueldo_bruto = data.sueldo_bruto;
      this.form.sueldo_liquido = data.sueldo_liquido;
      this.form.id_remuneracion = data.id_remuneracion;

      this.modal = true;
    },
    successmsg(title, message, type) {
      Swal.fire(title, message, type);
    },
    vaciarform() {
      this.form = {
        trabajador_id: "",
        sueldo_base: "",
        dias_trabajados: "",
        monto: "",
        afp: "",
        afp_monto: "",
        salud: "",
        salud_monto: "",
        carga_familiar: "",
        monto_carga_familiar: "",
        asignacion_familiar: "",
        cantidad_horas_extras: "",
        horas_extras_monto: "",
        colacion: "",
        movilidad: "",
        sueldo_bruto: "",
        sueldo_liquido: "",
        id_remuneracion: "",
      };
    },
  },
};
