import Layout from "../../layouts/main";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import { required } from "vuelidate/lib/validators";
import Vue from 'vue';

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
                isapre_uf: 0,
                carga_familiar: "",
                // monto_carga_familiar: "",
                asignacion_familiar: 0,
                cantidad_horas_extras: 0,
                horas_extras_monto: 0,
                colacion: 0,
                movilidad: 0,
                total_imponible: 0,
                total_haberes: 0,
                afc_monto: 0,
                impuesto_unico: 0,
                alcance_liquido: 0,
                anticipo: 0,
                viaticos: 0,
                otros: 0,
                porcentaje_hora_extra: 0,
                uf: 0,
                utm: 0,
                gratificacion: 0,
                participacion: 0,
                bonos: "",
                sueldo_liquido: 0,
                id_remuneracion: "",
                saludporcentaje: 0,
                afpporcentaje: 0,
                porcentajerealafp: 0,
                horas_semanales: 0,
                tipo_contrato: "",
                sueldo_minimo: 0,
                porcentajegratificacion: '',
                total_descuentos: 0,
                id_empresa: JSON.parse(Vue.prototype.$globalEmpresasSelected),
            },
            impuestosutm: [],
            bonostemp: [],
            cargas: "",
            cargasarray: [],
            submitted: false,
            summitedB: false,
            typeform: "create",
            titlemodal: "Crear Remuneración",
            modal: false,
            btnCreate: true,
            options: [],
            montosasignacionfamiliar: [],
            id_empresa: JSON.parse(Vue.prototype.$globalEmpresasSelected),
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
            utm: {
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

            viaticos: {
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
        this.traerImpuestoUtm();
        this.traerMontoAsignacion();
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
            this.axios.get(`/api/obtenertrabajador/${this.id_empresa.id_empresa}`).then((response) => {
                console.log(response);
                this.options = response.data;
            });
        },
        traerImpuestoUtm() {
            this.axios.get(`/api/obtenerimpuestoutm`).then((response) => {
                this.impuestosutm = response.data;
            });
        },
        traerMontoAsignacion() {
            this.axios
                .get(`/api/obtenerasignacionfamiliar`)
                .then((response) => {
                    console.log(response);
                    this.montosasignacionfamiliar = response.data;
                });
        },
        traerRemuneracion() {
            this.axios.get(`/api/obtenerremuneracion/${this.id_empresa.id_empresa}`).then((response) => {
                console.log(response);
                this.tableData = response.data;
            });
        },
        modalNuevo() {
            this.modal = true;
            this.formcarga = [];
            this.cargas = [];
            this.cargasarray = [];
            this.bonostemp = [];
            this.titlemodal = "Crear Remuneración";
            this.typeform = "create";
            this.vaciarform();
            this.btnCreate = true;
        },
        formSubmit() {
            this.submitted = true;
            this.$v.form.$touch();

            if (this.form.salud == "Fonasa") {
                this.form.isapre_uf = 0;
            }

            if (this.cargasarray.length > 0) {
                this.cargasarray.forEach((element) => {
                    if (element["monto"] == "") {
                        this.successmsgerror("carga familiar");
                        return;
                    }
                });
            }

            if (!this.$v.form.$invalid) {
                // calculo monto

                let monto = Math.round(
                    (parseInt(this.form.sueldo_base) / 30) *
                        this.form.dias_trabajados
                );
                console.log(monto, this.form.monto);
                if (monto != this.form.monto) {
                    this.successmsgerror("monto");
                    return;
                }

                // montos cargas

                if (this.cargasarray.length > 0) {

                    var cantespecial = 0;
                    var cantnormal = 0;
                    var totalasignacionsum = 0;

                    this.cargasarray.forEach((element) => {

                        totalasignacionsum = totalasignacionsum + parseInt(element["monto"]);

                        if (element["tipo_carga"] == "Normal") {
                            cantnormal++;
                        } else {
                            cantespecial++;
                        }
                    });

                    // asignamos el total de la suma de los montos ingresados por cada carga familiar

                    this.form.asignacion_familiar = totalasignacionsum;

                    var montocarga = 0;

                    this.montosasignacionfamiliar.forEach((element) => {
                        if (
                            this.form.sueldo_base > element["renta_minima"] &&
                            this.form.sueldo_base < element["renta_maxima"]
                        ) {
                            montocarga = parseInt(element.monto);
                        }
                    });

                    console.log(montocarga);

                    var totalasignacionnormal = montocarga * cantnormal;

                    var totalasignacionespecial = montocarga * 2 * cantespecial;

                    var totalasignacion =
                        totalasignacionnormal + totalasignacionespecial;

                    console.log(totalasignacion);

                    if (totalasignacion != this.form.asignacion_familiar) {
                        this.successmsgerror("Total asignación familiar");
                        return;
                    }
                }else{
                    var totalasignacion = 0;
                }

                // verificar porcentaje AFP
                console.log(
                    this.form.porcentajerealafp,
                    this.form.afpporcentaje
                );
                if (this.form.porcentajerealafp != this.form.afpporcentaje) {
                    this.successmsgerror("Porcentaje AFP");
                    return;
                }

                // calculo horas extras

                if (this.form.cantidad_horas_extras > 0) {
                    var factor = (parseInt(this.form.sueldo_base) / 30) * 7;

                    var porcentajehoras =
                        this.form.porcentaje_hora_extra / 100 + 1;

                    console.log(porcentajehoras);

                    var valorhora =
                        (factor / this.form.horas_semanales) * porcentajehoras;

                    console.log(valorhora);

                    var montohoraextra = Math.round(
                        valorhora * this.form.cantidad_horas_extras
                    );

                    console.log(montohoraextra);

                    if (montohoraextra != this.form.horas_extras_monto) {
                        this.successmsgerror("Monto hora extra");
                        return;
                    }
                }

                // gratificacion

                if(this.form.gratificacion > 0 ){

                    var porcentajegratifi = parseFloat(this.form.porcentajegratificacion);

                    if(porcentajegratifi == 4.75){

                        if(this.form.sueldo_minimo != 0 || this.form.sueldo_minimo != ''){

                            var gratificacion = Math.round((this.form.sueldo_minimo * porcentajegratifi)/12);

                            console.log(gratificacion)

                            if (gratificacion != this.form.gratificacion) {
                                this.successmsgerror("Gratificacion");
                                return;
                            }

                        }else{

                            this.successmsgerror("Sueldo minimo");
                            return;
                        }

                    }else{

                        var porcentajegratifi = parseInt(this.form.porcentajegratificacion);

                        var gratificacion = Math.round((this.form.sueldo_base * porcentajegratifi) / 100);

                        console.log(gratificacion)

                        if (gratificacion != this.form.gratificacion) {
                            this.successmsgerror("Gratificacion");
                            return;
                        }
                    }

                }

                // suma bonos
                var montobono = 0;

                this.bonostemp.forEach((element) => {
                    montobono = montobono + parseInt(element["monto"]);
                });

                // total imponible

                var totalimponible =
                    parseInt(this.form.horas_extras_monto) +
                    parseInt(this.form.monto) +
                    parseInt(montobono) +
                    parseInt(this.form.gratificacion) +
                    parseInt(this.form.participacion);

                console.log(this.form.total_imponible, totalimponible);

                if (this.form.total_imponible != totalimponible) {
                    this.successmsgerror("Total Imponible");
                    return;
                }

                // calculo afp

                var afpmonto =
                    (this.form.porcentajerealafp * totalimponible) / 100;
                console.log(this.form.afp_monto, afpmonto);
                if (this.form.afp_monto != Math.round(afpmonto)) {
                    this.successmsgerror("AFP");
                    return;
                }

                // calculo salud

                // validar si es fonasa o isapre

                if (this.form.salud == "Fonasa") {
                    var saludmonto =
                        (this.form.saludporcentaje * totalimponible) / 100;

                    console.log(saludmonto);

                    if (this.form.salud_monto != Math.round(saludmonto)) {
                        this.successmsgerror("Descuento salud");
                        return;
                    }
                } else {
                    // pasar plan de isabre a CLP

                    var precioisapre = Math.round(
                        this.form.isapre_uf * this.form.uf
                    );

                    console.log(precioisapre);

                    var descuentoporcentaje = Math.round(
                        (this.form.saludporcentaje * totalimponible) / 100
                    );

                    var saludmonto = Math.round(
                        precioisapre - descuentoporcentaje
                    );

                    console.log(saludmonto);

                    if (this.form.salud_monto != Math.round(saludmonto)) {
                        this.successmsgerror("Descuento salud");
                        return;
                    }
                }

                // calculo AFC

                if (this.form.tipo_contrato == "Indefinido") {
                    var descuentoafc = Math.round((0.6 * totalimponible) / 100);

                    console.log(descuentoafc)

                    if (this.form.afc_monto != descuentoafc) {
                        this.successmsgerror("afc");
                        return;
                    }
                }else{

                    var descuentoafc = 0;

                }

                // total haberes

                var totalhaberes =
                    parseInt(this.form.colacion) +
                    parseInt(this.form.movilidad)+
                    parseInt(this.form.viaticos)+
                    parseInt(totalasignacion)+
                    totalimponible;

                console.log(this.form.total_haberes, totalhaberes);

                if (this.form.total_haberes != totalhaberes) {
                    this.successmsgerror("total haberes");
                    return;
                }

                // descuentos

                var descuentos = Math.round(saludmonto) + Math.round(descuentoafc) + Math.round(afpmonto) + this.form.impuesto_unico;

                console.log(descuentos);

                var alcanceliquido = Math.round(totalhaberes - descuentos);

                console.log(alcanceliquido)

                if (this.form.alcance_liquido != alcanceliquido) {
                    this.successmsgerror("Alcance líquido");
                    return;
                }

                // sueldo liquido

                var sueldoliquido = Math.round(alcanceliquido - this.form.anticipo);

                if (this.form.sueldo_liquido != sueldoliquido) {
                    this.successmsgerror("Sueldo líquido");
                    return;
                }


                this.form.bonos = this.bonostemp;
                this.form.total_descuentos = descuentos;

                this.form.id_empresa = this.form.id_empresa.id_empresa;

                this.axios
                    .post(`/api/crearremuneracion`, this.form)
                    .then((res) => {
                        console.log(res);

                        let title = "";
                        let message = "";
                        let type = "";
                        if (res.data) {
                            if (this.form.id_remuneracion == "") {
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
            this.cargasarray = [];
            this.form.sueldo_base = this.form.trabajador_id.sueldo_base;
            this.form.afp = this.form.trabajador_id.afp.nombre;
            this.form.salud = this.form.trabajador_id.salud;
            this.form.carga_familiar =
                this.form.trabajador_id.trabajorcarga.length;
            this.cargas = this.form.trabajador_id.trabajorcarga;

            var cargasarray = this.form.trabajador_id.trabajorcarga;

            for (let i = 0; i < cargasarray.length; i++) {
                this.cargasarray.push({
                    nombres: cargasarray[i].pivot.nombres,
                    apellidos: cargasarray[i].pivot.apellidos,
                    tipo_carga: cargasarray[i].pivot.tipo_carga,
                    parentesco: cargasarray[i].nombre,
                    monto: 0,
                });
            }

            this.form.colacion = this.form.trabajador_id.colacion;
            this.form.movilidad = this.form.trabajador_id.movilidad;
            this.form.porcentajerealafp =
                this.form.trabajador_id.afp.tasa_dependiente;
            this.form.tipo_contrato = this.form.trabajador_id.tipo_contrato;
            this.form.monto = 0;
            this.form.afp_monto = 0;
            this.form.salud_monto = 0;
            this.form.total_imponible = 0;
            this.form.sueldo_liquido = 0;
            this.form.total_haberes = 0;
            this.form.afc_monto = 0;
            this.form.impuesto_unico = 0;
            this.form.alcance_liquido = 0;
            this.form.anticipo = 0;
            this.form.viaticos = 0;
            this.form.otros = 0;
            this.form.porcentaje_hora_extra = 0;
            this.form.uf = 0;
            this.form.gratificacion = 0;
            this.form.participacion = 0;
            this.form.cantidad_horas_extras = 0;
            this.form.horas_extras_monto = 0;
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
            this.form.utm = data.utm;
            this.isapre_uf = data.isapre_uf;
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
            this.form.viaticos = data.viaticos;
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
                viaticos: "",
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
                id_empresa: JSON.parse(Vue.prototype.$globalEmpresasSelected),
            };
        },

        calculohoraextra(){

            if (this.form.cantidad_horas_extras > 0) {
                var factor = (parseInt(this.form.sueldo_base) / 30) * 7;

                var porcentajehoras =
                    this.form.porcentaje_hora_extra / 100 + 1;

                console.log(porcentajehoras);

                var valorhora =
                    (factor / this.form.horas_semanales) * porcentajehoras;

                console.log(valorhora);

                var montohoraextra = Math.round(
                    valorhora * this.form.cantidad_horas_extras
                );

                console.log(montohoraextra);

                this.form.horas_extras_monto = montohoraextra;
            }

        },

        impuestounico() {
            // monto impuesto unico

            if (this.form.utm) {
                // suma bonos
                var montobono = 0;

                this.bonostemp.forEach((element) => {
                    montobono = montobono + parseInt(element["monto"]);
                });

                // total imponible

                var totalimponible =
                    parseInt(this.form.horas_extras_monto) +
                    parseInt(this.form.monto) +
                    parseInt(montobono) +
                    parseInt(this.form.gratificacion);

                // descontar AFP - AFC - Salud

                totalimponible = Math.round(totalimponible - this.form.afp_monto - this.form.salud_monto - this.form.afc_monto);

                var factor = 0;
                var rebaja = 0;

                this.impuestosutm.forEach((element) => {
                    var desde = Math.round(element.desde * this.form.utm);

                    var hasta = Math.round(element.hasta * this.form.utm);

                    if (totalimponible > desde && totalimponible < hasta) {
                        factor = element.factor;
                        rebaja = Math.round(element.rebaja * this.form.utm);
                    }
                });

                var multifactor = (totalimponible * factor) / 100;

                console.log(factor);

                var impuestounico = Math.round(multifactor - rebaja);

                this.form.impuesto_unico = impuestounico;
            }
        },

        successmsgerror(error) {
            Swal.fire({
                position: "center",
                title:
                    "Hay un error en los datos ingresados cerca de " +
                    error +
                    ".",
                icon: "error",
                showConfirmButton: false,
                timer: 2000,
            });
        },
    },
};
