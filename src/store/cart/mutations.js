// Add Product to Cart
export const FILL_SHOPPING_CART = (state, payload) => {
  state.shoppingCart = payload;
};

// Add Product to Cart
export const ADD_PRODUCT_TO_CART = (state, payload) => {
  state.shoppingCart.push(payload);
};

// Increment/Decrement Product Quantity in Cart
export const CHANGE_PRODUCT_QUANTITY = (state, payload) => {
  state.shoppingCart[payload.cartProductIndex].quantity = payload.quantity;
};

// Remove Product from Cart
export const REMOVE_PRODUCT_FROM_CART = (state, payload) => {
  state.shoppingCart.splice(payload, 1);
};
