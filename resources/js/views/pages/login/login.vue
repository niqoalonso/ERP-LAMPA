<script>
import Vue from "vue";
import { required, email } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
export default {
  mounted() {
    document.body.classList.add("authentication-bg");
  },
  data() {
    return {
      urlbackend: this.$urlBackend,
      form: {
        email: "",
        password: "",
      },
      submitted: false,
    };
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },

  methods: {
    formSubmit() {
      console.log(this.form);
      this.submitted = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.axios
          .post(`/api/login`, this.form)
          .then((res) => {
            console.log(res.data.data);
            if (res.data.success) {
              const token = res.data.data.token;
              const rol = btoa(res.data.data.rol[0]);
              const nrol = btoa("rol");
              //Vue.prototype.$globalEmpresas = res.data.data.empresa;
              // const id_estudiante_docente = res.data.data.id_estudiante;
              localStorage.setItem("token", token);
              localStorage.setItem(nrol, rol);

              let permisos = JSON.stringify(res.data.data.permisos);

              const nperm = btoa("permisos");

              localStorage.setItem(nperm, btoa(permisos));

              Vue.prototype.$rol = res.data.data.rol[0];
              
              if (res.data.data.rol[0] === "Estudiante") {
                Vue.prototype.$globalEmpresas = JSON.stringify(res.data.data.empresa);
                localStorage.setItem("globalEmpresas", JSON.stringify(res.data.data.empresa));
                Vue.prototype.$globalEmpresasSelected = JSON.stringify(res.data.data.empresa[0]);
                localStorage.setItem("globalEmpresasSelected", JSON.stringify(res.data.data.empresa[0]));
              }
              
              res.data.data.permisos.map((p) => {
                if (p.name == "Crear Docente") {
                  Vue.prototype.$CrearDocente = true;
                } else if (p.name == "Editar Docente") {
                  Vue.prototype.$EditarDocente = true;
                } else if (p.name == "Listar Docente") {
                  Vue.prototype.$ListarDocente = true;
                } else if (p.name == "Eliminar Docente") {
                  Vue.prototype.$EliminarDocente = true;
                } else if (p.name == "Activar Docente") {
                  Vue.prototype.$ActivarDocente = true;
                } else if (p.name == "Solicitud Empresa") {
                  Vue.prototype.$SolicitudEmpresa = true;
                } else if (p.name == "Solicitud Inicio Actividad") {
                  Vue.prototype.$SolicitudInicioActividad = true;
                } else if (p.name == "Crear SubNivel") {
                  Vue.prototype.$CrearSubNivel = true;
                } else if (p.name == "Editar SubNivel") {
                  Vue.prototype.$EditarSubNivel = true;
                } else if (p.name == "Listar SubNivel") {
                  Vue.prototype.$ListarSubNivel = true;
                } else if (p.name == "Eliminar SubNivel") {
                  Vue.prototype.$EliminarSubNivel = true;
                } else if (p.name == "Activar SubNivel") {
                  Vue.prototype.$ActivarSubNivel = true;
                } else if (p.name == "Crear Estudiante") {
                  Vue.prototype.$CrearEstudiante = true;
                } else if (p.name == "Editar Estudiante") {
                  Vue.prototype.$EditarEstudiante = true;
                } else if (p.name == "Listar Estudiante") {
                  Vue.prototype.$ListarEstudiante = true;
                } else if (p.name == "Activar Estudiante") {
                  Vue.prototype.$ActivarEstudiante = true;
                } else if (p.name == "Crear Act. Economica") {
                  Vue.prototype.$CrearActEconomica = true;
                } else if (p.name == "Editar Act. Economica") {
                  Vue.prototype.$EditarActEconomica = true;
                } else if (p.name == "Listar Act. Economica") {
                  Vue.prototype.$ListarActEconomica = true;
                } else if (p.name == "Eliminar Act. Economica") {
                  Vue.prototype.$EliminarActEconomica = true;
                } else if (p.name == "Crear Proveedor") {
                  Vue.prototype.$CrearProveedor = true;
                } else if (p.name == "Editar Proveedor") {
                  Vue.prototype.$EditarProveedor = true;
                } else if (p.name == "Listar Proveedor") {
                  Vue.prototype.$ListarProveedor = true;
                } else if (p.name == "Eliminar Proveedor") {
                  Vue.prototype.$EliminarProveedor = true;
                } else if (p.name == "Activar Proveedor") {
                  Vue.prototype.$ActivarProveedor = true;
                } else if (p.name == "Crear Producto Proveedor") {
                  Vue.prototype.$CrearProductoProveedor = true;
                } else if (p.name == "Editar Producto Proveedor") {
                  Vue.prototype.$EditarProductoProveedor = true;
                } else if (p.name == "Listar Producto Proveedor") {
                  Vue.prototype.$ListarProductoProveedor = true;
                } else if (p.name == "Eliminar Producto Proveedor") {
                  Vue.prototype.$EliminarProductoProveedor = true;
                } else if (p.name == "Crear Empresa") {
                  Vue.prototype.$CrearEmpresa = true;
                } else if (p.name == "Editar Empresa") {
                  Vue.prototype.$EditarEmpresa = true;
                }
                return p;
              });

              if (res.data.data.rol[0] === "Estudiante") {
                this.$router.push("/empresa");
              } else if (res.data.data.rol[0] === "Administrador") {
                this.$router.push("/niveles");
              } else if (res.data.data.rol[0] === "Docente") {
                this.$router.push("/solicitud-empresa");
              }

              // this.$router.push("/empresa");
            } else {
              const title = "Login";
              const message = "Revisa el usuario o contraseña ingresada";
              const type = "error";
              this.successmsg(title, message, type);
            }
          })
          .catch((error) => {
            console.log("error", error);
            const title = "Login";
            const message = "Revisa el usuario o contraseña ingresada";
            const type = "error";
            this.successmsg(title, message, type);
          });
      }
    },
    successmsg(title, message, type) {
      Swal.fire(title, message, type);
    },
  },
};
</script>

