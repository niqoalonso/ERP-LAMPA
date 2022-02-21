import Layout from "../../layouts/main";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import DatePicker from "vue2-datepicker";
import moment from "moment";
import Vue from "vue";

export default {
    components: { Layout, Multiselect, DatePicker },
    data() {
        return {
            mesbusqueda: "",
            id_empresa: JSON.parse(Vue.prototype.$globalEmpresasSelected),
            infodata: [],
            totaldebe: 0,
            totalhaber: 0,
        };
    },

    mounted() {
        this.traerinfocaja();
    },

    methods: {
        traerinfocaja() {
            this.axios
                .get(`/api/obtenerinfocaja/${this.id_empresa.id_empresa}/1`)
                .then((response) => {
                    console.log(response);

                    this.trabajarrespuesta(response);
                });
        },

        busqueda() {
            if (this.mesbusqueda) {
                var mes = moment(this.mesbusqueda).format("YYYY-MM");

                this.axios
                    .get(
                        `/api/obtenerinfocaja/${mes}/${this.id_empresa.id_empresa}/1`
                    )
                    .then((response) => {
                        console.log(response);

                        this.trabajarrespuesta(response);
                    });
            }
        },

        trabajarrespuesta(response) {
            this.infodata = [];
            this.totalhaber = 0;
            this.totaldebe = 0;

            // eliminar los que no tengan detalles

            let detalles = response.data.filter(
                (item) => item.detalle_comprobantes
            );

            detalles.map((p, i) => {
                if (p.detalle_comprobantes.length > 0) {
                    p.detalle_comprobantes.map((j) => {
                        j["fecha_comprobante"] = p.fecha_comprobante;
                        j["glosa_comprobante"] = p.glosa;
                        this.infodata.push(j);

                        return j;
                    });
                }
                // crear nueva propiedad y asigno el valor

                return p;
            });

            this.calculototales();
        },

        calculototales() {
            this.infodata.forEach((element) => {
                if (element.debe > 0) {
                    this.totalhaber = this.totalhaber + element.debe;
                }

                if (
                    element.haber > 0 &&
                    element.plan_cuenta.manual_cuenta.id_manual_cuenta != 1 &&
                    element.plan_cuenta.manual_cuenta.id_manual_cuenta != 2
                ) {
                    this.totaldebe = this.totaldebe + element.haber;
                }
            });
        },

        cerrarcaja() {
            console.log(this.infodata);

            let caja = this.infodata.filter((item) => item.debe > 0);

            // const totales = caja.reduce((acumulador, valorActual) => {
            //     const elementoYaExiste = acumulador.find(elemento => elemento.plancuenta_id === valorActual.plancuenta_id);
            //     if (elementoYaExiste) {
            //       return acumulador.map((elemento) => {

            //         if (elemento.plancuenta_id === valorActual.plancuenta_id) {

            //           return {
            //             ...elemento,
            //             total: valorActual.debe + elemento.debe
            //           }
            //         }

            //         return elemento;
            //       });
            //     }

            //     return [...acumulador, valorActual];
            //   }, []);

            //   console.log(totales)


              return;

             let form = {
                  totales : totales,
                  arrays : caja
              }

            this.axios
                .post(`/api/cerrarcaja`, form)
                .then((res) => {

                    console.log(res);

                })
                .catch((error) => {
                    console.log("error", error);

                    let title = "";
                    let message = "";
                    let type = "";
                    title = "Cerrar caja";
                    message = "Error al cerrar caja";
                    type = "error";
                    this.successmsg(title, message, type);
                });
        },
    },
};
