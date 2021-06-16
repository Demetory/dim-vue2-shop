<template>
  <div class="cartWidgetItem">
    <div class="cartWidgetItem__image">
      <router-link :to="{ name: 'Product', params: { category: product.categorySlug, product: product.id } }">
        <AppImage
          v-if="product.cover"
          :alt="`Demetory — ${product.type} ${product.title}`"
          :source="`../../products/${product.categorySlug}/${product.cover}`"
          :invert="product.selectedParams.color | isInvert"
        />
      </router-link>
    </div>
    <div class="cartWidgetItem__info">
      <h2 class="cartWidgetItem__title">
        <router-link
          :to="{ name: 'Product', params: { category: product.categorySlug, product: product.id } }"
          class="link link-redToBlack link-underline"
        >
          {{ `${product.type} ${product.title}` }}
        </router-link>
      </h2>
      <div class="cartWidgetItem__params">
        <span v-for="param in product.selectedParams" :key="param">
          {{ param }}
        </span>
        <ProductPrice :className="'cartWidgetItem__price'" :price="product.price" />
      </div>
      <div class="cartWidgetItem__controls">
        <div class="cartWidgetItem__buttons">
          <button class="button button-qty" @click="cartDecrement">&larr;</button>
          <span class="cartWidgetItem__qty">{{ product.quantity }}</span>
          <button
            class="button button-qty"
            :class="{ 'button-disabled': ifIncrementDisabled }"
            :disabled="ifIncrementDisabled"
            @click="addToCart"
          >
            &rarr;
          </button>
        </div>
        <ProductPrice
          :className="'cartWidgetItem__subtotal'"
          :price="product.price"
          :quantity="product.quantity"
          :legend="{ text: 'Subtotal: ', position: 'left' }"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState } from "vuex";
// Component: Image LazyLoad
import AppImage from "@/components/common/AppImage";
// Component: Product Price calculations
import ProductPrice from "@/components/products/ProductPrice";

export default {
  name: "CartWidgetItem",
  components: {
    AppImage,
    ProductPrice,
  },
  props: {
    product: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  computed: {
    ...mapState("cart", ["maxAllowedProduct"]),

    // Boolean: If Product quantity more than allowed
    ifIncrementDisabled() {
      return this.product.quantity >= this.maxAllowedProduct;
    },
  },
  methods: {
    ...mapActions("cart", ["addProductToCart", "decrementProductInCart"]),

    cartDecrement() {
      this.decrementProductInCart(this.product);
    },
    addToCart() {
      this.addProductToCart(this.product);
    },
  },
};
</script>

<style lang="stylus">
@import "../../assets/css/variables.styl";

.cartWidgetItem
  display flex
  flex-wrap nowrap
  width 100%
  &:not(:first-child)
    padding-top 20px
  &:not(:last-child)
    padding-bottom 20px
    border-bottom solid 1px $typoColorGrey

.cartWidgetItem__image
  &:hover ~ .cartWidgetItem__info
    h2
      a
        color $typoColorBlack
        &::after
          opacity 1
          transform scale(1)
          transition $transitionFadeDuration $transitionCubicBezier
          transition-property opacity, transform


.cartWidgetItem__image
  display flex
  flex 0 0 20%
  a
    display block
    width 100%
  .image__wrapper
    min-height auto

.cartWidgetItem__info
  margin-left 8px
  display flex
  flex-direction column
  flex 1 1 80%

.cartWidgetItem__title
  margin-bottom 8px
  font-size $typeSizeNavi

.cartWidgetItem__params
  display flex
  flex-direction row
  flex-wrap nowrap
  margin-bottom 8px
  width 100%
  font-size $typeSizeSmall
  p
    margin-left auto
  span
    margin-right 8px

.cartWidgetItem__controls
  display flex
  flex-wrap nowrap
  padding-top 4px
  .cartWidgetItem__buttons
    display flex
    align-items center
    padding-top 8px
  .cartWidgetItem__subtotal
    margin-left auto
    padding-top 8px
    line-height 28px
    border-top solid 1px $typoColorGrey
  .cartWidgetItem__qty
    box-sizing border-box
    display flex
    align-items center
    justify-content center
    width 28px
    height 28px
    border-top solid 1px $typoColorBlack
    border-bottom solid 1px $typoColorBlack
</style>
