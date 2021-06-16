<template>
  <div v-if="currentCategory" class="page-wrapper page-category">
    <AppBreadcrumb :pageTitle="currentCategory.label" />
    <h1 class="page__title">{{ currentCategory.label }}</h1>
    <div v-if="currentProducts.length" class="page__body">
      <aside v-if="siteWidth > 600">
        <section v-for="(filter, key, index) in getFilters" :key="`filter-${index}`" class="filter">
          <h3 class="filter__title">
            Filter by <span>{{ key | capitalize }}</span>
          </h3>
          <ul class="filter__body">
            <li v-for="(checkbox, index) in filter" :key="`checkbox-${key}-${index}`" class="filter__item">
              <InputCheckbox
                :name="checkbox"
                :label="checkbox"
                :label-position="'left'"
                v-model="filterByType[checkbox]"
              />
            </li>
          </ul>
        </section>
      </aside>
      <main>
        <section class="row filters">
          <div class="column">{{ currentProducts.length }} Products</div>
          <div class="column column-toLeft">
            <button :class="['button-sort', `button-sort-${sortByDirection}`]" @click="changeDirection">
              <svg x="0px" y="0px" width="29px" height="18px">
                <path
                  fill-rule="evenodd"
                  d="M0.000,4.000 L0.000,-0.000 L29.000,-0.000 L29.000,4.000 L0.000,4.000 ZM22.000,11.000 L0.000,11.000 L0.000,7.000 L22.000,7.000 L22.000,11.000 ZM14.500,18.000 L0.000,18.000 L0.000,14.000 L14.500,14.000 L14.500,18.000 Z"
                />
              </svg>
            </button>
          </div>
          <div class="column">
            <InputSelect
              :options="global.productsSort.selector"
              :default="sortByType"
              :tabindex="0"
              v-model="sortByType"
            />
          </div>
        </section>
        <section class="viewport">
          <template v-for="(product, index) in getFilteredProducts">
            <ProductPlate
              :product="product"
              :key="`product-${index}`"
              :inCart="getCartProductQuantityById(product.id)"
              class="column"
            />
          </template>
        </section>
        <section v-if="currentCategory.description" class="row">
          <p class="centered">
            {{ currentCategory.description }}
          </p>
        </section>
      </main>
    </div>
    <div v-else>
      <h2 class="page__subtitle">Strangely enough, but there is no products in this category.</h2>
      <p class="empty"><img alt="Empty Category" src="@/assets/img/decorations/404.svg" /></p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState, mapGetters } from "vuex";

// Mixin: Client Width Resize Listener
import { resizeListener } from "@/mixins/resizeListener";
// Mixin: Sorts Object
import { filterMethods } from "@/mixins/filterMethods";
// Component: BreadCrumbs in the Site Title
import AppBreadcrumb from "@/components/common/AppBreadcrumb";
// Component: Input Checkbox
import InputCheckbox from "@/components/inputs/InputCheckbox";
// Component: Select Dropdown
import InputSelect from "@/components/inputs/InputSelect";
// Component: Product Card
import ProductPlate from "@/components/products/ProductPlate";

