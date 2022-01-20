import Swal from "sweetalert2";
import Layout from "../../layouts/main";
import Multiselect from "vue-multiselect";
import moment from "moment";
import Vue from "vue";
import { required } from "vuelidate/lib/validators";
export default {
    components: {
        Layout,
        Swal,
        Multiselect,
    },
    data() {
        return {
            infoEmpresa: JSON.parse(
                localStorage.getItem("globalEmpresasSelected")
            ),
            optionsOrigen: [],
            optionsDestino: [],
            titlemodal: "Aprobación Documento Tributario.",
            modalAprobacion: false,
            formAprobacion: {
                n_encabezado: "",
                proveedor: "",
                f_emision: "",
                origen: "",
                destino: "",
                empresa: "",
                id_documento: "",
            },
            formRemuneraciones: {
                fecha: "",
                cuenta: "",
                id_empresa: "",
            },
            optionsCuentas: [],
            submitted: false,
            modal: false,
            id_empresa: JSON.parse(Vue.prototype.$globalEmpresasSelected),

            //TABLA DE DOCUMENTOS TRIBUTARIOS
            tableData: [],
            title: "Empresas",
            items: [
                {
                    text: "Tables",
                },
                {
                    text: "Empresas",
                    active: true,
                },
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 25, 50, 100],
            filter: null,
            filterOn: [],
            sortBy: "tipo empresa",
            sortDesc: false,
            fields: [
                {
                    label: "N° Compra",
                    key: "encabezado",
                    sortable: true,
                },
                {
                    label: "N° Documento",
                    key: "n_documento",
                    sortable: true,
                },
                {
                    label: "Tipo",
                    key: "documento_tributario.tipo",
                    sortable: true,
                },
                {
                    label: "Glosa",
                    key: "glosa",
                    sortable: true,
                },
                {
                    label: "Proveedor",
                    key: "proveedorName",
                    sortable: true,
                },
                {
                    label: "Total",
                    key: "total",
                    sortable: true,
                },
                {
                    label: "Fecha Emisión",
                    key: "fecha_emision",
                    sortable: true,
                },
                "acción",
            ],
            // tabla remuneraciones
            itemsRemuneraciones: [
                {
                    text: "Tables",
                },
                {
                    text: "Remuneraciones",
                    active: true,
                },
            ],
            tableDataRemuneraciones: [],
            totalRowsRemuneraciones: 1,
            currentPageRemuneraciones: 1,
            perPageRemuneraciones: 10,
            pageOptionsRemuneraciones: [10, 25, 50, 100],
            filterRemuneraciones: null,
            filterOnRemuneraciones: [],
            sortByRemuneraciones: "trabajador",
            sortDescRemuneraciones: false,
            fieldsRemuneraciones: [
                {
                    key: "trabajador",
                    sortable: true,
                    label: "Trabajador",
                    formatter: (trabajador) => {
                        return `${trabajador.nombres} ${trabajador.apellidos}`;
                    },
                },
                {
                    key: "total_imponible",
                    sortable: true,
                    label: "Total imponible",
                    formatter: (total_imponible) => {
                        var formatter = new Intl.NumberFormat("es-CL", {
                            style: "currency",
                            currency: "CLP",
                            minimumFractionDigits: 0,
                        });
                        return formatter.format(total_imponible);
                    },
                },
                {
                    key: "sueldo_liquido",
                    sortable: true,
                    label: "Sueldo Liquido",
                    formatter: (sueldo_liquido) => {
                        var formatter = new Intl.NumberFormat("es-CL", {
                            style: "currency",
                            currency: "CLP",
                            minimumFractionDigits: 0,
                        });
                        return formatter.format(sueldo_liquido);
                    },
                },
                {
                    key: "fecha",
                    sortable: true,
                },
                "action",
            ],
        };
    },

    validations: {
        formRemuneraciones: {
            fecha: {
                required,
            },
            cuenta: {
                required,
            },
        },
    },

    computed: {
        rows() {
            return this.tableDataRemuneraciones.length;
        },
    },

    mounted() {
        this.axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
        this.totalRows = this.items.length;
        this.totalRowsRemuneraciones = this.items.length;

        this.getInicialCompras();
        this.traerRemuneracion();
        this.traerPlan();
    },
    methods: {
        customLabelCuenta({ manual_cuenta }) {
            return `${manual_cuenta.nombre}`;
        },
        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },

        onFilteredRemuneraciones(filteredItems) {
            this.totalRowsRemuneraciones = filteredItems.length;
            this.currentPageRemuneraciones = 1;
        },

        traerPlan() {
            this.axios
                .get(`/api/getPlanCuenta/${this.id_empresa.id_empresa}`)
                .then((response) => {
                    console.log(response);
                    this.optionsCuentas = response.data;
                });
        },

        traerRemuneracion() {
            this.axios
                .get(
                    `/api/obtenerremuneracion/nopagadas/${this.id_empresa.id_empresa}`
                )
                .then((response) => {
                    console.log(response);
                    this.tableDataRemuneraciones = response.data;
                });
        },

        getInicialCompras() {
            this.axios
                .get(
                    `api/getTesoreriaComprasIncial/` +
                        this.infoEmpresa.id_empresa
                )
                .then((res) => {
                    res.data.cuentas.map((p) => {
                        if (p.manual_cuenta != null) {
                            p["codigo"] = "(S) " + p.manual_cuenta.codigo;
                            p["nombre"] = p.manual_cuenta.nombre;
                        } else if (p.mi_manual_cuenta != null) {
                            p["codigo"] = "(M) " + p.mi_manual_cuenta.codigo;
                            p["nombre"] = p.mi_manual_cuenta.nombre;
                        }

                        return p;
                    });

                    this.optionsOrigen = res.data.cuentas;
                    this.optionsDestino = res.data.cuentas;

                    console.log(res.data.doc);
                    this.tableData = res.data.doc;
                    res.data.doc.map((p) => {
                        p["descripcion"] = p.documento_tributario.descripcion;
                        if (p.total_documento != null) {
                            p["total"] = "$" + p.total_documento;
                        } else {
                            p["total"] = "$ -";
                        }
                        p["proveedorName"] =
                            p.encabezado.proveedor.razon_social;
                        p["encabezado"] = p.encabezado.num_encabezado;
                    });
                })
                .catch((error) => {
                    console.log("error", error);
                    const title = "Crear subnivel";
                    const message = "Error al crear el subnivel";
                    const type = "error";

                    this.modal = false;
                    this.$v.form.$reset();

                    this.successmsg(title, message, type);
                });
        },

        aprobarDocumento(data) {
            this.modalAprobacion = true;

            this.formAprobacion.empresa = this.infoEmpresa.id_empresa;
            this.formAprobacion.n_encabezado = data.encabezado;
            this.formAprobacion.id_documento = data.id_info;
            this.formAprobacion.proveedor = data.proveedorName;
            this.formAprobacion.f_emision = data.fecha_emision;
        },

        formSubmitAprobarPago() {
            Swal.fire({
                title: "Aprobar Pago",
                text: "¿Esta seguro que que desea aprobar pago?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#0b892c",
                cancelButtonColor: "#d33",
                cancelButtonText: "Cancelar",
                confirmButtonText: "Si, Aprobar!",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.axios
                        .post(`api/aprobarPago`, this.formAprobacion)
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((error) => {
                            console.log("error", error);
                        });
                }
            });
        },

        formSubmitRemuneraciones() {
            if (this.tableDataRemuneraciones.length > 0) {
                this.submitted = true;
                this.$v.formRemuneraciones.$touch();

                if (!this.$v.formRemuneraciones.$invalid) {
                    var fecha_hoy = moment().format("YYYY-MM-DD");
                    if (
                        this.formRemuneraciones.cuenta.manual_cuenta
                            .id_manual_cuenta == 1 ||
                        this.formRemuneraciones.cuenta.manual_cuenta
                            .id_manual_cuenta == 2
                    ) {
                    } else {
                        console.log(
                            this.formRemuneraciones.cuenta.manual_cuenta
                                .id_manual_cuenta
                        );
                        this.successmsgerror(
                            "La cuenta selecciona, no corresponde para este tipo de acción"
                        );

                        return;
                    }

                    if (this.formRemuneraciones.fecha >= fecha_hoy) {
                        this.formRemuneraciones.id_empresa =
                            this.id_empresa.id_empresa;

                        console.log(this.formRemuneraciones);

                        this.axios
                            .post(
                                `/api/pagarremuneraciones`,
                                this.formRemuneraciones
                            )
                            .then((res) => {
                                console.log(res);

                                let title = "";
                                let message = "";
                                let type = "";
                                if (res.data) {
                                    title = "Pagar Remuneraciones";
                                    message =
                                        "Remuneraciones pagadas con éxito";
                                    type = "success";

                                    this.modal = false;
                                    this.submitted = false;

                                    this.$v.formRemuneraciones.$reset();
                                    this.traerRemuneracion();
                                    this.successmsg(title, message, type);
                                }
                            })
                            .catch((error) => {
                                console.log("error", error);

                                let title = "";
                                let message = "";
                                let type = "";
                                title = "Pagar Remuneraciones";
                                message = "Error al pagar las remuneraciones";
                                type = "error";

                                this.modal = false;
                                this.submitted = false;
                                this.$v.formRemuneraciones.$reset();
                                this.traerRemuneracion();
                                this.successmsg(title, message, type);
                            });
                    } else {
                        this.successmsg(
                            "Error al Pagar Remuneraciones",
                            "La fecha no pude ser menor al dia de hoy.",
                            "error"
                        );
                    }
                }
            } else {
                this.successmsg(
                    "Error al Pagar Remuneraciones",
                    "No hay remuneraciones del mes en curso por pagar",
                    "error"
                );
            }
        },

        modalNuevo() {
            if (this.tableDataRemuneraciones.length > 0) {
                this.modal = true;
                (this.formRemuneraciones = {
                    fecha: "",
                    cuenta: "",
                    id_empresa: "",
                }),
                this.submitted = false;
                    (this.modal = true);
            } else {
                this.successmsg(
                    "Error al Pagar Remuneraciones",
                    "No hay remuneraciones del mes en curso por pagar",
                    "error"
                );
            }
        },

        pagarremuneracion() {
            if (this.tableDataRemuneraciones.length > 0) {
                Swal.fire({
                    title: "Aprobar Pago",
                    text: "¿Esta seguro que que desea aprobar pago?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#0b892c",
                    cancelButtonColor: "#d33",
                    cancelButtonText: "Cancelar",
                    confirmButtonText: "Si, Aprobar!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.axios
                            .get(
                                `api/pagarremuneraciones/${this.id_empresa.id_empresa}`
                            )
                            .then((response) => {
                                console.log(response);
                                if (response.data == 1) {
                                    const title =
                                        "Exito al Pagar Remuneraciones";
                                    const message =
                                        "Remuneraciones pagadas con éxito";
                                    const type = "success";
                                    this.successmsg(title, message, type);
                                    this.traerRemuneracion();
                                } else {
                                    const title =
                                        "Error al Pagar Remuneraciones";
                                    const message =
                                        "Error al pagar las remuneraciones";
                                    const type = "error";
                                    this.successmsg(title, message, type);
                                }
                            });
                    }
                });
            } else {
                this.successmsg(
                    "Error al Pagar Remuneraciones",
                    "No hay remuneraciones del mes en curso por pagar",
                    "error"
                );
            }
        },

        successmsg(title, message, type) {
            Swal.fire(title, message, type);
        },

        successmsgerror(error) {
            Swal.fire({
                position: "center",
                title: error,
                icon: "error",
                showConfirmButton: false,
                timer: 2000,
            });
        },
    },
};
