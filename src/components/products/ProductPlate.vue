<template>
  <div class="product">
    <router-link
      :to="{ name: 'Product', params: { category: product.categorySlug, product: product.id } }"
      class="link link-product"
    >
      <AppImage
        v-if="product.cover"
        :alt="product.title"
        :source="`../products/${product.categorySlug}/${product.cover}`"
        class="product__image"
      />
      <span class="product__quantity" v-if="inCart">{{ inCart }} {{ inCart | pluralize("Item") }}</span>
      <h2 class="product__title">{{ product.title }}</h2>
      <ProductPrice :className="'product__price'" :price="product.price" />
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
// Component: Image LazyLoad
import AppImage from "@/components/common/AppImage";
// Component: Product Price calculations
import ProductPrice from "@/components/products/ProductPrice";

export default {
  name: "ProductPlate",
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
    inCart: {
      type: Number,
      required: false,
      default: 0,
    },
  },
};
</script>

<style lang="stylus">
// Stylus Global Variables
@import "../../assets/css/variables.styl"

// Product Plate
.product
  margin-right 20px
  max-width calc(25% - 20px)
  background-color $typoColorWhite
  transition border $transitionLinkDuration $transitionLinkEasing
  .link-product
    position relative
    box-sizing border-box
    display flex
    flex-direction column
    align-items flex-start
    justify-content flex-start
    width 100%
    height auto
    max-height 100%
    border solid 1px $typoColorGrey
    color $typoColorBlack !important
    .product__image
      display inline-flex
      height auto
      max-height 100%
      max-width 100%
    .product__quantity
      position absolute
      top 0
      left 0
      padding 12px 16px
      background-color rgba(255, 255, 255, .5)
    .product__title
      padding 8px 16px
      font-size $typoSizeLarge
      transition color $transitionLinkDuration $transitionLinkEasing
    .product__price
      margin 0
      padding 8px 16px 16px 16px
      color #5b5b53
    &:hover
      border solid 1px $typoColorRed
      .product__title
        color $typoColorRed
</style>
