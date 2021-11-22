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
        proveedores: [],
        unidades: [],
        typeform: "create", 
        buttonForm: true,
        infoEmpresa: JSON.parse(localStorage.getItem("globalEmpresasSelected")),
        documentoName: "",
        documentSelectName: "",
        mensajeError: "",
        tipoDocumento: this.$route.params.tipo,
        inputFechaVencimiento: true,
        divDocumentoDisponible: true,
        divFormulario: true,
        form : {
            documento_id: "",
            n_documento: "",
            proveedor: "",
            fechadoc: "",
            fechaven: "", 
            glosa: "",
            direccion: "",
            unidad: "",
            empresa: JSON.parse(localStorage.getItem("globalEmpresasSelected")),
        },

        tableDataDocumentos: [],
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
            label: "N°",
            key: "n_documento",
            sortable: true,
          },
          {
            label: "Tipo",
            key: "documento_tributario.tipo",
            sortable: true,
          },
          {
            label: "Glosa",
            key: "glosa",
            sortable: true,
          },
          {
            label: "Proveedor",
            key: "encabezado.proveedor.razon_social",
            sortable: true,
          },
          {
            label: "Fecha emisión",
            key: "fecha_emision",
            sortable: true,
          },
          {
            label: "Total",
            key: "total_documento",
            sortable: true,
          }
        ],
      };
    },
    
    mounted() {
        this.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
        this.totalRows = this.items.length;
        this.verificarDocumento();
    },
    methods: {

        onFiltered(filteredItems) {
          this.totalRows = filteredItems.length;
          this.currentPage = 1;
        },

        verificarDocumento()
        { 
          this.axios
            .get(`/api/verificarDocumentoFormulario/`+this.tipoDocumento+'/'+this.infoEmpresa.id_empresa)
            .then((res) => {
                if(res.data.estado == 1 && res.data.datos.length > 0){
                  this.tableDataDocumentos = res.data.datos;
                  this.documentSelectName = res.data.documento.descripcion;
                  this.divDocumentoDisponible = false;
                  this.divFormulario = false;
                  this.generarNDocumento();
                }else if(res.data.estado == 1 && res.data.datos.length == 0){
                  this.documentSelectName = res.data.documento.descripcion;
                  this.divDocumentoDisponible = true;
                  this.divFormulario = false;
                  this.mensajeError = "Aun no hay documentos disponibles para gestionar.";
                  this.generarNDocumento();
                }else if(res.data.estado == 2)
                { 
                  this.divFormulario = true;
                  this.getInfoDocumento();
                  this.generarNDocumento();
                }else if(res.data.estado == 3)
                { 
                  this.mensajeError = "Documento tributario no esta disponible para efecturas acciones en el sistema.";
                  this.documentSelectName = res.data.documento.descripcion;
                  this.divDocumentoDisponible = true;
                  this.divFormulario = false;
                }
            })
            .catch((error) => {
              console.log("error", error);
            });
        },

        CrearNuevoDocumento(documento)
        { 
          Swal.fire({
            title: 'Generar Documento',
            text: "¿Esta seguro que que desea generar documento?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0b892c',
            cancelButtonColor: '#d33',
            cancelButtonText: "Cancelar",
            confirmButtonText: 'Si, Generar!',
          }).then((result) => { 
            if (result.isConfirmed) {
              this.axios
              .get(`/api/VerificarDocumentoRelacionadoExistente/`+documento+'/'+this.tipoDocumento)
              .then((res) => {
                  if(res.data.existe == 0){
                      this.$router.push('../modificarDocumento/'+documento+'/'+this.tipoDocumento)
                  }else if(res.data.existe > 0){
                    Swal.fire({
                      icon: 'error',
                      title: 'No permitido',
                      text: 'Este documento ya tiene un(a) '+res.data.nombreDocumento+' creada.',
                      timer: 5000,
                      showConfirmButton: false
                    });
                  }
                  
              })
              .catch((error) => {
              console.log("error", error);
              });
            }
        });
          console.log(documento);
          this.tipoDocumento
        },

        getInfoDocumento()
        {   
            this.axios
                .get(`/api/getInicialEmitir/`+this.tipoDocumento+'/'+this.infoEmpresa.id_empresa)
                .then((res) => {
                  console.log(res);
                    this.proveedores = res.data.proveedores;
                    this.unidades = res.data.unidades;
                    this.documentoName = res.data.documento.descripcion;
                    this.form.documento_id = res.data.documento.id_documento;
                    if(res.data.documento.f_vencimiento == 1){ this.inputFechaVencimiento= true; }else if(res.data.documento.f_vencimiento == 2){ this.inputFechaVencimiento= false;}
                })
                .catch((error) => {
                console.log("error", error);
                });
        },

        generarNDocumento()
        {
          this.axios
          .get(`/api/getCodigoDocumento/`+this.tipoDocumento+'/'+this.infoEmpresa.id_empresa)
          .then((res) => {
              this.form.n_documento = res.data;
          })
          .catch((error) => {
          console.log("error", error);
          });
        },

        onChangeProveedor(value)
        {
          this.form.direccion = value['direccion'];
        },

        formSubmit() {
            this.submitted = true;
              if (this.typeform == "create") {
                this.axios
                  .post(`/api/encabezadoSave`, this.form)
                  .then((res) => {
                    this.$router.push('../modificarDocumento/'+res.data) 
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
              } else if(this.typeform == "edit") {
                this.axios
                  .put(
                    `/api/update/${this.form.id}`,this.form
                  )
                  .then((res) => {
                    if (res.data.success) {
                      const title = "Documento Tributario"; 
                      const message = "actualizado con exito";
                      const type = "success";
      
                      this.form = {
                        tipo: "",
                        descripcion: "",
                        codigo: "",
                        debe_haber: "0",
                        comprobante: "",
                        vencimiento: "0",
                      };
      
                        this.modal = false;
                        this.typeform = "create";
                        this.buttonForm = false;
                      
                      this.successmsg(title, message, type);
                    }
                  })
                  .catch((error) => {
                    console.log("error", error);
                    const title = "Editar subnivel";
                    const message = "Error al editar el subnivel";
                    const type = "error";
                    this.modal = false;
                    this.$v.form.$reset();
      
                    this.successmsg(title, message, type);
                  });
              }
        },

        successmsg(title, message, type) {
            Swal.fire(title, message, type);
        },
    },
    
  };