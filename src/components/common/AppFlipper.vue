<template>
  <div class="flip-container">
    <div class="flipper" :style="'width:' + size + 'px; height: ' + size + 'px'">
      <div class="flipper__side flipper__side-back">
        <img :alt="title" :src="require('@/assets/img/decorations/' + imageFront)" />
      </div>
      <div class="flipper__side flipper__side-front">
        <img :alt="title" :src="require('@/assets/img/decorations/' + imageBack)" />
      </div>
    </div>
    <p v-if="title" class="flipper__label">{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: "AppFlipper",
  props: {
    label: {
      type: String,
      required: false,
      default: "",
    },
    size: {
      type: Number,
      required: false,
      default: 48,
    },
    imageFront: {
      type: String,
      required: true,
    },
    imageBack: {
      type: String,
      required: true,
    },
  },
  computed: {
    // Get Logo Title if available
    title: function () {
      return !this.label ? false : this.label;
    },
  },
};
</script>

<style lang="stylus" scoped>
// MSIE 10 and older compatible
.flip-container
  display flex
  flex-direction row
  align-items center
  justify-content flex-start

.flipper
  position relative

.flipper__side
  position absolute
  left 0
  top 0
  width 100%
  height 100%
  -webkit-transition .5s ease-in-out
  -moz-transition .5s ease-in-out
  transition .5s ease-in-out
  -moz-backface-visibility hidden
  -webkit-backface-visibility hidden
  backface-visibility hidden
  img
    width 100%
    height 100%
  &.flipper__side-back
    -moz-transform perspective(800px) rotateY(180deg)
    -webkit-transform perspective(800px) rotateY(180deg)
    transform perspective(800px) rotateY(180deg)
  &.flipper__side-front
    -moz-transform perspective(800px) rotateY(0deg)
    -webkit-transform perspective(800px) rotateY(0deg)
    transform perspective(800px) rotateY(0deg)

a:not(.router-link-exact-active):hover
  .flipper__side-back
    -moz-transform perspective(800px) rotateY(0)
    -webkit-transform perspective(800px) rotateY(0)
    transform perspective(800px) rotateY(0)
  .flipper__side-front
    -webkit-transform perspective(800px) rotateY(-179.9deg)
    -moz-transform perspective(800px) rotateY(-179.9deg)
    transform perspective(800px) rotateY(-179.9deg)

.flipper__label
  padding 0 16px
  text-transform uppercase
  font-weight 700
  font-size 22px
</style>
