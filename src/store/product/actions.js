// Sets Products for selected Category by its Slug
export function setCurrentProducts(context, data) {
  const result = context.state.products.filter((products) => products.categorySlug === data);
  context.commit("SET_CURRENT_PRODUCTS", result);
}

// Sets selected Product by its Id
export function setCurrentProduct(context, data) {
  const result = context.state.products.find(
    (product) => product.categorySlug === data.category && product.id === parseInt(data.product)
  );
  context.commit("SET_CURRENT_PRODUCT", result);
}
