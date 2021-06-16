// Sets Current Category by its Id
export function setCurrentCategory(context, data) {
  const result = context.state.categories.find((category) => category.slug === data);
  context.commit("SET_CURRENT_CATEGORY", result);
}
