<template>
  <div class="theAside__container">
    <section class="theAside__title">
      <h2>Menu</h2>
      <button class="button button-close" @click="close"></button>
    </section>
    <section class="theAside__body">
      <nav class="theAside__nav">
        <router-link
          v-for="category in categories"
          :key="category.slug"
          :to="{ name: 'Category', params: { category: category.slug } }"
          class="link link-navAside"
        >
          <span>{{ category.menu }}</span>
        </router-link>
      </nav>
      <button class="button button-navAside" @click="login">Login</button>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TheMobileMenu",
  computed: {
    ...mapState("category", ["categories"]),
  },
  methods: {
    close() {
      this.$emit("close");
    },
    login() {
      this.$emit("login");
    },
  },
};
</script>