<template>
  <div>
    <div class="account-pages my-5 pt-sm-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center">
              <router-link to="/login" class="mb-5 d-block auth-logo">
                <img
                  src="assets/images/logo.png"
                  alt=""
                  height="150"
                  class="logo logo-dark"
                />
                <img
                  src="assets/images/logo.png"
                  alt=""
                  height="100"
                  class="logo logo-light"
                />
              </router-link>
            </div>
          </div>
        </div>
        <div class="row align-items-center justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card">
              <div class="card-body p-4">
                <div class="text-center mt-2">
                  <h5 class="text-primary">Bienvenido !</h5>
                  <p class="text-muted">ERP Contabilidad y Administración.</p>
                </div>
                <div class="p-2 mt-4">
                  <form class="needs-validation" @submit.prevent="formSubmit">
                    <div class="mb-3">
                      <label for="username">Correo</label>
                      <input
                        type="text"
                        class="form-control"
                        id="username"
                        placeholder="usuario@correo.com"
                        v-model="form.email"
                        :class="{
                          'is-invalid': submitted && $v.form.email.$error,
                        }"
                      />
                      <div
                        v-if="submitted && $v.form.email.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.form.email.required"
                          >Email requerido.</span
                        >
                        <span v-if="!$v.form.email.email"
                          >Ingrese un email valido.</span
                        >
                      </div>
                    </div>

                    <div class="mb-3">
                      <div class="float-end">
                        <router-link to="/auth/recoverpwd" class="text-muted">
                          Olvidó su contraseña</router-link
                        >
                      </div>
                      <label for="userpassword">Contraseña</label>
                      <input
                        type="password"
                        class="form-control"
                        id="userpassword"
                        v-model="form.password"
                        placeholder="**********"
                        :class="{
                          'is-invalid': submitted && $v.form.password.$error,
                        }"
                      />
                      <div
                        v-if="submitted && $v.form.password.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.form.password.required"
                          >Contraseña requerida.</span
                        >
                      </div>
                    </div>

                    <div class="mt-3 text-end">
                      <button
                        class="btn btn-primary w-sm waves-effect waves-light"
                        type="submit"
                      >
                        <i class="mdi mdi-login-variant"></i>
                        Ingresar
                      </button>
                    </div>
                    <hr />
                    <p>
                      © {{ new Date().getFullYear() }} Desarrollado por
                      <i
                        class="mdi mdi-checkbox-marked-circle-outline text-primary"
                      ></i>
                      CENTO - Servicios Informaticos.
                    </p>
                  </form>
                </div>
              </div>
            </div>

            <div class="mt-5 text-center"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
