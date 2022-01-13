import Layout from "../../layouts/main";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import DatePicker from "vue2-datepicker";
import moment from "moment";
import Vue from 'vue';

export default {
    components: { Layout, Multiselect, DatePicker },
    data() {
        return {
            total_imponible: 0,
            sueldo_base: 0,
            horas_extras: 0,
            gratificacion: 0,
            participacion: 0,
            movilidad: 0,
            colacion: 0,
            total_haberes: 0,
            afp_monto: 0,
            salud_monto: 0,
            afc_monto: 0,
            impuesto_unico: 0,
            total_descuentos: 0,
            sueldo_liquido: 0,
            alcance_liquido: 0,
            tableData: [],
            mesbusqueda: "",
            id_empresa: JSON.parse(Vue.prototype.$globalEmpresasSelected),
            title: "Remuneraciones",
            items: [
                {
                    text: "Tables",
                },
                {
                    text: "Remuneraciones",
                    active: true,
                },
            ],

            totalRows: 1,
            currentPage: 1,
            perPage: 1000,
            pageOptions: [10, 25, 50, 100],
            filter: null,
            filterOn: [],
            sortBy: "",
            sortDesc: false,
            stickyHeader: true,
            noCollapse: false,
            fields: [
                {
                    key: "trabajador",
                    stickyColumn: true,
                    label: "Trabajadores",
                    formatter: (trabajador) => {
                        return `${trabajador.nombres} ${trabajador.apellidos}`;
                    },
                },
                {
                    key: "dias_trabajados",
                },
                {
                    key: "trabajador",
                    label: "Sueldo Base",
                    formatter: (trabajador) => {
                        var formatter = new Intl.NumberFormat("es-CL", {
                            style: "currency",
                            currency: "CLP",
                            minimumFractionDigits: 0,
                        });
                        return formatter.format(trabajador.sueldo_base);
                    },
                },
                {
                    key: "horas_extras_monto",
                    label: "Horas extras",
                    formatter: (horas_extras_monto) => {
                        var formatter = new Intl.NumberFormat("es-CL", {
                            style: "currency",
                            currency: "CLP",
                            minimumFractionDigits: 0,
                        });
                        return formatter.format(horas_extras_monto);
                    },
                },
                {
                    key: "participacion",
                    label: "Participación",
                    formatter: (participacion) => {
                        var formatter = new Intl.NumberFormat("es-CL", {
                            style: "currency",
                            currency: "CLP",
                            minimumFractionDigits: 0,
                        });
                        return formatter.format(participacion);
                    },
                },
                {
                    key: "gratificacion",
                    label: "Gratificación",
                    formatter: (gratificacion) => {
                        var formatter = new Intl.NumberFormat("es-CL", {
                            style: "currency",
                            currency: "CLP",
                            minimumFractionDigits: 0,
                        });
                        return formatter.format(gratificacion);
                    },
                },
                {
                    key: "total_imponible",
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
                    key: "trabajador",
                    label: "Bono movilización",
                    formatter: (trabajador) => {
                        var formatter = new Intl.NumberFormat("es-CL", {
                            style: "currency",
                            currency: "CLP",
                            minimumFractionDigits: 0,
                        });
                        return formatter.format(trabajador.movilidad);
                    },
                },
                {
                    key: "trabajador",
                    label: "Bono colación",
                    formatter: (trabajador) => {
                        var formatter = new Intl.NumberFormat("es-CL", {
                            style: "currency",
                            currency: "CLP",
                            minimumFractionDigits: 0,
                        });
                        return formatter.format(trabajador.colacion);
                    },
                },
                {
                    key: "total_haberes",
                    label: "Total haberes",
                    formatter: (total_haberes) => {
                        var formatter = new Intl.NumberFormat("es-CL", {
                            style: "currency",
                            currency: "CLP",
                            minimumFractionDigits: 0,
                        });
                        return formatter.format(total_haberes);
                    },
                },
                {
                    key: "trabajador",
                    label: "AFP",
                    formatter: (trabajador) => {
                        return `${trabajador.afp.nombre} ${trabajador.afp.tasa_dependiente}%`;
                    },
                },
                {
                    key: "afp_monto",
                    label: "$AFP",
                    formatter: (afp_monto) => {
                        var formatter = new Intl.NumberFormat("es-CL", {
                            style: "currency",
                            currency: "CLP",
                            minimumFractionDigits: 0,
                        });
                        return formatter.format(afp_monto);
                    },
                },
                {
                    key: "fonasa_monto",
                    label: "Fonasa/isapre",
                    formatter: (fonasa_monto) => {
                        var formatter = new Intl.NumberFormat("es-CL", {
                            style: "currency",
                            currency: "CLP",
                            minimumFractionDigits: 0,
                        });
                        return formatter.format(fonasa_monto);
                    },
                },
                {
                    key: "afc_monto",
                    label: "AFC",
                    formatter: (afc_monto) => {
                        var formatter = new Intl.NumberFormat("es-CL", {
                            style: "currency",
                            currency: "CLP",
                            minimumFractionDigits: 0,
                        });
                        return formatter.format(afc_monto);
                    },
                },
                {
                    key: "impuesto_unico",
                    label: "Impuesto Unico",
                    formatter: (impuesto_unico) => {
                        var formatter = new Intl.NumberFormat("es-CL", {
                            style: "currency",
                            currency: "CLP",
                            minimumFractionDigits: 0,
                        });
                        return formatter.format(impuesto_unico);
                    },
                },
                {
                    key: "total_descuentos",
                    label: "Total Descuento",
                    formatter: (total_descuentos) => {
                        var formatter = new Intl.NumberFormat("es-CL", {
                            style: "currency",
                            currency: "CLP",
                            minimumFractionDigits: 0,
                        });
                        return formatter.format(total_descuentos);
                    },
                },
                {
                    key: "alcance_liquido",
                    label: "Alcance Liquido",
                    formatter: (alcance_liquido) => {
                        var formatter = new Intl.NumberFormat("es-CL", {
                            style: "currency",
                            currency: "CLP",
                            minimumFractionDigits: 0,
                        });
                        return formatter.format(alcance_liquido);
                    },
                },
                {
                    key: "sueldo_liquido",
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
                "sis"
            ],
        };
    },
    computed: {
        rows() {
            return this.tableData.length;
        },
    },
    mounted() {
        this.traerRemuneracion();
        this.totalRows = this.items.length;
    },
    methods: {
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        llenartabla(response) {
            this.limpiarsumatoria();
            response.data.forEach((element) => {
                if (element.horas_extras_monto) {
                    this.horas_extras =
                        this.horas_extras + element.horas_extras_monto;
                }
                if (element.participacion) {
                    this.participacion =
                        this.participacion + element.participacion;
                }
                if (element.gratificacion) {
                    this.gratificacion =
                        this.gratificacion + element.gratificacion;
                }
                if (element.total_imponible) {
                    this.total_imponible =
                        this.total_imponible + element.total_imponible;
                }
                if (element.total_haberes) {
                    this.total_haberes =
                        this.total_haberes + element.total_haberes;
                }
                if (element.afp_monto) {
                    this.afp_monto = this.afp_monto + element.afp_monto;
                }
                if (element.fonasa_monto) {
                    this.salud_monto = this.salud_monto + element.fonasa_monto;
                }
                if (element.afc_monto) {
                    this.afc_monto = this.afc_monto + element.afc_monto;
                }
                if (element.impuesto_unico) {
                    this.impuesto_unico =
                        this.impuesto_unico + element.impuesto_unico;
                }
                if (element.total_descuentos) {
                    this.total_descuentos =
                        this.total_descuentos + element.total_descuentos;
                }
                if (element.alcance_liquido) {
                    this.alcance_liquido =
                        this.alcance_liquido + element.alcance_liquido;
                }
                if (element.sueldo_liquido) {
                    this.sueldo_liquido =
                        this.sueldo_liquido + element.sueldo_liquido;
                }
            });
            this.tableData = response.data;
        },
        traerRemuneracion() {
            this.axios.get(`/api/obtenerremuneracionmes/${this.id_empresa.id_empresa}`).then((response) => {
                console.log(response);

                this.llenartabla(response);
            });
        },
        busqueda() {
            if (this.mesbusqueda) {
                var mes = moment(this.mesbusqueda).format("YYYY-MM");

                this.axios
                    .get(`/api/obtenerremuneracion/${mes}/${this.id_empresa.id_empresa}`)
                    .then((response) => {
                        console.log(response);

                        this.llenartabla(response);
                    });
            }
        },

        limpiarsumatoria(){

            this.total_imponible = 0;
            this.sueldo_base = 0;
            this.horas_extras = 0;
            this.gratificacion = 0;
            this.participacion = 0;
            this.movilidad = 0;
            this.colacion = 0;
            this.total_haberes = 0;
            this.afp_monto = 0;
            this.salud_monto = 0;
            this.afc_monto = 0;
            this.impuesto_unico = 0;
            this.total_descuentos = 0;
            this.sueldo_liquido = 0;
            this.alcance_liquido = 0;
        }
    },
};
