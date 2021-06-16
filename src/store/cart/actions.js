// Fill Shopping Cart
export function fillShoppingCart(context, data) {
  context.commit("FILL_SHOPPING_CART", data);
}

// Add || Increment Product Quantity in Cart
export function addProductToCart(context, data) {
  const isEqual = (...objects) => objects.every((obj) => JSON.stringify(obj) === JSON.stringify(objects[0]));

  const cartProductIndex = context.state.shoppingCart.findIndex(
    (product) => product.id === data.id && isEqual(product.selectedParams, data.selectedParams) === true
  );

  if (cartProductIndex < 0) {
    const product = JSON.parse(JSON.stringify(data));
    context.commit("ADD_PRODUCT_TO_CART", { ...product, quantity: 1 });
  } else {
    let quantity = context.state.shoppingCart[cartProductIndex].quantity;

    if (quantity < context.state.maxAllowedProduct) {
      quantity++;
      context.commit("CHANGE_PRODUCT_QUANTITY", { cartProductIndex, quantity });
    } else {
      return void 0;
    }
  }
}

// Decrement Product Quantity in Cart
export function decrementProductInCart(context, data) {
  const cartProductIndex = context.state.shoppingCart.findIndex((product) => product.id === data.id);
  let quantity = context.state.shoppingCart[cartProductIndex].quantity;

  if (quantity > 1) {
    quantity--;
    context.commit("CHANGE_PRODUCT_QUANTITY", { cartProductIndex, quantity });
  } else {
    context.commit("REMOVE_PRODUCT_FROM_CART", cartProductIndex);
  }
}

// Remove Product from Cart
export function removeProductFromCart(context, data) {
  const cartProductIndex = context.state.shoppingCart.findIndex((product) => product.id === data.id);
  context.commit("REMOVE_PRODUCT_FROM_CART", cartProductIndex);
}
