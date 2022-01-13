import Layout from "../../layouts/main";
import Swal from "sweetalert2";
import { required } from "vuelidate/lib/validators";
import Multiselect from "vue-multiselect";
import Vue from 'vue';

export default {
    components: { Layout, Multiselect },

    data() {
        return {
            urlbackend: this.$urlBackend,
            form: {
                nombres: "",
                apellidos: "",
                email: "",
                direccional: "",
                id_trabajador: "",
                estado_civil: "",
                nacionalidad: "",
                carga_familiar: "",
                salud: "",
                rut: "",
                celular: "",
                fecha_nacimiento: "",
                edad: "",
                fecha_desvinculacion: "",
                motivo_desvinculacion: "",
                fecha_contrato: "",
                sueldo_base: "",
                colacion: "",
                movilidad: "",
                url_pdf: "",
                afp_id: "",
                comuna_id: "",
                region_id: "",
                anturlpdf: "",
                fecha_fin_contrato: "",
                tipo_contrato: "",
                id_empresa: JSON.parse(Vue.prototype.$globalEmpresasSelected),
            },
            formcarga: [],
            formacargatemp: {
                nombres: "",
                apellidos: "",
                rut: "",
                email: "",
                nacionalidad: "",
                fecha_nacimiento: "",
                parentezco: "",
                tipo_carga: "",
                index: "na",
            },
            submitted: false,
            submittedformcarga: false,
            typeform: "create",
            titlemodal: "Crear Trabajador",
            modal: false,
            modaldatos: false,
            rutexist: false,
            btnCreate: true,
            options: [],
            optionsComuna: [],
            optionsSalud: [{ name: "Fonasa" }, { name: "Isapre" }],
            optionsTipoContrato: [{ tipo: "Indefinido" }, { tipo: "Plazo" }],
            optionsTipoCarga: [{ tipo: "Especial" }, { tipo: "Normal" }],
            optionsAfp: [],
            optionsParentezco: [],
            id_empresa: JSON.parse(Vue.prototype.$globalEmpresasSelected),

            // tabla

            tableData: [],

            title: "Trabajador",
            items: [
                {
                    text: "Tables",
                },
                {
                    text: "Trabajador",
                    active: true,
                },
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 25, 50, 100],
            filter: null,
            filterOn: [],
            sortBy: "nombres",
            sortDesc: false,
            fields: [
                {
                    key: "nombres",
                    sortable: true,
                },
                {
                    key: "apellidos",
                    sortable: true,
                },
                {
                    key: "email",
                    sortable: true,
                },
                {
                    key: "direccional",
                    sortable: true,
                },
                "action",
            ],
        };
    },
    validations: {
        form: {
            nombres: {
                required,
            },
            apellidos: {
                required,
            },
            direccional: {
                required,
            },
            email: {
                required,
            },
            estado_civil: {
                required,
            },
            nacionalidad: {
                required,
            },
            carga_familiar: {
                required,
            },
            salud: {
                required,
            },
            rut: {
                required,
            },
            celular: {
                required,
            },
            fecha_nacimiento: {
                required,
            },
            edad: {
                required,
            },
            fecha_contrato: {
                required,
            },
            sueldo_base: {
                required,
            },
            colacion: {
                required,
            },
            movilidad: {
                required,
            },
            url_pdf: {
                required,
            },
            afp_id: {
                required,
            },
            comuna_id: {
                required,
            },
            region_id: {
                required,
            },
            tipo_contrato: {
                required,
            },
        },
        formacargatemp: {
            nombres: {
                required,
            },
            apellidos: {
                required,
            },
            rut: {
                required,
            },
            email: {
                required,
            },
            nacionalidad: {
                required,
            },
            fecha_nacimiento: {
                required,
            },
            parentezco: {
                required,
            },
            tipo_carga: {
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
        this.totalRows = this.items.length;
        this.traerRegion();
        this.traerAfp();
        this.traerParentezco();
    },
    methods: {
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },

        traerRegion() {
            this.axios.get(`/api/regiones`).then((response) => {
                this.options = response.data;
            });
        },

        traerComunas() {
            var region = this.form.region_id.REG_ID;

            this.axios
                .get(`/api/comuna/${region}`)
                .then((response) => {
                    this.optionsComuna = response.data;
                });
        },

        traerAfp() {
            this.axios.get(`/api/afp/`).then((response) => {
                this.optionsAfp = response.data;
            });
        },

        traerParentezco() {
            this.axios.get(`/api/parentezco/`).then((response) => {
                this.optionsParentezco = response.data;
            });
        },

        traerTrabajador() {
            this.axios
                .get(`api/obtenertrabajador/${this.id_empresa.id_empresa}`)
                .then((response) => {
                    this.tableData = response.data;
                });
        },

        eliminar(data) {
            console.log(data);

            if (data.deleted_at == null) {
                var estado = 2;
                var title = "Desactivar Trabajador";
                var text = `¿Esta seguro de desativar la Trabajador ${data.nombres} ${data.apellidos}?`;
            } else {
                estado = 1;
                title = "Activar Trabajador";
                text = `¿Esta seguro de activar la Trabajador ${data.nombres} ${data.apellidos}?`;
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
                            `/api/eliminartrabajador/${data.id_trabajador}`
                        )
                        .then((res) => {
                            console.log(res);
                            if (res.data) {
                                var message = "Trabajador ha sido desactivada";
                                var type = "success";
                            } else {
                                if (estado == 1) {
                                    message = "Error al activar Trabajador";
                                } else {
                                    message = "Error al desactivar Trabajador";
                                }
                                type = "error";
                            }

                            this.successmsg(title, message, type);

                            this.traerTrabajador();
                        });
                }
            });
        },

        editar(data) {
            console.log(data);
            this.formcarga = [];
            for (let i = 0; i < data.trabajorcarga.length; i++) {
                var formacargatemp = {
                    nombres: data.trabajorcarga[i].pivot.nombres,
                    apellidos: data.trabajorcarga[i].pivot.apellidos,
                    rut: data.trabajorcarga[i].pivot.rut,
                    email: data.trabajorcarga[i].pivot.email,
                    nacionalidad: data.trabajorcarga[i].pivot.nacionalidad,
                    fecha_nacimiento:
                        data.trabajorcarga[i].pivot.fecha_nacimiento,
                    parentezco: data.trabajorcarga[i],
                    tipo_carga: this.optionsTipoCarga.find(
                        (option) =>
                            option.tipo ===
                            data.trabajorcarga[i].pivot.tipo_carga
                    ),
                    index: "na",
                };

                this.formcarga.push(formacargatemp);
            }
            this.form.nombres = data.nombres;
            this.form.apellidos = data.apellidos;
            this.form.direccional = data.direccional;
            this.form.email = data.email;
            this.form.id_trabajador = data.id_trabajador;
            this.form.estado_civil = data.estado_civil;
            this.form.nacionalidad = data.nacionalidad;
            this.form.carga_familiar = data.carga_familiar;
            this.form.salud = this.optionsSalud.find(
                (option) => option.name === data.salud
            );
            this.form.rut = data.rut;
            this.form.celular = data.celular;
            this.form.fecha_nacimiento = data.fecha_nacimiento;
            this.form.edad = data.edad;
            this.form.fecha_desvinculacion = data.fecha_desvinculacion;
            this.form.motivo_desvinculacion = data.motivo_desvinculacion;
            this.form.fecha_contrato = data.fecha_contrato;
            this.form.sueldo_base = data.sueldo_base;
            this.form.colacion = data.colacion;
            this.form.movilidad = data.movilidad;
            this.form.anturlpdf = data.url_pdf;
            this.form.afp_id = this.optionsAfp.find(
                (option) => option.id_afp === data.afp_id
            );
            this.form.comuna_id = data.comuna;
            this.form.region_id = this.options.find(
                (option) => option.REG_ID === data.comuna.COM_REGION_ID
            );
            this.form.fecha_fin_contrato = data.fecha_fin_contrato;
            this.form.tipo_contrato = this.optionsTipoContrato.find(
                (option) => option.tipo === data.tipo_contrato
            );
            this.modal = true;
            this.btnCreate = false;
        },

        formSubmit() {
            this.submitted = true;
            // stop here if form is invalid
            if (this.form.id_trabajador && this.form.anturlpdf) {
                if (!this.form.url_pdf) {
                    this.form.url_pdf = this.form.anturlpdf;
                }
            }
            this.$v.form.$touch();

            if (!this.$v.form.$invalid && !this.rutexist) {
                console.log(this.form);
                var fd = new FormData();
                fd.append("rut", this.form.rut);
                fd.append("nombres", this.form.nombres);
                fd.append("apellidos", this.form.apellidos);
                fd.append("direccional", this.form.direccional);
                fd.append("estado_civil", this.form.estado_civil);
                fd.append("nacionalidad", this.form.nacionalidad);
                fd.append("carga_familiar", this.form.carga_familiar);
                fd.append("salud", this.form.salud.name);
                fd.append("celular", this.form.celular);
                fd.append("fecha_nacimiento", this.form.fecha_nacimiento);
                fd.append("edad", this.form.edad);
                fd.append(
                    "fecha_desvinculacion",
                    this.form.fecha_desvinculacion
                );
                fd.append(
                    "motivo_desvinculacion",
                    this.form.motivo_desvinculacion
                );
                fd.append("fecha_contrato", this.form.fecha_contrato);
                fd.append("sueldo_base", this.form.sueldo_base);
                fd.append("colacion", this.form.colacion);
                fd.append("movilidad", this.form.movilidad);
                fd.append("url_pdf", this.form.url_pdf);
                fd.append("anturlpdf", this.form.anturlpdf);
                fd.append("afp_id", this.form.afp_id.id_afp);
                fd.append("comuna_id", this.form.comuna_id.COM_ID);
                fd.append("email", this.form.email);
                fd.append("datos_carga", this.formcarga);
                fd.append("id_trabajador", this.form.id_trabajador);
                fd.append("tipo_contrato", this.form.tipo_contrato.tipo);
                fd.append("fecha_fin_contrato", this.form.fecha_fin_contrato);
                fd.append("id_empresa", this.form.id_empresa.id_empresa);
                this.axios
                    .post(`/api/creartrabajador`, fd, {
                        headers: {
                            "content-type": "multipart/form-data",
                        },
                    })
                    .then((res) => {
                        console.log(res);

                        if (res.data && this.formcarga.length > 0) {
                            var formdata = {
                                trabajador: res.data,
                                datos_carga: this.formcarga,
                            };

                            console.log(this.formcarga);

                            this.axios
                                .post(`/api/crearcarga`, formdata)
                                .then((res) => {
                                    console.log(res);

                                    let title = "";
                                    let message = "";
                                    let type = "";
                                    if (res.data) {
                                        if (this.form.id_trabajador == "") {
                                            title = "Crear Trabajador";
                                            message =
                                                "Trabajador creada con exito";
                                            type = "success";
                                        } else {
                                            title = "Editar Trabajador";
                                            message =
                                                "Trabajador editada con exito";
                                            type = "success";
                                        }
                                        this.modal = false;
                                        this.rutexist = false;
                                        this.btnCreate = false;

                                        this.$v.form.$reset();
                                        this.formcarga = [];
                                        this.traerTrabajador();
                                        this.successmsg(title, message, type);
                                    }
                                })
                                .catch((error) => {
                                    console.log("error", error);

                                    let title = "";
                                    let message = "";
                                    let type = "";

                                    if (this.form.id_trabajador == "") {
                                        title = "Crear Trabajador";
                                        message =
                                            "Trabajador  creada con exito";
                                        type = "error";
                                    } else {
                                        title = "Editar Trabajador";
                                        message =
                                            "Trabajador  editada con exito";
                                        type = "error";
                                    }

                                    this.modal = false;
                                    this.btnCreate = false;
                                    this.$v.form.$reset();
                                    this.formcarga = [];

                                    this.successmsg(title, message, type);
                                });
                        } else {
                            let title = "";
                            let message = "";
                            let type = "";
                            if (this.form.id_trabajador == "") {
                                title = "Crear Trabajador";
                                message = "Trabajador creada con exito";
                                type = "success";
                            } else {
                                title = "Editar Trabajador";
                                message = "Trabajador editada con exito";
                                type = "success";
                            }
                            this.modal = false;
                            this.rutexist = false;
                            this.btnCreate = false;

                            this.$v.form.$reset();
                            this.formcarga = [];
                            this.traerTrabajador();
                            this.successmsg(title, message, type);
                        }
                    })
                    .catch((error) => {
                        console.log("error", error);

                        let title = "";
                        let message = "";
                        let type = "";

                        if (this.form.id_trabajador) {
                            title = "Crear Trabajador";
                            message = "Trabajador  creada con exito";
                            type = "error";
                        } else {
                            title = "Editar Trabajador";
                            message = "Trabajador  editada con exito";
                            type = "error";
                        }

                        this.modal = false;
                        this.btnCreate = false;
                        this.$v.form.$reset();
                        this.formcarga = [];

                        this.successmsg(title, message, type);
                    });
            }
        },

        modalNuevo() {
            this.modal = true;
            this.formcarga = [];
            this.titlemodal = "Crear Trabajador";
            (this.typeform = "create"),
                (this.form = {
                    nombres: "",
                    apellidos: "",
                    email: "",
                    direccional: "",
                    id_trabajador: "",
                    estado_civil: "",
                    nacionalidad: "",
                    carga_familiar: "",
                    salud: "",
                    rut: "",
                    celular: "",
                    fecha_nacimiento: "",
                    edad: "",
                    fecha_desvinculacion: "",
                    motivo_desvinculacion: "",
                    fecha_contrato: "",
                    sueldo_base: "",
                    colacion: "",
                    movilidad: "",
                    url_pdf: "",
                    afp_id: "",
                    comuna_id: "",
                    region_id: "",
                    fecha_fin_contrato: "",
                    tipo_contrato: "",
                    id_empresa: JSON.parse(Vue.prototype.$globalEmpresasSelected),
                });
            this.btnCreate = true;
        },

        validarrut($event) {
            if ($event.target.value.length > 4) {
                this.axios
                    .get(`/api/validarrut/${$event.target.value}`)
                    .then((response) => {
                        console.log(response);
                        if (response.data == 1) {
                            this.rutexist = true;
                        } else {
                            this.rutexist = false;
                        }
                    });
            }
        },
        AddCarga() {
            this.modaldatos = true;
            this.formacargatemp = {
                nombres: "",
                apellidos: "",
                rut: "",
                email: "",
                nacionalidad: "",
                fecha_nacimiento: "",
                parentezco: "",
                tipo_carga: "",
                index: "na",
            };
        },
        deleteRow(index) {
            this.formcarga.splice(index, 1);
        },
        editarRow(carga, i) {
            this.formacargatemp.nombres = carga.nombres;
            this.formacargatemp.apellidos = carga.apellidos;
            this.formacargatemp.rut = carga.rut;
            this.formacargatemp.email = carga.email;
            this.formacargatemp.nacionalidad = carga.nacionalidad;
            this.formacargatemp.fecha_nacimiento = carga.fecha_nacimiento;
            this.formacargatemp.parentezco = carga.parentezco;
            this.formacargatemp.tipo_carga = this.optionsTipoCarga.find(
                (option) => option.tipo === carga.tipo_carga
            );
            this.formacargatemp.index = i;
            this.modaldatos = true;
        },
        guardar() {
            this.submittedformcarga = true;

            this.$v.formacargatemp.$touch();

            if (!this.$v.formacargatemp.$invalid) {
                if (this.formacargatemp.index != "na") {
                    this.formcarga[this.formacargatemp.index].nombres =
                        this.formacargatemp.nombres;

                    this.formcarga[this.formacargatemp.index].apellidos =
                        this.formacargatemp.apellidos;

                    this.formcarga[this.formacargatemp.index].rut =
                        this.formacargatemp.rut;

                    this.formcarga[this.formacargatemp.index].email =
                        this.formacargatemp.email;

                    this.formcarga[this.formacargatemp.index].nacionalidad =
                        this.formacargatemp.nacionalidad;

                    this.formcarga[this.formacargatemp.index].fecha_nacimiento =
                        this.formacargatemp.fecha_nacimiento;

                    this.formcarga[this.formacargatemp.index].parentezco =
                        this.formacargatemp.parentezco;
                } else {
                    this.formcarga.push(this.formacargatemp);
                }
                this.modaldatos = false;
                this.submittedformcarga = false;
            }
        },
        datoscarga() {
            if (this.form.carga_familiar == 0) {
                this.formcarga = [];
            } else if (this.form.carga_familiar == 1) {
                this.AddCarga();
                this.modaldatos = true;
            }
        },
        onFileChange($event) {
            var files = $event.target.files || $event.dataTransfer.files;
            if (!files.length) return;
            this.form.url_pdf = files[0];
        },
        successmsg(title, message, type) {
            Swal.fire(title, message, type);
        },
    },
};
