// Use your own API instead of this example Data
import { highlights } from "@/data/highlights";
import { categories } from "@/data/categories";

export default function () {
  return {
    highlights: highlights, // Array of Objects. Highlights on Home Page.
    categories: categories, // Array of Objects. All Categories.
    currentCategory: {}, // Object. Current Category
  };
}
