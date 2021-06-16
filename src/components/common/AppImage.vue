<template>
  <figure v-lazy-load class="image__wrapper">
    <AppImageSpinner class="image__spinner" />
    <img class="image__item" :class="{ invert: invert }" :data-url="source" :src="source" :alt="alt" />
  </figure>
</template>

<script>
import AppImageSpinner from "@/components/common/AppImageSpinner";

export default {
  name: "AppImage",
  components: {
    AppImageSpinner,
  },
  props: {
    source: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: false,
      default: "Demetrey Shop",
    },
    invert: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="stylus" scoped>
.image__wrapper
  display flex
  margin 0
  padding 0
  justify-content center
  align-items center
  min-height 200px
  &.loaded
    .image__item
      visibility visible
      opacity 1
      border 0
    .image__spinner
      display none
      width 100%
  .image__item
    display flex
    width 100%
    height auto
    transition all 0.4s ease-in-out
    opacity 0
    visibility hidden
    &.invert
      filter invert(1)
</style>
