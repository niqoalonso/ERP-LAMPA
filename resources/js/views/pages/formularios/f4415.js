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
      form: {
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
        docente: "",
        id_empresa: this.$route.params.id,
      },
      optionsDocente: [],
      regiments: [],
      options: [],

      submitted: false,
    };
  },

  validations: {
    form: {
      docente: {
        required,
      },
    },
  },

  mounted() {
    this.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    this.traerDocente();
    this.regimen();
    this.traerGiros();
    this.traerinform();
  },
  methods: {
    customLabel({ nombres, apellidos }) {
      return `${nombres} ${apellidos}`;
    },

    customLabelGiro({ nombre, codigo }) {
      return `( ${codigo} ) - ${nombre}`;
    },

    traerinform() {
      this.axios
        .get(
          `/api/obtenerform4415/${this.$route.params.id}`
        )
        .then((response) => {
          if (response.data) {
            this.form.solcitud_rut = response.data.solcitud_rut;
            this.form.inicio_actividad = response.data.inicio_actividad;
            this.form.f_inicio_actividad = response.data.f_inicio_actividad;
            this.form.rol_tributario = response.data.f_inicio_actividad;
            this.form.regimen_id = response.data.regimen_id;
            this.form.nombres = response.data.nombres;
            this.form.apellido_p = response.data.apellido_p;
            this.form.apellido_m = response.data.apellido_m;
            this.form.razon_social = response.data.razon_social;
            this.form.nombre_fantasia = response.data.nombre_fantasia;
            this.form.n_insc_comercio = response.data.n_insc_comercio;
            this.form.f_insc_comercio = response.data.f_insc_comercio;
            this.form.calle_pasaje = response.data.calle_pasaje;
            this.form.numero_casa = response.data.numero_casa;
            this.form.of_depto = response.data.of_depto;
            this.form.bloque = response.data.bloque;
            this.form.villa_poblacion = response.data.villa_poblacion;
            this.form.rol_propietario = response.data.rol_propietario;
            this.form.comuna = response.data.comuna;
            this.form.cuidad = response.data.cuidad;
            this.form.region = response.data.region;
            this.form.telefono_movil = response.data.telefono_movil;
            this.form.telefono_fijo = response.data.telefono_fijo;
            this.form.giro_id = this.options.find(
              (option) => option.id_giro === response.data.giro_id
            );
            this.form.descripcion_act_economica =
              response.data.descripcion_act_economica;
            this.form.enterado = response.data.enterado;
            this.form.por_enterar = response.data.por_enterar;
            this.form.total = response.data.total;
            this.form.f_por_enterar = response.data.f_por_enterar;
            this.form.socio_nombre = response.data.socio_nombre;
            this.form.socio_rut = response.data.socio_rut;
            this.form.socio_enterado = response.data.socio_enterado;
            this.form.socio_por_enterar = response.data.socio_por_enterar;
            this.form.socio_f_enterar = response.data.socio_f_enterar;
            this.form.socio_porcentaje = response.data.socio_porcentaje;
            this.form.representante_rut = response.data.representante_rut;
            this.form.representante_nombre = response.data.representante_nombre;
            this.form.representante_apellido_p =
              response.data.representante_apellido_p;
            this.form.representante_apellido_m =
              response.data.representante_apellido_m;
            this.form.credito_fiscal = response.data.credito_fiscal;
            this.form.docente = response.data.solicitud[0];
            this.form.id_empresa = response.data.empresa_id;
          } else {
            this.form.n_insc_comercio = this.nroInscripcion();
          }
        });
    },

    traerDocente() {
      this.axios
        .get(`/api/obtenerdocentealumno/`)
        .then((response) => {
          this.optionsDocente = response.data[0].docente;
        });
    },

    regimen() {
      this.axios
        .get(`/api/obtenerregimen/`)
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

    formSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log(this.form, "valido");

        this.axios
          .post(`/api/crearf4415`, this.form)
          .then((res) => {
            console.log(res);
            if (res.data.success) {
              Swal.fire({
                title: "Crear Formulario F4415",
                text: "Formulario F4415 creado con éxito!",
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
            const title = "Crear Formulario F4415";
            const message = "Error al crear el Formulario F4415";
            const type = "error";
            this.$v.form.$reset();

            this.successmsg(title, message, type);
          });
      }
    },

    nroInscripcion(prefix = "", random = false) {
      const sec = Date.now() * 1000 + Math.random() * 1000;
      const id = sec
        .toString(16)
        .replace(/\./g, "")
        .padEnd(14, "0");
      return `${prefix}${id}${
        random ? `.${Math.trunc(Math.random() * 100000000)}` : ""
      }`;
    },

    asignarRut() {
      if (this.form.solcitud_rut == 1) {
        var num = Math.floor(Math.random() * 10000000000);

        this.form.rol_tributario = num;
      } else {
        this.form.rol_tributario = "";
      }
    },
  },
};
