// Returns Product from Cart by Id
export const getCartProductById = (state) => (id) => {
  return state.shoppingCart.find((product) => product.id === id);
};

// Returns Product Quantity from Cart by Id
export const getCartProductQuantityById = (state) => (id) => {
  let quantity = 0;

  state.shoppingCart.forEach((product) => {
    if (product.id === id) {
      quantity += product.quantity;
    }
  });

  return quantity;
};

// Returns All Items Quantity in Cart
export const getCartItemsLength = (state) => {
  let quantity = 0;

  state.shoppingCart.forEach((product) => {
    quantity += product.quantity;
  });

  return quantity;
};
