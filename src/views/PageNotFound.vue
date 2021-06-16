<template>
  <div class="page-wrapper page-404">
    <AppBreadcrumb :pageTitle="'Page not Found'" />
    <h1 class="page__title">Easy, Tiger. It`s a 404 page.</h1>
    <h2 class="page__subtitle">Strangely enough, but what you are looking for is not there.</h2>
    <p><img alt="Empty Category" src="@/assets/img/decorations/404.svg" /></p>
  </div>
</template>

<script>
// @ is an alias to /src
import AppBreadcrumb from "@/components/common/AppBreadcrumb";

export default {
  name: "PageNotFound",
  components: {
    AppBreadcrumb,
  },
  created() {
    document.title = "Page Not Found — Demetory Shop";
  },
};
</script>

<style lang="stylus" scoped>
// Stylus Global Variables
@import "../assets/css/variables.styl"

p
  margin $globalSitePadding 0
  img
    width 20%
</style>
