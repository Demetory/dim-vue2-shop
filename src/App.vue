<template>
  <div id="Demetory" v-if="!isSiteBlocked">
    <TheHeader class="header-site" />
    <transition name="fade">
      <router-view :key="$route.fullPath" class="page"></router-view>
    </transition>
    <TheFooter class="footer-site" />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from "vuex";

import TheHeader from "@/components/core/TheHeader";
import TheFooter from "@/components/core/TheFooter";

export default {
  name: "Demetory",
  components: {
    TheHeader,
    TheFooter,
  },
  data() {
    return {
      isExplorer: false, // Func: this.detectIE(); Sense: MSIE detection
      isSiteBlocked: false, // Func: this.detectIE(); Sense: blocks App for MSIE 9 or older
    };
  },
  created() {
    this.detectIE(); // Detects the Browser
    this.showWelcomeMessage(); // Shows Welcome Message in Console
    this.getShoppingCart(); // Gets saved cart from localstorage
  },
  methods: {
    ...mapActions("cart", ["fillShoppingCart"]),

    getShoppingCart() {
      if (localStorage.getItem("shoppingCart")) {
        try {
          const savedCart = JSON.parse(localStorage.getItem("shoppingCart"));
          this.fillShoppingCart(savedCart);
        } catch (e) {
          localStorage.removeItem("shoppingCart");
        }
      }
    },

    showWelcomeMessage() {
      /*
        Shows Welcome Message in Browser Console.
        Returns: nothing.
        Sets: nothing.
      */

      this.isExplorer
        ? console.log("Upgrade your goddamn ancient browser, bro")
        : console.log(
            "%c ",
            "font-size: 1px; line-height: 36px; padding: 18px 160px; background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9ItCh0LvQvtC5XzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDUwIDQ4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA0NTAgNDgiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4Ii8+DQo8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMzAuMSw2TDMwLjEsNkg3Ljd2MzVoMjIuNGwwLDBjNy40LTAuMiwxMy4zLTgsMTMuMy0xNy41UzM3LjUsNi4yLDMwLjEsNnogTTI3LDMwLjhMMjcsMzAuOEwyNywzMC44aC0xLjENCgl2NC4zbC00LjMtNC4zaC0zLjFWMTUuOEgyN2wwLDBsMCwwYzIsMCwzLjcsMy40LDMuNyw3LjVDMzAuNywyNy41LDI5LDMwLjgsMjcsMzAuOHoiLz4NCjxnPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik02LjQsMjQuOWMwLjIsMC4yLDAuMywwLjUsMC4zLDAuOHYxLjFoLTN2LTEuMWMwLTAuMywwLjEtMC42LDAuMy0wLjhjMC4zLTAuMywwLjgtMC4zLDEuMi0wLjMNCgkJQzUuNiwyNC42LDYuMSwyNC42LDYuNCwyNC45eiBNNC4zLDI1LjNjLTAuMSwwLjEtMC4yLDAuMy0wLjIsMC41djAuNmgyLjJ2LTAuNmMwLTAuMi0wLjEtMC40LTAuMi0wLjVjLTAuMi0wLjEtMC41LTAuMi0wLjktMC4yDQoJCVM0LjQsMjUuMSw0LjMsMjUuM3oiLz4NCgk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNNi43LDI0aC0zVjIyaDAuNHYxLjVINXYtMS4zaDAuNHYxLjNoMC45VjIyaDAuNFYyNHoiLz4NCgk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNNi43LDE5LjJoLTJsMS41LDAuN3YwLjRMNC43LDIxaDJ2MC41aC0zVjIxbDEuOS0wLjlsLTEuOS0wLjh2LTAuNWgzVjE5LjJ6Ii8+DQoJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTYuNywxOGgtM3YtMS45aDAuNHYxLjVINXYtMS4zaDAuNHYxLjNoMC45di0xLjVoMC40VjE4eiIvPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik00LjEsMTQuNWgyLjZ2MC41SDQuMXYwLjhIMy42di0yLjFoMC40VjE0LjV6Ii8+DQoJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTYuNCwxMS41YzAuMiwwLjIsMC4zLDAuNSwwLjMsMC44YzAsMC4zLTAuMSwwLjYtMC4zLDAuOGMtMC4zLDAuMy0wLjYsMC4zLTEuMiwwLjNTNC4yLDEzLjMsNCwxMw0KCQljLTAuMi0wLjItMC4zLTAuNS0wLjMtMC44YzAtMC4zLDAuMS0wLjYsMC4zLTAuOGMwLjMtMC4zLDAuNi0wLjMsMS4yLTAuM1M2LjEsMTEuMSw2LjQsMTEuNXogTTQuMiwxMS44Yy0wLjEsMC4xLTAuMiwwLjMtMC4yLDAuNQ0KCQlzMC4xLDAuNCwwLjIsMC41YzAuMiwwLjEsMC4zLDAuMiwwLjksMC4yYzAuNiwwLDAuOCwwLDAuOS0wLjJjMC4xLTAuMSwwLjItMC4zLDAuMi0wLjVzLTAuMS0wLjQtMC4yLTAuNWMtMC4yLTAuMS0wLjMtMC4yLTAuOS0wLjINCgkJUzQuNCwxMS42LDQuMiwxMS44eiIvPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik02LjcsOC44TDUuNCw5LjVWMTBoMS4zdjAuNWgtM1Y5LjNjMC0wLjYsMC40LTAuOSwwLjktMC45QzUsOC40LDUuMyw4LjYsNS40LDlsMS4zLTAuN0w2LjcsOC44TDYuNyw4Ljh6DQoJCSBNNC4xLDkuNFYxMEg1VjkuNEM1LDksNC44LDguOCw0LjYsOC44UzQuMSw5LjEsNC4xLDkuNHoiLz4NCgk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNNS40LDYuOGgxLjJ2MC41SDUuNEwzLjcsOC4xVjcuNkw1LDdMMy43LDYuNFY1LjlMNS40LDYuOHoiLz4NCjwvZz4NCjxnPg0KCTxwYXRoIGQ9Ik02Mi41LDMxVjE0aDQuOGMxLjQsMCwyLjcsMC4zLDMuOCwxczIsMS41LDIuNiwyLjdzMC45LDIuNSwwLjksNC4xdjEuNmMwLDEuNS0wLjMsMi45LTAuOSw0LjFzLTEuNSwyLjEtMi42LDIuNw0KCQlzLTIuNCwxLTMuOSwxSDYyLjV6IE02My45LDE1LjJ2MTQuNmgzLjJjMS44LDAsMy4yLTAuNiw0LjMtMS44czEuNi0yLjgsMS42LTQuOHYtMS41YzAtMi0wLjUtMy41LTEuNi00LjdzLTIuNS0xLjgtNC4yLTEuOEg2My45eiINCgkJLz4NCgk8cGF0aCBkPSJNODIuOCwzMS4yYy0xLjEsMC0yLjEtMC4zLTIuOS0wLjhzLTEuNS0xLjMtMi0yLjJzLTAuNy0yLTAuNy0zLjJ2LTAuNWMwLTEuMiwwLjItMi4zLDAuNy0zLjNzMS4xLTEuNywyLTIuMw0KCQlzMS44LTAuOCwyLjctMC44YzEuNSwwLDIuOCwwLjUsMy43LDEuNnMxLjQsMi41LDEuNCw0LjN2MC44aC05VjI1YzAsMS40LDAuNCwyLjYsMS4yLDMuNnMxLjksMS40LDMuMSwxLjRjMC44LDAsMS40LTAuMSwyLTAuNA0KCQlzMS4xLTAuNywxLjYtMS4zbDAuOSwwLjdDODYuMiwzMC41LDg0LjcsMzEuMiw4Mi44LDMxLjJ6IE04Mi41LDE5LjNjLTEuMSwwLTEuOSwwLjQtMi43LDEuMnMtMS4yLDEuOC0xLjMsMy4xaDcuNnYtMC4yDQoJCWMwLTEuMi0wLjQtMi4yLTEtM1M4My42LDE5LjMsODIuNSwxOS4zeiIvPg0KCTxwYXRoIGQ9Ik05Ny44LDI3LjhjMC0wLjctMC4zLTEuMy0wLjgtMS43cy0xLjQtMC44LTIuNS0xcy0yLTAuNS0yLjYtMC44cy0xLjEtMC43LTEuNC0xLjFzLTAuNS0xLTAuNS0xLjZjMC0xLDAuNC0xLjgsMS4zLTIuNQ0KCQlzMS45LTEsMy4yLTFjMS40LDAsMi41LDAuMywzLjQsMXMxLjMsMS42LDEuMywyLjdoLTEuNGMwLTAuNy0wLjMtMS40LTAuOS0xLjlzLTEuNC0wLjctMi4zLTAuN2MtMC45LDAtMS43LDAuMi0yLjIsMC42DQoJCXMtMC44LDAuOS0wLjgsMS42YzAsMC42LDAuMiwxLjEsMC43LDEuNXMxLjMsMC43LDIuNSwxczIuMiwwLjYsMi44LDAuOXMxLjEsMC43LDEuNCwxLjJzMC40LDEsMC40LDEuN2MwLDEuMS0wLjQsMS45LTEuMywyLjYNCgkJcy0yLDEtMy40LDFjLTEuNSwwLTIuNy0wLjQtMy42LTEuMXMtMS40LTEuNi0xLjQtMi43SDkxYzAuMSwwLjgsMC40LDEuNSwxLDEuOXMxLjUsMC43LDIuNSwwLjdjMSwwLDEuOC0wLjIsMi40LTAuNg0KCQlTOTcuOCwyOC40LDk3LjgsMjcuOHoiLz4NCgk8cGF0aCBkPSJNMTAyLjMsMTQuN2MwLTAuMywwLjEtMC41LDAuMy0wLjdjMC4yLTAuMiwwLjQtMC4zLDAuNy0wLjNzMC41LDAuMSwwLjcsMC4zYzAuMiwwLjIsMC4zLDAuNCwwLjMsMC43cy0wLjEsMC41LTAuMywwLjcNCgkJYy0wLjIsMC4yLTAuNCwwLjMtMC43LDAuM3MtMC41LTAuMS0wLjctMC4zQzEwMi40LDE1LjIsMTAyLjMsMTQuOSwxMDIuMywxNC43eiBNMTA0LDMxaC0xLjRWMTguM2gxLjRWMzF6Ii8+DQoJPHBhdGggZD0iTTEwNy4yLDI0LjZjMC0yLDAuNC0zLjYsMS4zLTQuN3MyLjEtMS43LDMuNi0xLjdjMS43LDAsMywwLjcsMy45LDIuMWwwLjEtMS44aDEuM3YxMi40YzAsMS42LTAuNSwyLjktMS40LDMuOQ0KCQlzLTIuMiwxLjQtMy43LDEuNGMtMC45LDAtMS43LTAuMi0yLjUtMC42cy0xLjQtMC45LTEuOS0xLjZsMC44LTAuOGMxLDEuMiwyLjIsMS44LDMuNSwxLjhjMS4yLDAsMi4xLTAuMywyLjctMXMxLTEuNywxLTIuOXYtMS42DQoJCWMtMC45LDEuMy0yLjIsMS45LTMuOSwxLjljLTEuNSwwLTIuNi0wLjYtMy41LTEuOHMtMS4zLTIuOC0xLjMtNC43VjI0LjZ6IE0xMDguNiwyNC44YzAsMS42LDAuMywyLjksMSwzLjhzMS42LDEuNCwyLjcsMS40DQoJCWMxLjcsMCwyLjktMC44LDMuNy0yLjN2LTUuOWMtMC4zLTAuOC0wLjgtMS40LTEuNC0xLjlzLTEuNC0wLjYtMi4yLTAuNmMtMS4yLDAtMi4xLDAuNS0yLjgsMS40UzEwOC42LDIzLDEwOC42LDI0Ljh6Ii8+DQoJPHBhdGggZD0iTTEyMi40LDE4LjNsMCwyLjJjMC41LTAuOCwxLjEtMS40LDEuOC0xLjhzMS41LTAuNiwyLjQtMC42YzEuNCwwLDIuNCwwLjQsMywxLjFzMSwxLjksMSwzLjRWMzFoLTEuNHYtOC4zDQoJCWMwLTEuMS0wLjItMi0wLjctMi41cy0xLjItMC44LTIuMy0wLjhjLTAuOSwwLTEuNiwwLjMtMi4zLDAuOHMtMS4yLDEuMy0xLjUsMi4yVjMxaC0xLjRWMTguM0gxMjIuNHoiLz4NCgk8cGF0aCBkPSJNMTQyLjMsMTUuMXYzLjJoMi42djEuMWgtMi42djguNWMwLDAuNywwLjEsMS4yLDAuNCwxLjZjMC4zLDAuMywwLjcsMC41LDEuMywwLjVjMC4yLDAsMC42LDAsMS4xLTAuMWwwLjEsMS4xDQoJCWMtMC40LDAuMS0wLjksMC4yLTEuNSwwLjJjLTEsMC0xLjctMC4zLTIuMS0wLjhzLTAuNy0xLjQtMC43LTIuNXYtOC41aC0yLjN2LTEuMWgyLjN2LTMuMkgxNDIuM3oiLz4NCgk8cGF0aCBkPSJNMTQ5LjIsMjAuNWMwLjUtMC44LDEuMS0xLjMsMS44LTEuOHMxLjUtMC42LDIuNC0wLjZjMS40LDAsMi40LDAuNCwzLDEuMXMxLDEuOSwxLDMuNFYzMUgxNTZ2LTguM2MwLTEuMS0wLjItMi0wLjctMi41DQoJCXMtMS4yLTAuOC0yLjMtMC44Yy0wLjksMC0xLjYsMC4zLTIuMywwLjhzLTEuMiwxLjMtMS41LDIuMlYzMWgtMS40VjEzaDEuNFYyMC41eiIvPg0KCTxwYXRoIGQ9Ik0xNjUuOSwzMS4yYy0xLjEsMC0yLjEtMC4zLTIuOS0wLjhzLTEuNS0xLjMtMi0yLjJzLTAuNy0yLTAuNy0zLjJ2LTAuNWMwLTEuMiwwLjItMi4zLDAuNy0zLjNzMS4xLTEuNywyLTIuMw0KCQlzMS44LTAuOCwyLjctMC44YzEuNSwwLDIuOCwwLjUsMy43LDEuNnMxLjQsMi41LDEuNCw0LjN2MC44aC05VjI1YzAsMS40LDAuNCwyLjYsMS4yLDMuNnMxLjksMS40LDMuMSwxLjRjMC44LDAsMS40LTAuMSwyLTAuNA0KCQlzMS4xLTAuNywxLjYtMS4zbDAuOSwwLjdDMTY5LjQsMzAuNSwxNjcuOSwzMS4yLDE2NS45LDMxLjJ6IE0xNjUuNiwxOS4zYy0xLjEsMC0xLjksMC40LTIuNywxLjJzLTEuMiwxLjgtMS4zLDMuMWg3LjZ2LTAuMg0KCQljMC0xLjItMC40LTIuMi0xLTNTMTY2LjcsMTkuMywxNjUuNiwxOS4zeiIvPg0KCTxwYXRoIGQ9Ik0xODEsMjQuMVYzMWgtMS40VjE0aDUuOGMxLjgsMCwzLjIsMC41LDQuMiwxLjRzMS41LDIuMiwxLjUsMy43YzAsMS42LTAuNSwyLjgtMS41LDMuN3MtMi40LDEuMy00LjMsMS4zSDE4MXogTTE4MSwyMi44DQoJCWg0LjRjMS40LDAsMi41LTAuMywzLjItMXMxLjEtMS42LDEuMS0yLjhjMC0xLjItMC40LTIuMS0xLjEtMi44Yy0wLjctMC43LTEuOC0xLjEtMy4xLTEuMUgxODFWMjIuOHoiLz4NCgk8cGF0aCBkPSJNMTk1LjYsMzFoLTEuNFYxM2gxLjRWMzF6Ii8+DQoJPHBhdGggZD0iTTIwNy40LDMxYy0wLjEtMC40LTAuMi0xLTAuMy0xLjhjLTAuNSwwLjYtMS4xLDEuMS0xLjksMS41cy0xLjYsMC41LTIuNCwwLjVjLTEuMiwwLTIuMi0wLjMtMy0xcy0xLjEtMS41LTEuMS0yLjYNCgkJYzAtMS4yLDAuNS0yLjIsMS41LTIuOXMyLjUtMS4xLDQuMy0xLjFoMi41di0xLjRjMC0wLjktMC4zLTEuNi0wLjgtMi4xcy0xLjQtMC44LTIuNC0wLjhjLTEsMC0xLjgsMC4zLTIuNCwwLjhzLTEsMS4xLTEsMS44DQoJCWwtMS40LDBjMC0xLDAuNS0xLjksMS40LTIuNnMyLjEtMS4xLDMuNS0xLjFjMS40LDAsMi41LDAuNCwzLjMsMS4xczEuMiwxLjcsMS4zLDN2NmMwLDEuMiwwLjEsMi4xLDAuNCwyLjhWMzFIMjA3LjR6IE0yMDMsMzANCgkJYzAuOSwwLDEuOC0wLjIsMi41LTAuN3MxLjMtMS4xLDEuNi0xLjh2LTIuOGgtMi41Yy0xLjQsMC0yLjUsMC4zLTMuMywwLjhzLTEuMiwxLjItMS4yLDJjMCwwLjcsMC4zLDEuMywwLjgsMS44UzIwMi4xLDMwLDIwMywzMHoiDQoJCS8+DQoJPHBhdGggZD0iTTIxMy42LDE4LjNsMCwyLjJjMC41LTAuOCwxLjEtMS40LDEuOC0xLjhzMS41LTAuNiwyLjQtMC42YzEuNCwwLDIuNCwwLjQsMywxLjFzMSwxLjksMSwzLjRWMzFoLTEuNHYtOC4zDQoJCWMwLTEuMS0wLjItMi0wLjctMi41cy0xLjItMC44LTIuMy0wLjhjLTAuOSwwLTEuNiwwLjMtMi4zLDAuOHMtMS4yLDEuMy0xLjUsMi4yVjMxaC0xLjRWMTguM0gyMTMuNnoiLz4NCgk8cGF0aCBkPSJNMjMwLjMsMzEuMmMtMS4xLDAtMi4xLTAuMy0yLjktMC44cy0xLjUtMS4zLTItMi4yYy0wLjUtMC45LTAuNy0yLTAuNy0zLjJ2LTAuNWMwLTEuMiwwLjItMi4zLDAuNy0zLjMNCgkJYzAuNS0xLDEuMS0xLjcsMi0yLjNzMS44LTAuOCwyLjctMC44YzEuNSwwLDIuOCwwLjUsMy43LDEuNnMxLjQsMi41LDEuNCw0LjN2MC44aC05VjI1YzAsMS40LDAuNCwyLjYsMS4yLDMuNnMxLjksMS40LDMuMSwxLjQNCgkJYzAuOCwwLDEuNC0wLjEsMi0wLjRzMS4xLTAuNywxLjYtMS4zbDAuOSwwLjdDMjMzLjgsMzAuNSwyMzIuMywzMS4yLDIzMC4zLDMxLjJ6IE0yMzAuMSwxOS4zYy0xLjEsMC0xLjksMC40LTIuNywxLjINCgkJcy0xLjIsMS44LTEuMywzLjFoNy42di0wLjJjMC0xLjItMC40LTIuMi0xLTNTMjMxLjEsMTkuMywyMzAuMSwxOS4zeiIvPg0KCTxwYXRoIGQ9Ik0yNDAsMTUuMXYzLjJoMi42djEuMUgyNDB2OC41YzAsMC43LDAuMSwxLjIsMC40LDEuNmMwLjMsMC4zLDAuNywwLjUsMS4zLDAuNWMwLjIsMCwwLjYsMCwxLjEtMC4xbDAuMSwxLjENCgkJYy0wLjQsMC4xLTAuOSwwLjItMS41LDAuMmMtMSwwLTEuNy0wLjMtMi4xLTAuOHMtMC43LTEuNC0wLjctMi41di04LjVoLTIuM3YtMS4xaDIuM3YtMy4ySDI0MHoiLz4NCjwvZz4NCjxnPg0KCTxwYXRoIGQ9Ik0yNDYuOSwxMC42aC0xLjJ2My4zaC0wLjR2LTMuM2gtMS4ydi0wLjRoMi43VjEwLjZ6IE0yNTAuNSwxMC45bC0xLjEsM0gyNDlsLTEuMS0zLjF2My4xaC0wLjR2LTMuN2gwLjVsMS4yLDMuMWwxLjItMy4xDQoJCWgwLjV2My43aC0wLjRWMTAuOXoiLz4NCjwvZz4NCjwvc3ZnPg0K) center / contain no-repeat;",
            "\n(o )( o)   Сиськи, шпроты, рок-н-ролл™"
          );
    },
    detectIE() {
      /*
        Detects Browser and It`s Version.
        Blocks Website if MSIE 9 or older detects.
        Returns: nothing.
        Sets:
          this.isExplorer;
            Type: Number; Version Number if MISE detects;
            Type: Boolean; False for another Browsers
          this.isSiteBlocked;
            Type: Boolean; In case of MSIE 9 or older
      */

      const msie = () => {
        const ua = window.navigator.userAgent;

        // MSIE 10 or older => Returns Version Number
        const msie = ua.indexOf("MSIE ");
        if (msie > 0) {
          return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
        }

        // MSIE 11 => Returns Version Number
        const trident = ua.indexOf("Trident/");
        if (trident > 0) {
          const rv = ua.indexOf("rv:");
          return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
        }

        // Another Browser
        return false;
      };

      this.isExplorer = msie();
      this.isSiteBlocked = msie() && msie() < 10;
    },
  },
};
</script>

