<script>

import MetisMenu from "../../../node_modules/metismenu/dist/metisMenu";

import simplebar from "simplebar-vue";

import { menuItems } from "./menu";

/**
 * Sidebar component
 */
export default {
  data() {
    return {
      menuItems: menuItems,
    };
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
  },
  components: {
    simplebar,
  },
  mounted: function () {
    // eslint-disable-next-line no-unused-vars
    var menuRef = new MetisMenu("#side-menu");
    this._activateMenuDropdown();

    this.$router.afterEach(() => {
      this._activateMenuDropdown();
    });
  },
  watch: {
    type: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "dark":
              document.body.setAttribute("data-sidebar", "dark");
              document.body.removeAttribute("data-topbar");
              document.body.removeAttribute("data-sidebar-size");
              break;
            case "light":
              document.body.removeAttribute("data-sidebar");
              document.body.removeAttribute("data-sidebar-size");
              document.body.classList.remove("vertical-collpsed");
              break;
            case "compact":
              document.body.setAttribute("data-sidebar-size", "small");
              document.body.setAttribute("data-sidebar", "dark");
              document.body.classList.remove("vertical-collpsed");
              document.body.removeAttribute("data-topbar", "dark");
              break;
            case "icon":
              document.body.setAttribute("data-keep-enlarged", "true");
              document.body.classList.add("vertical-collpsed");
              document.body.setAttribute("data-sidebar", "dark");
              document.body.removeAttribute("data-topbar", "dark");
              break;
            case "colored":
              document.body.setAttribute("data-sidebar", "colored");
              document.body.removeAttribute("data-keep-enlarged");
              document.body.classList.remove("vertical-collpsed");
              document.body.removeAttribute("data-sidebar-size");
              break;
            default:
              document.body.setAttribute("data-sidebar", "dark");
              break;
          }
        }
      },
    },
    width: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "boxed":
              document.body.setAttribute("data-layout-size", "boxed");
              break;
            case "fluid":
              document.body.setAttribute("data-layout-mode", "fluid");
              document.body.removeAttribute("data-layout-size");
              break;
            default:
              document.body.setAttribute("data-layout-mode", "fluid");
              break;
          }
        }
      },
    },
    $route: {
      handler: "onRoutechange",
      immediate: true,
      deep: true,
    },
  },
  methods: {

    toggleMenu() {
      this.$parent.toggleMenu();
    },

    hasItems(item) {
      return item.subItems !== undefined ? item.subItems.length > 0 : false;
    },

    _removeAllClass(className) {
      const els = document.getElementsByClassName(className);
      while (els[0]) {
        els[0].classList.remove(className);
      }
    },
    _activateMenuDropdown() {
      this._removeAllClass("mm-active");
      this._removeAllClass("mm-show");

      var links = document.getElementsByClassName("side-nav-link-ref");
      var matchingMenuItem = null;
      const paths = [];

      for (var i = 0; i < links.length; i++) {
        paths.push(links[i]["pathname"]);
      }
      var itemIndex = paths.indexOf(window.location.pathname);
      if (itemIndex === -1) {
        const strIndex = window.location.pathname.lastIndexOf("/");
        const item = window.location.pathname.substr(0, strIndex).toString();
        matchingMenuItem = links[paths.indexOf(item)];
      } else {
        matchingMenuItem = links[itemIndex];
      }

      if (matchingMenuItem) {
        matchingMenuItem.classList.add("active");
        var parent = matchingMenuItem.parentElement;

        /**
         * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
         * We should come up with non hard coded approach
         */
        if (parent) {
          parent.classList.add("mm-active");
          const parent2 = parent.parentElement.closest("ul");
          if (parent2 && parent2.id !== "side-menu") {
            parent2.classList.add("mm-show");

            const parent3 = parent2.parentElement;
            if (parent3) {
              parent3.classList.add("mm-active");
              var childAnchor = parent3.querySelector(".has-arrow");
              var childDropdown = parent3.querySelector(".has-dropdown");
              if (childAnchor) childAnchor.classList.add("mm-active");
              if (childDropdown) childDropdown.classList.add("mm-active");

              const parent4 = parent3.parentElement;
              if (parent4 && parent4.id !== "side-menu") {
                parent4.classList.add("mm-show");
                const parent5 = parent4.parentElement;
                if (parent5 && parent5.id !== "side-menu") {
                  parent5.classList.add("mm-active");
                  const childanchor = parent5.querySelector(".is-parent");
                  if (childanchor && parent5.id !== "side-menu") {
                    childanchor.classList.add("mm-active");
                  }
                }
              }
            }
          }
        }
      }
    },
    onRoutechange() {
      setTimeout(() => {
        if (document.getElementsByClassName("mm-active").length > 0) {
          const currentPosition = document.getElementsByClassName(
            "mm-active"
          )[0].offsetTop;
          if (currentPosition > 500)
            this.$refs.currentMenu.SimpleBar.getScrollElement().scrollTop =
              currentPosition + 300;
        }
      }, 300);
    },
  },
};
</script>

