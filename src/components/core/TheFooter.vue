<template>
  <footer>
    <div class="page-wrapper">
      <div class="column">
        <router-link to="/" class="link link-whiteToRed link-logo">
          <AppFlipper :label="global.logo" :size="48" :imageFront="'logo-front.svg'" :imageBack="'logo-back.svg'" />
        </router-link>
        <p class="copyright">
          {{ currentYear }} &copy;
          <a
            :href="global.contacts.site.href"
            target="_blank"
            rel="noreferrer"
            class="link link-redToWhite link-underline"
          >
            {{ global.logo }}
          </a>
          Built on
          <a href="https://vuejs.org/" target="_blank" rel="noreferrer" class="link link-redToWhite link-underline">
            Vue.js
          </a>
        </p>
      </div>
      <div class="column" v-if="global.footer" v-html="global.footer"></div>
    </div>
  </footer>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import AppFlipper from "@/components/common/AppFlipper";

export default {
  name: "TheFooter",
  components: {
    AppFlipper,
  },
  computed: {
    ...mapState("global", ["global"]),

    // Get Current Year
    currentYear: function () {
      return new Date().getFullYear();
    },
  },
};
</script>