<style lang="stylus">
// Stylus Global Variables
@import "assets/css/variables.styl"

/* Typo Normalization */
h1, h2, h3, h4, h5, h6, p
  margin 0
  padding 0

address
  font-style normal

/* Inputs Normalization */
input, textarea, button
  margin 0
  padding 0
  font-family inherit
  outline 0
  user-select none
  -ms-user-select none

/* Lists Normalization */
menu, ul
  margin 0
  padding 0
  list-style-type none
  outline 0
  user-select none
  -ms-user-select none

// Helpers
[class$="-toLeft"]
  display flex
  margin-left auto

// Links
.router-link-exact-active
  cursor default

.link
  text-decoration none
  outline 0
  transition all $transitionLinkDuration $transitionLinkEasing

.link-logo
  display inline-flex
  align-self flex-start

.link-nav
  margin-right 18px
  font-size $typeSizeNavi
  font-weight 400
  text-transform uppercase

.link-navAside
  display flex
  padding 20px
  width 100%
  border-bottom solid 1px $typoColorGrey
  font-size $typeSizeNavi
  font-weight 400
  text-transform uppercase
  background-color $typoColorBlack
  color $typoColorWhite
  &.router-link-exact-active
    background-color $typoColorWhite
    color $typoColorBlack
  &:not(.router-link-exact-active):hover
    background-color $typoColorRed

