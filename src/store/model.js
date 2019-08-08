import { action, thunk } from "easy-peasy";

const DEFAULT_AVATAR_PATH = `/upload/ava_default.png`;

const sessionEffects = {
  registerUser: thunk(async (actions, payload, { injections: { Api } }) => {
    const user = await Api.registerUser(payload);
    actions.updateProfileAction(user);
    actions.changeAuthStatusAction(true);
  }),
  authUser: thunk(async (actions, payload, { injections: { Api } }) => {
    const user = await Api.authUser(payload);
    actions.updateProfileAction(user);
    actions.changeAuthStatusAction(true);
  }),
  getTodos: thunk(async (actions, payload, { injections: { Api } }) => {
    const data = await Api.getTodos(payload);
    return data;
  }),
  getTodosByCategory: thunk(
    async (actions, payload, { injections: { Api } }) => {
      const data = await Api.getTodosByCategory(payload);
      return data;
    }
  ),
  createTodo: thunk(
    async (actions, payload, { injections: { Api }, getState }) => {
      const { statistics } = getState();
      const createdTodo = await Api.createTodo(payload);
      const updatedStat = {
        ...statistics,
        count: statistics.count + 1,
        primary: createdTodo.primary
          ? statistics.primary + 1
          : statistics.primary
      };
      actions.updateStatisticsAction(updatedStat);
      return createdTodo;
    }
  ),
  uploadFile: thunk(async (actions, payload, { injections: { Api } }) => {
    const data = await Api.uploadFile(payload);
    return data;
  }),
  removeFile: thunk(async (actions, payload, { injections: { Api } }) => {
    const data = await Api.removeFile(payload);
    return data;
  }),
  updateAvatar: thunk(
    async (actions, payload, { injections: { Api }, getState }) => {
      const { profile } = getState();
      const { path } = await actions.uploadFile(payload);
      const { avatarPath } = await Api.updateUserProfile(profile.id, {
        avatarPath: path
      });
      actions.updateProfileAction({ avatarPath });
      return avatarPath;
    }
  ),
  deleteAvatar: thunk(
    async (actions, payload, { injections: { Api }, getState }) => {
      const { profile } = getState();
      const [, updatedProfile] = await Promise.all([
        actions.removeFile(payload),
        Api.updateUserProfile(profile.id, { avatarPath: DEFAULT_AVATAR_PATH })
      ]);
      actions.updateProfileAction(updatedProfile);
    }
  ),
  changeStatusTodo: thunk(
    async (
      actions,
      { categoryId, todoId, body },
      { injections: { Api }, getState }
    ) => {
      const { statistics } = getState();
      const data = await Api.updateTodo(categoryId, todoId, body);

      const completed =
        body.status === "completed"
          ? statistics.completed + 1
          : statistics.completed - 1;

      actions.updateStatisticsAction({
        ...statistics,
        completed
      });

      return data;
    }
  ),
  createCategory: thunk(
    async (actions, payload, { injections: { Api }, getState }) => {
      const { profile } = getState();
      const newCategory = await Api.createCategory(payload);
      actions.updateProfileAction({
        categories: [...profile.categories, newCategory]
      });
      actions.setActiveCategory(newCategory.id);
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
    async (actions, payload, { injections: { Api }, getState }) => {
      const { profile } = getState();
      const deletedCategory = await Api.deleteCategory(payload);
      const filteredCategories = profile.categories.filter(
        ({ id }) => id !== deletedCategory.id
      );
      actions.updateProfileAction({ categories: filteredCategories });
      await actions.getStatistics();
      return deletedCategory;
    }
  ),
  logoutUser: thunk(async (actions, payload, { injections: { Api } }) => {
    await Api.logoutUser();
    actions.changeAuthStatusAction(false);
  }),
  getUserProfile: thunk(async (actions, payload, { injections: { Api } }) => {
    try {
      const user = await Api.getUserProfile();
      actions.updateProfileAction(user);
      actions.changeAuthStatusAction(true);
    } catch (error) {
      console.log(error);
    }
  }),
  getStatistics: thunk(async (actions, payload, { injections: { Api } }) => {
    const todosByCategory = await Api.getTodos();
    const stat = todosByCategory.reduce(
      (acc, { todos }) => ({
        ...acc,
        count: acc.count + todos.length,
        completed:
          acc.completed +
          todos.filter(({ status }) => status === "completed").length,
        primary: acc.primary + todos.filter(({ primary }) => primary).length
      }),
      {
        count: 0,
        completed: 0,
        primary: 0
      }
    );
    actions.updateStatisticsAction(stat);
  })
};

const model = {
  session: {
    profile: {
      email: "",
      username: "",
      id: "",
      categories: [],
      friends: [],
      avatarPath: ""
    },
    statistics: {
      count: 0,
      completed: 0,
      primary: 0
    },
    filterOptions: {},
    activeCategory: "",
    isAuth: false,
    updateProfileAction: action((state, payload) => ({
      ...state,
      profile: { ...state.profile, ...payload },
      activeCategory:
        payload.categories &&
        (payload.categories.length ? payload.categories[0].id : "")
    })),
    updateStatisticsAction: action((state, payload) => ({
      ...state,
      statistics: { ...state.statistics, ...payload }
    })),
    updateCategoriesAction: action((state, payload) => ({
      ...state,
      profile: { ...state.profile, categories: payload }
    })),
    changeAuthStatusAction: action((state, payload) => ({
      ...state,
      isAuth: payload
    })),
    setFilter: action((state, payload) => ({
      ...state,
      filterOptions: payload
    })),
    setActiveCategory: action((state, payload) => ({
      ...state,
      activeCategory: payload
    })),
    ...sessionEffects
  }
};
export default model;
