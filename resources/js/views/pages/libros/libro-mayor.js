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
        };
    },

    mounted() {
        this.traerinfo();
    },

    methods: {
        traerinfo() {
            this.axios
                .get(`/api/obtenerinfocuenta/${this.id_empresa.id_empresa}`)
                .then((response) => {
                    console.log(response)
                    let data =  response.data;
                    for (let i = 0; i < data.length; i++) {

                        let totaldebe = 0;
                        let totalhaber = 0;

                        for (let j = 0; j < data[i]["detalle_comprobantes"].length; j++) {

                            totaldebe = totaldebe + data[i]["detalle_comprobantes"][j]["debe"];
                            totalhaber = totalhaber + data[i]["detalle_comprobantes"][j]["haber"];

                        }

                        data[i]["totaldebe"] = totaldebe;
                        data[i]["totalhaber"] = totalhaber;

                        let sa = 0
                        let saldodeudor = 0;

                        if(totalhaber > totaldebe){

                            sa = totalhaber - totaldebe;

                        }else{

                            saldodeudor = totaldebe - totalhaber;
                        }

                        data[i]["saldodeudor"] = saldodeudor;
                        data[i]["sa"] = sa;
                    }

                    console.log(data)


                    this.infodata = response.data;
                });
        },

    },
};
