import Vue from "vue";

export const menuItems = [
  {
    id: 0,
    label: "Administración",
    isTitle: true,
    permiso: Vue.prototype.$SolicitudEmpresa,
  },
  {
    id: 1,
    label: "Sistema",
    icon: "fas fa-tools",
    permiso: Vue.prototype.$ListarProductoProveedor,
    subItems: [
      {
        id: 1.2,
        label: "Docentes",
        link: "/listado-docente",
        parentId: 1,
        permiso: Vue.prototype.$ListarDocente,
      },
      {
        id: 1.2,
        label: "Estudiantes",
        link: "/listado-alumno",
        parentId: 1,
        permiso: Vue.prototype.$ListarEstudiante,
      },
      {
        id: 1.3,
        label: "Niveles",
        link: "/niveles",
        parentId: 1,
        permiso: Vue.prototype.$ListarSubNivel,
      },
    ],
  },
  {
    id: 2,
    label: "General",
    icon: "fab fa-whmcs",
    permiso: Vue.prototype.$ListarProductoProveedor,
    subItems: [
      {
        id: 2.1,
        label: "Gestión Proveedores",
        link: "/gestion_proveedor",
        parentId: 2,
        permiso: Vue.prototype.$ListarProveedor,
      },
      {
        id: 2.2,
        label: "Productos Proveedor",
        link: "/producto_proveedor",
        parentId: 2,
        permiso: Vue.prototype.$ListarProductoProveedor,
      },
      {
        id: 2.3,
        label: "Manual de Cuenta",
        link: "/manual_cuenta_sii",
        parentId: 2,
        permiso: Vue.prototype.$ListarProductoProveedor,
      },
      {
        id: 2.4,
        label: "Act. Economicas",
        link: "/actividad_economica",
        parentId: 2,
        permiso: Vue.prototype.$SolicitudEmpresa,
      },
      {
        id: 2.5,
        label: "Documentos Tributarios",
        link: "/documentos_tributario",
        parentId: 2,
        permiso: Vue.prototype.$SolicitudEmpresa,
      },
      {
        id: 2.6,
        label: "Indicadores Previsionales",
        link: "/indicadores-previsionales",
        parentId: 2,
        permiso: Vue.prototype.$SolicitudEmpresa,
      },
      {
        id: 2.7,
        label: "Impuesto UTM",
        link: "/impuesto-utm",
        parentId: 2,
        permiso: Vue.prototype.$SolicitudEmpresa,
      },
    ],
  },

  {
    id: 3,
    label: "Plataforma",
    isTitle: true,
    permiso: Vue.prototype.$CrearEmpresa,
  },

  {
    id: 4,
    label: "Gestión Empresas",
    icon: "fas fa-store-alt",
    permiso: Vue.prototype.$CrearEmpresa,
    subItems: [
      {
        id: 4.1,
        label: "Empresas",
        link: "/empresa",
        parentId: 4,
        permiso: Vue.prototype.$CrearEmpresa,
      },
      {
        id: 4.2,
        label: "Centro Contable",
        link: "/plancuenta",
        parentId: 4,
        permiso: Vue.prototype.$CrearEmpresa,
      },
    ],
  },

  {
    id: 8,
    label: "RRHH",
    icon: "fab fa-whmcs",
    permiso: Vue.prototype.$CrearEmpresa,
    subItems: [
      {
        id: 8.1,
        label: "Trabajadores",
        link: "/trabajadores",
        parentId: 8,
        permiso: Vue.prototype.$CrearEmpresa,
      },
      {
        id: 8.2,
        label: "Remuneraciones",
        link: "/remuneraciones",
        parentId: 8,
        permiso: Vue.prototype.$CrearEmpresa,
      },
      {
        id: 8.3,
        label: "Libro Remuneraciones",
        link: "/libro-remuneraciones",
        parentId: 8,
        permiso: Vue.prototype.$CrearEmpresa,
      },
      {
        id: 8.4,
        label: "Anticipos",
        link: "/anticipos",
        parentId: 8,
        permiso: Vue.prototype.$CrearEmpresa,
      },
    ]
  },

  {
    id: 10,
    label: "Existencias",
    icon: "fa fa-list ",
    permiso: Vue.prototype.$CrearEmpresa,
    subItems: [
      {
        id: 10.1,
        label: "Tarjetas",
        link: "/existencias",
        parentId:10,
        permiso: Vue.prototype.$CrearEmpresa,
      },
    ]
  },

  {
    id: 5,
    label: "Solicitudes",
    icon: "fas fa-store-alt",
    permiso: Vue.prototype.$ListarProductoProveedor,
    subItems: [
      {
        id: 5.1,
        label: "Escrituras",
        link: "/solicitud-empresa",
        parentId: 5,
        permiso: Vue.prototype.$SolicitudEmpresa,
      },
      {
        id: 5.2,
        label: "Inicio Actividades",
        link: "/solicitud-actividades",
        parentId: 5,
        permiso: Vue.prototype.$SolicitudInicioActividad,
      }
    ],
  },

  {
    id: 7,
    label: "Abastecimiento",
    icon: "uil-truck-loading",
    permiso: Vue.prototype.$CrearEmpresa,
    subItems: [
      {
        id: 7.1,
        label: "Ingresar documento",
        link: "/abastecimiento_emitir",
        parentId: 7,
        permiso: Vue.prototype.$CrearEmpresa,
      },
      {
        id: 7.2,
        label: "Modificar documento",
        link: "/modificarDocumento",
        parentId: 7,
        permiso: Vue.prototype.$CrearEmpresa,
      },
      {
        id: 7.3,
        label: "Aprobar documento",
        link: "/aprobarDocumento",
        parentId: 7,
        permiso: Vue.prototype.$CrearEmpresa,
      },
      {
        id: 7.4,
        label: "Emitir documento",
        link: "/emitirDocumento",
        parentId: 7,
        permiso: Vue.prototype.$CrearEmpresa,
      },
      {
        id: 7.5,
        label: "Ver documento",
        link: "/verDocumentoCompra",
        parentId: 7,
        permiso: Vue.prototype.$CrearEmpresa,
      },
    ],
  },

  {
    id: 9,
    label: "Tesoreria",
    icon: "fa fa-university",
    permiso: Vue.prototype.$CrearEmpresa,
    subItems: [
      {
        id: 9.1,
        label: 'Egresos - "Pago"',
        link: "/tesoreriaCompras",
        parentId: 9,
        permiso: Vue.prototype.$CrearEmpresa,
      },
      {
        id: 9.3,
        label: 'Ingresos - "Venta"',
        link: "/",
        parentId: 9,
        permiso: Vue.prototype.$CrearEmpresa,
      },
      {
        id: 9.2,
        label: "Historico",
        link: '/',
        parentId: 9,
        permiso: Vue.prototype.$CrearEmpresa,
      },
    ]
  },

  {
    id: 6,
    label: "Finanzas",
    icon: "fas fa-network-wired",
    permiso: Vue.prototype.$CrearEmpresa,
    subItems: [
      {
        id: 6.1,
        label: "Comprobantes",
        link: "/asiento-inicial",
        parentId: 6,
        permiso: Vue.prototype.$CrearEmpresa,
      },
    ],
  },

  {
    id: 11,
    label: "Libros",
    icon: "fas fa-network-wired",
    permiso: Vue.prototype.$CrearEmpresa,
    subItems: [
      {
        id: 11.1,
        label: "Libros Diario",
        link: "/libro-diario",
        parentId: 11,
        permiso: Vue.prototype.$CrearEmpresa,
      },
      {
        id: 11.2,
        label: "Libros Caja",
        link: "/libro-caja",
        parentId: 11,
        permiso: Vue.prototype.$CrearEmpresa,
      },
      {
        id: 11.3,
        label: "Libros Banco",
        link: "/libro-banco",
        parentId: 11,
        permiso: Vue.prototype.$CrearEmpresa,
      },
    ],
  },

];
