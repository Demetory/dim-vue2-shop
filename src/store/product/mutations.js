// Sets products for selected Category
export const SET_CURRENT_PRODUCTS = (state, payload) => {
  state.currentProducts = payload;
};

// Sets selected Product
export const SET_CURRENT_PRODUCT = (state, payload) => {
  state.currentProduct = payload;
};
