// Returns Currencies Object
export const getGlobalCurrencies = (state) => state.global.currencies;

// Returns Current Currency
export const getCurrentCurrency = (state) => state.currentCurrency;

// Returns Product Sort Direction
export const getSortDirection = (state) => state.global.productsSort.defaultSelectorDirection;

// Returns Product Default Sort Type
export const getSortTypeById = (state) => (id) => {
  return state.global.productsSort.selector.find((sortType) => sortType.id === id);
};
