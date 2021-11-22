import Swal from "sweetalert2";
import Layout from "../../layouts/main";
export default {
    components: {
      Layout,
      Swal
    },
    data() {
      return {    
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
           "acción",
          {
            label: "Tipo Documento",
            key: "tipo",
            sortable: true,
          },
          {
            label: "Descripción",
            key: "descripcion",
            sortable: true,
          },
          {
            key: "comprobante",
            sortable: true,
          },
          {
            label: "Vecimiento",
            key: "vencimiento",
            sortable: true,
          },
          {
            label: "Debe / Haber",
            key: "deber",
            sortable: true,
          },
          
        ],
      };
    },
    
    mounted() {
        this.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
        this.totalRows = this.items.length;
        this.getTabla();
    },
    methods: {

        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },  
        
        getTabla()
        {
          this.axios
            .get(`/api/getTablaCompra`)
            .then((res) => {
                  this.tableData = res.data;
                  res.data.map((p) => {
                      p["comprobante"]     = p.tipo_comprobante.nombre;
                      if(p.f_vencimiento == 1){ p["vencimiento"]  = "SI";}else{ p["vencimiento"]  = "NO";}
                      if(p.debe_haber == 1){ p["deber"]  = "DEBE";}else{ p["deber"]  = "HABER";}
                      
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

              this.successmsg(title, message, type);
          });
        },
     
    },
    
  };