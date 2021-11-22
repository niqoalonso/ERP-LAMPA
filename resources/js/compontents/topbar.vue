<script>
import simplebar from "simplebar-vue";
import Multiselect from "vue-multiselect";
import Vue from "vue";
export default {
  components: { 
    simplebar,
    Multiselect,
  },
  data() {
    return {
      languages: [
        {
          flag: require("../assets/images/flags/us.jpg"),
          language: "en",
          title: "English",
        },
        {
          flag: require("../assets/images/flags/french.jpg"),
          language: "fr",
          title: "French",
        },
        {
          flag: require("../assets/images/flags/spain.jpg"),
          language: "es",
          title: "spanish",
        },
        {
          flag: require("../assets/images/flags/china.png"),
          language: "zh",
          title: "Chinese",
        },
        {
          flag: require("../assets/images/flags/arabic.png"),
          language: "ar",
          title: "Arabic",
        },
      ],
      text: null,
      flag: null,
      value: null,
      options: [],
      empresaSelect: "",
      rolEs: "",
      empGlobMulti: false,
    };
  },

  mounted() {
    this.verificarEmpresasGlobal();
  },
 
  methods: {
    /**
     * Toggle menu
     */
    toggleMenu() {
      this.$parent.toggleMenu();
    },

    verificarEmpresasGlobal(){
       if(Vue.prototype.$rol == "Estudiante"){
         this.empresaSelect = JSON.parse(Vue.prototype.$globalEmpresasSelected);
         this.options = JSON.parse(Vue.prototype.$globalEmpresas);
         this.empGlobMulti = true;
       }else{
         this.empresaSelect = "";
         this.options = [];
         this.empGlobMulti = false;
       }
    },

    changeSelectEmpresa(){
        Vue.prototype.$globalEmpresasSelected = JSON.stringify(this.empresaSelect);
        localStorage.setItem("globalEmpresasSelected", JSON.stringify(this.empresaSelect));
        this.$router.push("/empresa");
     },

     logout() {

      this.axios
          .post(`/api/logout`, [])
          .then((res) => {
            console.log(res);
            if (res.data.success) {

              localStorage.clear();

              this.$router.push({
                path: "/login",
              });
              location.reload(1);
            }
          })
          .catch((error) => {
            console.log("error", error);
          });
      
    },

    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    /**
     * Toggle rightsidebar
     */
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    /**
     * Set languages
     */
    logoutUser() {
      this.logout();
      this.$router.push({
        path: "/account/login",
      });
    },
  },
};
</script>

<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <router-link to="/" class="logo logo-dark">
            <span class="logo-sm">
              <img src="../assets/images/logo-sm.png" alt="Logo" height="22" />
            </span>
            <span class="logo-lg">
              <img src="../assets/images/logo-dark.png" alt="Logo" height="20" />
            </span>
          </router-link>

          <router-link to="/" class="logo logo-light">
            <span class="logo-sm">
              <img src="../assets/images/logo-sm.png" alt="Logo" height="22" />
            </span>
            <span class="logo-lg">
              <img src="../assets/images/logo-light.png" alt="Logo" height="20" />
            </span>
          </router-link>
        </div>

        <button
          @click="toggleMenu"
          type="button"
          class="btn btn-sm px-3 font-size-16 header-item vertical-menu-btn"
          id="vertical-menu-btn"
        >
          <i class="fa fa-fw fa-bars"></i>
        </button>
        
      </div>
      <div class="d-flex" style="width: 30%;">
        <div class="pt-3 divSelect" style="width:100%;">
          <multiselect
            v-model="empresaSelect"
            placeholder="Seleccionar"
            track-by="id_empresa"
            label= "razon_social"
            :options="options"
            @input="changeSelectEmpresa()"
            v-if="empGlobMulti"
          ></multiselect>
        </div>
      </div>
      
      <div class="d-flex">
        

        <b-dropdown
          class="d-inline-block"
          toggle-class="header-item"
          right
          variant="white"
          menu-class="dropdown-menu-end"
        >
          <template v-slot:button-content>
            
            <span
              class="d-xl-inline-block ms-1 fw-medium font-size-15"
              >Nombre</span
            >
            <i class="uil-angle-down  d-xl-inline-block font-size-15"></i>
          </template>

          <!-- item-->
          <a class="dropdown-item" href="#">
            <i
              class="uil uil-user-circle font-size-18 align-middle text-muted me-1"
            ></i>
            <span class="align-middle">Perfil</span>
          </a>
          <a class="dropdown-item" href="#">
            <i
              class="uil uil-wallet font-size-18 align-middle me-1 text-muted"
            ></i>
            <span class="align-middle">Billetera</span>
          </a>
          <a
            class="dropdown-item"
            href="javascript:void(0)"
            @click="logout()"
          >
            <i
              class="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted"
            ></i>
            <span class="align-middle">Salir</span>
          </a>
        </b-dropdown>

        <div class="dropdown d-inline-block">
          <button
            type="button"
            class="btn header-item noti-icon right-bar-toggle toggle-right"
            @click="toggleRightSidebar"
          >
            <i class="uil-cog toggle-right"></i>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
