<template>
  <div>
    <div v-if="width < 100" class="vue-scrollbar__scrollbar-horizontal" ref="container" @click="jump">
      <div
        :class="'scrollbar' + (dragging || draggingFromParent ? '' : ' vue-scrollbar-transition')"
        ref="scrollbar"
        @touchstart="startDrag"
        @mousedown="startDrag"
        :style="{
          width: this.width + '%',
          left: this.scrolling + '%',
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppScrollbarHorizontal",
  props: {
    draggingFromParent: Boolean,
    scrolling: Number,
    wrapper: Object,
    area: Object,
    onChangePosition: Function,
    onDragging: Function,
    onStopDrag: Function,
  },
  data() {
    return {
      width: 0,
      dragging: false,
      start: 0,
    };
  },
  watch: {
    "wrapper.width"() {
      this.calculateSize(this);
    },
    "area.width"() {
      this.calculateSize(this);
    },
  },
  methods: {
    startDrag(e) {
      e.preventDefault();
      e.stopPropagation();
      e = e.changedTouches ? e.changedTouches[0] : e;
      this.dragging = true;
      this.start = e.clientX;
    },
    onDrag(e) {
      if (this.dragging) {
        this.onDragging();
        e.preventDefault();
        e.stopPropagation();
        e = e.changedTouches ? e.changedTouches[0] : e;
        let xMovement = e.clientX - this.start;
        let xMovementPercentage = (xMovement / this.wrapper.width) * 100;
        this.start = e.clientX;
        let next = this.scrolling + xMovementPercentage;
        this.onChangePosition(next, "horizontal");
      }
    },
    stopDrag() {
      if (this.dragging) {
        this.onStopDrag();
        this.dragging = false;
      }
    },
    jump(e) {
      let isContainer = e.target === this.$refs.container;
      if (isContainer) {
        let position = this.$refs.scrollbar.getBoundingClientRect();
        let xMovement = e.clientX - position.left;
        let centerize = this.width / 2;
        let xMovementPercentage = (xMovement / this.wrapper.width) * 100 - centerize;
        this.start = e.clientX;
        let next = this.scrolling + xMovementPercentage;
        this.onChangePosition(next, "horizontal");
      }
    },
    calculateSize(source) {
      this.width = (source.wrapper.width / source.area.width) * 100;
    },
  },
  mounted() {
    this.calculateSize(this);
    document.addEventListener("mousemove", this.onDrag);
    document.addEventListener("touchmove", this.onDrag);
    document.addEventListener("mouseup", this.stopDrag);
    document.addEventListener("touchend", this.stopDrag);
  },
  beforeDestroy() {
    document.removeEventListener("mousemove", this.onDrag);
    document.removeEventListener("touchmove", this.onDrag);
    document.removeEventListener("mouseup", this.stopDrag);
    document.removeEventListener("touchend", this.stopDrag);
  },
};
</script>
