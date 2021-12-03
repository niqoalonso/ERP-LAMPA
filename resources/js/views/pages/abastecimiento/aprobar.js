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
        urlbackend: this.$urlBackend,
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
            label: "N° Compra",
            key: "encabezado",
            sortable: true,
          },
          {
            label: "Glosa",
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
                .get(`/api/getDocumentoAprobar/`+this.infoEmpresa.id_empresa)
                .then((res) => {
                  console.log(res);
                    this.tableData = res.data;
                    res.data.map((p) => {
                        p['tipo']    = p.documento_tributario.tipo;
                        p['total']          = '$ '+p.total_documento;
                        p['proveedorName'] = p.encabezado.proveedor.razon_social;
                        p['encabezado'] = p.encabezado.num_encabezado;
                        if(p.estado_id == 12){ p["estado"]  = "INGRESADO";}else{ p["estado"]  = "-";}
                        
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
        
        aprobarDocumento(documento)
        {   
            Swal.fire({
                title: 'Aprobar Documento',
                text: "¿Esta seguro que quiere aprobar este documento?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#0b892c',
                cancelButtonColor: '#d33',
                cancelButtonText: "Cancelar",
                confirmButtonText: 'Si, Aprobar!',
              }).then((result) => { 
                if (result.isConfirmed) {
                    this.axios
                    .get(`/api/aprobarDocumento/`+documento)
                    .then((res) => {
                      if(res.data.estado == 1){
                        Swal.fire({
                          icon: 'success',
                          title: 'Aprobación Exitosa',
                          text: res.data.mensaje,
                          timer: 3500,
                          showConfirmButton: false
                        });
                        this.getInicial();
                      }else if(res.data.estado == 0){
                        Swal.fire({
                          icon: 'error',
                          title: 'Aprobación Denegada',
                          text: res.data.mensaje,
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
                }
            });
        },
    

    },
    
  };