export default {
  name: "Category",
  mixins: [resizeListener, filterMethods],
  components: {
    AppBreadcrumb,
    InputCheckbox,
    InputSelect,
    ProductPlate,
  },
  data() {
    return {
      filterByType: {},
      sortByType: {},
      sortByDirection: null,
      pageTitle: this.currentCategory,
    };
  },
  created() {
    // Set Current Category by Slug
    this.setCurrentCategory(this.$route.params.category);

    // Set Current Products by Category Slug
    this.setCurrentProducts(this.$route.params.category);

    if (!this.currentCategory) {
      this.$router.push({ name: "PageNotFound" });
    } else {
      document.title = `${this.currentCategory.label} — Demetory Shop`;
    }
  },
  mounted() {
    // Get Product Sort Direction
    if (localStorage.sortByDirection) {
      this.sortByDirection = localStorage.sortByDirection;
    } else {
      this.sortByDirection = this.getSortDirection;
    }

    // Get Product Sort Type
    if (localStorage.getItem("sortByType")) {
      try {
        this.sortByType = JSON.parse(localStorage.getItem("sortByType"));
      } catch (e) {
        localStorage.removeItem("sortByType");
      }
    } else {
      this.sortByType = this.getSortTypeById(this.global.productsSort.defaultSelectorId);
    }
  },
  watch: {
    sortByDirection(value) {
      localStorage.sortByDirection = value;
    },
    sortByType(value) {
      const newValue = JSON.stringify(value);
      localStorage.setItem("sortByType", newValue);
    },
  },
  computed: {
    ...mapState("global", ["global"]),
    ...mapState("category", ["currentCategory"]),
    ...mapState("product", ["currentProducts"]),
    ...mapGetters("cart", ["getCartProductQuantityById"]),
    ...mapGetters("global", ["getSortDirection", "getSortTypeById"]),

    getFilters() {
      const filters = {};

      this.currentProducts.forEach(({ params }) => {
        Object.entries(params).forEach(([key, array]) => {
          filters[key] = filters[key] || [];
          filters[key].push(...array);
        });
      });

      Object.keys(filters).forEach((key) => (filters[key] = [...new Set(filters[key])]));
      Object.entries(filters).forEach(([key, array]) => {
        if (key === "size") {
          array.sort((a, b) => (a > b ? -1 : 1));
        }
      });

      return filters;
    },
    getFilteredProducts() {
      let filteredProducts = [];

      Object.entries(this.filterByType).forEach(([filterKey, filterValue]) => {
        this.currentProducts.forEach((product) => {
          product.price = typeof product.price === "string" ? Number.parseFloat(product.price) : product.price;
          Object.entries(product.params).forEach((param) => {
            if (filterValue === true && param[1].includes(filterKey)) {
              filteredProducts.push(product);
            }
          });
        });
      });

      if (filteredProducts.length > 0) {
        filteredProducts = [...new Set(filteredProducts)];
      } else {
        filteredProducts = this.currentProducts;
      }

      return filteredProducts.sort(this.sortBy(this.sortByType.prop, this.sortByDirection));
    },
  },
  methods: {
    ...mapActions("category", ["setCurrentCategory"]),
    ...mapActions("product", ["setCurrentProducts"]),

    changeDirection() {
      if (this.sortByDirection === "asc") {
        this.sortByDirection = "desc";
      } else {
        this.sortByDirection = "asc";
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
// Stylus Global Variables
@import "../assets/css/variables.styl"

.page-category
  flex 0 0 auto

// Page Layout
.page__body
  display flex
  flex-direction row
  flex-wrap nowrap
  flex 0 0 auto

aside
  display flex
  flex-direction column
  flex 0 1 20%
  margin-right $globalSitePadding

main
  display flex
  flex-direction column
  width 80%

.row
  display flex
  flex-direction row
  flex-wrap nowrap
  align-items center

.column
  display flex
  box-sizing border-box
  flex 0 1 25%
  max-width calc(25% - 15px)
  margin-bottom 20px
  margin-right 20px
  &:last-child
    margin-right 0
  &.column-toLeft
    justify-content flex-end
  &:nth-child(4n)
    margin-right 0

.filters
  width calc(100% + 20px)
  .column:last-child
    margin-right 0

.viewport
  display flex
  flex-direction row
  flex-wrap wrap
  flex 0 0 auto
  margin-bottom ($globalSitePadding/2)
  width calc(100% + 20px)

@media screen and (max-width: 1024px)
  .filters
    width calc(100% + 20px)
    .column:last-child
      margin-right 20px
  .column
    max-width calc(33.3333% - 20px)
    flex 0 1 33.3333%
    &:nth-child(4n)
      margin-right 20px

@media screen and (max-width: 800px)
  .filters
    .column:first-child
    .column:nth-child(2)
      flex 0 1 auto
  .column
    max-width calc(50% - 20px)
    flex 0 1 50%

@media screen and (max-width: 600px)
  main
    width 100%

@media screen and (max-width: 400px)
  .filters
    .column:first-child
      display none
    .column:nth-child(2)
      justify-content flex-start
      flex 0 1 120px
  .column
    max-width 100%
    flex 0 1 100%
    &:last-child
      margin-right 20px

// Filters
.filter
  display flex
  flex-direction column
  margin-bottom 12px
  border-top solid 1px #ccc

.filter__title
  font-size 16px
  padding 12px 0 8px 0
  font-weight 600
  span
    &:first-letter
      color aquamarine
      text-transform uppercase

.filter__item
  margin 0
  padding 8px 0

// Additional Typo
p
  &.centered
    display inline-block
    width 100%
    text-align center
  &.empty
    margin $globalSitePadding 0
    img
      width 20%
      min-width 320px
      height auto
</style>
