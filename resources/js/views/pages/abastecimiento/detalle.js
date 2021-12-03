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
        divDetalle: true,
        guardarDetalle: {
          detalles: [],
          m_afecto: 0,
          m_iva: 0,
          retenciones: 0,
          total: 0,
          documento_id: '',
        },

        typeform: "create", 
        buttonForm: true,
        infoEmpresa: JSON.parse(localStorage.getItem("globalEmpresasSelected")),
        documentoName: "",
        numDocumento: this.$route.params.tipo,

        form : {
            documento_id: "",
            n_documento: "",
            proveedor: "",
            fechadoc: "",
            fechaven: "",
            glosa: "",
            direccion: "",
            unidad: "",
            n_interno: "",
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
            centro_costo: "",
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
           "acción",
          {
            label: "Tipo",
            key: "tipo",
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

  middleware: "authentication",

  mounted() {
    this.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    this.totalRows = this.items.length;
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
    
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }, 

    getInicial()
    {     
        this.axios
            .get(`/api/getInicialDetalle/`+this.numDocumento)
            .then((res) => {
              //VERIFICAMOS SI EL DOCUMENTO A EDITAR YA TIENE ESTADO EMITIDO
                if(res.data.estado == 1){
                  this.$router.push('../abastecimiento_emitir') 
                }
                if(res.data.documento.documento_tributario.relacion_antecesor.length != 0){ this.divDetalle = false};
                this.documentoName = res.data.documento.documento_tributario.descripcion;
                this.form.documento_id = res.data.documento.id_documento;
                this.form.n_documento =  res.data.documento.n_documento;
                this.form.proveedor = res.data.documento.encabezado.proveedor.razon_social;
                this.form.fechadoc = res.data.documento.fecha_emision;
                this.form.fechaven = res.data.documento.fecha_vencimiento;
                this.form.glosa = res.data.documento.glosa;
                this.form.n_interno = res.data.documento.n_interno;
                this.form.direccion = res.data.documento.encabezado.proveedor.direccion;
                this.form.unidad = res.data.documento.encabezado.unidad_negocio.nombre;
                if(res.data.documento.documento_tributario.f_vencimiento == 1){ this.inputFechaVencimiento= true; }else if(res.data.documento.documento_tributario.f_vencimiento == 2){ this.inputFechaVencimiento= false;}
                this.tipoImpuesto = res.data.documento.documento_tributario.iva_honorario;
                

                this.productos = res.data.documento.encabezado.proveedor.producto;
                this.centros = res.data.centros;  

                this.detalles = res.data.documento.detalle_documento;
                if(res.data.documento.total_afecto != null){ this.m_afecto = res.data.documento.total_afecto; }
                if(res.data.documento.total_iva != null){ this.m_iva = res.data.documento.total_iva; }
                if(res.data.documento.total_retenciones != null){ this.retenciones = res.data.documento.total_retenciones; }
                if(res.data.documento.total_documento != null){ this.total = res.data.documento.total_documento; }
                this.idDocumento = res.data.documento.id_info;

                this.tableData = res.data.encabezados;
                  res.data.encabezados.map((p) => {
                    p['tipo']    = p.documento_tributario.tipo;
                    p['total']          = '$ '+p.total_documento;
                    p['proveedorName'] = p.encabezado.proveedor.razon_social;
                    if(p.estado_id == 12){ p["estado"]  = "INGRESADO";}else if(p.estado_id == 14){ p["estado"]  = "EMITIDO";}else if(p.estado_id == 13){p["estado"]  = "APROBADO";}
                    
                    return p;
                });
                  
            })
            .catch((error) => {
              console.log("error", error);
            });
    },

    onChangeProveedor(value)
    {
        this.form.direccion = value['direccion'];
    },

    onChangeProducto(value)
    {
        this.formDetalle.precio = value['precio_neto'];
        this.formDetalle.descripcion = value['descripcion'];
        this.formDetalle.sku = value['sku'],
        this.formDetalle.cantidad = 1;
    },

    formSubmitEncabezado()
    { 
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
  
      this.axios
          .post(`/api/updateFechaEmision/`, this.form)
          .then((res) => {
            if(res.data.estado == 0){
              Swal.fire({
                icon: 'success',
                title: 'Encabezado Documento',
                text: res.data.mensaje,
                timer: 1500,
                showConfirmButton: false
              });
            }else if(res.data.estado == 1){
              Swal.fire({
                icon: 'warning',
                title: 'Encabezado Documentoo',
                text: res.data.mensaje,
                timer: 1500,
                showConfirmButton: false
              });
            }
          })
          .catch((error) => {
            console.log("error", error);
          });
    },

    formSubmitDetalle() { 
        this.detalles.find(detalle => {
          if (parseInt(detalle.sku) === parseInt(this.formDetalle.sku)) {
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
                title: "Producto ya ingresado.",
            });
            this.existeDetalle = 1;
          }
        });

        //Verificamos si el producto existe o no.
        if(this.existeDetalle == 1){
          this.existeDetalle = 0;
          return false;
        } 
        
        //Calculamos precio dependiendo si tiene o no descuento
        if(this.formDetalle.descuento_porcentaje != ''){
          this.formDetalle.total = parseInt(this.formDetalle.precio_descuento)*parseInt(this.formDetalle.cantidad);
        }else{
          this.formDetalle.total = parseInt(this.formDetalle.precio)*parseInt(this.formDetalle.cantidad);
        }
        
        this.detalles.push(this.formDetalle);

        this.m_afecto = parseInt(this.m_afecto)+parseInt(this.formDetalle.total);

        if(this.tipoImpuesto == 1){
            this.m_iva =  Math.round(parseInt(this.m_afecto)*(1.19)-(parseInt(this.m_afecto)));
            this.total = parseInt(this.m_afecto)+parseInt(this.m_iva);
        }else if( this.tipoImpuesto == 2){
            this.m_iva = 0;
            this.total = parseInt(this.m_afecto);
        }else if(this.tipoImpuesto == 3){
            this.retenciones = Math.round(parseInt(this.m_afecto)*(11.5)/100);
            this.total = parseInt(this.m_afecto)+parseInt(this.retenciones);
        }

        this.formDetalle = {
          n_detalle: "",
          sku: "",
          producto: "",
          cantidad: "",
          precio: "",
          porcentaje: "",
          precio_descuento: "",
          descripcion: "",
          descripcion_adicional: "",
          centrocosto: '',
        }

    },

    GuardarDetalles()
    {
      if(this.detalles.length > 0){
        this.guardarDetalle = {
          detalles: this.detalles,
          info_id: this.idDocumento,
          m_afecto: this.m_afecto,
          m_iva: this.m_iva,
          retenciones: this.retenciones,
          total: this.total,
        },

        this.axios
            .post(`/api/guardarDetalle/`, this.guardarDetalle)
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

    calcularDescuento()
    { 
      if(this.formDetalle.descuento_porcentaje > 100){
        this.formDetalle.descuento_porcentaje = "";
        this.formDetalle.precio_descuento = "";
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
          title: "Maximo 100% descuento."
      })
      }else{
        this.formDetalle.precio_descuento = this.formDetalle.precio-(Math.round(this.formDetalle.precio*this.formDetalle.descuento_porcentaje/100));
      }
    },

    changeCantidad()
    {
      this.formDetalle.descuento_porcentaje = "";
      this.formDetalle.precio_descuento = "";
    },

    EliminarDetalle(index, total)
    { 
      this.m_afecto = parseInt(this.m_afecto-total);
      if(this.tipoImpuesto == 1){
        this.m_iva =  Math.round(parseInt(this.m_afecto)*(1.19)-(this.m_afecto));
        this.total =  this.m_afecto+this.m_iva;
      }else if( this.tipoImpuesto == 2){
          this.m_iva = 0;
          this.total = this.m_afecto;
      }else if(this.tipoImpuesto == 3){
          this.retenciones = Math.round(parseInt(this.m_afecto*(11.5)/100));
          this.total = parseInt(this.m_afecto+this.retenciones);
      }
      this.detalles.splice(index, 1);
    },

    successmsg(title, message, type) {
        Swal.fire(title, message, type);
    },
},
};