.link-whiteToRed
  color $typoColorWhite
  &.router-link-exact-active:not(.link-logo),
  &:not(.router-link-exact-active):hover
    color $typoColorRed

.link-redToWhite
  color $typoColorRed
  &.router-link-exact-active,
  &:not(.router-link-exact-active):hover
    color $typoColorWhite

.link-redToBlack
  color $typoColorRed
  &.router-link-exact-active,
  &:not(.router-link-exact-active):hover
    color $typoColorBlack
  &.link-underline
    &::after
      background-color $typoColorRed

.link-offer
  display block
  padding 10px 0
  width 100%
  text-align center
  color $typoColorWhite
  background-color $typoColorRed
  transition all $transitionFadeDuration $transitionLinkEasing
  &:not(.router-link-exact-active):hover
    background-color $globalSiteBackground

.link-underline
  position relative
  &::after
    position absolute
    z-index 2
    bottom -2px
    right 0
    left 0
    display flex
    margin-left auto
    width 100%
    height 2px
    content " "
    background-color #fefefe
    opacity 0
    transform scaleX(.12)
    transition opacity $transitionFadeDuration $transitionCubicBezier, transform 0s $transitionCubicBezier $transitionFadeDuration
    will-change opacity, transform
  &.router-link-exact-active,
  &:hover
    &::after
      opacity 1
      transform scale(1)
      transition $transitionFadeDuration $transitionCubicBezier
      transition-property opacity, transform

