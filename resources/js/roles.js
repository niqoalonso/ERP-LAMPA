// permisos
import Vue from "vue";
export function permisos() {
  let permisos = "";
  if (localStorage.getItem("cGVybWlzb3M=")) {
    permisos = JSON.parse(atob(localStorage.getItem("cGVybWlzb3M=")));
  }

  Vue.prototype.$rol = atob(localStorage.getItem("cm9s"));

  if (permisos) {
    permisos.map((p) => {
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
  } else {
    Vue.prototype.$CrearDocente = false;
    Vue.prototype.$EditarDocente = false;
    Vue.prototype.$ListarDocente = false;
    Vue.prototype.$EliminarDocente = false;
    Vue.prototype.$ActivarDocente = false;
    Vue.prototype.$SolicitudEmpresa = false;
    Vue.prototype.$SolicitudInicioActividad = false;
    Vue.prototype.$CrearSubNivel = false;
    Vue.prototype.$EditarSubNivel = false;
    Vue.prototype.$ListarSubNivel = false;
    Vue.prototype.$EliminarSubNivel = false;
    Vue.prototype.$ActivarSubNivel = false;
    Vue.prototype.$CrearEstudiante = false;
    Vue.prototype.$EditarEstudiante = false;
    Vue.prototype.$ListarEstudiante = false;
    Vue.prototype.$ActivarEstudiante = false;
    Vue.prototype.$CrearActEconomica = false;
    Vue.prototype.$EditarActEconomica = false;
    Vue.prototype.$ListarActEconomica = false;
    Vue.prototype.$EliminarActEconomica = false;
    Vue.prototype.$CrearProveedor = false;
    Vue.prototype.$EditarProveedor = false;
    Vue.prototype.$ListarProveedor = false;
    Vue.prototype.$EliminarProveedor = false;
    Vue.prototype.$ActivarProveedor = false;
    Vue.prototype.$EditarProductoProveedor = false;
    Vue.prototype.$ListarProductoProveedor = false;
    Vue.prototype.$CrearProductoProveedor = false;
    Vue.prototype.$EditarProductoProveedor = false;
    Vue.prototype.$ListarProductoProveedor = false;
    Vue.prototype.$EliminarProductoProveedor = false;
    Vue.prototype.$CrearEmpresa = false;
    Vue.prototype.$EditarEmpresa = false;
  }
}
