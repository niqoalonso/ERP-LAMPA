import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
      path: "/listado-alumno",
      name: "listado alumno",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/alumno/listado.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/crear-alumno",
      name: "crear alumno",
      component: () =>
        import(/* webpackChunkName: "home" */ "./views/pages/alumno/crear.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/listado-docente",
      name: "listado docente",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/docente/listado.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/niveles",
      name: "niveles",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/niveles/niveles.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/empresa",
      name: "empresa",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/empresas/empresa.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/plancuenta",
      name: "plancuenta",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/plancuenta/plancuenta.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/crear-empresa",
      name: "crear empresa",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/empresas/crear-empresa.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/actividad_economica",
      name: "actividad economica",
      component: () =>
        import(/* webpackChunkName: "home" */ "./views/pages/giros/giro.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/gestion_proveedor",
      name: "gestion proveedor",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/proveedor/proveedor.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/producto_proveedor",
      name: "producto proveedor",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/proveedor/producto.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/manual_cuenta_sii",
      name: "manual cuenta",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/manualDeCuenta/manual.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/asiento-inicial",
      name: "asiento inicial",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/asientoinicial/asiento.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/comprobanteDetalle/:id",
      name: "comprobante detalle",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/asientoinicial/detalleComprobante.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "home" */ "./views/pages/login/login.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/editar-empresa/:id",
      name: "editar empresa",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/empresas/editar-empresa.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/unidadNegocio/:id",
      name: "nueva unidad negocio",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/empresas/unidad-negocio.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/solicitud-empresa",
      name: "solicitud empresa",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/solicitud/solicitud-empresa.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/solicitud-actividades",
      name: "solicitud actividades",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/solicitud/solicitud-4415.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/ver-solicitud/:id",
      name: "ver solicitud",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/solicitud/ver-solicitud.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/f4415/:id",
      name: "formulario f4415",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/formularios/f4415.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/ver-solicitud-4415/:id",
      name: "ver solicitud 4415",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/solicitud/ver-solicitud-4415.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/documentos_tributario",
      name: "documentos tributarios",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/documentosT/documentos.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/documentos_tributario/:id",
      name: "documentos tributarios relaciones",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/documentosT/relaciones.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/abastecimiento_emitir",
      name: "abastecimiento emitir",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/abastecimiento/ingresar.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/abastecimiento_emitir/:tipo",
      name: "abastecimiento formulario",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/abastecimiento/formulario.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/modificarDocumento/:tipo",
      name: "detalle emitir",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/abastecimiento/detalle.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/modificarDocumento/:documento/:tipo",
      name: "modificar documento relacion",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/abastecimiento/generarDocRelacion.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/modificarDocumento",
      name: "modificar documento",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/abastecimiento/modificar.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/aprobarDocumento",
      name: "aprobar documento",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/abastecimiento/aprobar.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/emitirDocumento",
      name: "emitir documento",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/abastecimiento/listaEmitir.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/emitirDocumentoExistencia/:documento",
      name: "emitir documento existencia",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/abastecimiento/existencia.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/verDocumentoCompra",
      name: "ver docompra",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/abastecimiento/verDocumento.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/existencias",
      name: "existencias",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/existencia/existencia.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/existencias/:sku",
      name: "ver tarjetas",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/existencia/verTarjeta.vue"
        ),
      meta: { requiresAuth: true },
    },
    {

      path: "/indicadores-previsionales",
      name: "indicadores previsionales",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/indicadoresP/indicadores.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
        path: "/impuesto-utm",
        name: "impuesto utm",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "./views/pages/impuestoutm/impuestoutm.vue"
          ),
        meta: { requiresAuth: true },
      },
    {
      path: "/trabajadores",
      name: "trabajadores",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/trabajadores/trabajadores.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/remuneraciones",
      name: "remuneraciones",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/remuneraciones/remuneraciones.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/tesoreriaCompras",
      name: "tesoreriacompras",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "./views/pages/tesoreria/egresos.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
        path: "/libro-remuneraciones",
        name: "libro remuneraciones",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "./views/pages/remuneraciones/libroremuneracion.vue"
          ),
        meta: { requiresAuth: true },
      },
      {
        path: "/anticipos",
        name: "anticipos",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "./views/pages/remuneraciones/anticipos.vue"
          ),
        meta: { requiresAuth: true },
      },
      {
        path: "/libro-diario",
        name: "libro diario",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "./views/pages/libros/libro-diario.vue"
          ),
        meta: { requiresAuth: true },
      },
      {
        path: "/libro-caja",
        name: "libro caja",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "./views/pages/libros/libro-caja.vue"
          ),
        meta: { requiresAuth: true },
      },
      {
        path: "/libro-banco",
        name: "libro banco",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "./views/pages/libros/libro-banco.vue"
          ),
        meta: { requiresAuth: true },
      },
      {
        path: "/libro-mayor",
        name: "libro mayor",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "./views/pages/libros/libro-mayor.vue"
          ),
        meta: { requiresAuth: true },
      },
  ];