.link-nowrap
  white-space nowrap

// Buttons
.button
  position relative
  border none
  background-color transparent
  cursor pointer

.button-close
  display flex
  width 36px
  height 36px
  &:before,&:after
    top calc(50% - 12px)
    left calc(50% - 2px)
    position absolute
    width 4px
    height 24px
    content ' '
    background-color $typoColorBlack
    transition background-color .25s ease-in-out
  &:before
    transform rotate(-45deg)
  &:after
    transform rotate(-135deg)
  &:hover
    &:before, &:after
      background-color $typoColorRed

.button-nav
  width 36px
  height 36px
  path, circle, rect
    transition all $transitionFadeDuration*2 $transitionCubicBezier
  &:hover
    path, circle, rect
      stroke $typoColorRed
    .icon-menu
      fill $typoColorRed

.button-navAside
  margin 0 -20px
  margin-top auto
  padding 20px
  border-bottom solid 1px $typoColorGrey
  font-size $typeSizeNavi
  font-weight 400
  text-transform uppercase
  background-color $typoColorBlack
  transition color $transitionLinkDuration $transitionLinkEasing, background-color $transitionLinkDuration $transitionLinkEasing
  color $typoColorWhite
  &.router-link-exact-active
    background-color $typoColorWhite
    color $typoColorBlack
  &:not(.router-link-exact-active):hover
    background-color $typoColorRed

