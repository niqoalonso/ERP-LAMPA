import Layout from "../../layouts/main";
import Multiselect from "vue-multiselect";
export default {
  components: {
    Layout,
    Multiselect,
  },

  data() {
    return {
      subnivelbusqueda: "",
      options: [],
      urlbackend: this.$urlBackend,
      // tabla
      tableData: [],
      title: "Empresas",
      items: [
        {
          text: "Tables",
        },
        {
          text: "Solicitud Empresa",
          active: true,
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "empresa",
      sortDesc: false,
      fields: [
        {
          key: "empresa",
          sortable: true,
        },
        {
          key: "estudiante",
          sortable: true,
        },
        "action",
      ],
      
    };
  },
  mounted() {
    this.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
    this.traerSubnivel();
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    customLabel({ nombre, nivel, ano_generacion }) {
      return `( ${nivel.nombre} - ${ano_generacion} ) ${nombre}`;
    },
    traerSubnivel() {
      this.axios
        .get(`/api/obtenersubnivelesporNivel`)
        .then((response) => {
          this.options = response.data;
        });
    },

    traerbusqueda() {
      this.axios
        .get(
          `/api/obtenersolicitud/${this.subnivelbusqueda.id_subnivel}`
        )
        .then((response) => {
          console.log(response);
          response.data.map((p) => {

            const nombreestudiante = `${p.empresa.estudiante.nombres} ${p.empresa.estudiante.apellidos}`;

            // crear nueva propiedad y asigno el valor
            p["empresa"] = p.empresa.razon_social;
            p["estudiante"] = nombreestudiante ;
            return p;
          });
          this.tableData = response.data;
          this.totalRows = response.data.length;
        });
    },
  },
};
