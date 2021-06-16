<template>
  <transition name="fade" v-on:before-enter="beforeEnter" v-on:after-leave="afterLeave">
    <div class="modal-backdrop">
      <div class="modal" @keydown.esc="close" tabindex="0" ref="modal" v-click-outside="clickAway">
        <header class="modal-header">
          <slot name="header"> This is the default title! </slot>
          <button class="button button-close" @click="close"></button>
        </header>

        <section class="modal-body">
          <slot name="body"> This is the default body! </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
// @ is an alias to /src
// Mixin: Prevent Page from scrolling, Scrollbar methods
import { scrollbarMethods } from "@/mixins/scrollbarMethods";

export default {
  name: "AppModal",
  mixins: [scrollbarMethods],
  props: {
    isVisible: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  watch: {
    isVisible: function (val) {
      if (val === true) {
        this.$refs.modal.focus();
      }
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    clickAway(event) {
      if (event.target.className === "modal-backdrop") {
        this.$emit("close");
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
// Stylus Global Variables
@import "../../assets/css/variables.styl"

.modal-backdrop
  z-index 10000
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background-color rgba(0, 0, 0, 0.3)
  display flex
  justify-content center
  align-items center

.modal
  background $typoColorWhite
  box-shadow 2px 2px 20px rgba(0,0,0,0.3);
  overflow-x auto
  display flex
  flex-direction column
  outline 0

.modal-header,
.modal-footer
  padding 15px
  display flex

.modal-header
  position relative
  border-bottom 1px solid $typoColorGrey
  color $typoColorDark
  font-weight 600
  font-size $typoSizeLarge
  text-transform uppercase
  justify-content space-between
  align-items center

.btn-close
  margin-left 36px
  width 18px
  height 18px

.modal-footer
  border-top 1px solid $typoColorGrey
  flex-direction column
  justify-content flex-end

.modal-body
  position relative
  padding 15px
</style>
