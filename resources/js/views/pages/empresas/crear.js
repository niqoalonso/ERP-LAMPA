import {
    required
  } from "vuelidate/lib/validators";

import Multiselect from "vue-multiselect";
import Swal from "sweetalert2";

import Layout from "../../layouts/main";
export default {
    components: {
      Layout,
      Multiselect,
      Swal
    },
    data() {
      return {
        urlbackend: this.$urlBackend,
        typeform: 'create',
        form: {
          token: '',
          rut_empresa: '',
          rut_represetante: '',
          razon_social: '',
          nombre_fantasia:'',
          celular: '',
          email: '',
          capital_inicial: 0,
          tipo_empresa:'',
          docente:'',
          direccion: ''
        },
        options: [],
        optionsDocente : [],
        submitted: false,
        
      };
    },
    validations: {
      form: {
        tipo_empresa:{
          required
        },
        docente:{
          required
        }
      },
      
    },
    mounted() {
      this.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
      this.traerTipoEmpresa();
      this.form.token = localStorage.getItem('token');
      this.traerDocente();

      console.log(this.axios.defaults.headers)
    },
    methods: {

      customLabel({nombres, apellidos}) {
        return `${nombres} ${apellidos}`;
      },
     
      traerTipoEmpresa(){
        this.axios
        .get(`/api/obtenertipoempresa/`, { 'headers': { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
        .then((response) => {
          this.options = response.data;
        });

      },

      traerDocente(){

        this.axios
        .get(`/api/obtenerdocentealumno/`)
        .then((response) => {
          this.optionsDocente = response.data[0].docente;

          console.log(response)
        });

      },


      formSubmit() {
        this.submitted = true;
        alert("1");
        if (this.typeform == "create") {
          alert("2");
          this.axios.post(`/api/crearempresa`, this.form)
            .then((res) => {
              console.log(res)
              if (res.data.success) {
                Swal.fire({
                    title: "Crear Empresa",
                    text: "Empresa creada con éxito!",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#34c38f",
                    confirmButtonText: "Ok",
                  }).then((result) => {
                    if (result.value) {
                        this.$router.push('/empresa')
                    }
                  });
              }
            })
            .catch((error) => {
              console.log("error", error);
              const title = "Crear empresa";
              const message = "Error al crear la empresa";
              const type = "error";
              this.$v.form.$reset();

              this.successmsg(title, message, type);
            });
        }
        
    },

    
    
      successmsg(title, message, type) {
        Swal.fire(title, message, type);
      },
  
    },
  };