.button-sort
  box-sizing border-box
  display flex
  padding 12px 6px
  font-size $typoSizeBase
  transition border $transitionLinkDuration $transitionLinkEasing
  border solid 1px $typoColorBlack
  cursor pointer
  background-color $typoColorWhite
  &.button-sort-desc
    svg
      transform scale(-1, 1)
  &.button-sort-asc
    svg
      transform scale(-1, -1)
  svg
    transition transform $transitionLinkDuration $transitionLinkEasing
    path
      fill $typoColorRed
      transition fill $transitionLinkDuration $transitionLinkEasing
  &:hover
    border solid 1px $typoColorRed
    svg
      path
        fill $typoColorBlack

.button-toCart
  display flex
  padding 12px 6px
  font-size $typoSizeBase
  transition color $transitionLinkDuration $transitionLinkEasing, background-color $transitionLinkDuration $transitionLinkEasing
  cursor pointer
  background-color $typoColorRed
  color $typoColorWhite
  justify-content center
  &:hover
    background-color $typoColorBlack

.button-increment,
.button-decrement
  display flex
  padding 12px 18px
  font-size $typoSizeBase
  transition color $transitionLinkDuration $transitionLinkEasing, background-color $transitionLinkDuration $transitionLinkEasing
  cursor pointer
  background-color $typoColorRed
  color $typoColorWhite
  justify-content center
  &:hover
    background-color $typoColorBlack

