<template>
  <div
    @click="calculateSize"
    :class="'vue-scrollbar__wrapper' + (this.classes ? ' ' + this.classes : '')"
    ref="scrollWrapper"
    :style="this.styles"
  >
    <div
      :class="'vue-scrollbar__area' + (this.dragging ? ' ' : ' vue-scrollbar-transition')"
      ref="scrollArea"
      @wheel="scroll"
      @touchstart="startDrag"
      @touchmove="onDrag"
      @touchend="stopDrag"
      :style="{
        marginTop: this.top * -1 + 'px',
        marginLeft: this.left * -1 + 'px',
      }"
    >
      <slot></slot>

      <vertical-scrollbar
        v-if="ready"
        :area="{ height: scrollAreaHeight }"
        :wrapper="{ height: scrollWrapperHeight }"
        :scrolling="vMovement"
        :dragging-from-parent="dragging"
        :on-change-position="handleChangePosition"
        :on-dragging="handleScrollbarDragging"
        :on-stop-drag="handleScrollbarStopDrag"
      >
      </vertical-scrollbar>

      <horizontal-scrollbar
        v-if="ready"
        :area="{ width: scrollAreaWidth }"
        :wrapper="{ width: scrollWrapperWidth }"
        :scrolling="hMovement"
        :dragging-from-parent="dragging"
        :on-change-position="handleChangePosition"
        :on-dragging="handleScrollbarDragging"
        :on-stop-drag="handleScrollbarStopDrag"
      >
      </horizontal-scrollbar>
    </div>
  </div>
</template>

