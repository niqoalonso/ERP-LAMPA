import Layout from "../../layouts/main";
import Swal from "sweetalert2";
import { required } from "vuelidate/lib/validators";
export default {
  components: {
    Layout,
    Swal,
  },

  data() {
    return {
      urlbackend: this.$urlBackend,
      id_empresa: "",
      rut_empresa: "",
      rut_represetante: "",
      razon_social: "",
      nombre_fantasia: "",
      celular: "",
      email: "",
      capital_inicial: 0,
      tipo_empresa: "",
      alertas: [],
      id: this.$route.params.id,
      form: {
        motivo: "",
        id_empresa: "",
        id_solicitud: "",
      },
      submitted: false,
    };
  },
  validations: {
    form: {
      motivo: {
        required,
      },
    },
  },
  mounted() {
    this.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
    this.traerDatoempresa();
    
  },
  methods: {
    async traerDatoempresa() {
      this.axios
        .get(`/api/obtenerempresasolicitud/${this.id}`)
        .then((response) => {
          console.log(response);
          this.id_empresa = response.data.id_empresa;
          this.rut_empresa = response.data.rut_empresa;
          this.rut_represetante = response.data.rut_representante;
          this.razon_social = response.data.razon_social;
          this.nombre_fantasia = response.data.nombre_fantasia;
          this.celular = response.data.celular;
          this.email = response.data.correo;
          this.capital_inicial = response.data.capital_inicial;
          this.tipo_empresa = response.data.tipo_empresa.nombre;
        });
        
        const tipoalerta = 1;

      this.axios
        .get(`/api/alertaempresa/${this.id}/${tipoalerta}`)
        .then((response) => {
          console.log(response);

          this.alertas = response.data;
        });
    },


    aprobarsolicitud(id_empresa) {
      Swal.fire({
        title: "Aprobar Empresa",
        text: "¿Está seguro de aprobar la empresa?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "Si",
      }).then((result) => {
        if (result.value) {
          this.axios
            .get(
              `/api/aprobarempresa/${id_empresa}/${this.id}`
            )
            .then((response) => {
              if (response.data.success) {
                Swal.fire({
                  title: "Aprobar Empresa",
                  text: "Empresa aprobada con éxito!",
                  icon: "success",
                  showCancelButton: false,
                  allowOutsideClick: false,
                  confirmButtonColor: "#34c38f",
                  confirmButtonText: "Ok",
                }).then((result) => {
                  if (result.value) {
                    this.$router.push("/solicitud-empresa");
                  }
                });
              } else {
                Swal.fire({
                  title: "Aprobar Empresa",
                  text: "Error al aprobarla empresa!",
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
                title: "Aprobar Empresa",
                text: "Error al aprobarla empresa!",
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
    },

    formSubmit() {
      this.submitted = true;
      // stop here if form is invalid

      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.form.id_empresa = this.id_empresa;
        this.form.id_solicitud = this.id;
        this.axios
          .post(`/api/rechazarempresa`, this.form)
          .then((res) => {
            if (res.data.success) {
              Swal.fire({
                title: "Rechazar Empresa",
                text: "Empresa rechazada con éxito!",
                icon: "success",
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: "#34c38f",
                confirmButtonText: "Ok",
              }).then((result) => {
                if (result.value) {
                  this.$router.push("/solicitud-empresa");
                }
              });
            } else {
              Swal.fire({
                title: "Rechazar Empresa",
                text: "Error al rechazar empresa!",
                icon: "error",
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: "#34c38f",
                confirmButtonText: "Ok",
              }).then((result) => {
                if (result.value) {
                  console.log(res);
                }
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Rechazar Empresa",
              text: "Error al rechazar la empresa!",
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
