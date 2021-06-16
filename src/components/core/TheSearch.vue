<template>
  <transition name="slide" @after-enter="afterEnter">
    <div class="search" @keydown.esc="close" :tabindex="0">
      <div class="page-wrapper">
        <svg class="icon-search" x="0px" y="0px" viewBox="0 0 64 64">
          <path
            stroke="#000"
            stroke-width="2"
            fill="#fff"
            d="M47.16 28.58A18.58 18.58 0 1 1 28.58 10a18.58 18.58 0 0 1 18.58 18.58zM54 54L41.94 42"
          />
        </svg>
        <input
          type="text"
          placeholder="Search"
          ref="searchField"
          class="search__input"
          @keydown.enter="search($event.target.value)"
          @blur="close"
          :tabindex="0"
        />
        <button class="button button-close" @click="close"></button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "TheSearch",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      opened: null,
    };
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler() {
        this.close();
      },
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    afterEnter() {
      this.$refs.searchField.focus();
    },
    search(value) {
      this.$router.push({ name: "SearchResult", query: { q: value } });
    },
  },
};
</script>

<style lang="stylus">
// Stylus Global Variables
@import "../../assets/css/variables.styl"

.search
  position absolute
  display flex
  flex-direction row
  top 0
  left 0
  padding-top 0
  padding-bottom 0
  width 100%
  height 100%
  background-color #fff
  outline 0
  .icon-search
    width 36px
    height 36px
  .btn-close
    margin-right 5px

.search__input
  box-sizing border-box
  padding 0 16px
  flex 1
  height 100%
  border none
  font-size 22px
  font-weight 400
  outline 0

.slide-enter-active
  animation slider .5s $transitionCubicBezier
.slide-leave-active
  animation slider .5s $transitionCubicBezier reverse

@keyframes slider
  0%
    left 100%
  100%
    left 0
</style>
