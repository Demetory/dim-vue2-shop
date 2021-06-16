import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import LazyLoadDirective from "@/directives/LazyLoadDirective";
import ClickOutsideDirective from "@/directives/ClickOutsideDirective";

Vue.config.productionTip = false;

Vue.directive("lazy-load", LazyLoadDirective);
Vue.directive("click-outside", ClickOutsideDirective);

Vue.filter("capitalize", (value = "") => value.toString().charAt(0).toUpperCase() + value.slice(1));
Vue.filter("isInvert", (value = "") => value.toString() === "White");
Vue.filter("pluralize", (amount, singular, plural = `${singular}s`) => (amount === 1 ? singular : plural));

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#Demetory");
