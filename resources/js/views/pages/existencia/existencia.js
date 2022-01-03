import Swal from "sweetalert2";
import Layout from "../../layouts/main";
import Multiselect from "vue-multiselect";
export default {
    components: {
      Layout,
      Swal,
      Multiselect
    },
    data() {
      return {
        infoEmpresa: JSON.parse(localStorage.getItem("globalEmpresasSelected")),
        optionsOrigen : [],
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
            label: "SKU",
            key: "sku",
            sortable: true,
          },
          {
            label: "Producto",
            key: "nombre",
            sortable: true,
          },
          "acción"
        ],
      };
    },
    
    mounted() {
        this.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
        this.totalRows = this.items.length;
        this.getInicialCompras();
    },
    methods: {

        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },  

        getInicialCompras()
        {
            this.axios
            .get(`api/getProductoExistencia/`+this.infoEmpresa.id_empresa)
            .then((res) => {

                console.log(res);
                this.tableData = res.data;
                    
            })
            .catch((error) => {
                console.log("error", error);
                const title = "Crear subnivel";
                const message = "Error al crear el subnivel";
                const type = "error";

                this.modal = false;
                this.$v.form.$reset();
                });
        },

    },
    
  };