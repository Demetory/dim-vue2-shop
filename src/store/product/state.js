// Use your own API instead of this example Data
import { products } from "@/data/products";

export default function () {
  return {
    products: products, // Array of Objects. All Products.
    currentProducts: [], // Array of Objects. Products in selected Category.
    currentProduct: {}, // Object. Selected Product.
  };
}
