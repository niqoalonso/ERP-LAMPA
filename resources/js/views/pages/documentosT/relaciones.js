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
        divAntecesor: false,
        divSucesor: false,
        modalAntecesor: false,
        modalSucesor: false,
        titlemodalAntecesor: "Nueva Relación Antesora",
        titlemodalSucesor: "Nueva Relación Sucesora",
        optionsAntecesor: [],
        optionsSucesor: [],
        formAntecesor : {
            id: "",
            select: "",
        },
        formSucesor : {
            id: "",
            select: "",
        },
        
        tableDataAntecesor: [],
        title: "Documentos",
        items: [
          {
            text: "Tables",
          },
          {
            text: "Documentos",
            active: true,
          },
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        pageOptions: [10, 25, 50, 100],
        filter: null,
        filterOn: [],
        sortBy: "tipo documento",
        sortDesc: false,
        fields: [
          {
            label: "Tipo",
            key: "tipo",
            sortable: true,
          },
          {
            label: "Descripción",
            key: "descripcion",
            sortable: true,
          }
        ],

        tableDataSucesor: [],
        title: "Documentos",
        items: [
          {
            text: "Tables",
          },
          {
            text: "Documentos",
            active: true,
          },
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        pageOptions: [10, 25, 50, 100],
        filter: null,
        filterOn: [],
        sortBy: "tipo documento",
        sortDesc: false,
        fields: [
          {
            label: "Tipo",
            key: "tipo",
            sortable: true,
          },
          {
            label: "Descripción",
            key: "descripcion",
            sortable: true,
          }
        ],
      };
    },
    
    mounted() {
        this.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
        this.totalRows = this.items.length;
        this.getInicial();
        this.cargarDocumentoRelacionados();
    },
    methods: {
      
        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },  

        customLabelAntecesor({ descripcion, tipo}) {
          return `( ${tipo} -) ${descripcion}`;
        },

        customLabelSucesor({ descripcion, tipo}) {
          return `( ${tipo} -) ${descripcion}`;
        },

        cargarDocumentoRelacionados()
        {
            this.axios
              .get(`/api/getDocumentoRelaciones/`+this.$route.params.id)
              .then((res) => {
                  this.optionsSucesor = res.data.documentos;
                  this.formSucesor.id = res.data.id
                  this.optionsAntecesor = res.data.documentos;
                  this.formSucesor.id = res.data.id
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

        getInicial()
        {
            this.axios
                  .get(`/api/getRelacionesInicial/`+this.$route.params.id)
                  .then((res) => {
                    this.formSucesor.id = res.data.id_documento;
                    this.formSucesor.select = res.data.relacion_sucesor;
                    this.tableDataSucesor = res.data.relacion_sucesor;
                    this.formAntecesor.id = res.data.id_documento;
                    this.formAntecesor.select = res.data.relacion_antecesor;
                    this.tableDataAntecesor = res.data.relacion_antecesor;
                    if(res.data.requiere_antecesor == 1){this.divAntecesor= true;}
                    if(res.data.requiere_sucesor == 1){this.divSucesor= true;}
                     
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
        
        nuevoAntecesor()
        {   
            this.modalAntecesor = true;
        },

        nuevoSucesor()
        {
            this.modalSucesor  = true;
        },

        formSubmitAntecesor() {  
            this.axios
                .post(`/api/storeRelacionAntecesor`, this.formAntecesor)
                .then((res) => {
                    if (res.data.success) {
                    this.modalAntecesor = false; 
                    this.getInicial();
                        
                    Swal.fire({
                        icon: 'success',
                        title: 'Documento Tributario',
                        text: "Ha sido creado exitosamente.",
                        timer: 1500,
                        showConfirmButton: false
                    });
                        
                    }
                })
                .catch((error) => {
                console.log("error", error);
                const title = "Documento Tributario";
                const message = "haasa";
                const type = "error";
    
                this.modal = false;
                this.$v.form.$reset();
    
                this.successmsg(title, message, type);
            });
              
        },

        formSubmitSucesor() {  
            this.axios
              .post(`/api/storeRelacionSucesor`, this.formSucesor)
              .then((res) => {
                if (res.data.success) {
                    this.modalSucesor = false; 
                    this.getInicial();
                      
                    Swal.fire({
                      icon: 'success',
                      title: 'Documento Tributario',
                      text: "Ha sido creado exitosamente.",
                      timer: 1500,
                      showConfirmButton: false
                    });
                }
              })
              .catch((error) => {
                console.log("error", error);
                const title = "Documento Tributario";
                const message = "haasa";
                const type = "error";
  
                this.modal = false;
                this.$v.form.$reset();
  
                this.successmsg(title, message, type);
              });
          
    },

    },
    
  }; 