<template>
  <label :class="['checkbox', labelPosition]">
    <span v-if="label" :for="name">{{ label }}</span>
    <input :id="name" v-model="checked" :value="name" type="checkbox" @change="onChange" />
    <span class="checkmark" />
  </label>
</template>

<script>
export default {
  name: "InputCheckbox",
  props: {
    name: {
      type: String,
      required: true,
      default: "Option",
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
    labelPosition: {
      type: [Object, String],
      required: false,
      default: () => "left",
    },
    default: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      checked: this.default ? this.default : false,
    };
  },
  mounted() {
    this.$emit("input", this.checked);
  },
  watch: {
    default: {
      deep: true,
      handler() {
        this.checked = this.default;
        this.$emit("input", this.checked);
      },
    },
  },
  methods: {
    onChange() {
      this.$emit("input", this.checked);
    },
  },
};
</script>

<style lang="stylus" scoped>
// Stylus Global Variables
@import "../../assets/css/variables.styl"

.checkbox
  position relative
  display flex
  align-items center
  line-height $inputCheckboxSize
  cursor pointer
  font-size $typoSizeBase
  user-select none
  transition color $transitionFadeDuration $transitionLinkEasing
  &.left
    justify-content flex-start
    padding-left $globalSitePadding
    .checkmark
      left 0
  &.right
    justify-content flex-end
    padding-right $globalSitePadding
    .checkmark
      right 0
  input
    position absolute
    width 0
    height 0
    opacity 0
  &:hover
    color $typoColorRed

.checkmark
  position absolute
  box-sizing border-box
  display flex
  align-items center
  justify-content center
  top 0
  width $inputCheckboxSize
  height $inputCheckboxSize
  background-color $typoColorWhite
  border solid 1px $typoColorBlack
  transition background-color $transitionFadeDuration $transitionLinkEasing, border $transitionFadeDuration $transitionLinkEasing
  &:after
    position absolute
    display none
    content ""


.checkbox:hover input ~ .checkmark
  border solid 1px $typoColorRed

.checkbox input:checked ~ .checkmark
  background-color $typoColorRed
  border solid 1px $typoColorRed

.checkbox input:checked ~ .checkmark:after
  display flex

.checkbox .checkmark:after
  left calc(50% - 4px)
  top calc(50% - 8px)
  width 5px
  height 10px
  border solid $typoColorWhite
  border-width 0 3px 3px 0
  transform rotate(45deg)
</style>
