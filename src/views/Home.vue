<template>
  <div class="page-wrapper page-home">
    <ProductHighlight
      v-for="highlight in highlights"
      :key="highlight.id"
      :width="highlight.width"
      :slug="highlight.slug"
      :target="linkTarget(highlight.slug)"
      :animation="highlight.animation"
    >
      <template v-slot:content>
        <template v-if="highlight.animation === 'parallax'">
          <div
            v-for="(layer, index) in highlight.layers"
            :key="`layer-${index}`"
            :class="['parallax__layer', `parallax__layer-${index + 1}`]"
            :data-parallax-disallow="layer.disallow"
            :data-parallax-deep="layer.deep"
            :style="getBackground(layer.image)"
          >
            <h1><span v-html="layer.content"></span></h1>
          </div>
        </template>
        <template v-if="highlight.animation === 'zoom'">
          <div class="zoom-layer">
            <AppImage :alt="highlight.title" :source="`/products/highlights/${highlight.cover}`" />
            <h2>
              {{ highlight.title }}
              <span v-if="linkTarget(highlight.slug) === '_blank'"
                ><br />External Link <img alt="External Link" src="@/assets/img/icons/ico-export.svg"
              /></span>
            </h2>
          </div>
        </template>
      </template>
    </ProductHighlight>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";

import ProductHighlight from "@/components/products/ProductHighlight";
import AppImage from "@/components/common/AppImage";

export default {
  name: "Home",
  components: {
    ProductHighlight,
    AppImage,
  },
  computed: {
    ...mapState("category", ["highlights"]),
  },
  mounted() {
    this.setParallax();
  },
  methods: {
    setParallax(options) {
      /*
        Runs Parallax for the Highlight Block
        Returns: nothing.
        Sets: nothing.
      */

      options = options || {};

      const nameSpaces = {
        wrapper: options.wrapper || ".highlight__link-parallax",
        layers: options.layers || ".parallax__layer",
        deep: options.deep || "data-parallax-deep",
        disallow: options.disallow || "data-parallax-disallow",
      };

      if (document.getElementsByClassName("highlight__link-parallax").length) {
        launch();
      }

      function launch() {
        const parallaxWrappers = document.querySelectorAll(nameSpaces.wrapper);

        for (let index = 0; index < parallaxWrappers.length; index++) {
          (function (index) {
            parallaxWrappers[index].addEventListener("mousemove", function (e) {
              let x = e.clientX,
                y = e.clientY,
                layers = parallaxWrappers[index].querySelectorAll(nameSpaces.layers);

              for (let j = 0; j < layers.length; j++) {
                (function (j) {
                  let deep = layers[j].getAttribute(nameSpaces.deep),
                    disallow = layers[j].getAttribute(nameSpaces.disallow),
                    itemX = disallow && disallow === "x" ? 0 : x / deep,
                    itemY = disallow && disallow === "y" ? 0 : y / deep;
                  if (disallow && disallow === "both") return;
                  layers[j].style.transform = "translateX(" + itemX + "%) translateY(" + itemY + "%)";
                })(j);
              }
            });
          })(index);
        }
      } // launch();
    },
    getBackground(image) {
      /*
        Returns Background Image for the Parallax layer if exists
        Returns: String.
        Sets: nothing.
      */

      if (image) {
        return `background-image: url(/products/highlights/${image})`;
      }
    },
    linkTarget(slug) {
      /*
        Returns Target of the Slug, if the Link external or internal.
        Returns: String.
        Sets: nothing.
      */

      if (slug.indexOf("http://") === 0 || slug.indexOf("https://") === 0) {
        return "_blank";
      }
    },
  },
};
</script>

<style lang="stylus">
// Stylus Global Variables
@import "../assets/css/variables.styl"

.page-home
  position relative
  flex-direction row
  flex-wrap wrap

.highlight
  position relative
  display flex
  margin-bottom 20px
  margin-right 20px
  height auto
  &.highlight-full
    flex 1 1 100%
    margin-right 0
    height 420px
  &.highlight-half
    display inline-flex
    flex 1 1 auto
    width calc(50% - 20px)
    &:nth-child(3)
      margin-right 0
  &.highlight-fourth
    display inline-flex
    flex 1 1 auto
    width calc(25% - 20px)
    &:last-child
      margin-right 0

@media screen and (max-width: 1024px)
  .highlight
    &.highlight-full
      // height 360px
    &.highlight-half
      width 100%
      margin-right 0
    &.highlight-fourth
      width calc(50% - 20px)
      &:nth-child(odd)
        margin-right 0

@media screen and (max-width: 600px)
  .highlight
    &.highlight-full
      height 360px
      h1
        span
          font-size 36px
          line-height 42px !important
      .highlight__link
        h1
          padding 0 20px
          font-size 48px
    .highlight__link-zoom
      .zoom-layer
        h2
          &:hover
            font-size 20px

.highlight__link
  position relative
  display flex
  width 100%
  height 100%
  color $typoColorGrey
  transition color $transitionFadeDuration $transitionCubicBezier
  &:hover
    h1
      color #4294a2

.highlight__link-zoom
  position relative
  display flex
  width 100%
  height 100%
  overflow hidden
  .zoom-layer
    position relative
    height 100%
    width 100%
    transition all $transitionFadeDuration*4
    img
      display flex
      min-height 100%
      width auto
    h2
      opacity 0
      position absolute
      top 0
      left 0
      display flex
      flex-direction column
      align-items center
      justify-content center
      padding 0 20px
      width calc(100% - 40px)
      height 100%
      font-size 18px
      color $typoColorWhite
      text-align center
      transition all $transitionFadeDuration*2
      span
        display flex
        flex-direction row
        align-items center
        justify-content center
        font-size 14px
        height 14px
        line-height 14px
        font-weight 300
        img
          display flex
          margin-left 7px
          margin-top 10px
          width 14px
          height 14px
    &:before
      position absolute
      display flex
      opacity 0
      content ""
      height 100%
      width 100%
      background-color rgba(52,73,94,0.75)
      transition all $transitionFadeDuration
    &:hover
      transform scale(1.2)
      h2
        opacity 1
        font-size 36px
      &:before
        opacity 1

 .highlight__link-parallax
  position relative
  width 100%
  height 100%
  overflow hidden
  background-color #ebeef3
  .parallax__layer
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background-position center
    background-repeat no-repeat
    background-size contain
    h1
      display flex
      flex-grow 1
      flex-basis 0
      height 100%
      justify-content center
      text-align center
      align-items center
      font-size 72px
      color $typeColorDark
      transition color $transitionFadeDuration*4 $transitionCubicBezier
      flex-flow row wrap
      span
        position relative
        display block
        width 90%
        line-height 72px
    &.parallax__layer-1
      background-size cover
</style>
