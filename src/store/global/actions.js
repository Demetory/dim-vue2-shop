// Sets Current Currency by its Id
export function setCurrentCurrency(context, data) {
  const result = context.state.global.currencies.type.find((obj) => {
    return obj.id === data;
  });
  context.commit("SET_CURRENT_CURRENCY", result);
}