const router = new VueRouter({
    routes,
    // Use the HTML5 history API (i.e. normal-looking routes)
    // instead of routes with hashes (e.g. example.com/#/about).
    // This may require some server configuration in production:
    // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
    mode: "history",
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {
                x: 0,
                y: 0
            };
        }
    }
});

router.beforeEach((to, from, next) => {
    //A Logged-in user can't go to login page again
    if (to.name === "login" && localStorage.getItem("token")) {
      let rol = atob(localStorage.getItem('cm9s'));


          if(rol === "Estudiante" ){

            router.push({
              name: "empresa",
            });

          }else if(rol === "Administrador" ){

            router.push({
              name: "niveles",
            });
          }
          else if(rol === "Docente" ){

            router.push({
              name: "solicitud empresa",
            });
          }else{

            router.push({
              name: "listado docente",
            });

          }

      //the route requires authentication
    } else if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!localStorage.getItem("token")) {
        //user not logged in, send them to login page
        router.push({
          name: "login",
          query: {
            to: to.name,
          },
        });
      } else {
        if (!hasAccess(to.name)) {

          let rol = atob(localStorage.getItem('cm9s'));


          if(rol === "Estudiante" ){

            router.push({
              name: "empresa",
            });

          }else if(rol === "Administrador" ){

            router.push({
              name: "niveles",
            });
          }
          else if(rol === "Docente" ){

            router.push({
              name: "solicitud empresa",
            });
          }

        }
      }
    }

    return next();
  });

  function hasAccess(name) {
    const rol = atob(localStorage.getItem('cm9s'));

    switch (name) {
      case "empresa":
        if (rol == "Estudiante") {
          return true;
        } else {
          return false;
        }

      case "crear empresa":
        if (rol == "Estudiante") {
          return true;
        } else {
          return false;
        }
      case "plancuenta":
        if (rol == "Estudiante") {
          return true;
        } else {
          return false;
        }
        case "abastecimiento formulario":
        if (rol == "Estudiante") {
          return true;
        } else {
          return false;
        }
      case "asiento inicial":
        if (rol == "Estudiante") {
          return true;
        } else {
          return false;
        }
        case "comprobante detalle":
          if (rol == "Estudiante") {
            return true;
          } else {
            return false;
          }
        case "abastecimiento emitir":
          if (rol == "Estudiante") {
            return true;
          } else {
            return false;
          }
          case "formulario tributario":
          if (rol == "Estudiante") {
            return true;
          } else {
            return false;
          }
          case "detalle emitir":
          if (rol == "Estudiante") {
            return true;
          } else {
            return false;
          }
          case "aprobar documento":
          if (rol == "Estudiante") {
            return true;
          } else {
            return false;
          }
          case "emitir documento":
          if (rol == "Estudiante") {
            return true;
          } else {
            return false;
          }
          case "emitir documento existencia":
          if (rol == "Estudiante") {
            return true;
          } else {
            return false;
          }
          case "ver docompra":
          if (rol == "Estudiante") {
            return true;
          } else {
            return false;
          }
          case "modificar documento":
          if (rol == "Estudiante") {
            return true;
          } else {
            return false;
          }
          case "modificar documento relacion":
          if (rol == "Estudiante") {
            return true;
          } else {
            return false;
          }
          case "tesoreriacompras":
          if (rol == "Estudiante") {
            return true;
          } else {
            return false;
          }
          case "existencias":
          if (rol == "Estudiante") {
            return true;
          } else {
            return false;
          }
          case "ver tarjetas":
          if (rol == "Estudiante") {
            return true;
          } else {
            return false;
          }
      case "producto proveedor":
        if (rol == "Administrador" || rol == "Docente") {
          return true;
        } else {
          return false;
        }
      case "manual cuenta":
        if (rol == "Administrador" || rol == "Docente") {
          return true;
        } else {
          return false;
        }

      case "actividad economica":
        if (rol == "Administrador" || rol == "Docente") {
          return true;
        } else {
          return false;
        }
      case "gestion proveedor":
        if (rol == "Administrador" || rol == "Docente") {
          return true;
        } else {
          return false;
        }

      case "niveles":
        if (rol == "Administrador") {
          return true;
        } else {
          return false;
        }

      case "listado docente":
        if (rol == "Administrador") {
          return true;
        } else {
          return false;
        }

      case "listado alumno":
        if (rol == "Administrador" || rol == "Docente") {
          return true;
        } else {
          return false;
        }

      case "editar empresa":
        if (rol == "Estudiante") {
          return true;
        } else {
          return false;
        }

      case "nueva unidad negocio":
          if (rol == "Estudiante") {
            return true;
          } else {
            return false;
          }

      case "solicitud empresa":
        if (rol == "Administrador" || rol == "Docente") {
          return true;
        } else {
          return false;
        }

      case "ver solicitud":
        if (rol == "Administrador" || rol == "Docente") {
          return true;
        } else {
          return false;
        }

      case "formulario f4415":
        if (rol == "Administrador" || rol == "Docente" || rol == "Estudiante") {
          return true;
        } else {
          return false;
        }
      case "documentos tributarios":
        if (rol == "Administrador" || rol == "Docente") {
          return true;
        } else {
          return false;
        }
        case "documentos tributarios relaciones":
        if (rol == "Administrador" || rol == "Docente") {
          return true;
        } else {
          return false;
        }
      case "solicitud actividades":
        if (rol == "Administrador" || rol == "Docente") {
          return true;
        } else {
          return false;
        }

        case "ver solicitud 4415":
        if (rol == "Administrador" || rol == "Docente") {
          return true;
        } else {
          return false;
        }

        case "indicadores previsionales":
        if (rol == "Administrador" || rol == "Docente" || rol == "Estudiante") {
          return true;
        } else {
          return false;
        }

        case "impuesto utm":
        if (rol == "Administrador" || rol == "Docente") {
          return true;
        } else {
          return false;
        }


        case "trabajadores":
        if (rol == "Administrador" || rol == "Docente" || rol == "Estudiante") {
          return true;
        } else {
          return false;
        }
        case "remuneraciones":
        if (rol == "Administrador" || rol == "Docente" || rol == "Estudiante") {
          return true;
        } else {
          return false;
        }

        case "libro remuneraciones":
        if (rol == "Administrador" || rol == "Docente" || rol == "Estudiante") {
          return true;
        } else {
          return false;
        }

        case "anticipos":
        if (rol == "Administrador" || rol == "Docente" || rol == "Estudiante") {
          return true;
        } else {
          return false;
        }

        case "libro diario":
        if (rol == "Administrador" || rol == "Docente" || rol == "Estudiante") {
          return true;
        } else {
          return false;
        }

        case "libro caja":
        if (rol == "Administrador" || rol == "Docente" || rol == "Estudiante") {
          return true;
        } else {
          return false;
        }

        case "libro banco":
        if (rol == "Administrador" || rol == "Docente" || rol == "Estudiante") {
          return true;
        } else {
          return false;
        }

        case "libro mayor":
        if (rol == "Administrador" || rol == "Docente" || rol == "Estudiante") {
          return true;
        } else {
          return false;
        }

      default:
        return false;
    }
  }

export default router;