.button-qty
  display flex
  width 28px
  height 28px
  transition color $transitionLinkDuration $transitionLinkEasing, background-color $transitionLinkDuration $transitionLinkEasing
  background-color $typoColorRed
  color $typoColorWhite
  align-items center
  justify-content center
  &:hover
    background-color $typoColorBlack

.button-disabled
  background-color $typoColorGrey
  cursor default
  &:hover
    background-color $typoColorGrey



// Core Layout
html,
body
  margin 0
  padding 0

html
  min-height 100vh

body
  display flex
  flex-direction column
  min-height 100vh
  font-family 'Roboto Condensed', sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color $typoColorBlack
  background-color $typoColorWhite
  overflow-y scroll
  -ms-overflow-y scroll
  overflow-x hidden
  -ms-overflow-x hidden

#Demetory
  display flex
  flex-direction column
  min-height 100vh

.header-site,
.footer-site
  display flex
  flex-direction column
  flex 0 0 auto
  background-color $globalSiteBackground

.page
  display flex
  flex-direction column
  padding-top $globalSitePadding
  padding-bottom $globalSitePadding
  flex 1 0 auto

.page-wrapper
  display flex
  flex-direction column
  margin 0 auto
  padding-left $globalSitePadding
  padding-right $globalSitePadding
  width "calc(100% - %s)" % ($globalSitePadding*2)
  max-width $globalSiteWidth

