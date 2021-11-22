import Swal from "sweetalert2";
import Layout from "../../layouts/main";
export default {
    components: {
      Layout,
      Swal
    },
    data() {
      return {
        urlbackend: this.$urlBackend,
        // tabla
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
            key: "tipo empresa",
            sortable: true,
          },
          {
            key: "razon social",
            sortable: true,
          },
          {
            key: "nombre fantasia",
            sortable: true,
          },
          {
            key: "capital inicial",
            sortable: true,
          },
          {
            key: "estado",
            sortable: true,
          },
          "action",
        ],
      };
    },
    
    mounted() {
      this.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
      this.totalRows = this.items.length;
      this.traerEmpresa();
    },
    methods: {
      traerEmpresa(){
        this.axios
        .get(`/api/obtenerempresa`)
        .then((response) => {
          console.log(response);
          response.data.map((p) => {
            
            // crear nueva propiedad y asigno el valor
            p["estado"] = p.estado.nombre;
            p["razon social"] = p.razon_social;
            p["nombre fantasia"] = p.nombre_fantasia;
            p["tipo empresa"] = p.tipo_empresa.nombre;
            p["capital inicial"] = p.capital_inicial;

            // remover la propiedad actual
            delete p.razon_social;
            delete p.nombre_fantasia;
            delete p.capital_inicial;
            // retornar el nuevo objeto
            return p;
          });
          this.tableData = response.data;
        });

      },

      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
      },

      editar(datos){
        
        console.log(datos)

      },

      successmsg(title, message, type) {
        Swal.fire(title, message, type);
      },
  
    },
  };