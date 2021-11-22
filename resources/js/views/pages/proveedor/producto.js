import Layout from "../../layouts/main";
import Swal from "sweetalert2";


import { required} from "vuelidate/lib/validators";
import Multiselect from "vue-multiselect";
export default {
  
  components: {
    Layout,
    Multiselect,
    Swal,
  },
 
  data() {
    return {
      urlbackend: this.$urlBackend,
      form: {
        nombre: "",
        sku: "",
        descripcion: "",
        p_bruto: "",
        iva: "",
        p_neto: "",
        id_proveedor: "",
      }, 
      submitted: false,
      typeform: "create",
      modeSelectProveedor: false,
      divButton: true,
      proveedores: [],

      // permiso
      crearproductoproveedor: this.$CrearProductoProveedor,
      listarproductoproveedor: this.$ListarProductoProveedor,
      editarproductoproveedor: this.$EditarProductoProveedor,
      eliminarproductoproveedor: this.$EliminarProductoProveedor,

      // tabla

      tableData: [],

      title: "actividad",
      items: [
        {
          text: "Tables",
        },
        {
          text: "actividad",
          active: true,
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100, 1000],
      filter: null,
      filterOn: [],
      sortBy: "Nivel",
      sortDesc: false,
      fields: [
        {
          label: "SKU",
          key: "sku",
          sortable: true,
        },
        {
          labe: "Nombre",
          key: "nombre",
          sortable: true,
        },
        {  
          label: "Precio Neto",
          key: "neto",
          sortable: true,
        },
        {  
          label: "IVA",
          key: "ivaL",
          sortable: true,
        },
        {
          label: "Precio Bruto",
          key: "bruto",
          sortable: true,
        },
        "action",
      ],
    };
  },

  validations: {
    form: {
      id_proveedor: {
        required,
      },
      nombre: {
        required,
      },
      p_bruto: {
        required,
      },
      p_neto: {
        required,
      },
      iva: {
        required,
      },
      proveedor: {
        required,
      }
    },
  },

  mounted() {  
    this.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
    this.traerProveedores();
  },
  methods: {

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
 
    customLabel({razon_social}) {
      return `${razon_social}`;
    },

    onChange(value)
    {
      this.form.id_proveedor = value.id_proveedor;
      this.axios
            .get(`/api/getProductoProveedor/${this.form.id_proveedor}`, this.form)
            .then((res) => {
              res.data.map((p) => {
                p["bruto"] = '$ '+p.precio_bruto;
                p["ivaL"] = '$ '+p.iva;
                p["neto"] = '$ '+p.precio_neto;
                return p;
              });
              this.tableData = res.data;
              this.totalRows = res.data.length;
              this.modeSelectProveedor = true;
            })
            .catch(error => {
                console.log(error);
            });
    },

    calcularIVABRUTO()
    {   
      var neto  = this.form.p_neto;
      var iva   = neto*0.19; 
      var bruto = parseInt(neto)+parseInt(iva);
      
      if(isNaN(iva)){
        this.form.iva = 0;
      }else{
        this.form.iva = Math.round(iva);
      }
      if(isNaN(bruto)){
        this.form.p_bruto = 0;
      }else{
        this.form.p_bruto = Math.round(bruto);
      }

    },

    traerProducto(id)
    {
      this.axios
            .get(`/api/getProductoProveedor/`+id)
            .then((res) => {
              res.data.map((p) => {
                p["bruto"] = '$ '+p.precio_bruto;
                p["ivaL"] = '$ '+p.iva;
                p["neto"] = '$ '+p.precio_neto;              
                return p;
              });
              this.tableData = res.data;
              this.totalRows = res.data.length;
            })
            .catch(error => {
                console.log(error);
            });
    },

    formSubmit() {
      this.submitted = true;

      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (this.typeform == "create") {
          this.axios
            .post(`/api/crearProducto`, this.form)
            .then((res) => {
              if (res.data.success) {
                const title = "Producto";
                const message = "Creado Exitosamente.";
                const type = "success";
                
                this.traerProducto(this.form.id_proveedor);
                
                this.$v.form.$reset();
                this.form.nombre = "";
                this.form.sku = "";
                this.form.p_bruto = "";
                this.form.iva = "";
                this.form.p_neto = "";
                this.form.descripcion = "";

                this.successmsg(title, message, type);
              }
            })
            .catch(error => { 
                console.clear();
            });
        } else if (this.typeform == "edit") {
          this.axios
            .put(
              `/api/actualizarProducto/${this.form.id_producto}`,
              this.form
            )
            .then((res) => {
              if (res.data.success) {
                const title = "Producto";
                const message = "Actualizado Exitosamente";
                const type = "success";
                this.successmsg(title, message, type);

                this.traerProducto(this.form.id_proveedor);
                
                this.$v.form.$reset();
                this.form.nombre = "";
                this.form.sku = "";
                this.form.p_bruto = "";
                this.form.iva = "";
                this.form.p_neto = "";
                this.form.descripcion = "";

                this.divButton = true;
                this.typeform = "create";

              }
            })
            .catch((error) => {
                console.clear();
            });
        }
      }
    },

    traerProveedores() {
      this.axios
        .get(`/api/getProveedor`)
        .then((response) => {
            this.proveedores = response.data;
        });
    },

    successmsg(title, message, type) {
      Swal.fire(title, message, type);
    },

    editar(datos) {

      this.typeform = "edit";
      this.form.id_producto  = datos.id_prod_proveedor;
      this.form.sku         = datos.sku;
      this.form.nombre      = datos.nombre;
      this.form.p_bruto     = datos.precio_bruto;
      this.form.p_neto      = datos.precio_neto;
      this.form.iva         = datos.iva;
      this.form.descripcion      =datos.descripcion;
      this.divButton = false;
    },

    cancelar()
    {
        this.divButton = true;
        this.typeform = "create";
        this.$v.form.$reset();
        this.form.nombre = "";
        this.form.sku = "";
        this.form.p_bruto = "";
        this.form.iva = "";
        this.form.p_neto = "";
        this.form.descripcion = "";
    },

    eliminar(datos) {
      if (datos.estado == "Activo") {
        var estado = 2;
        var title = "Desactivar Docente";
        var text = `Esta seguro de desativar al Docente ${datos.nombres} ${datos.apellidos}`;
      } else {
        estado = 1;
        title = "Activar Docente";
        text = `Esta seguro de activar el Docente ${datos.nombres} ${datos.apellidos}`;
      }

      Swal.fire({
        title: title,
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "Si",
      }).then((result) => {
        if (result.value) {
          this.axios
            .delete(
              `/api/eliminarDocente/${datos.id_docente}`
            )
            .then((res) => {
              console.log(res);
              if (res.data.success) {
                var message = "Docente ha sido desactivado";
                var type = "success";
              } else {
                if (estado == 1) {
                  message = "Error al activar el subnivel";
                } else {
                  message = "Error al desactivar el subnivel";
                }
                type = "error";
              }

              this.successmsg(title, message, type);

              this.traerData();
            });
        }
      });
    },
  },
};
