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

      title: "Tabs & Accordions",
      items: [
        {
          text: "UI Elements",
        },
        {
          text: "Tabs & Accordions",
          active: true,
        },
      ],
      text: `
         Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.
        `,
      content: `Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus.`,
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
                this.form.documento_id = res.data.informacion.id_documento;
                this.form.n_documento =  res.data.informacion.n_documento;
                this.form.proveedor = res.data.informacion.encabezado.proveedor.razon_social;
                this.form.fechadoc = res.data.informacion.fecha_emision;
                this.form.fechaven = res.data.informacion.fecha_vencimiento;
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
        this.guardarDetalle = {
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
                Swal.fire({
                    icon: 'success',
                    title: 'Documento Tributario',
                    text: res.data,
                    timer: 1500,
                    showConfirmButton: false
                });
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