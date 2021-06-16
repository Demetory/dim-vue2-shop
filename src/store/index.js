import Vue from "vue";
import Vuex from "vuex";

import global from "./global";
import category from "./category";
import product from "./product";
import cart from "./cart";

Vue.use(Vuex);

export default function () {
  return new Vuex.Store({
    modules: {
      global,
      category,
      product,
      cart,
    },

    strict: false,
  });
}
