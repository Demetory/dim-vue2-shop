<template>
  <div class="page-wrapper page-searchResult">
    <AppBreadcrumb :pageTitle="`Search Result`" />
    <h1 class="page__title" v-if="searchResult.length">Search</h1>
    <h1 class="page__title" v-else>Easy, Tiger.</h1>
    <p><input class="search__input" type="text" :value="query" @keydown.enter="search($event.target.value)" /></p>
    <h2 class="page__subtitle" v-if="searchResult.length">
      {{ searchResult.length }} Results found for &laquo;{{ query }}&raquo;
    </h2>
    <h2 class="page__subtitle" v-else>It looks like you wish something very strange. Try more specific things.</h2>
    <section class="viewport" v-if="searchResult.length">
      <template v-for="(product, index) in searchResult">
        <ProductPlate
          :product="product"
          :key="`product-${index}`"
          :inCart="getCartProductQuantityById(product.id)"
          class="column"
        />
      </template>
    </section>
    <section class="viewport viewport-empty" v-else>
      <img alt="Empty Category" src="@/assets/img/decorations/404.svg" />
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapState } from "vuex";
// Component: BreadCrumbs in the Site Title
import AppBreadcrumb from "@/components/common/AppBreadcrumb";
// Component: Product Card
import ProductPlate from "@/components/products/ProductPlate";

export default {
  name: "SearchResult",
  components: {
    AppBreadcrumb,
    ProductPlate,
  },
  props: {
    query: {
      type: String,
      required: true,
      default: "",
    },
  },
  created() {
    document.title = `Search Result for «${this.query}» — Demetory Shop`;
  },
  computed: {
    ...mapState("product", ["products"]),
    ...mapGetters("cart", ["getCartProductQuantityById"]),

    searchResult() {
      let result = [];

      if (this.query) {
        result = this.products.filter((product) => {
          return product.title.toLowerCase().includes(this.query.toLowerCase());
        });
      }
      return result;
    },
  },
  methods: {
    search(value) {
      if (this.query !== value) {
        this.$router.push({ name: "SearchResult", query: { q: value } });
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
// Stylus Global Variables
@import "../assets/css/variables.styl"
.page-wrapper
  flex none

.page__subtitle
  margin ($globalSitePadding/2) 0

.search__input
  box-sizing border-box
  padding 8px 16px
  width 100%
  line-height 22px
  border solid 1px $typoColorGrey
  font-size 22px
  font-weight 400
  outline 0

.viewport
  display flex
  flex-direction row
  flex-wrap wrap
  margin-bottom ($globalSitePadding/2)
  width calc(100% + 20px)

.column
  margin-bottom ($globalSitePadding/2)

@media screen and (max-width: 1024px)
  .column
    max-width calc(33.3333% - 20px)
    flex 0 1 33.3333%
    &:nth-child(4n)
      margin-right 20px

@media screen and (max-width: 800px)
  .column
    max-width calc(50% - 20px)
    flex 0 1 50%

@media screen and (max-width: 600px)
  main
    width 100%

@media screen and (max-width: 400px)
  .column
    max-width 100%
    flex 0 1 100%
    &:last-child
      margin-right 20px

.viewport-empty
  img
    width 20%
</style>
