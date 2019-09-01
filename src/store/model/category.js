import { action, thunk } from "easy-peasy";

const thunks = {
  setActiveCategory: thunk((actions, user) => {
    const [firstCategory = {}] = user.categories;
    actions.setCategory(firstCategory.id || "");
  }),
  createCategory: thunk(
    async (actions, payload, { injections: { Api }, getState }) => {
      const { profile } = getState();
      const newCategory = await Api.createCategory(payload);
      actions.setCategory(newCategory.id);
      actions.updateProfileAction({
        categories: [...profile.categories, newCategory]
      });
      return newCategory;
    }
  ),
  updateCategory: thunk(
    async (actions, payload, { injections: { Api }, getState }) => {
      const { activeCategory, profile } = getState();
      const updatedCategory = await Api.updateCategoryById(
        activeCategory,
        payload
      );
      const newStateCategories = profile.categories.map(category =>
        category.id === updatedCategory.id ? updatedCategory : category
      );
      actions.updateCategoriesAction(newStateCategories);
      return updatedCategory;
    }
  ),
  deleteCategory: thunk(
    async (actions, payload, { injections: { Api, cache }, getState }) => {
      const { profile } = getState();
      const deletedCategory = await Api.deleteCategory(payload);
      const filteredCategories = profile.categories.filter(
        ({ id }) => id !== deletedCategory.id
      );

      const [firstCategory = {}] = filteredCategories;
      actions.setCategory(firstCategory.id || "");

      actions.updateProfileAction({ categories: filteredCategories });
      await actions.getStatistics();
      return deletedCategory;
    }
  )
};

const actions = {
  updateCategoriesAction: action((state, payload) => ({
    ...state,
    profile: { ...state.profile, categories: payload }
  })),
  setCategory: action((state, payload) => ({
    ...state,
    activeCategory: payload
  }))
};
export const categoryModel = {
  activeCategory: "",
  ...thunks,
  ...actions
};
