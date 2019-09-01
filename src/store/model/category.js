import { action, thunk } from "easy-peasy";

const thunks = {
  setActiveCategory: thunk((actions, user) => {
    const [firstCategory = {}] = user.categories;
    actions.setCategory(firstCategory.id || "");
  }),
  createCategory: thunk(
    async (
      actions,
      payload,
      { injections: { Api }, getStoreState, getStoreActions }
    ) => {
      const { profile } = getStoreState();
      const { updateProfileAction } = getStoreActions().profile;

      const newCategory = await Api.createCategory(payload);
      actions.setCategory(newCategory.id);
      updateProfileAction({
        categories: [...profile.categories, newCategory]
      });
      return newCategory;
    }
  ),
  updateCategory: thunk(
    async (
      actions,
      payload,
      { injections: { Api }, getState, getStoreState, getStoreActions }
    ) => {
      const { profile } = getStoreState();
      const { activeCategory } = getState();
      const { updateCategoriesAction } = getStoreActions().profile;

      const updatedCategory = await Api.updateCategoryById(
        activeCategory,
        payload
      );
      const newStateCategories = profile.categories.map(category =>
        category.id === updatedCategory.id ? updatedCategory : category
      );
      updateCategoriesAction(newStateCategories);
      return updatedCategory;
    }
  ),
  deleteCategory: thunk(
    async (
      actions,
      payload,
      { injections: { Api, cache }, getStoreState, getStoreActions }
    ) => {
      const { profile } = getStoreState();
      const { updateProfileAction } = getStoreActions().profile;

      const deletedCategory = await Api.deleteCategory(payload);
      const filteredCategories = profile.categories.filter(
        ({ id }) => id !== deletedCategory.id
      );

      const [firstCategory = {}] = filteredCategories;
      actions.setCategory(firstCategory.id || "");

      updateProfileAction({ categories: filteredCategories });
      return deletedCategory;
    }
  )
};

const actions = {
  setCategory: action((state, payload) => ({
    activeCategory: payload
  }))
};
export const categoryModel = {
  activeCategory: "",
  ...thunks,
  ...actions
};
