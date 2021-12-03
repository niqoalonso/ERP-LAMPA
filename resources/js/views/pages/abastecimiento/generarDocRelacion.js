import Layout from "../../layouts/main";
import Multiselect from "vue-multiselect";
import Swal from "sweetalert2";


//import { required, numeric } from "vuelidate/lib/validators";
export default {
  components: { Layout, Swal, Multiselect },

  data() {
    return {    
        proveedores: [],
        unidades: [],
        productos: [],
        centros: [],
        detalles: [],
        existeDetalle: 0,
        tipoImpuesto: '',
        m_afecto: 0,
        m_iva: 0,
        retenciones: 0,
        total: 0,
        submitted: false,
        inputFechaVencimiento: true,
        idDocumento: "",
        guardarDetalle: {
          detalles: [],
          m_afecto: 0,
          m_iva: 0,
          retenciones: 0,
          total: 0,
          documento: '',
        },

        typeform: "create", 
        buttonForm: true,
        
        documentoName: "",

        form : {
            documento_id: "",
            n_documento: "",
            proveedor: "",
            fechadoc: "",
            fechaven: "",
            glosa: "",
            direccion: "",
            unidad: "",
            idEncabezado: "",
            infoEmpresa: JSON.parse(localStorage.getItem("globalEmpresasSelected")),
            
        },

        formDetalle: {
            sku: "",
            producto: "",
            cantidad: "",
            precio: "",
            descuento_porcentaje: "",
            precio_descuento: "",
            descripcion: "",
            descripcion_adicional: "",
            total: "",
            centrocosto_id: "",
        },

        formInformacion: {
            informacion: "",
            detalle: "",
        },
    };
    
  },

  middleware: "authentication",

  mounted() {
    this.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    this.getInicial();
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Documento listo para agregar detalles.'
    })
},

methods: {
   
    getInicial()
    {   
        this.axios
            .get(`/api/generarInfoDocumentoRelacionado/`+this.$route.params.documento+'/'+this.$route.params.tipo)
            .then((res) => {
                this.form.documento_id = res.data.informacion.id_info;
                this.form.n_documento =  res.data.informacion.n_documento;
                this.form.proveedor = res.data.informacion.encabezado.proveedor.razon_social;
                this.form.glosa = res.data.informacion.glosa;
                this.form.direccion = res.data.informacion.encabezado.proveedor.direccion;
                this.form.unidad = res.data.informacion.encabezado.unidad_negocio.nombre;
                this.form.idEncabezado = res.data.informacion.encabezado.id_encabezado;
                if(res.data.documentoT.f_vencimiento == 1){ this.inputFechaVencimiento= true; }else if(res.data.documentoT.f_vencimiento == 2){ this.inputFechaVencimiento = false;}
                
              
                if(res.data.informacion.total_afecto != null){ this.m_afecto = res.data.informacion.total_afecto; }
                if(res.data.informacion.total_iva != null){ this.m_iva = res.data.informacion.total_iva; }
                if(res.data.informacion.total_retenciones != null){ this.retenciones = res.data.informacion.total_retenciones; }
                if(res.data.informacion.total_documento != null){ this.total = res.data.informacion.total_documento; }
                this.idDocumento = res.data.informacion.id_info;

                this.detalles = res.data.informacion.detalle_documento;
                this.documentoName = res.data.documentoT.descripcion;
            })
            .catch((error) => {
              console.log("error", error);
            });
    },


    GenerarDocumento()
    { 
 
      if(this.detalles.length > 0){
        
        if(this.inputFechaVencimiento == true){
          if(this.form.fechaven.length < 1){
            Swal.fire({
              icon: 'warning',
              title: 'Fecha vencimiento',
              text: "Debe ingresar una fecha de vencimiento",
              timer: 1500,
              showConfirmButton: false
            });
            return false;
          }
        }

        if(this.form.fechadoc.length < 1){
          Swal.fire({
            icon: 'warning',
            title: 'Fecha emisión',
            text: "Debe ingresar una fecha de emisión",
            timer: 1500,
            showConfirmButton: false
          });
          return false;
        }

        if(this.inputFechaVencimiento == true){
          if(this.form.fechadoc > this.form.fechaven){
            Swal.fire({
              icon: 'warning',
              title: 'Fechas Denegadas',
              text: "Fecha vencimiento no puede ser menor a la fecha de emisión",
              timer: 1500,
              showConfirmButton: false
            });
            return false;
          }
        }

        
        this.guardarDetalle = {
          documento_id: this.form.documento_id,
          encabezado_id: this.form.idEncabezado,
          detalles: this.detalles,
          info_id: this.idDocumento,
          m_afecto: this.m_afecto,
          m_iva: this.m_iva,
          retenciones: this.retenciones,
          total: this.total, 
          informacion: this.form,
          tipoDocumento: this.$route.params.tipo,
          
        },

    
        this.axios
            .post(`/api/generarDocumentoPosterior/`, this.guardarDetalle)
            .then((res) => {
                if(res.data.estado == 1){
                  Swal.fire({
                      icon: 'success',
                      title: 'Documento Tributario',
                      text: res.data.mensaje,
                      timer: 1500,
                      showConfirmButton: false
                  });
                }else if(res.data.estado == 0){
                  Swal.fire({
                    icon: 'warning',
                    title: 'Fecha emisión',
                    text: res.data.mensaje,
                    timer: 4500,
                    showConfirmButton: false
                });
                }else if(res.data.estado == 2){
                  Swal.fire({
                      icon: 'error',
                      title: 'Documento Tributario',
                      text: res.data.mensaje,
                      timer: 4500,
                      showConfirmButton: false
                  });
                }
            })
            .catch((error) => {
              console.log("error", error);
            });
      }else{
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
      })
      
      Toast.fire({
          icon: 'warning',
          title: "Debes tener minimo un detalle agregado al documento."
      })
      }
    },

},
};