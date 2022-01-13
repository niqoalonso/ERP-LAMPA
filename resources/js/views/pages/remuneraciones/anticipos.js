import Layout from "../../layouts/main";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import DatePicker from "vue2-datepicker";
import moment from "moment";
import { required } from "vuelidate/lib/validators";
import Vue from "vue";

export default {
    components: { Layout, Multiselect, DatePicker },
    data() {
        return {
            form: {
                monto: "",
                trabajador: "",
                cuenta: "",
                id_anticipo: "",
            },
            id_empresa: JSON.parse(Vue.prototype.$globalEmpresasSelected),
            options: [],
            optionsTrabajador: [],
            sueldo_base: 0,
            xpagar : 0,
            titlemodal: "Crear Anticipo",
            typeform: "create",
            btnCreate: true,
            submitted: false,
            tableData: [],
            modal: false,
            title: "Anticipos",
            items: [
                {
                    text: "Tables",
                },
                {
                    text: "Anticipos",
                    active: true,
                },
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 25, 50, 100],
            filter: null,
            filterOn: [],
            sortBy: "trabajador",
            sortDesc: false,
            fields: [
                {
                    key: "trabajador",
                    sortable: true,
                    label: "Trabajador",
                    formatter: (trabajador) => {
                        return `${trabajador.nombres} ${trabajador.apellidos}`;
                    },
                },
                {
                    key: "monto",
                    sortable: true,
                    formatter: (monto) => {
                        var formatter = new Intl.NumberFormat("es-CL", {
                            style: "currency",
                            currency: "CLP",
                            minimumFractionDigits: 0,
                        });
                        return formatter.format(monto);
                    },
                },
                {
                    key: "plancuenta",
                    sortable: true,
                    label: "Cuenta",
                    formatter: (plancuenta) => {
                        return `${plancuenta.manual_cuenta.nombre}`;
                    },
                },

                {
                    key: "estado_pago",
                    sortable: true,
                    label: "Estado",
                    formatter: (estado_pago) => {
                        if (estado_pago == 0) {
                            return "No pagado";
                        } else {
                            return "Pagado";
                        }
                    },
                },

                {
                    key: "fecha",
                    sortable: true,
                },
                "action",
            ],
        };
    },
    validations: {
        form: {
            monto: {
                required,
            },
            trabajador: {
                required,
            },
            cuenta: {
                required,
            },
        },
    },
    computed: {
        /**
         * Total no. of records
         */
        rows() {
            return this.tableData.length;
        },
    },
    mounted() {
        this.axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
        this.traerTrabajador();
        this.traerPlan();
        this.traerAnticipo();
    },
    methods: {
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },

        customLabel({ nombres, apellidos }) {
            return `${nombres} ${apellidos}`;
        },

        customLabelCuenta({ manual_cuenta }) {
            return `${manual_cuenta.nombre}`;
        },

        traerAnticipo() {
            this.axios
                .get(`/api/obteneranticipo/${this.id_empresa.id_empresa}`)
                .then((response) => {
                    console.log(response);
                    this.tableData = response.data;
                    this.xpagar = 0;

                    if (response.data.length > 0) {
                        response.data.forEach((element) => {
                            if (element.estado_pago == 0) {
                                this.xpagar = 1;
                            }
                        });
                    }
                });
        },

        traerTrabajador() {
            this.axios
                .get(`/api/obtenertrabajador/${this.id_empresa.id_empresa}`)
                .then((response) => {
                    console.log(response);
                    this.optionsTrabajador = response.data;
                });
        },

        traerPlan() {
            this.axios
                .get(`/api/getPlanCuenta/${this.id_empresa.id_empresa}`)
                .then((response) => {
                    console.log(response);
                    this.options = response.data;
                });
        },

        sueldobase() {
            this.sueldo_base = this.form.trabajador.sueldo_base;
        },

        modalNuevo() {
            this.modal = true;
            (this.form = {
                monto: "",
                trabajador: "",
                cuenta: "",
                id_anticipo: "",
            }),
                (this.titlemodal = "Crear Anticipo");
            this.typeform = "create";
            this.modal = true;
            this.btnCreate = true;
        },

        editar(data) {
            this.form.monto = data.monto;
            this.form.trabajador = data.trabajador;
            this.form.cuenta = data.plancuenta;
            this.form.id_anticipo = data.id_anticipo;
            this.sueldo_base = data.trabajador.sueldo_base;
            this.titlemodal = "Editar Anticipo";
            this.modal = true;
        },

        eliminar(datos) {
            Swal.fire({
                title: "Eliminar Anticipo",
                text: "¿Estas seguro de eliminar el anticipo?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#34c38f",
                cancelButtonColor: "#f46a6a",
                confirmButtonText: "Si",
            }).then((result) => {
                if (result.value) {
                    this.axios
                        .delete(`/api/eliminaranticipo/${datos.id_anticipo}`)
                        .then((res) => {
                            console.log(res);
                            var title = "Eliminar Anticipo";
                            if (res.data == 1) {
                                var message = "Anticipo Eliminado";
                                var type = "success";
                            } else {
                                message = "Error al eliminar el Anticipo";
                                type = "error";
                            }

                            this.successmsg(title, message, type);

                            this.traerAnticipo();
                        });
                }
            });
        },

        formSubmit() {
            this.submitted = true;
            this.$v.form.$touch();

            if (!this.$v.form.$invalid) {
                this.form.id_empresa = this.id_empresa.id_empresa;

                console.log(this.form);

                if (parseInt(this.form.monto) > parseInt(this.sueldo_base)) {
                    this.successmsgerror(
                        "El monto del anticipo no puede ser mayor al sueldo base"
                    );
                } else {
                    this.axios
                        .post(`/api/crearanticipo`, this.form)
                        .then((res) => {
                            console.log(res);

                            let title = "";
                            let message = "";
                            let type = "";
                            if (res.data) {
                                if (this.form.id_anticipo == "") {
                                    title = "Crear Anticipo";
                                    message = "Anticipo creada con exito";
                                    type = "success";
                                } else {
                                    title = "Editar Anticipo";
                                    message = "Anticipo editada con exito";
                                    type = "success";
                                }
                                this.modal = false;
                                this.btnCreate = false;
                                this.submitted = false;
                                this.sueldo_base = "";

                                this.$v.form.$reset();
                                this.traerAnticipo();
                                this.successmsg(title, message, type);
                            }
                        })
                        .catch((error) => {
                            console.log("error", error);

                            let title = "";
                            let message = "";
                            let type = "";

                            if (this.form.id_remuneracion) {
                                title = "Crear Remuneración";
                                message = "Remuneración  creada con exito";
                                type = "error";
                            } else {
                                title = "Editar Remuneración";
                                message = "Remuneración  editada con exito";
                                type = "error";
                            }

                            this.modal = false;
                            this.btnCreate = false;
                            this.submitted = false;
                            this.$v.form.$reset();
                            this.traerAnticipo();
                            this.successmsg(title, message, type);
                        });
                }
            }
        },

        pagaranticipo(){
            Swal.fire({
                title: "Aprobar Pago",
                text: "¿Esta seguro que que desea aprobar pago?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#0b892c",
                cancelButtonColor: "#d33",
                cancelButtonText: "Cancelar",
                confirmButtonText: "Si, Aprobar!",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.axios
                        .get(
                            `api/pagaranticipo/${this.id_empresa.id_empresa}`
                        )
                        .then((response) => {
                            console.log(response);
                            if (response.data == 1) {
                                const title = "Exito al Pagar Anticipos";
                                const message =
                                    "Anticipos pagadas con éxito";
                                const type = "success";
                                this.successmsg(title, message, type);
                                this.traerAnticipo();
                            } else {
                                const title = "Error al Pagar Anticipos";
                                const message =
                                    "Error al pagar las Anticipos";
                                const type = "error";
                                this.successmsg(title, message, type);
                            }
                        });
                }
            });
        },

        successmsg(title, message, type) {
            Swal.fire(title, message, type);
        },

        successmsgerror(error) {
            Swal.fire({
                position: "center",
                title: error,
                icon: "error",
                showConfirmButton: false,
                timer: 2000,
            });
        },
    },
};
