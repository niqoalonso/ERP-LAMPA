<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import appConfig from "./app.config";
import { notificationMethods } from "./state/helpers";


export default {
  name: "app",
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === "function" ? title(this.$store) : title;
      return title ? `${title} | ${appConfig.title}` : appConfig.title;
    },
  },
  methods: {
    clearNotification: notificationMethods.clear,
  },
  watch: {
    /**
     * Clear the alert message on route change
     */
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      // clear alert on location change
      this.clearNotification();
    },
  },
  mounted() {
    // document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
  }
};
</script>
