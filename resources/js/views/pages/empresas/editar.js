import { required } from "vuelidate/lib/validators";

import Multiselect from "vue-multiselect";
import Swal from "sweetalert2";

import Layout from "../../layouts/main";
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
        id_empresa: "",
        token: "",
        rut_empresa: "",
        rut_represetante: "",
        razon_social: "",
        nombre_fantasia: "",
        celular: "",
        email: "",
        capital_inicial: 0,
        tipo_empresa: "",
        docente: "",
        id_estudiante: "",
      },
      id: this.$route.params.id,
      observacion: "",
      options: [],
      optionsDocente: [],
      submitted: false,
    };
  },
  validations: {
    form: {
      tipo_empresa: {
        required,
      },
      docente: {
        required,
      },
    },
  },
  mounted() {
    this.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    this.traerTipoEmpresa();
    this.form.token = localStorage.getItem("token");
    this.traerDocente();
    this.traerDatoempresa();
  },
  methods: {
    customLabel({ nombres, apellidos }) {
      return `${nombres} ${apellidos}`;
    },

    traerTipoEmpresa() {
      this.axios
        .get(`/api/obtenertipoempresa/`)
        .then((response) => {
          this.options = response.data;
        });
    },

    traerDocente() {
      this.axios
        .get(`/api/obtenerdocentealumno/`)
        .then((response) => {
          this.optionsDocente = response.data[0].docente;
        });
    },

    async traerDatoempresa() {
      this.axios
        .get(`/api/obtenerempresaalumno/${this.id}`)
        .then((response) => {
          console.log(response);
          this.form.id_empresa = response.data[0].id_empresa;
          this.form.rut_empresa = response.data[0].rut_empresa;
          this.form.rut_represetante = response.data[0].rut_represetante;
          this.form.razon_social = response.data[0].razon_social;
          this.form.nombre_fantasia = response.data[0].nombre_fantasia;
          this.form.celular = response.data[0].celular;
          this.form.email = response.data[0].correo;
          this.form.id_estudiante = response.data[0].estudiante_id;
          this.form.capital_inicial = response.data[0].capital_inicial;
          this.form.tipo_empresa = this.options.find(
            (option) =>
              option.id_tipoempresa === response.data[0].tipoempresa_id
          );
          this.form.docente = this.optionsDocente.find(
            (option) =>
              option.id_docente === response.data[0].solicitud[0].id_docente
          );
        });
    },
    // eslint-disable-next-line no-unused-vars
    formSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log(this.form);

        this.axios
          .post(`/api/editarempresa`, this.form)
          .then((res) => {
            console.log(res);
            if (res.data.success) {
              Swal.fire({
                title: "Editar Empresa",
                text: "Empresa editada con éxito!",
                icon: "success",
                showCancelButton: false,
                confirmButtonColor: "#34c38f",
                confirmButtonText: "Ok",
              }).then((result) => {
                if (result.value) {
                  this.$router.push("/empresa");
                }
              });
            }
          })
          .catch((error) => {
            console.log("error", error);
            const title = "Editar empresa";
            const message = "Error al editar la empresa";
            const type = "error";
            this.$v.form.$reset();

            this.successmsg(title, message, type);
          });
      }
    },

    traermotivo() {
      this.axios
        .get(
          `/api/obtenermotivorechazo/${this.form.id_empresa}`
        )
        .then((response) => {
          this.observacion = response.data.observacion;
        });
    },

    successmsg(title, message, type) {
      Swal.fire(title, message, type);
    },
  },
};
