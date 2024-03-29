<template>
  <div>
    <div v-if="height < 100" class="vue-scrollbar__scrollbar-vertical" ref="container" @click="jump">
      <div
        :class="'scrollbar' + (dragging || draggingFromParent ? '' : ' vue-scrollbar-transition')"
        ref="scrollbar"
        @touchstart="startDrag"
        @mousedown="startDrag"
        :style="{
          height: height + '%',
          top: scrolling + '%',
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppScrollbarVertical",
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
      height: 0,
      dragging: false,
      start: 0,
    };
  },
  watch: {
    "wrapper.height"() {
      this.calculateSize(this);
    },
    "area.height"() {
      this.calculateSize(this);
    },
  },
  methods: {
    startDrag(e) {
      e.preventDefault();
      e.stopPropagation();
      e = e.changedTouches ? e.changedTouches[0] : e;
      (this.dragging = true), (this.start = e.clientY);
    },
    onDrag(e) {
      if (this.dragging) {
        this.onDragging();
        e.preventDefault();
        e.stopPropagation();
        e = e.changedTouches ? e.changedTouches[0] : e;
        let yMovement = e.clientY - this.start;
        let yMovementPercentage = (yMovement / this.wrapper.height) * 100;
        this.start = e.clientY;
        let next = this.scrolling + yMovementPercentage;
        this.onChangePosition(next, "vertical");
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
        let yMovement = e.clientY - position.top;
        let centerize = this.height / 2;
        let yMovementPercentage = (yMovement / this.wrapper.height) * 100 - centerize;
        this.start = e.clientY;
        let next = this.scrolling + yMovementPercentage;
        this.onChangePosition(next, "vertical");
      }
    },
    calculateSize(source) {
      this.height = (source.wrapper.height / source.area.height) * 100;
    },
    getSize() {
      let $scrollArea = this.$refs.container.parentElement;
      let $scrollWrapper = $scrollArea.parentElement;
      let elementSize = {
        scrollAreaHeight: $scrollArea.children[0].clientHeight,
        scrollAreaWidth: $scrollArea.children[0].clientWidth,
        scrollWrapperHeight: $scrollWrapper.clientHeight,
        scrollWrapperWidth: $scrollWrapper.clientWidth,
      };
      return elementSize;
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
