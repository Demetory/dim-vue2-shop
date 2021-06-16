<template>
  <transition name="slide" v-on:before-enter="beforeEnter" v-on:after-leave="afterLeave">
    <aside class="theAside" @keydown.esc="close" tabindex="0" ref="theAside" v-click-outside="clickAway">
      <component :is="component" @close="close" @login="login" />
    </aside>
  </transition>
</template>

<script>
// @ is an alias to /src

// Component: Mobile Menu
import TheMobileMenu from "@/components/core/TheMobileMenu";
// Component: Cart Widget
import CartWidget from "@/components/cart/CartWidet";

// Mixin: Scrollbar Listeners and Methods
import { scrollbarMethods } from "@/mixins/scrollbarMethods";

export default {
  name: "TheAside",
  mixins: [scrollbarMethods],
  components: {
    TheMobileMenu,
    CartWidget,
  },
  props: {
    isVisible: {
      type: Boolean,
      require: true,
      default: false,
    },
    component: {
      type: String,
      require: true,
      default: "CartWidget",
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.close();
      },
    },
    isVisible: function (val) {
      if (val === true) {
        this.$refs.theAside.focus();
      }
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    login() {
      this.$emit("login");
    },
    clickAway(event) {
      if (
        !event.target.className ||
        (event.target.className &&
          !event.target.classList.contains("excluded") &&
          event.target.tagName !== "rect" &&
          event.target.tagName !== "path" &&
          event.target.tagName !== "svg")
      ) {
        this.$emit("close");
      }
    },
  },
};
</script>

<style lang="stylus">
@import "../../assets/css/variables.styl";

.theAside
  position fixed
  display flex
  flex-direction column
  top 0
  right 0
  width 25%
  min-width 380px
  height 100%
  background-color $typoColorWhite
  z-index 1000
  box-shadow 0 0 150px rgb(0 0 0 / 10%)
  outline 0

.theAside__container
  display flex
  flex-direction column
  width 100%
  height 100%

// Header
.theAside__title
  display flex
  flex-wrap nowrap
  flex 0 1 1
  align-items center
  padding 20px
  border-bottom solid 1px $typoColorGrey
  h2
    display flex
    font-size $typeSizePageSubTitle
    line-height $typeSizePageSubTitle
    text-transform uppercase
    font-weight 700
  span
    display flex
    margin-left 8px
    margin-top -8px
    font-size $typoSizeSmall
    line-height $typoSizeSmall
  button
    margin-left auto

// Body
.theAside__body
  display flex
  flex-direction column
  flex 1
  padding 0 20px
  .theAside__nav
    display flex
    flex-direction column
    margin 0 -20px
    align-items flex-start
  .my-scrollbar
    display flex
    position relative
    width 100%
    height 100%
  .scroll-me
    position absolute
    padding 20px 0
    width 100%
  .empty
    display flex
    flex 1
    align-items center
    justify-content center
    h3
      font-size $typoSizeLarge
      text-align center
      text-transform uppercase

// Footer
.theAside__foot
  display flex
  flex-direction column
  flex 0 1 1
  padding 20px
  border-top solid 1px $typoColorGrey
  p.subtotal
    display flex
    padding-bottom 16px
    font-size $typoSizeLarge
    text-transform uppercase
    font-weight 700
    span:last-child
      display flex
      margin-left auto
  p.legend
    padding-bottom 16px
    font-size $typoSizeSmall
</style>
