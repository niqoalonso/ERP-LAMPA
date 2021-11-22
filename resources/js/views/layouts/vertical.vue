<script>
import router from "../../routes";
import { layoutComputed } from "../../state/helpers";
import Topbar from "../../compontents/topbar.vue";
import Sidebar from "../../compontents/side-bar.vue";
import RightSidebar from "../../compontents/right-sidebar.vue";
import Footer from "../../compontents/footer.vue";

export default {
  data() {
    return {
       isMenuCondensed: false,
    }
  },
  components: {
    Topbar,
    Sidebar,
    RightSidebar,
    Footer,
  },
   computed: {
    ...layoutComputed,
  },
  name: "vertical",
  created() {
    document.body.removeAttribute("data-layout");
    document.body.removeAttribute("data-topbar");
  },
  methods: {
    toggleRightSidebar() {
      document.body.classList.toggle("right-bar-enabled");
    },
    hideRightSidebar() {
      document.body.classList.remove("right-bar-enabled");
    },
    toggleMenu() {
      document.body.classList.toggle("sidebar-enable");

      if (window.screen.width >= 992) {
        // eslint-disable-next-line no-unused-vars
        router.afterEach((routeTo, routeFrom) => {
          document.body.classList.remove("sidebar-enable");
          document.body.classList.remove("vertical-collpsed");
        });
        document.body.classList.toggle("vertical-collpsed");
      } else {
        // eslint-disable-next-line no-unused-vars
        router.afterEach((routeTo, routeFrom) => {
          document.body.classList.remove("sidebar-enable");
        });
        document.body.classList.remove("vertical-collpsed");
      }
      this.isMenuCondensed = !this.isMenuCondensed;
    },
  },

};
</script>

<template>
  <!-- Begin page -->
  <div id="layout-wrapper">
    <Topbar />
    <Sidebar :is-condensed="isMenuCondensed" :type="leftSidebarType" :width="layoutWidth"/>
    <!-- ============================================================== -->
    <!-- Start right Content here -->
    <!-- ============================================================== -->
    <div class="main-content">
      <div class="page-content">
        <div class="container-fluid">
          <slot />
        </div>
      </div>
      <!-- End Page-content -->
      <Footer />
    </div>
    <!-- end main content-->
    <RightSidebar />
  </div>
</template>
