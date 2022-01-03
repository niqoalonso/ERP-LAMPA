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
        modal: false,
        titlemodal: "Nuevo Documento Tributario",
        Tipocomprobantes: [],
        typeform: "create",
        buttonForm: true,
        optionsAntecesor: [],
        TipoDocumentoTributarios: [],
        optionsSucesor: [],
        seletAntecesor: false,
        seletSucesor: false,
        inputExistencia: true,
        selectDocumentoTriburario: false,
        selectDocumentoAnulacion: false,
        form : {
            tipo: "",
            descripcion: "",
            codigo: "",
            debe_haber: "0", 
            comprobante: "",
            vencimiento: "0",
            pago: "0",
            existencia: "0",
            ciclo: "0",
            libro: "0",
            impuesto: "0",
            incrementa_disminuye: "0",
            requiere_antecesor: "0",
            requiere_sucesor: "0",
            anulacion: "0",
            doc_anulacion: "0",
            doc_paraanular: "",
        },
        
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
          {
            label: "Ciclo",
            key: "cicloName",
            sortable: true,
          },
          "action",
        ],
      };
    },
    
    mounted() {
        this.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
        this.totalRows = this.items.length;
        this.getInicial();
        this.getTabla();
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

        cargarDocumentoAntecesor(event)
        {
          if(event.target.value == 1){
            this.axios
              .get(`/api/getDocumentoAntecesor/`+this.form.ciclo)
              .then((res) => {
                  this.seletAntecesor = true;
                  this.optionsAntecesor = res.data;
                  //this.Tipocomprobantes = res.data;
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
          }
        },

        cargarDocumentoSucesor(event)
        {
          if(event.target.value == 1){
            this.axios
              .get(`/api/getDocumentoSucesor/`+this.form.ciclo)
              .then((res) => {
                this.seletSucesor = true;
                  this.optionsSucesor = res.data;
                  //this.Tipocomprobantes = res.data;
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
          }
        },

        getInicial()
        {
            this.axios
                  .get(`/api/getInicialDocumento`)
                  .then((res) => {
                    
                      this.TipoDocumentoTributarios = res.data.docTributarios;
                      this.Tipocomprobantes = res.data.comprobantes;
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
                            if(p.ciclo == 1){ p["cicloName"]  = "COMPRA";}else{ p["cicloName"]  = "VENTA";}
                            
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
    
        nuevoDocumento()
        {   
            this.titlemodal = "Nuevo Documento Tributario",
            this.typeform == "create"
            this.modal = true;
            this.buttonForm = true;
        },

        editar(datos)
        {   
            this.titlemodal = "Editar Documento Tributario";
            this.typeform = "edit";
            this.modal = true;
            this.buttonForm = false;
            this.form = {
                id: datos.id_documento,
                tipo: datos.tipo,
                descripcion: datos.descripcion,
                codigo: datos.cod_sii,
                comprobante: datos.tipo_comprobante,
                vencimiento: datos.f_vencimiento,
                debe_haber: datos.debe_haber,
                ciclo: datos.ciclo,
                libro: datos.libro,
                impuesto: datos.iva_honorario,
                pago: datos.pago,
                existencia: datos.mueve_existencia,
                incrementa_disminuye: datos.incrementa_disminuye,
                requiere_antecesor: datos.requiere_antecesor,
                requiere_sucesor: datos.requiere_sucesor,

            };
        },

        formSubmit() {
            this.submitted = true;
            
              if(this.typeform == "create") {
                this.axios
                  .post(`/api/storeDocumento`, this.form)
                  .then((res) => {
                    if (res.data.success) {
                      
                      this.form = {
                        tipo: "",
                        descripcion: "",
                        codigo: "",
                        debe_haber: "0", 
                        comprobante: "",
                        vencimiento: "0",
                        pago: "0",
                        existencia: "0",
                        ciclo: "0",
                        libro: "0",
                        impuesto: "0",
                        incrementa_disminuye: "0",
                        requiere_antecesor: "0",
                        requiere_sucesor: "0",
                      };
      
                      this.modal = false; 
                      this.getTabla();
                      
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
              }else if(this.typeform == "edit") {
                this.axios
                  .put(
                    `/api/updateDocumento/${this.form.id}`,this.form
                  )
                  .then((res) => {
                    if (res.data.success) {
      
                      this.form = {
                        tipo: "",
                        descripcion: "",
                        codigo: "",
                        debe_haber: "0", 
                        comprobante: "",
                        vencimiento: "0",
                        pago: "0",
                        ciclo: "0",
                        libro: "0",
                        impuesto: "0",
                        incrementa_disminuye: "0",
                        requiere_antecesor: "0",
                        requiere_sucesor: "0",
                      };
      
                        this.modal = false;
                        this.typeform = "create";
                        this.buttonForm = false;
                        this.getTabla();
                      
                        Swal.fire({
                          icon: 'success',
                          title: 'Documento Tributario',
                          text: "Ha sido actualizado exitosamente.",
                          timer: 1500,
                          showConfirmButton: false
                        });
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

        mueveExistencia()
        {   
          if(this.form.pago == 1){
            this.inputExistencia = false;
            this.form.existencia = 1;
          }else{
            this.inputExistencia = true;
            this.form.existencia = 0;
          }
        },

        requireDocumentoAnulacion()
        { 
          if(this.form.doc_anulacion == 1){
            this.selectDocumentoTriburario = true;
          }else{
            this.selectDocumentoTriburario = false;
          }
        },

        DocumentoAnulacion()
        { 
          if(this.form.anulacion == 2 || this.form.anulacion == 0){
            this.selectDocumentoAnulacion = false;
            this.selectDocumentoTriburario = false;
          }else{
            this.selectDocumentoAnulacion = true;
            this.form.doc_anulacion = 0;
            this.form.doc_paraanular= 0;
            this.selectDocumentoTriburario = false;
          }
        }


    },
    
  }; 