<template>
  <!-- ========== Left Sidebar Start ========== -->
  <div class="vertical-menu">
    <!-- LOGO -->
    <div class="navbar-brand-box">
      <router-link to="/administracion" class="logo logo-dark">
        <span class="logo-sm">
          <img src="assets/images/logo.png" alt height="50" />
        </span>
        <span class="logo-lg">
          <img src="assets/images/logoC.png" alt height="50" />
        </span>
      </router-link>

      <router-link to="/" class="logo logo-light">
        <span class="logo">
          <img src="assets/images/logo.png" alt height="22" />
        </span>
        <span class="logo-lg">
          <img src="assets/images/logoC.png" alt height="20" />
        </span>
      </router-link>
    </div>

    <button
      type="button"
      @click="toggleMenu"
      class="btn btn-sm px-3 font-size-16 header-item vertical-menu-btn"
    >
      <i class="fa fa-fw fa-bars"></i>
    </button>

    <simplebar class="sidebar-menu-scroll" ref="currentMenu">
      <!--- Sidemenu -->
      <div id="sidebar-menu">
        <!-- Left Menu Start -->
        <ul class="metismenu list-unstyled" id="side-menu">
          <template v-for="item in menuItems">
            <li class="menu-title" v-if="item.isTitle && item.permiso" :key="item.id">
              {{ item.label }}
            </li>
            <li v-if="!item.isTitle && !item.isLayout && item.permiso" :key="item.id">
              <a
                v-if="hasItems(item)"
                href="javascript:void(0);"
                class="is-parent"
                :class="{
                  'has-arrow': !item.badge,
                  'has-dropdown': item.badge,
                }"
              >
                <i :class="`${item.icon}`" v-if="item.icon"></i>

                <span
                  :class="`badge rounded-pill bg-${item.badge.variant} float-end`"
                  v-if="item.badge"
                  >{{ item.badge.text }}</span
                >
                <span>{{ item.label }}</span>
              </a>

              <router-link
                :to="item.link"
                v-if="!hasItems(item)"
                class="side-nav-link-ref"
              >
                <i :class="`${item.icon}`" v-if="item.icon"></i>
                <span>{{ item.label }}</span>
                <span
                  :class="`badge rounded-pill bg-${item.badge.variant} float-end`"
                  v-if="item.badge"
                  >{{ item.badge.text }}</span
                >
              </router-link>

              <ul v-if="hasItems(item)" class="sub-menu" aria-expanded="false">
                <li v-for="(subitem, index) of item.subItems" :key="index">
                  <router-link
                    :to="subitem.link"
                    v-if="!hasItems(subitem) && item.permiso"
                    class="side-nav-link-ref"
                    >{{ subitem.label }}</router-link
                  >
                  <a
                    v-if="hasItems(subitem) && item.permiso"
                    class="side-nav-link-a-ref has-arrow"
                    href="javascript:void(0);"
                    >{{ subitem.label }}</a
                  >
                  <ul
                    v-if="hasItems(subitem)"
                    class="sub-menu mm-collapse"
                    aria-expanded="false"
                  >
                    <li
                      v-for="(subSubitem, index) of subitem.subItems"
                      :key="index"
                    >
                      <router-link
                        :to="subSubitem.link"
                        class="side-nav-link-ref"
                        >{{ subSubitem.label }}</router-link
                      >
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </template>
        </ul>
      </div>
      <!-- Sidebar -->
    </simplebar>
  </div>
  <!-- Left Sidebar End -->
</template>
