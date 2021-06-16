import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/category/:category",
    name: "Category",
    component: () => import(/* webpackChunkName: "Category" */ "../views/Category.vue"),
  },
  {
    path: "/category/:category/:product",
    name: "Product",
    component: () => import(/* webpackChunkName: "Product" */ "../views/Product.vue"),
  },
  {
    path: "/search",
    name: "SearchResult",
    component: () => import(/* webpackChunkName: "SearchResult" */ "../views/SearchResult.vue"),
    props: (route) => ({ query: route.query.q }),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "PageNotFound",
    component: () => import(/* webpackChunkName: "PageNotFound" */ "../views/PageNotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
