import {
    required,
    email,
    minLength
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
        form: {
          rut: '',
          nombres: '',
          apellidos: '',
          email: '',
          subnivel_id: '',
          password: '',

        },
        subnivelbusqueda:'',
        options: [],
        submitted: false,
        typeform:'create',
        titlemodal: 'Crear Alumno',
        modal: false,
        emailexist: false,
        btnCreate: true,
        // tabla

        tableData: [],

        title: "Alumnos",
        items: [
          {
            text: "Tables",
          },
          {
            text: "Alumnos",
            active: true,
          },
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        pageOptions: [10, 25, 50, 100],
        filter: null,
        filterOn: [],
        sortBy: "nombres",
        sortDesc: false,
        fields: [
          {
            key: "nombres",
            sortable: true,
          },
          {
            key: "apellidos",
            sortable: true,
          },
          {
            key: "estado",
            sortable: true,
          },
          "action",
        ],
      };
    },
    validations: {
      form: {
        rut:{
          required
        },
        nombres: {
          required,
        },
        apellidos: {
          required,
        },
        email: {
          required,
          email
        },
        subnivel_id: {
          required,
        },
        password: {
          required,
          minLength: minLength(4)
        },
      },
      
    },
    mounted() {
      this.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
      this.traerSubnivel();
      this.totalRows = this.items.length;

    },
    methods: {
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
      },
    traerbusqueda(){
        this.axios
        .get(`/api/obtenerestudiante/${this.subnivelbusqueda.id_subnivel}`)
        .then((response) => {
          response.data.map((p) => {
            if (p.user.estado_id == 1) {
              p.user.estado_id = "Activo";
            } else {
              p.user.estado_id = "Desactivado";
            }
            // crear nueva propiedad y asigno el valor
            p["estado"] = p.user.estado_id;

            // remover la propiedad actual
            delete p.user.estado_id;
            // retornar el nuevo objeto
            return p;
          });
          this.tableData = response.data;
        });
    },
    modalNuevo()
    {
      this.modal = true;
      this.titlemodal = "Crear Alumno";
      this.typeform = "create",
      this.form = {
        rut: '',
        nombres: '',
        apellidos: '',
        email: '',
        subnivel_id: '',
        password: '',
      };
      this.btnCreate        = true;
    },
    traerSubnivel(){
        this.axios
        .get(`/api/obtenersubnivelesporNivel`)
        .then((response) => {
          this.options = response.data;
        });

    },
    customLabel ({ nombre, nivel , ano_generacion}) {
        return `( ${nivel.nombre} - ${ano_generacion} ) ${nombre}`

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

    formSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        this.$v.$touch();
        if (!this.$v.$invalid && !this.emailexist) {

          if (this.typeform == "create") {
            this.axios
              .post(`/api/crearestudiante`, this.form)
              .then((res) => {
                if (res.data.success) {
                  const title = "Crear alumno";
                  const message = "Alumno creado con exito";
                  const type = "success";
  
                  this.form = {
                    rut: '',
                    nombres: '',
                    apellidos: '',
                    email: '',
                    subnivel_id: '',
                    password: '',
                  };
  
                  this.modal = false;
                  this.emailexist = false;

                  this.$v.form.$reset();
                  this.traerbusqueda();
                  this.successmsg(title, message, type);
  
                }
              })
              .catch((error) => {
                console.log("error", error);
                const title = "Crear alumno";
                const message = "Error al crear el alumno";
                const type = "error";
  
                this.modal = false;
                this.$v.form.$reset();
  
                this.successmsg(title, message, type);
              });
          }else{
           
            this.axios
            .put(
              `/api/editarestudiante/${this.form.id_estudiante}`,
              this.form
            )
            .then((res) => {
              if (res.data.success) {
                const title = "Alumno actualizado";
                const message = "Alumno actualizado con exito";
                const type = "success";

                this.form = {
                  rut: '',
                  nombres: '',
                  apellidos: '',
                  email: '',
                  subnivel_id: '',
                  password: '',
                };

                this.modal = false;
                this.emailexist = false;
                this.traerbusqueda();
                this.$v.form.$reset();

                this.successmsg(title, message, type);
                this.btnCreate = true;
              }
            })
            .catch((error) => {
              console.log("error", error);
              const title = "Editar Alumno";
              const message = "Error al editar el Alumno";
              const type = "error";

              this.modal = false;
              this.$v.form.$reset();

              this.successmsg(title, message, type);
            });


          }
        }
    },

    editar(datos){
        
        this.traerSubnivel();
        this.modal = true;
        this.typeform = "edit";
        this.form.id_estudiante = datos.id_estudiante;
        this.form.rut = datos.rut;
        this.form.nombres = datos.nombres;
        this.form.apellidos = datos.apellidos;
        this.form.email=datos.user.email;
        this.form.subnivel_id = this.options.find(option => option.id_subnivel === datos.subnivel_id);
        this.titlemodal = "Editar Alumno";
        this.btnCreate = false;

      },

      eliminar(datos){
        if (datos.estado == "Activo") {
          var estado = 2;
          var title = "Desactivar Alumno";
          var text = `Esta seguro de desativar al Alumno ${datos.nombres} ${datos.apellidos}`;
        } else {
          estado = 1;
          title = "Activar Alumno";
          text = `Esta seguro de activar el Alumno ${datos.nombres} ${datos.apellidos}`;
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
                `/api/eliminarestudiante/${datos.id_estudiante}`
              )
              .then((res) => {
                console.log(res);
                if (res.data.success) {
                  var message = "Alumono ha sido desactivado";
                  var type = "success";
                } else {
                  if (estado == 1) {
                    message = "Error al activar el alumno";
                  } else {
                    message = "Error al desactivar el alumno";
                  }
                  type = "error";
                }
  
                this.successmsg(title, message, type);
  
                this.traerbusqueda();
              });
          }
        });
      },

      validarEmail($event){
        if(this.$v.form.email.email){
          this.axios
          .get(`/api/validaremail/${$event.target.value}`)
          .then((response) => {
            if(response.data == 1){
              this.emailexist = true;
            }else{
              this.emailexist = false;
            }
          });
        }
      },

      successmsg(title, message, type) {
        Swal.fire(title, message, type);
      },
  
    },
  };