@media screen and (max-width: 800px)
  .page-wrapper
    padding-left ($globalSitePadding / 2)
    padding-right ($globalSitePadding / 2)
    width "calc(100% - %s)" % ($globalSitePadding)
  .page
    padding-top ($globalSitePadding / 2)
    padding-bottom ($globalSitePadding / 2)

// Header
.header-site
  .page-wrapper
    display flex
    flex-direction row
    align-items center
  .header-lineUp
    font-weight 300
    font-size $typoSizeSmall
    border-bottom solid 1px $typoColorDark
    a
      margin-top 7px
      margin-bottom 7px
      margin-right 18px
    a:last-child
      margin-right 0
  .header-lineDown
    position relative
    padding 8px 0
    .button:not(:last-child)
      margin-right 24px
  .header-lineOffer
    border-top solid 1px $typoColorDark

.header-site
  nav
    display inline-flex
    flex-direction row
    flex 1 1 auto
    align-items center
    .link-logo
      align-self center
    .nav-categories
      display inline-flex
      flex 1 1 auto
      flex-direction row
      flex-wrap wrap
      a
        display block
  menu
    display inline-flex
    flex-direction row
    align-items center

@media screen and (max-width: 1024px)
  .header-site
    nav
      .nav-categories
        margin-left 20px
        a
          line-height 30px