<script>
import VerticalScrollbar from "./AppScrollbarVertical";
import HorizontalScrollbar from "./AppScrollbarHorizontal";
export default {
  name: "AppScrollbar",
  props: {
    classes: String,
    styles: Object,
    speed: {
      type: Number,
      default: 53,
    },
    onMaxScroll: Function,
  },
  components: {
    VerticalScrollbar,
    HorizontalScrollbar,
  },
  data() {
    return {
      ready: false,
      top: 0,
      left: 0,
      scrollAreaHeight: null,
      scrollAreaWidth: null,
      scrollWrapperHeight: null,
      scrollWrapperWidth: null,
      vMovement: 0,
      hMovement: 0,
      dragging: false,
      start: { y: 0, x: 0 },
      allowBodyScroll: false,
    };
  },
  methods: {
    scroll(e) {
      this.calculateSize(() => {
        let num = this.speed;
        let shifted = e.shiftKey;
        let scrollY = e.deltaY > 0 ? num : -num;
        let scrollX = e.deltaX > 0 ? num : -num;
        if (shifted && e.deltaX == 0) scrollX = e.deltaY > 0 ? num : -num;
        let nextY = this.top + scrollY;
        let nextX = this.left + scrollX;
        let canScrollY = this.scrollAreaHeight > this.scrollWrapperHeight;
        let canScrollX = this.scrollAreaWidth > this.scrollWrapperWidth;
        if (canScrollY && !shifted) this.normalizeVertical(nextY);
        if (shifted && canScrollX) this.normalizeHorizontal(nextX);
      });
      if (!this.allowBodyScroll) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    startDrag(e) {
      this.touchEvent = e;
      const evt = e.changedTouches ? e.changedTouches[0] : e;
      this.calculateSize(() => {
        (this.dragging = true), (this.start = { y: evt.pageY, x: evt.pageX });
      });
    },
    onDrag(e) {
      if (this.dragging) {
        e.preventDefault();
        e.stopPropagation();

        if (this.touchEvent) {
          this.touchEvent.preventDefault();
          this.touchEvent.stopPropagation();
        }

        let evt = e.changedTouches ? e.changedTouches[0] : e;
        let yMovement = this.start.y - evt.clientY;
        let xMovement = this.start.x - evt.clientX;

        this.start = { y: evt.clientY, x: evt.clientX };

        let nextY = this.top + yMovement;
        let nextX = this.left + xMovement;
        this.normalizeVertical(nextY);
        this.normalizeHorizontal(nextX);
      }
    },
    stopDrag() {
      this.dragging = false;
      this.touchEvent = false;
    },
    scrollToY(y) {
      this.normalizeVertical(y);
    },
    scrollToX(x) {
      this.normalizeHorizontal(x);
    },
    normalizeVertical(next) {
      const elementSize = this.getSize();
      const lowerEnd = elementSize.scrollAreaHeight - elementSize.scrollWrapperHeight;
      const maxBottom = next > lowerEnd;
      if (maxBottom) next = lowerEnd;
      const maxTop = next < 0;
      if (maxTop) next = 0;
      const shouldScroll = this.top !== next;
      this.allowBodyScroll = !shouldScroll;
      if (shouldScroll) {
        (this.top = next), (this.vMovement = (next / elementSize.scrollAreaHeight) * 100);
        if (this.onMaxScroll && (maxTop || maxBottom)) {
          this.onMaxScroll({ top: maxTop, bottom: maxBottom, right: false, left: false });
        }
      }
    },
    normalizeHorizontal(next) {
      const elementSize = this.getSize();
      const rightEnd = elementSize.scrollAreaWidth - this.scrollWrapperWidth;
      const maxRight = next > rightEnd;
      if (maxRight) next = rightEnd;
      const maxLeft = next < 0;
      if (next < 0) next = 0;
      const shouldScroll = this.left !== next;
      this.allowBodyScroll = !shouldScroll;
      if (shouldScroll) {
        (this.left = next), (this.hMovement = (next / elementSize.scrollAreaWidth) * 100);
        if (this.onMaxScroll && (maxRight || maxLeft)) {
          this.onMaxScroll({ right: maxRight, left: maxLeft, top: false, bottom: false });
        }
      }
    },
    handleChangePosition(movement, orientation) {
      this.calculateSize(() => {
        let next = movement / 100;
        if (orientation === "vertical") this.normalizeVertical(next * this.scrollAreaHeight);
        if (orientation === "horizontal") this.normalizeHorizontal(next * this.scrollAreaWidth);
      });
    },
    handleScrollbarDragging() {
      this.dragging = true;
    },
    handleScrollbarStopDrag() {
      this.dragging = false;
    },
    getSize() {
      let $scrollArea = this.$refs.scrollArea;
      let $scrollWrapper = this.$refs.scrollWrapper;
      let elementSize = {
        scrollAreaHeight: 0,
        scrollAreaWidth: 0,
        scrollWrapperHeight: 0,
        scrollWrapperWidth: 0,
      };
      if ($scrollArea) {
        elementSize.scrollAreaHeight = $scrollArea.children[0].clientHeight;
        elementSize.scrollAreaWidth = $scrollArea.children[0].clientWidth;
        elementSize.scrollWrapperHeight = $scrollWrapper.clientHeight;
        elementSize.scrollWrapperWidth = $scrollWrapper.clientWidth;
      }

      return elementSize;
    },
    calculateSize(cb) {
      if (typeof cb !== "function") cb = null;
      let elementSize = this.getSize();
      if (
        elementSize.scrollWrapperHeight !== this.scrollWrapperHeight ||
        elementSize.scrollWrapperWidth !== this.scrollWrapperWidth ||
        elementSize.scrollAreaHeight !== this.scrollAreaHeight ||
        elementSize.scrollAreaWidth !== this.scrollAreaWidth
      ) {
        (this.scrollAreaHeight = elementSize.scrollAreaHeight),
          (this.scrollAreaWidth = elementSize.scrollAreaWidth),
          (this.scrollWrapperHeight = elementSize.scrollWrapperHeight),
          (this.scrollWrapperWidth = elementSize.scrollWrapperWidth),
          (this.ready = true);
        return cb ? cb() : false;
      } else return cb ? cb() : false;
    },
  },
  mounted() {
    this.calculateSize();
    window.addEventListener("resize", this.calculateSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.calculateSize);
  },
};
</script>

<style lang="stylus">
.vue-scrollbar-transition,
.vue-scrollbar__scrollbar-vertical,
.vue-scrollbar__scrollbar-horizontal
  transition: all 0.5s ease

.vue-scrollbar-transition--scrollbar
  transition opacity 0.5s linear

.vue-scrollbar__wrapper
  margin 0 auto
  overflow hidden
  position relative
  background white

.vue-scrollbar__wrapper:hover
  .vue-scrollbar__scrollbar-vertical,
  .vue-scrollbar__scrollbar-horizontal
    opacity 1

.vue-scrollbar__scrollbar-vertical,
.vue-scrollbar__scrollbar-horizontal
  opacity 0.5
  position absolute
  background transparent

.vue-scrollbar__scrollbar-vertical:hover,
.vue-scrollbar__scrollbar-horizontal:hover
  background rgba(0, 0, 0, 0.3)

.vue-scrollbar__scrollbar-vertical,
.vue-scrollbar__scrollbar-horizontal
  .scrollbar
    position relative
    background rgba(0, 0, 0, 0.5)
    cursor default

.vue-scrollbar__scrollbar-vertical
  width 10px
  height 100%
  top 0
  right 0

.vue-scrollbar__scrollbar-vertical
  .scrollbar
    width 10px

.vue-scrollbar__scrollbar-horizontal
  height 10px
  width 100%
  bottom 0
  right 0

.vue-scrollbar__scrollbar-horizontal
  .scrollbar
    height 10px
</style>
