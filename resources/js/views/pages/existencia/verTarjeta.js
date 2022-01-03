import Swal from "sweetalert2";
import Layout from "../../layouts/main";
import Multiselect from "vue-multiselect";
import moment from "moment";

export default {
    components: {
      Layout,
      Swal,
      Multiselect
    },
    data() {
      return {
        infoEmpresa: JSON.parse(localStorage.getItem("globalEmpresasSelected")),
        sku: this.$route.params.sku,
        Nameproducto: "",
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
            label: "Fecha",
            key: "fechaM",
            sortable: true,
          },
          {
            label: "Operación",
            key: "operacion",
            sortable: true,
          },
          {
            label: "Precio",
            key: "precioM",
            sortable: true,
          },
          {
            label: "Entrada",
            key: "cant_entrada",
            sortable: true,
          },
          {
            label: "Salida",
            key: "cant_salida",
            sortable: true,
          },
          {
            label: "Stock",
            key: "total_cant",
            sortable: true,
          },
          {
            label: "T. Entrada",
            key: "total_entradaM",
            sortable: true,
          },
          {
            label: "T. Salida",
            key: "total_salidaM",
            sortable: true,
          },
          {
            label: "Total",
            key: "total_precioM",
            sortable: true,
          },
          {
            label: "Estado",
            key: "estado",
            sortable: true,
          },
          "acción"
        ],
      };
    },
    
    mounted() {
        this.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
        this.totalRows = this.items.length;
        this.getInicialTarjetas();
    },

    methods: {

        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },  

        getInicialTarjetas()
        {   
            this.axios
                .get(`../api/getInicialTarjetas/`+this.sku)
                .then((res) => {

                    console.log(res);
                    this.Nameproducto = res.data.nombre;
                    this.tableData = res.data.existencia;
                    res.data.existencia.map((p) => {
                        if(p.tipo_operacion == 1){ p["operacion"] = "COMPRA"}else if(p.tipo_operacion == 2){p["operacion"] = "VENTA" }else if(p.tipo_operacion == 3){ p["operacion"] = "COMP. ANULACION"}else if(p.tipo_operacion == 4){ p["operacion"] = "VENT. ANULACION"};
                        p['precioM'] = '$ '+p.precio;
                        p['total_entradaM'] = '$ '+p.total_entrada
                        p['total_salidaM'] = '$ '+p.total_salida;
                        p['total_precioM'] = '$ '+p.total_precio;
                        if(p.stock_estado == 1){ p['estado'] = "Vigente"}else if(p.stock_estado == 2){p['estado'] = "Caduco"}
                        p['fechaM'] = moment(p.fecha).format("DD-MM-YY");
                        return p;
                      });
                        
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