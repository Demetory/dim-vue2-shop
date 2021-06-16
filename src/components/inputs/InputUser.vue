<template>
  <p :class="['input__user', { 'input__user-focused': isFocused || isValue }]">
    <i class="icon icon-user">
      <svg x="0px" y="0px" viewBox="0 0 64 64" stroke-width="2" fill="transparent">
        <path
          d="M35 39.84v-2.53c3.3-1.91 6-6.66 6-11.41 0-7.63 0-13.82-9-13.82s-9 6.19-9 13.82c0 4.75 2.7 9.51 6 11.41v2.53c-10.18.85-18 6-18 12.16h42c0-6.19-7.82-11.31-18-12.16z"
        />
      </svg>
    </i>
    <label for="input-username">Login...</label>
    <input id="input-username" type="text" required @focus="isFocused = true" @blur="blurInput($event.target.value)" />
  </p>
</template>

<script>
// @ is an alias to /src

export default {
  name: "InputUser",
  data() {
    return {
      isFocused: false,
      isValue: false,
    };
  },
  methods: {
    blurInput(value) {
      this.isFocused = false;
      this.isValue = !(value === "" || value === null || !value.length);
    },
  },
};
</script>

<style lang="stylus" scoped>
// Stylus Global Variables
@import "../../assets/css/variables.styl"

.input__user
  margin 13px 0 0
  width 100%
  position relative
  display flex
  &:before
    width calc(100% - 36px)
    margin-left auto
    bottom 10px
    background-color $typoColorRed
    height 2px
    z-index 2
    opacity 0
    transform scaleX(.12)
    position absolute
    left 0
    right 0
    transition border .3s cubic-bezier(.4,0,.2,1), opacity .3s cubic-bezier(.4,0,.2,1), transform 0s cubic-bezier(.4,0,.2,1) .3s
    will-change border, opacity, transform
    content " "
  &:after
    width calc(100% - 36px)
    margin-left auto
    background-color $typoColorGrey
    bottom 10px
    height 1px
    position absolute
    right 0
    left 0
    z-index 1
    transition border .3s cubic-bezier(.4,0,.2,1), opacity .3s cubic-bezier(.4,0,.2,1), transform 0s cubic-bezier(.4,0,.2,1) .3s
    will-change border, opacity, transform
    content " "
  i
    z-index 3
    margin 6px 0
    position relative
    transition: .4s $transitionCubicBezier
    width 28px
    height 28px
    display inline-flex
    user-select none
    align-items center
    justify-content center
    vertical-align middle
    stroke $typoColorBlack
  input
    margin-left 12px
    height 32px
    padding 7px 0
    font-size $typoSizeSmall
    color $typoColorDark
    appearance none
    border none
    display block
    flex 1
    background-color transparent
    transition .4s $transitionCubicBezier
    transition-property font-size, padding-top, color
    line-height 32px
    outline 0
  label
    left 36px
    top 13px
    font-size $typoSizeSmall
    font-weight 400
    color $typoColorDark
    line-height 1.4
    position absolute
    pointer-events none
    transition .4s $transitionCubicBezier
    transition-duration .3s

.input__user-focused
  &:before
    opacity 1
    transform scale(1)
    transition .3s cubic-bezier(.4,0,.2,1)
    transition-property border, opacity, transform
  label
    font-size 12px
    top -7px
    opacity 1
    pointer-events auto
  i
    stroke $typoColorRed
</style>
