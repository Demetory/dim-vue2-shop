<template>
  <label :class="['radio', { active: checked }]">
    <input
      :id="value"
      :checked="checked"
      :value="value"
      :name="name"
      type="radio"
      @change="onChange($event.target.value)"
    />
    <span class="checkmark">{{ label }}</span>
  </label>
</template>

<script>
export default {
  name: "InputRadio",
  model: {
    prop: "modelValue",
    event: "change",
  },
  props: {
    label: {
      type: String,
      required: false,
      default: "",
    },
    name: {
      type: String,
      required: true,
      default: "",
    },
    value: {
      type: String,
      required: true,
      default: "",
    },
    default: {
      type: Boolean,
      required: true,
      default: false,
    },
    modelValue: {
      default: "",
    },
  },
  mounted() {
    if (this.default === true) {
      this.$emit("change", this.value);
    }
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler() {
        if (this.default === true) {
          this.$emit("change", this.value);
        }
      },
    },
    default: function () {
      if (this.default === true) {
        this.$emit("change", this.value);
      }
    },
  },
  computed: {
    checked() {
      return this.modelValue === this.value;
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

.radio
  position relative
  display flex
  user-select none
  input
    position absolute
    width 0
    height 0
    opacity 0
    cursor default
    &:checked
      ~ .checkmark
        background-color $typoColorRed
        color $typoColorWhite
        border solid 1px $typoColorRed
        cursor default
  .checkmark
    display flex
    margin-right 8px
    padding 12px 18px
    background-color transparent
    border solid 1px $typoColorDark
    font-size $typoSizeSmall
    cursor pointer
    transition all $transitionLinkDuration $transitionLinkEasing
    &:hover, &.active
      background-color $typoColorRed
      color $typoColorWhite
      border solid 1px $typoColorRed
    &.active
      cursor default
</style>
