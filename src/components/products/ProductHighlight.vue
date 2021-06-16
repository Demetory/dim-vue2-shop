<template>
  <div :class="['highlight', `highlight-${width}`]">
    <router-link
      v-if="target !== '_blank'"
      :to="{ name: 'Category', params: { category: slug } }"
      :class="['highlight__link', `highlight__link-${animation}`]"
    >
      <slot name="content">This is the internal Highlight</slot>
    </router-link>
    <a
      v-if="target === '_blank'"
      :href="slug"
      target="_blank"
      :class="['highlight__link', `highlight__link-${animation}`]"
    >
      <slot name="content">This is the external Highlight</slot>
    </a>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "ProductHighlight",
  props: {
    // Width of the Highlight Block
    width: {
      type: String,
      required: true,
      default: "full",
    },
    // Link to Product/Category
    slug: {
      type: String,
      required: true,
      default: null,
    },
    // If the Link external or internal
    target: {
      type: String,
      required: true,
      default: "",
    },
    // Block Animation type
    animation: {
      type: String,
      required: true,
      default: null,
    },
  },
};
</script>
