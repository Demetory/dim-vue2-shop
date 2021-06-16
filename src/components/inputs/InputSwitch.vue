<template>
  <label class="switch">
    <i class="switch__label">{{ options.type[0].sign }}</i>
    <div class="switch__item">
      <input class="switch__input" type="checkbox" :checked="checked" @change="onChange($event.target.checked)" />
      <span class="switch__slider"></span>
    </div>
    <i class="switch__label">{{ options.type[1].sign }}</i>
  </label>
</template>

<script>
// @ is an alias to /src

export default {
  name: "InputSwitch",
  model: {
    prop: "checked",
    event: "change",
  },
  props: {
    options: {
      type: [Array, Object],
      required: true,
      default: () => {},
    },
  },
  mounted() {
    this.$emit("change", this.checked);
  },
  computed: {
    checked: function () {
      return this.options.defaultTypeId === this.options.type[1].id;
    },
  },
  methods: {
    onChange(value) {
      this.$emit("change", value);
    },
  },
};
</script>

<style lang="stylus" scoped>
// Stylus Global Variables
@import "../../assets/css/variables.styl"

// MSIE 10 and older compatible
.switch
  position relative
  display inline-flex
  height 34px
  justify-content center
  align-items center

// Label
.switch__label
  position relative
  display block
  color $typoColorWhite
  font-size $typoSizeLarge
  font-style normal
  font-weight 300
  &:first-child
    margin-right 12px
  &:last-child
    margin-left 12px

// Hiding Default Checkbox
.switch__input
  width 0
  height 0
  opacity 0

// Slider Container
.switch__item
  position relative
  display inline-flex
  width 60px
  height 100%

// Slider
.switch__slider
  box-sizing border-box
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  margin 0 auto
  width 60px
  cursor pointer
  background-color $typoColorWhite
  -webkit-transition $transitionLinkDuration
  transition $transitionLinkDuration
  outline 0
  &:before
    position absolute
    left 4px
    bottom 4px
    width 26px
    height 26px
    content " "
    background-color $typoColorRed
    -webkit-transition $transitionLinkDuration
    transition $transitionLinkDuration

.switch__input:checked + .switch__slider:before
  -webkit-transform translateX(26px)
  -ms-transform translateX(26px)
  transform translateX(26px)
</style>
