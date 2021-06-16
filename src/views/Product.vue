<template>
  <div v-if="currentProduct" class="page-wrapper page-product">
    <div class="column column-left">
      <AppImage
        v-if="currentProduct.cover"
        :alt="`Demetory — ${productFullTitle}`"
        :source="productImagePath"
        :invert="selectedParams.color | isInvert"
      />
    </div>
    <article class="column column-right">
      <AppBreadcrumb :pageTitle="productFullTitle" :categoryTitle="currentCategory.menu" />
      <h1 class="page__title">{{ productFullTitle }}</h1>
      <ProductPrice
        :className="'price'"
        :price="currentProduct.price"
        :legend="{ text: '— Tax not included', position: 'right' }"
      />
      <div class="selectors">
        <div class="selector" v-for="(param, key) in currentProduct.params" :key="`param-${key}`">
          <p class="selector__title">{{ key | capitalize }}</p>
          <p class="selector__body">
            <InputRadio
              v-for="(button, index) in param"
              v-model="selectedParams[key]"
              :label="button"
              :value="button"
              :key="`radio-${button}`"
              :default="index === 0"
              :name="key"
            />
          </p>
        </div>
      </div>
      <div class="addingToCart">
        <template v-if="!getCartProductById(currentProduct.id)">
          <button class="button button-toCart" @click="addToCart">Add to Cart</button>
        </template>
        <template v-else>
          <button class="button button-decrement" @click="cartDecrement">Remove Item</button>
          <span>
            {{ getCartProductQuantityById(currentProduct.id) }}
            {{ getCartProductById(currentProduct.id).quantity | pluralize("Item") }}
            in Cart
          </span>
          <button
            class="button button-increment"
            :class="{ 'button-disabled': ifIncrementDisabled }"
            @click="addToCart"
            :disabled="ifIncrementDisabled"
          >
            Add Item
          </button>
        </template>
      </div>
      <p class="notification">
        There is no product with params you want to have to?
        <a href="javascript:void 0" @click="showModal" class="link link-underline link-redToBlack link-nowrap">
          Get notified when it comes in stock!
        </a>
      </p>
      <div class="description" v-html="currentProduct.desc"></div>
    </article>

    <AppModal v-show="isModalVisible" @close="closeModal" :isVisible="isModalVisible">
      <template v-slot:header>Do you love Spam? Me too.</template>
      <template v-slot:body>
        <p>Sorry, Buddy, but subscription temporarily is not available.</p>
        <InputEmail />
      </template>
      <template v-slot:footer>
        <button type="button" class="button button-toCart button-disabled" disabled @click="closeModal">
          Subscribe
        </button>
      </template>
    </AppModal>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters, mapState } from "vuex";
// Mixin: Sorts Object
import { filterMethods } from "@/mixins/filterMethods";
// Component: BreadCrumbs in the Site Title
import AppBreadcrumb from "@/components/common/AppBreadcrumb";
// Component: Modal Window
import AppModal from "@/components/common/AppModal";
import { AppModalMixin } from "@/components/common/AppModalMixin";
// Component: Image LazyLoad
import AppImage from "@/components/common/AppImage";
// Component: Input Email
import InputEmail from "@/components/inputs/InputEmail";
// Component: Input Radiobutton for Product Params
import InputRadio from "@/components/inputs/InputRadio";
// Component: Product Price calculations
import ProductPrice from "@/components/products/ProductPrice";

export default {
  name: "Product",
  mixins: [filterMethods, AppModalMixin],
  components: {
    AppBreadcrumb,
    AppModal,
    AppImage,
    InputEmail,
    InputRadio,
    ProductPrice,
  },
  data() {
    return {
      selectedParams: {}, // Object: Selected parameters
    };
  },
  created() {
    // Set Current Category by Slug
    this.setCurrentCategory(this.$route.params.category);

    // Set Current Product
    this.setCurrentProduct({ category: this.$route.params.category, product: this.$route.params.product });

    if (!this.currentProduct) {
      this.$router.push({ name: "PageNotFound" });
    } else {
      document.title = `${this.productFullTitle} — Demetory Shop`;
    }
  },
  computed: {
    ...mapState("category", ["currentCategory"]),
    ...mapState("product", ["currentProduct"]),
    ...mapState("cart", ["maxAllowedProduct"]),
    ...mapGetters("cart", ["getCartProductById", "getCartProductQuantityById"]),

    // String: Returns Product Title
    productFullTitle() {
      return `${this.currentProduct.type} ${this.currentProduct.title}`;
    },

    // Boolean: If Product quantity more than allowed
    ifIncrementDisabled() {
      return this.getCartProductById(this.currentProduct.id).quantity >= this.maxAllowedProduct;
    },

    // String: Returns Product Image Path
    productImagePath() {
      return `../../products/${this.currentProduct.categorySlug}/${this.currentProduct.cover}`;
    },
  },
  watch: {
    selectedParams: {
      deep: true,
      handler() {
        this.currentProduct.selectedParams = this.selectedParams;
      },
    },
  },
  methods: {
    ...mapActions("category", ["setCurrentCategory"]),
    ...mapActions("product", ["setCurrentProduct"]),
    ...mapActions("cart", ["addProductToCart", "decrementProductInCart"]),

    cartDecrement() {
      this.decrementProductInCart(this.currentProduct);
    },
    addToCart() {
      this.addProductToCart(this.currentProduct);
    },
  },
};
</script>

<style lang="stylus">
// Stylus Global Variables
@import "../assets/css/variables.styl"

.page-product
  flex-direction row
  .column
    display flex
    flex-direction column
    flex 0 1 50%
    &.column-left
      margin-right $globalSitePadding

@media screen and (max-width: 800px)
  .page-product
    flex-direction column
    flex 0 0 auto
    .column
      flex 0 0 auto
      width 100%
      &.column-left
        margin-right 0
        order 2

.page-product
  .selectors
    display flex
    flex-wrap wrap
    flex-direction row
    .selector
      display flex
      flex-direction column
      flex 1 1 auto
      padding-top 32px
    .selector__title
      padding-bottom 8px
    .selector__body
      display flex

.page-product
  .description
    display flex
    flex-direction column
    p
      padding-bottom 16px
    ul
      margin-bottom 8px
      list-style-type square
    li
      margin-left 16px
      margin-bottom 8px
      font-weight 700

.page-product
  p.notification
    margin-bottom 16px
    padding 16px 0
    border-bottom solid 1px $typoColorGrey
    button
      margin-bottom 16px
      width 100%

.addingToCart
  display flex
  flex-direction row
  flex-wrap nowrap
  margin-top 16px
  width 100%
  .button-toCart
    width 100%
  .button-decrement,
  .button-increment,
  span
    display block
    flex 1
    align-items center
    justify-content center
    text-align center
  span
    padding 12px 18px
    border-top solid 1px $typoColorBlack
    border-bottom solid 1px $typoColorBlack
</style>
