<template>
  <p :class="['input__email', { 'input__email-focused': isFocused || isValue }]">
    <i class="icon icon-email">
      <svg x="0px" y="0px" viewBox="0 0 512 512">
        <path
          d="m509.071 166.929-51.071-51.072v-105.857c0-5.523-4.478-10-10-10h-147.322c-5.522 0-10 4.477-10 10s4.478 10 10 10h137.322v203.857l-182.45 182.451-181.55-181.55v-204.758h136.678c5.522 0 10-4.477 10-10s-4.478-10-10-10h-146.678c-5.522 0-10 4.477-10 10v105.857l-51.071 51.072c-1.875 1.875-2.929 4.419-2.929 7.071v288c0 27.57 22.43 50 50 50h412c27.57 0 50-22.43 50-50v-288c0-2.652-1.054-5.196-2.929-7.071zm-17.071 295.071c0 4.625-1.054 9.009-2.932 12.926l-136.925-136.926 139.857-139.857zm-34-317.858 29.858 29.858-29.858 29.857zm-435.068 330.784c-1.878-3.917-2.932-8.3-2.932-12.926v-262.958l139.407 139.408zm31.068-270.169-30.308-30.307 30.308-30.308zm-4 287.243c-4.625 0-9.009-1.054-12.925-2.932l136.475-136.476 74.929 74.929c1.876 1.875 4.419 2.929 7.071 2.929s5.195-1.054 7.071-2.929l75.379-75.378 136.926 136.926c-3.917 1.878-8.3 2.932-12.926 2.932h-412z"
        />
        <path
          d="m255.68 20c2.63 0 5.21-1.07 7.07-2.93 1.859-1.86 2.93-4.44 2.93-7.07s-1.07-5.21-2.93-7.07-4.44-2.93-7.07-2.93c-2.64 0-5.21 1.07-7.07 2.93-1.859 1.86-2.93 4.44-2.93 7.07s1.07 5.21 2.93 7.07 4.43 2.93 7.07 2.93z"
        />
        <path
          d="m161.404 121.177c-13.567 24.651-17.136 53.07-10.047 80.021 6.14 23.346 19.396 43.486 38.338 58.243 18.237 14.209 40.954 22.385 63.964 23.021.095.003.188.004.281.004 5.395 0 9.841-4.297 9.991-9.724.152-5.52-4.199-10.12-9.72-10.272-39.181-1.083-73.521-28.371-83.513-66.358-12.033-45.753 13.879-92.842 58.991-107.203 22.886-7.286 47.181-5.14 68.409 6.04 21.186 11.157 36.675 29.907 43.631 52.808 4.431 16.734 2.994 32.247-4.794 51.831-2.221 5.583-9.116 18.57-25.156 18.57-2.537 0-5.104-1.176-7.229-3.311-2.85-2.864-4.472-6.908-4.451-11.144v-82.676c0-5.523-4.478-10-10-10-5.523 0-10 4.477-10 10v3.185c-7.806-6.507-17.502-10.222-28.365-10.222-25.256 0-51.38 21.895-51.38 58.535 0 16.149 5.118 31.274 14.411 42.588 9.42 11.471 22.512 18.049 35.917 18.049 12.565 0 23.883-5.548 32.5-14.798 1.734 3.93 4.157 7.54 7.191 10.589 5.906 5.935 13.508 9.204 21.406 9.204 23.108 0 37.746-16.106 43.74-31.179 9.4-23.637 11.095-43.54 5.492-64.534-.028-.104-.058-.208-.089-.311-8.492-28.14-27.494-51.182-53.505-64.88-26.005-13.696-55.764-16.325-83.795-7.402-26.558 8.455-48.654 26.682-62.218 51.326zm89.279 91.985c-16.723 0-30.328-18.23-30.328-40.638 0-24.121 15.955-38.535 31.38-38.535 16.619 0 28.226 15.722 28.226 38.232-.001 22.575-13.135 40.941-29.278 40.941z"
        />
      </svg>
    </i>
    <label for="input-subscribe">EMail...</label>
    <input
      id="input-subscribe"
      type="email"
      required
      @focus="isFocused = true"
      @blur="blurInput($event.target.value)"
    />
  </p>
</template>

<script>
// @ is an alias to /src

export default {
  name: "InputEmail",
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

.input__email
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
    width 24px
    height 24px
    display inline-flex
    user-select none
    align-items center
    justify-content center
    vertical-align middle
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

.input__email-focused
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
    fill $typoColorRed
</style>
