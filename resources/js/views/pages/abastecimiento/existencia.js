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
        n_interno: this.$route.params.documento,
        detalles: [],  
        selectExistencias: [],
        tarjetas: [],
        nombreTarjeta: [],
        moverExistencia: [],
        documentoName: "",
        typeform: "create", 
        aprobacion: 0,
        buttonForm: true,
        infoEmpresa: JSON.parse(localStorage.getItem("globalEmpresasSelected")),
        form: {
            documento: "",
            empresa: "",
            moverExistencia: [],
        }
      };
    },
    
    mounted() {
        this.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
        this.getInformacionInicial();
    },
    methods: {

        getInformacionInicial()
        { 
          this.axios
            .get(`/api/getDetalleExistencia/`+this.n_interno+'/'+this.infoEmpresa.id_empresa)
            .then((res) => {
                this.form.documento = res.data.info.id_info;
                this.form.empresa = this.infoEmpresa.id_empresa;
                this.detalles = res.data.info.detalle_documento;
                this.documentoName = res.data.info.documento_tributario.descripcion;
                var info = {'id_tarjeta': 0, 'nombre': 'Nueva existencia'};
                var array = res.data.existencias;
                array.push(info);   
                array.reverse();             
                
                this.selectExistencias = array;
                
            })
            .catch((error) => {
              console.log("error", error);
            });
        },

        inputNombreChange(value)
        {      
            if(this.tarjetas[value]['id_tarjeta'] == 0){
                document.getElementById("nameT"+value).disabled = false;
            }else{
                document.getElementById("nameT"+value).disabled = true;
            }
        },


        formSubmit() {

            this.aprobacion = 0;
            this.moverExistencia = [];

            this.detalles.forEach(element => {
                if(this.tarjetas[element.id_detalle] == undefined){
                    Swal.fire({
                        icon: 'warning',
                        title: 'Existencia',
                        text: 'Debes seleccionar tarjeta de existencia',
                        timer: 2500,
                        showConfirmButton: false
                    });
                    this.aprobacion++;
                    return false;
                    
                }else if(this.tarjetas[element.id_detalle]['id_tarjeta'] == 0 && (this.nombreTarjeta[element.id_detalle] == undefined || this.nombreTarjeta[element.id_detalle].length == 0)){
                    Swal.fire({
                        icon: 'warning',
                        title: 'Nombre Tarjeta',
                        text: 'Debes ingresar el nombre de la nueva tarjeta.',
                        timer: 2500,
                        showConfirmButton: false
                    });
                    this.aprobacion++;
                    return false;

                }else{

                    if(this.nombreTarjeta[element.id_detalle] == undefined){
                        var data = {'id_detalle': element.id_detalle, 'tarjeta': this.tarjetas[element.id_detalle]['id_tarjeta'], 'nombre': null}
                    }else{
                        var data = {'id_detalle': element.id_detalle, 'tarjeta': this.tarjetas[element.id_detalle]['id_tarjeta'], 'nombre': this.nombreTarjeta[element.id_detalle]}
                    }

                    this.moverExistencia.push(data);

                }
            });
            
            if(this.aprobacion == 0)
            {
                
                this.form.moverExistencia = this.moverExistencia;
       
                this.axios
                .post(`/api/emitirDocumentoWithExistencia/`, this.form)
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log("error", error);
                });
            }

        },

    },
    
  };