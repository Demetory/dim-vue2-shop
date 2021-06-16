// Use your own API instead of this example Data
import { global } from "@/data/global";

export default function () {
  return {
    shoppingCart: [], // Array of Objects. Products in Cart.
    maxAllowedProduct: global.maxAllowedProduct, // Maximal Quantity for each Item in Cart.
  };
}
