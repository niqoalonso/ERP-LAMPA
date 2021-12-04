import Layout from "../../layouts/main";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import { required } from "vuelidate/lib/validators";

export default {
    components: { Layout, Multiselect },
    data() {
        return {
            urlbackend: this.$urlBackend,
            form: {
                trabajador_id: "",
                sueldo_base: "",
                dias_trabajados: "",
                monto: 0,
                afp: "",
                afp_monto: 0,
                salud: "",
                salud_monto: 0,
                carga_familiar: "",
                // monto_carga_familiar: "",
                asignacion_familiar: 0,
                cantidad_horas_extras: 0,
                horas_extras_monto: 0,
                colacion: "",
                movilidad: "",
                total_imponible: 0,
                total_haberes: 0,
                afc_monto: 0,
                impuesto_unico: 0,
                alcance_liquido: 0,
                anticipo: 0,
                desgaste_herramientas: 0,
                otros: 0,
                porcentaje_hora_extra: 0,
                uf: 0,
                gratificacion: 0,
                participacion: 0,
                bonos: "",
                sueldo_liquido: 0,
                id_remuneracion: "",
                saludporcentaje: 0,
                afpporcentaje: 0,
                porcentajerealafp: 0,
                horas_semanales:0
            },
            bonostemp: [],
            cargas: "",
            submitted: false,
            summitedB: false,
            typeform: "create",
            titlemodal: "Crear Remuneración",
            modal: false,
            btnCreate: true,
            options: [],
            // tabla

            tableData: [],
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
            perPage: 10,
            pageOptions: [10, 25, 50, 100],
            filter: null,
            filterOn: [],
            sortBy: "trabajador",
            sortDesc: false,
            fields: [
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
                    label: "Sueldo Bruto",
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
        form: {
            dias_trabajados: {
                required,
            },
            monto: {
                required,
            },
            afp_monto: {
                required,
            },
            salud_monto: {
                required,
            },
            asignacion_familiar: {
                required,
            },
            cantidad_horas_extras: {
                required,
            },
            porcentaje_hora_extra: {
                required,
            },
            afc_monto: {
                required,
            },
            uf: {
                required,
            },
            impuesto_unico: {
                required,
            },
            gratificacion: {
                required,
            },

            participacion: {
                required,
            },

            anticipo: {
                required,
            },

            desgaste_herramientas: {
                required,
            },

            alcance_liquido: {
                required,
            },

            otros: {
                required,
            },

            total_haberes: {
                required,
            },
            horas_extras_monto: {
                required,
            },
            total_imponible: {
                required,
            },
            sueldo_liquido: {
                required,
            },

            horas_semanales: {
                required,
            },
        },
    },
    computed: {
        /**
         * Total no. of records
         */
        rows() {
            return this.tableData.length;
        },
    },
    mounted() {
        this.traerTrabajador();
        this.traerRemuneracion();
        this.totalRows = this.items.length;
    },
    methods: {
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        customLabel({ nombres, apellidos }) {
            return `${nombres} ${apellidos}`;
        },
        traerTrabajador() {
            this.axios.get(`/api/obtenertrabajador/`).then((response) => {
                console.log(response);
                this.options = response.data;
            });
        },
        traerRemuneracion() {
            this.axios.get(`/api/obtenerremuneracion/`).then((response) => {
                console.log(response);
                this.tableData = response.data;
            });
        },
        modalNuevo() {
            this.modal = true;
            this.formcarga = [];
            this.titlemodal = "Crear Remuneración";
            this.typeform = "create";
            this.vaciarform();
            this.btnCreate = true;
        },
        formSubmit() {
            this.submitted = true;
            this.$v.form.$touch();

            if (!this.$v.form.$invalid) {
                // calculo monto

                let monto = Math.round(
                    (parseInt(this.form.sueldo_base) / 30) *
                        this.form.dias_trabajados
                );
                    console.log(monto, this.form.monto, );
                if (monto != this.form.monto) {
                    this.successmsgerror();
                    return;
                }

                // verificar porcentaje AFP
                    console.log(this.form.porcentajerealafp, this.form.afpporcentaje);
                if (this.form.porcentajerealafp != this.form.afpporcentaje) {
                    this.successmsgerror();
                    return;
                }

                // calculo horas extras

                var factor = (parseInt(this.form.sueldo_base)/30) * 7;

                var porcentajehoras = (this.form.porcentaje_hora_extra / 100) + 1;

                console.log(porcentajehoras)

                var valorhora = (factor / this.form.horas_semanales ) * porcentajehoras ;

                console.log(valorhora)

                var montohoraextra = Math.round(valorhora * this.form.cantidad_horas_extras);

                console.log(montohoraextra)

                if (montohoraextra != this.form.horas_extras_monto) {
                    this.successmsgerror();
                    return;
                }

                // suma bonos
                var montobono = 0;

                this.bonostemp.forEach(element => {

                    montobono = montobono + parseInt(element["monto"])

                });

                // total imponible

                var totalimponible = parseInt(this.form.horas_extras_monto) + parseInt(this.form.monto) + parseInt(montobono) + parseInt(this.form.gratificacion) ;

                console.log(this.form.total_imponible, totalimponible);

                if (this.form.total_imponible != totalimponible) {
                    this.successmsgerror();
                    return;
                }

                // calculo afp

                var afpmonto = (this.form.porcentajerealafp * totalimponible)/100;
                    console.log(this.form.afp_monto, afpmonto);
                if (this.form.afp_monto != Math.round(afpmonto)) {
                    this.successmsgerror();
                    return;
                }

                // calculo salud

                var saludmonto = (this.form.saludporcentaje * totalimponible)/100;

                if (this.form.salud_monto != Math.round(saludmonto)) {
                    this.successmsgerror();
                    return;
                }

                // total haberes

                var totalhaberes = parseInt(this.form.colacion) + parseInt(this.form.movilidad);

                console.log(this.form.total_haberes, totalhaberes);

                if (this.form.total_haberes != totalhaberes) {
                    this.successmsgerror();
                    return;
                }

                this.form.bonos = this.bonostemp;

                this.axios
                    .post(`/api/crearremuneracion`, this.form)
                    .then((res) => {
                        console.log(res);

                        let title = "";
                        let message = "";
                        let type = "";
                        if (res.data) {
                            if (this.form.id_remuneracion) {
                                title = "Crear Remuneración";
                                message = "Remuneración creada con exito";
                                type = "success";
                            } else {
                                title = "Editar Remuneración";
                                message = "Remuneración editada con exito";
                                type = "success";
                            }
                            this.modal = false;
                            this.btnCreate = false;
                            this.submitted = false;

                            this.$v.form.$reset();
                            this.bonostemp = [];
                            this.traerRemuneracion();
                            this.successmsg(title, message, type);
                        }
                    })
                    .catch((error) => {
                        console.log("error", error);

                        let title = "";
                        let message = "";
                        let type = "";

                        if (this.form.id_remuneracion) {
                            title = "Crear Remuneración";
                            message = "Remuneración  creada con exito";
                            type = "error";
                        } else {
                            title = "Editar Remuneración";
                            message = "Remuneración  editada con exito";
                            type = "error";
                        }

                        this.modal = false;
                        this.btnCreate = false;
                        this.submitted = false;
                        this.$v.form.$reset();
                        this.traerRemuneracion();
                        this.successmsg(title, message, type);
                    });
            }
        },
        infotrabajador() {
            this.form.sueldo_base = this.form.trabajador_id.sueldo_base;
            this.form.afp = this.form.trabajador_id.afp.nombre;
            this.form.salud = this.form.trabajador_id.salud;
            this.form.carga_familiar =
                this.form.trabajador_id.trabajorcarga.length;
            this.cargas = this.form.trabajador_id.trabajorcarga;
            this.form.colacion = this.form.trabajador_id.colacion;
            this.form.movilidad = this.form.trabajador_id.movilidad;
            this.form.porcentajerealafp =
                this.form.trabajador_id.afp.tasa_dependiente;
        },
        AddformData() {
            this.bonostemp.push({
                glosa: "",
                monto: "",
            });
        },

        deleteRow(index) {
            this.bonostemp.splice(index, 1);
        },
        editar(data) {
            console.log(data);
            this.bonostemp = [];
            this.form.trabajador_id = data.trabajador;
            this.form.sueldo_base = data.trabajador.sueldo_base;
            this.form.dias_trabajados = data.dias_trabajados;
            this.form.monto = data.monto;
            this.form.afp = data.trabajador.afp.nombre;
            this.form.afp_monto = data.afp_monto;
            this.form.salud = data.fonasa_monto;
            this.form.salud_monto = data.fonasa_monto;
            this.form.carga_familiar = data.trabajador.trabajorcarga.length;
            this.form.monto_carga_familiar = data.monto_carga_familiar;
            this.form.asignacion_familiar = data.asignacion_familiar;
            this.form.cantidad_horas_extras = data.cantidad_horas_extras;
            this.form.horas_extras_monto = data.horas_extras_monto;
            this.form.colacion = data.trabajador.colacion;
            this.form.movilidad = data.trabajador.movilidad;
            this.form.total_imponible = data.total_imponible;
            this.form.sueldo_liquido = data.sueldo_liquido;
            this.form.id_remuneracion = data.id_remuneracion;
            this.form.total_haberes = data.total_haberes;
            this.form.afc_monto = data.afc_monto;
            this.form.impuesto_unico = data.impuesto_unico;
            this.form.alcance_liquido = data.alcance_liquido;
            this.form.anticipo = data.anticipo;
            this.form.desgaste_herramientas = data.desgaste_herramientas;
            this.form.otros = data.otros;
            this.form.porcentaje_hora_extra = data.porcentaje_hora_extra;
            this.form.uf = data.uf;
            this.form.gratificacion = data.gratificacion;
            this.form.participacion = data.participacion;

            for (let i = 0; i < data.bonos.length; i++) {

                this.bonostemp.push({
                    glosa: data.bonos[i]["glosa"],
                    monto: data.bonos[i]["monto"],
                });

            }

            this.modal = true;
        },
        successmsg(title, message, type) {
            Swal.fire(title, message, type);
        },
        vaciarform() {
            this.form = {
                trabajador_id: "",
                sueldo_base: "",
                dias_trabajados: "",
                monto: "",
                afp: "",
                afp_monto: "",
                salud: "",
                salud_monto: "",
                carga_familiar: "",
                monto_carga_familiar: "",
                asignacion_familiar: "",
                cantidad_horas_extras: "",
                horas_extras_monto: "",
                colacion: "",
                movilidad: "",
                total_imponible: "",
                total_haberes: "",
                afc_monto: "",
                impuesto_unico: "",
                alcance_liquido: "",
                anticipo: "",
                desgaste_herramientas: "",
                otros: "",
                porcentaje_hora_extra: "",
                uf: "",
                gratificacion: "",
                participacion: "",
                bonos: [
                    {
                        glosa: "",
                        monto: "",
                    },
                ],
                sueldo_liquido: "",
                id_remuneracion: "",
            };
        },

        successmsgerror() {
            Swal.fire({
                position: "center",
                title: "Hay un error en los datos ingresados.",
                icon: "error",
                showConfirmButton: false,
                timer: 2000,
            });
        },
    },
};
