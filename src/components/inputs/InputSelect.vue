<template>
  <div class="selector">
    <label v-if="label" class="selector__label">
      {{ label }}
    </label>
    <div class="custom-select" :tabindex="tabindex" @blur="open = false">
      <div class="selected" :class="{ open: open }" @click="open = !open">
        {{ selected.label }}
      </div>
      <div class="items" :class="{ selectHide: !open }">
        <div v-for="(option, index) of options" :key="index" @click="selectOption(option)">
          {{ option.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "InputSelect",
  props: {
    label: {
      type: String,
      required: false,
    },
    options: {
      type: [Array, Object],
      required: true,
      default: () => [{ label: "Забытый option", value: null }],
    },
    default: {
      type: [Array, Object],
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  watch: {
    default: {
      deep: true,
      handler() {
        this.selected = this.default;
        this.$emit("input", this.selected);
      },
    },
  },
  data() {
    return {
      selected: this.default ? this.default : this.options.length > 0 ? this.options[0] : null,
      open: false,
    };
  },
  mounted() {
    this.$emit("input", this.selected);
  },
  methods: {
    selectOption(option) {
      this.selected = option;
      this.open = false;
      this.$emit("input", option);
    },
  },
};
</script>

<style lang="stylus" scoped>
// Stylus Global Variables
@import "../../assets/css/variables.styl"

.selector
  display flex
  flex-direction column
  flex 1

.custom-select
  position relative
  width 100%
  text-align left
  outline none
  font-size $typoSizeBase
  &:hover
    .selected
      border solid 1px $typoColorRed
      color $typoColorRed

  .selected
    display flex
    align-items center
    padding 12px 1.5em 12px 1em
    background-color $typoColorWhite
    color $typoColorRed
    border solid 1px $typoColorBlack
    cursor pointer
    user-select none
    transition all $transitionLinkDuration $transitionLinkEasing
    &:hover
      border solid 1px $typoColorRed
      color $typoColorDark
    &.open
      box-shadow 0 15px 15px rgba(125, 125, 125, .2)
      border solid 1px $typoColorRed
      color $typoColorDark
    &:after
      top calc(50% - 8px)
      right 1em
      width 8px
      height 8px
      position absolute
      content ""
      border-bottom solid 2px $typoColorRed
      border-right solid 2px $typoColorRed
      transform rotate(45deg)
      transform-origin center
      transition all $transitionLinkDuration $transitionLinkEasing
    &.open:after
      top calc(50% - 3px)
      transform rotate(-135deg)
      border-color $typoColorRed

  .items
    position absolute
    z-index 100
    overflow hidden
    left 0
    right 0
    border-radius 0
    color $typoColorBlack
    background-color $typoColorWhite
    border solid 1px $typoColorRed
    border-top none
    box-shadow 0 10px 10px rgba(125, 125, 125, .15)
    div
      padding 12px 1em
      cursor pointer
      user-select none
      transition background-color $transitionLinkDuration $transitionLinkEasing, color $transitionLinkDuration $transitionLinkEasing
      &:hover
        background-color $typoColorRed
        color $typoColorWhite

.selectHide
  display none

.selector__label
  display flex
  align-items center
  font-size 14px
  padding-bottom 4px
</style>
