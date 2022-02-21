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
            id_empresa: JSON.parse(Vue.prototype.$globalEmpresasSelected),
            title: "Remuneraciones",
            tableData: [],
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
        };
    },
    computed: {
        rows() {
            return this.tableData.length;
        },
    },
    mounted() {
        this.axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
        this.traerComprobantes();
        this.totalRows = this.items.length;
    },
    methods: {
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        traerComprobantes() {
            this.axios
                .get(`/api/getComprobantes/` + this.id_empresa.id_empresa)
                .then((response) => {
                    console.log(response);
                    // eliminar los que no tengan detalles
                    let detalles = response.data.filter(item => item.detalle_comprobantes);

                    console.log(detalles)
                    this.tableData = detalles;
                });
        },
    },
};
