<template>
  <p :class="className">
    <span v-if="legend && legend.position === 'left'">{{ legend.text }}</span>
    <template v-if="getCurrentCurrency.prop === 'eur'">
      {{ getCurrentCurrency.sign }}
    </template>
    {{ getCurrencyPrice(getCurrentCurrency.prop, price, getGlobalCurrencies.exchangeRate.eur_rub) }}
    <template v-if="getCurrentCurrency.prop === 'rub'">
      {{ getCurrentCurrency.sign }}
    </template>
    <span v-if="legend && legend.position === 'right'">{{ legend.text }}</span>
  </p>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";

export default {
  name: "ProductPrice",
  props: {
    className: {
      type: String,
      required: true,
      default: "price",
    },
    price: {
      type: [String, Number],
      required: true,
      default: 0,
    },
    quantity: {
      type: Number,
      required: false,
      default: 1,
    },
    legend: {
      type: Object,
      required: false,
    },
  },
  computed: {
    // Vuex Getters: Global currencies props, Current currency
    ...mapGetters("global", ["getGlobalCurrencies", "getCurrentCurrency"]),
  },
  methods: {
    getCurrencyPrice(currency, price, rate) {
      /*
        Recalculates Price according to exchange currency rate.
        Returns: Integer.
        Sets: nothing.
      */

      return currency === "eur" ? price : this.roundTo(price * rate * this.quantity, 2);
    },
    roundTo(n, digits) {
      /*
        Rounds the number according to the number of decimal places.
        Returns: Integer.
        Sets: nothing.
      */

      let negative = false;
      if (digits === undefined) {
        digits = 0;
      }
      if (n < 0) {
        negative = true;
        n = n * -1;
      }
      const multiplier = Math.pow(10, digits);
      n = parseFloat((n * multiplier).toFixed(11));
      n = (Math.round(n) / multiplier).toFixed(digits);
      if (negative) {
        n = (n * -1).toFixed(digits);
      }
      return n;
    },
  },
};
</script>
