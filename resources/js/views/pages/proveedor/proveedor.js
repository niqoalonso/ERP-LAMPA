import Layout from "../../layouts/main";
import Swal from "sweetalert2";


import { required, numeric, email} from "vuelidate/lib/validators";
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
        rut: "",
        nombre: "",
        direccion: "",
        correo: "",
        celular: "",
        giro: "",
      },
      giros: [], 
      submitted: false,
      typeform: "create",
      divButton: true,

      // permiso

      crearproveedor: this.$CrearProveedor,
      listarproveedor: this.$ListarProveedor,
      editarproveedor: this.$EditarProveedor,
      eliminarproveedor: this.$EliminarProveedor,

      // tabla

      tableData: [],

      title: "actividad",
      items: [
        {
          text: "Tables",
        },
        {
          text: "actividad",
          active: true,
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100, 1000],
      filter: null,
      filterOn: [],
      sortBy: "Nivel",
      sortDesc: false,
      fields: [
        {
          label: "RUT",
          key: "rut",
          sortable: true,
        },
        {
          labe: "Razon Social",
          key: "razon_social",
          sortable: true,
        },
        {
          label: "Celular",
          key: "celular",
          sortable: true,
        },
        {  
          label: "Correo",
          key: "email",
          sortable: true,
        },
        { 
          label: "Giro",
          key: "giroNombre",
          sortable: true,
        },
        "action",
      ],
    };
  },
  validations: {
    form: {
      rut: {
        required,
      },
      nombre: {
        required,
      },
      celular: {
        required,
        numeric,
      },
      correo: {
        required,
        email,
      },
      direccion: {
        required,
      },
      giro: {
        required,
      }

    },
  },
  mounted() {
    this.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
    this.traerData();
    this.traerGiros();

    this.totalRows = this.items.length;
    
  },
  methods: {

    traerData() {
      this.axios
        .get(`/api/obtenerProveedores`)
        .then((response) => {
          response.data.map((p) => {
            
            p["giroNombre"] = p.giro.nombre;
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

    checkRut() {

      var valor = this.form.rut.replace('.','');  // Quita Punto
      valor = valor.replace('-','');// Quita Guión
      var cuerpo = valor.slice(0,-1);// Aislar Cuerpo y Dígito Verificador
      var dv = valor.slice(-1).toUpperCase();
      this.form.rut = cuerpo + '-'+ dv// Formatear RUN

      if(cuerpo.length < 7) {// Si no cumple con el mínimo de digitos ej. (n.nnn.nnn)
          $('.inputRUT').attr('style', 'border-color: red !important');
          $('.btnSubmit').prop('disabled',  true);
          return false;
      }

      var suma = 0; // Calcular Dígito Verificador
      var multiplo = 2;

      for(var i=1;i<=cuerpo.length;i++) // Para cada dígito del Cuerpo
      {
          var index = multiplo * valor.charAt(cuerpo.length - i); // Obtener su Producto con el Múltiplo Correspondiente
          suma = suma + index; // Sumar al Contador General
          if(multiplo < 7) {
              multiplo = multiplo + 1;
          }else{
              multiplo = 2;
          } // Consolidar Múltiplo dentro del rango [2,7]
      }

      var dvEsperado = 11 - (suma % 11); // Calcular Dígito Verificador en base al Módulo 11
      dv = (dv == 'K')?10:dv; // Casos Especiales (0 y K)
      dv = (dv == 0)?11:dv;

      if(dvEsperado != dv) {
          $('.inputRUT').attr('style', 'border-color: red !important');
          $('.btnSubmit').prop('disabled',  true);
          return false;
      } // Validar que el Cuerpo coincide con su Dígito Verificador

      $('.inputRUT').attr('style', 'border-color: #40A944 !important');  // Si todo sale bien, eliminar errores (decretar que es válido)
      $('.btnSubmit').prop('disabled',  false);
    },

    customLabel({ nombre, codigo }) {
      return `( ${codigo} ) - ${nombre}`;
    },

    formSubmit() {
      
      this.submitted = true;

      this.$v.$touch();
 
      if (!this.$v.$invalid) {
        if (this.typeform == "create") {
          this.axios
            .post(`/api/crearProveedor`, this.form)
            .then((res) => {
              if (res.data.success) {
                const title = "Nuevo  Proveedor";
                const message = "Proveedor creado exitosamente.";
                const type = "success";

                this.form = {
                  rut: "",
                  nombre: "",
                  celular: "",
                  correo: "",
                  direccion: "",
                  giro: "",
                };

                this.$v.form.$reset();
                this.traerData();
                this.successmsg(title, message, type);
                $('.inputRUT').attr('style', 'border: 1px solid #ced4da !important');
                $('.btnSubmit').prop('disabled',  true);
              }
            })
            .catch(error => {
              console.log(error);
                console.clear();
            });
        } else if (this.typeform == "edit") {
          this.axios
            .put(
              `/api/updateProveedor/${this.form.id_proveedor}`,
              this.form
            )
            .then((res) => {
              if (res.data.success) {
                const title = "Proveedor";
                const message = "Actualizado Exitosamente";
                const type = "success";

                this.form = {
                  id_proveedor: "",
                  rut: "",
                  nombre: "",
                  celular: "",
                  correo: "",
                  direccion: "",
                  giro: "",
                };

                this.traerData();
                this.$v.form.$reset();
                this.divButton = true,

                this.successmsg(title, message, type);
                $('.inputRUT').attr('style', 'border: 1px solid #ced4da !important');
                $('.btnSubmit').prop('disabled',  true);
              }
            })
            .catch((error) => {
                console.clear();
            });
        }
      }
    },
 
    traerGiros() {
      this.axios
        .get(`/api/getGirosProveedor`)
        .then((response) => {
            this.giros = response.data;
        });
    },

    successmsg(title, message, type) {
      Swal.fire(title, message, type);
    },

    editar(datos) {
      this.typeform = "edit";
      this.form.id_proveedor  = datos.id_proveedor;
      this.form.rut           = datos.rut;
      this.form.nombre        = datos.razon_social;
      this.form.celular       = datos.celular;
      this.form.correo        = datos.email;
      this.form.direccion     = datos.direccion;
      this.form.giro          = datos.giro;
      this.divButton = false;
    },

    cancelar()
    {
      this.form = {
        id_proveedor: "",
        rut: "",
        nombre: "",
        celular: "",
        correo: "",
        direccion: "",
        giro: "",
      };
      this.divButton = true;
      this.typeform = "create";
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
