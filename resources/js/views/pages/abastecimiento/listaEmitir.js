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
            label: "Tipo",
            key: "tipo",
            sortable: true,
          },
          {
            label: "Gloca",
            key: "glosa",
            sortable: true,
          },
          {
            label: "Proveedor",
            key: "proveedorName",
            sortable: true,
          },
          {
            label: "Total",
            key: "total",
            sortable: true,
          },
          {
            label: "Fecha Emisión",
            key: "fecha_emision",
            sortable: true,
          },
          {
            label: "Estado",
            key: "estado",
            sortable: true,
          },
        ],
      };
    },
    
    mounted() {
        this.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
        this.totalRows = this.items.length;
        this.getInicial();
    },
    methods: {

        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },  

        getInicial()
        {
            this.axios
                .get(`/api/getDocumentoEmitir/`+this.infoEmpresa.id_empresa)
                .then((res) => {
                    console.log(res);
                    this.tableData = res.data;
                        res.data.map((p) => {
                            p['tipo']    = p.documento_tributario.tipo;
                            p['total']          = '$ '+p.total_documento;
                            p['proveedorName'] = p.encabezado.proveedor.razon_social;
                            if(p.estado_id == 13){ p["estado"]  = "APROBADO";}else{ p["estado"]  = "-";}
                            
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
        
        emitirDocumento(documento)
        {   
            Swal.fire({
                title: 'Emitir Documento',
                text: "¿Esta seguro que quiere emitir este documento?, luego no podra modificarlo.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#0b892c',
                cancelButtonColor: '#d33',
                cancelButtonText: "Cancelar",
                confirmButtonText: 'Si, Emitir!',
              }).then((result) => { 
                if (result.isConfirmed) {
                    this.axios
                    .get(`/api/emitirDocumento/`+documento)
                    .then((res) => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Emisión de Documento',
                            text: res.data,
                            timer: 1500,
                            showConfirmButton: false
                          });
                        this.getInicial();
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
                }
            });
        },
    
        formSubmit() {
            this.submitted = true;
            
                this.axios
                  .post(`/api/store`, this.form)
                  .then((res) => {
                    console.log(res);
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