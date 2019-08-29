import { action, thunk } from "easy-peasy";

const DEFAULT_AVATAR_PATH = `/upload/ava_default.png`;

const sessionEffects = {
  recoverySession: thunk(
    async (actions, payload, { injections: { Api, cache } }) => {
      try {
        const user = await actions.getUserProfile();

        const [firstCategory = {}] = user.categories;
        actions.setCategory(firstCategory.id || "");

        actions.updateProfileAction(user);
        actions.changeAuthStatusAction(true);
      } catch (error) {
        console.log(error);
      }
    }
  ),
  socialAuthorizeUserAction: thunk(
    async (actions, payload, { injections: { Api }, getState }) => {
      const user = await Api.socialAuthApi(payload);
      actions.updateProfileAction(user);
      actions.changeAuthStatusAction(true);
    }
  ),
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
  updateSortingTodos: thunk(
    async (actions, { categoryId, todosIds }, { injections: { Api } }) => {
      const data = await Api.updatePositionTodosByCategoryId(
        categoryId,
        todosIds
      );
      return data;
    }
  ),
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
      const [, { avatarPath }] = await Promise.all([
        actions.removeFile(payload),
        Api.updateUserProfile(profile.id, { avatarPath: DEFAULT_AVATAR_PATH })
      ]);

      actions.updateProfileAction({ avatarPath });
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
  ),
  deleteTodo: thunk(
    async (
      actions,
      { categoryId, todoId },
      { injections: { Api }, getState }
    ) => {
      const { statistics } = getState();
      const deletedTodo = await Api.deleteTodoByCategory(categoryId, todoId);

      const updatedStatistics = {
        ...statistics,
        count: statistics.count - 1,
        [deletedTodo.status]: statistics[deletedTodo.status] - 1,
        primary: deletedTodo.primary
          ? statistics[deletedTodo.primary] - 1
          : statistics[deletedTodo.primary]
      };

      actions.updateStatisticsAction(updatedStatistics);
      return deletedTodo;
    }
  ),
  logoutUser: thunk(async (actions, payload, { injections: { Api } }) => {
    await Api.logoutUser();
    actions.changeAuthStatusAction(false);
  }),
  getUserProfile: thunk(async (actions, payload, { injections: { Api } }) => {
    const user = await Api.getUserProfile();
    return user;
  }),
  getStatistics: thunk(async (actions, payload, { injections: { Api } }) => {
    const todosByCategory = await Api.getTodos({ limit: 100 }); // max limit
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
      profile: { ...state.profile, ...payload }
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
    setCategory: action((state, payload) => ({
      ...state,
      activeCategory: payload
    })),
    ...sessionEffects
  }
};
export default model;