// Footer
.footer-site
  padding-top $globalSitePadding
  padding-bottom $globalSitePadding
  color $typoColorWhite
  font-weight 300
  font-size $typoSizeSmall
  .page-wrapper
    flex-direction row
    .column
      display flex
      flex-direction column
      flex 1
      &:first-child
        margin-right $globalSitePadding
      p:not(:last-child)
        margin-bottom 8px
      p.copyright
        margin-top auto
      a:first-child
        margin-right 12px

@media screen and (max-width: 600px)
  .footer-site
    flex 0 1 auto
    .page-wrapper
      flex-wrap wrap
      flex 0 1 auto
      flex-direction column
      .column
        flex 0 0 auto
        p.copyright
          margin ($globalSitePadding/2) 0 $globalSitePadding

// Page
.page__breadcrumb
  margin-bottom ($globalSitePadding/2)
  span
    margin-left 4px
  span ~ a
    margin-left 4px

.page__title
  margin-bottom ($globalSitePadding/2)
  font-size $typeSizePageTitle
  font-weight 700

.page__subtitle
  font-size $typeSizePageSubTitle
  font-weight 700

// Page Transition
.fade-enter-active,
.fade-leave-active
  transition-property opacity
  transition-duration $transitionFadeDuration

.fade-enter-active
  transition-delay $transitionFadeDuration

.fade-enter,
.fade-leave-active
  opacity 0

// Aside Transition
.slide-enter-active
  animation slider .5s cubic-bezier(.25,.8,.25,1)
.slide-leave-active
  animation slider .5s cubic-bezier(.25,.8,.25,1) reverse

@keyframes slider
  0%
    right -25%
  100%
    right 0
</style>
