import Layout from "../../layouts/main";
import Multiselect from "vue-multiselect";
import { required } from "vuelidate/lib/validators";
import Swal from "sweetalert2";

export default {
  components: {
    Layout,
    Multiselect,
    Swal,
  },
  data() {
    return {
      urlbackend: this.$urlBackend,
      data_form: {
        solcitud_rut: 0,
        inicio_actividad: 0,
        f_inicio_actividad: "",
        rol_tributario: "",
        regimen_id: "",
        nombres: "",
        apellido_p: "",
        apellido_m: "",
        razon_social: "",
        nombre_fantasia: "",
        n_insc_comercio: "",
        f_insc_comercio: "",
        calle_pasaje: "",
        numero_casa: "",
        of_depto: "",
        bloque: "",
        villa_poblacion: "",
        rol_propietario: "",
        comuna: "",
        cuidad: "",
        region: "",
        telefono_movil: "",
        telefono_fijo: "",
        giro_id: "",
        descripcion_act_economica: "",
        enterado: "",
        por_enterar: "",
        total: "",
        f_por_enterar: "",
        socio_nombre: "",
        socio_rut: "",
        socio_enterado: "",
        socio_por_enterar: "",
        socio_f_enterar: "",
        socio_porcentaje: "",
        representante_rut: "",
        representante_nombre: "",
        representante_apellido_p: "",
        representante_apellido_m: "",
        credito_fiscal: "",
        id_empresa: this.$route.params.id,
      },
      form: {
        profe_fecha_firma: "",
        profe_categoria: "",
        profe_iva: "",
        profe_anexo: "",
      },
      form_rechazo: {
        id_inicio_form: "",
        motivo: "",
      },
      rut_empresa: "",
      rut_represetante: "",
      razon_social: "",
      nombre_fantasia: "",
      celular: "",
      email: "",
      capital_inicial: 0,
      tipo_empresa: "",
      regiments: [],
      options: [],
      alertas: [],
      submitted: false,
      submitted_rechazo: false,
    };
  },

  validations: {
    form: {
      profe_fecha_firma: {
        required,
      },
      profe_categoria: {
        required,
      },
      profe_iva: {
        required,
      },
      profe_anexo: {
        required,
      },
    },
    form_rechazo: {
      motivo: {
        required,
      },
    },
  },

  mounted() {
    this.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    this.regimen();
    this.traerGiros();
    this.traerinform();
  },
  methods: {
    customLabelGiro({ nombre, codigo }) {
      return `( ${codigo} ) - ${nombre}`;
    },

    traerinform() {
      this.axios
        .get(
          `/api/obtenerform4415/${this.$route.params.id}`
        )
        .then((response) => {
          console.log(response.data);
          if (response.data) {
            this.data_form.solcitud_rut = response.data.solcitud_rut;
            this.data_form.inicio_actividad = response.data.inicio_actividad;
            this.data_form.f_inicio_actividad =
              response.data.f_inicio_actividad;
            this.data_form.rol_tributario = response.data.f_inicio_actividad;
            this.data_form.regimen_id = response.data.regimen_id;
            this.data_form.nombres = response.data.nombres;
            this.data_form.apellido_p = response.data.apellido_p;
            this.data_form.apellido_m = response.data.apellido_m;
            this.data_form.razon_social = response.data.razon_social;
            this.data_form.nombre_fantasia = response.data.nombre_fantasia;
            this.data_form.n_insc_comercio = response.data.n_insc_comercio;
            this.data_form.f_insc_comercio = response.data.f_insc_comercio;
            this.data_form.calle_pasaje = response.data.calle_pasaje;
            this.data_form.numero_casa = response.data.numero_casa;
            this.data_form.of_depto = response.data.of_depto;
            this.data_form.bloque = response.data.bloque;
            this.data_form.villa_poblacion = response.data.villa_poblacion;
            this.data_form.rol_propietario = response.data.rol_propietario;
            this.data_form.comuna = response.data.comuna;
            this.data_form.cuidad = response.data.cuidad;
            this.data_form.region = response.data.region;
            this.data_form.telefono_movil = response.data.telefono_movil;
            this.data_form.telefono_fijo = response.data.telefono_fijo;
            this.data_form.giro_id = this.options.find(
              (option) => option.id_giro === response.data.giro_id
            );
            this.data_form.descripcion_act_economica =
              response.data.descripcion_act_economica;
            this.data_form.enterado = response.data.enterado;
            this.data_form.por_enterar = response.data.por_enterar;
            this.data_form.total = response.data.total;
            this.data_form.f_por_enterar = response.data.f_por_enterar;
            this.data_form.socio_nombre = response.data.socio_nombre;
            this.data_form.socio_rut = response.data.socio_rut;
            this.data_form.socio_enterado = response.data.socio_enterado;
            this.data_form.socio_por_enterar = response.data.socio_por_enterar;
            this.data_form.socio_f_enterar = response.data.socio_f_enterar;
            this.data_form.socio_porcentaje = response.data.socio_porcentaje;
            this.data_form.representante_rut = response.data.representante_rut;
            this.data_form.representante_nombre =
              response.data.representante_nombre;
            this.data_form.representante_apellido_p =
              response.data.representante_apellido_p;
            this.data_form.representante_apellido_m =
              response.data.representante_apellido_m;
            this.data_form.credito_fiscal = response.data.credito_fiscal;
            this.data_form.id_empresa = response.data.empresa_id;

            // indata_formacion de la empresa

            this.rut_empresa = response.data.empresa.rut_empresa;
            this.rut_represetante = response.data.empresa.rut_representante;
            this.razon_social = response.data.empresa.razon_social;
            this.nombre_fantasia = response.data.empresa.nombre_fantasia;
            this.celular = response.data.empresa.celular;
            this.email = response.data.empresa.correo;
            this.capital_inicial = response.data.empresa.capital_inicial;
            this.tipo_empresa = response.data.empresa.tipo_empresa.nombre;
            this.form_rechazo.id_inicio_form = response.data.id_inicio_form;
          }
        });
    },

    regimen() {
      this.axios
        .get(`/api/obtenerregimen`)
        .then((response) => {
          this.regiments = response.data;
        });
    },
    traerGiros() {
      this.axios
        .get(`/api/getGirosProveedor`)
        .then((response) => {
          this.options = response.data;
        });
    },

    modalAlertas() {
      const tipoalerta = 2;

      this.axios
        .get(
          `/api/alertaempresa/${this.data_form.id_empresa}/${tipoalerta}`
        )
        .then((response) => {
          console.log(response);

          this.alertas = response.data;
        });
    },

    formSubmit() {
      this.submitted = true;
      // stop here if form is invalid

      this.$v.$touch();

      if (!this.$v.form.$invalid) {
        Swal.fire({
          title: "Aprobar Formulario F4415",
          text: "¿Está seguro de aprobar el Formulario F4415?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#34c38f",
          cancelButtonColor: "#f46a6a",
          confirmButtonText: "Si",
        }).then((result) => {
          if (result.value) {
            this.axios
              .put(
                `/api/aprobarf4415/${this.data_form.id_empresa}`,
                this.form
              )
              .then((response) => {
                if (response.data.success) {
                  Swal.fire({
                    title: "Aprobar Formulario F4415",
                    text: "Formulario F4415 aprobada con éxito!",
                    icon: "success",
                    showCancelButton: false,
                    allowOutsideClick: false,
                    confirmButtonColor: "#34c38f",
                    confirmButtonText: "Ok",
                  }).then((result) => {
                    if (result.value) {
                      this.$router.push("/solicitud-actividades");
                    }
                  });
                } else {
                  Swal.fire({
                    title: "Aprobar Formulario F4415",
                    text: "Error al aprobar Formulario F4415!",
                    icon: "error",
                    showCancelButton: false,
                    allowOutsideClick: false,
                    confirmButtonColor: "#34c38f",
                    confirmButtonText: "Ok",
                  }).then((result) => {
                    if (result.value) {
                      console.log(response);
                    }
                  });
                }
              })
              .catch((error) => {
                Swal.fire({
                  title: "Aprobar Formulario F4415",
                  text: "Error al aprobar el Formulario F4415!",
                  icon: "error",
                  showCancelButton: false,
                  allowOutsideClick: false,
                  confirmButtonColor: "#34c38f",
                  confirmButtonText: "Ok",
                }).then((result) => {
                  if (result.value) {
                    console.log(error);
                  }
                });
              });
          }
        });
      }
    },

    rechazar() {

        this.submitted_rechazo = true;
        this.$v.$touch();

        if (!this.$v.form_rechazo.$invalid) {

            this.axios
              .post(
                `/api/rechazarf4415/`,
                this.form_rechazo
              )
              .then((response) => {

                if (response.data.success) {
                  Swal.fire({
                    title: "Rechazar Formulario F4415",
                    text: "Formulario F4415 aprobada con éxito!",
                    icon: "success",
                    showCancelButton: false,
                    allowOutsideClick: false,
                    confirmButtonColor: "#34c38f",
                    confirmButtonText: "Ok",
                  }).then((result) => {
                    if (result.value) {
                      this.$router.push("/solicitud-actividades");
                    }
                  });
                } else {
                  Swal.fire({
                    title: "Rechazar Formulario F4415",
                    text: "Error al rechazar Formulario F4415!",
                    icon: "error",
                    showCancelButton: false,
                    allowOutsideClick: false,
                    confirmButtonColor: "#34c38f",
                    confirmButtonText: "Ok",
                  }).then((result) => {
                    if (result.value) {
                      console.log(response);
                    }
                  });
                }
              })
              .catch((error) => {
                Swal.fire({
                  title: "Rechazar Formulario F4415",
                  text: "Error al rechazar el Formulario F4415!",
                  icon: "error",
                  showCancelButton: false,
                  allowOutsideClick: false,
                  confirmButtonColor: "#34c38f",
                  confirmButtonText: "Ok",
                }).then((result) => {
                  if (result.value) {
                    console.log(error);
                  }
                });
              });


            
        }
    },
  },
};
