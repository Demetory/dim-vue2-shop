<template>
  <div class="theAside__container">
    <section class="theAside__title">
      <h2>Cart</h2>
      <span v-if="shoppingCart.length">{{ getCartItemsLength }} Items</span>
      <button class="button button-close" @click="close"></button>
    </section>
    <section class="theAside__body">
      <AppScrollbar v-if="shoppingCart.length" class="my-scrollbar" ref="Scrollbar">
        <div class="scroll-me">
          <CartWidgetItem v-for="(product, index) in shoppingCart" :product="product" :key="`product-${index}`" />
        </div>
      </AppScrollbar>
      <div v-else class="empty">
        <h3>Cart is still empty.<br />Add something, Buddy.</h3>
      </div>
    </section>
    <section class="theAside__foot">
      <p v-if="shoppingCart.length" class="subtotal">
        <span>Subtotal</span>
        <span><ProductPrice :className="'cartWidgetItem__price'" :price="getSubtotalPrice" /></span>
      </p>
      <p class="legend">Shipping, taxes, and discount codes calculated at checkout.</p>
      <button
        class="button button-toCart"
        :class="{ 'button-disabled': !shoppingCart.length }"
        :disabled="!shoppingCart.length"
      >
        Checkout
      </button>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapState } from "vuex";

// Component: Custom Scrollbar
import AppScrollbar from "@/components/scrollbar/AppScrollbar";
// Component: Cart Widget Item
import CartWidgetItem from "@/components/cart/CartWidgetItem";
// Component: Product Price calculations
import ProductPrice from "@/components/products/ProductPrice";

export default {
  name: "CartWidget",
  components: {
    AppScrollbar,
    CartWidgetItem,
    ProductPrice,
  },
  computed: {
    ...mapState("cart", ["shoppingCart"]),
    ...mapGetters("cart", ["getCartItemsLength"]),

    getSubtotalPrice() {
      let price = 0;
      this.shoppingCart.forEach((product) => {
        price += product.price * product.quantity;
      });
      return price;
    },
  },
  watch: {
    shoppingCart: {
      deep: true,
      handler(value) {
        const newValue = JSON.stringify(value);
        localStorage.setItem("shoppingCart", newValue);
      },
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    clickAway(event) {
      if (
        !event.target.className ||
        (event.target.className &&
          !event.target.classList.contains("excluded") &&
          event.target.tagName !== "rect" &&
          event.target.tagName !== "path" &&
          event.target.tagName !== "svg")
      ) {
        this.$emit("close");
      }
    },
  },
};
</script>
