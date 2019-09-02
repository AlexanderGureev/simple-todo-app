import { action, thunk, thunkOn } from "easy-peasy";

const thunks = {
  setActiveCategory: thunk((actions, categories) => {
    const [firstCategory = {}] = categories;
    actions.setCategory(firstCategory.id || "");
  }),
  createCategory: thunk(async (actions, payload, { injections: { Api } }) => {
    const newCategory = await Api.createCategory(payload);
    actions.setCategory(newCategory.id);
    return newCategory;
  }),
  updateCategory: thunk(
    async (actions, payload, { injections: { Api }, getState }) => {
      const { activeCategory } = getState();
      const updatedCategory = await Api.updateCategoryById(
        activeCategory,
        payload
      );
      return updatedCategory;
    }
  ),
  deleteCategory: thunk(
    async (actions, payload, { injections: { Api, cache }, getStoreState }) => {
      const { profile } = getStoreState();
      const deletedCategory = await Api.deleteCategory(payload);
      const filteredCategories = profile.categories.filter(
        ({ id }) => id !== deletedCategory.id
      );

      actions.setActiveCategory(filteredCategories);
      return deletedCategory;
    }
  ),
  onSetActiveCategory: thunkOn(
    (actions, storeActions) => [
      storeActions.session.recoverySession,
      storeActions.session.socialAuthorizeUserAction,
      storeActions.session.registerUser,
      storeActions.session.authUser
    ],
    (actions, { type, error, result }) => {
      if (error) return;
      actions.setActiveCategory(result.categories);
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
