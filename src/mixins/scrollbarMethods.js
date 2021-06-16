export const scrollbarMethods = {
  data() {
    return {
      scrollbarWidth: 0,
    };
  },
  mounted() {
    this.getScrollbarWidth();
  },
  methods: {
    getScrollbarWidth() {
      this.scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    },
    beforeEnter() {
      document.body.style.overflowY = "hidden";
      document.body.style.paddingRight = this.scrollbarWidth + "px";
    },
    afterLeave() {
      if (document.body.style.overflowY === "hidden") {
        document.body.style.paddingRight = "0px";
        document.body.style.overflowY = "scroll";
      }
    },
  },
};
