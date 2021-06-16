<template>
  <div class="page__breadcrumb">
    <router-link to="/" class="link link-redToBlack link-underline">Home</router-link>
    <span v-if="categoryTitle">/</span>
    <router-link
      v-if="categoryTitle"
      :to="{ name: 'Category', params: { category: $route.params.category } }"
      class="link link-redToBlack link-underline"
      >{{ categoryTitle }}</router-link
    >
    <span>/</span>
    {{ pageTitle }}
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "AppBreadcrumb",
  props: {
    categoryTitle: {
      type: String,
      required: false,
    },
    pageTitle: {
      type: String,
      required: true,
      default: "I am default Page Title",
    },
  },
};
</script>
