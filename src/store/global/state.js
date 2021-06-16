// Use your own API instead of this example Data
import { global } from "@/data/global";

export default function () {
  return {
    global: global, // Array of Objects. Global Site Settings.
    currentCurrency: {}, // Object. Selected Currency.
  };
}
