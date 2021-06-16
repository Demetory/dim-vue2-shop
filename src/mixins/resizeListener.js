export const resizeListener = {
  data() {
    return {
      siteWidth: 0, // Func: this.siteWidth(); Sense: gets Client Width
    };
  },
  created() {
    this.getSiteWidth();
  },
  mounted() {
    window.addEventListener("resize", this.getSiteWidth);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getSiteWidth);
  },
  methods: {
    getSiteWidth() {
      /*
        Vuex sets selected Currency by its Id
        Returns: nothing.
        Sets: this.siteWidth;
      */

      this.siteWidth = window.innerWidth;
    },
  },
};
