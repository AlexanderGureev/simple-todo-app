import { action, thunk, thunkOn } from "easy-peasy";

const DEFAULT_AVATAR_PATH = `/upload/ava_default.png`;

const thunks = {
  updateAvatar: thunk(
    async (
      actions,
      payload,
      { injections: { Api }, getState, getStoreActions }
    ) => {
      const { profile } = getState();
      const { uploadFile } = getStoreActions().file;

      const { path } = await uploadFile(payload);
      const { avatarPath } = await Api.updateUserProfile(profile.id, {
        avatarPath: path
      });

      actions.updateProfileAction({ avatarPath });
      return avatarPath;
    }
  ),
  deleteAvatar: thunk(
    async (
      actions,
      payload,
      { injections: { Api }, getState, getStoreActions }
    ) => {
      const { profile } = getState();
      const { removeFile } = getStoreActions().file;

      const [, { avatarPath }] = await Promise.all([
        removeFile(payload),
        Api.updateUserProfile(profile.id, { avatarPath: DEFAULT_AVATAR_PATH })
      ]);

      actions.updateProfileAction({ avatarPath });
    }
  ),
  getUserProfile: thunk(async (actions, payload, { injections: { Api } }) => {
    const user = await Api.getUserProfile();
    return user;
  }),
  onUpdateProfile: thunkOn(
    (actions, storeActions) => [
      storeActions.category.createCategory,
      storeActions.category.updateCategory,
      storeActions.category.deleteCategory,
      storeActions.session.recoverySession,
      storeActions.session.socialAuthorizeUserAction,
      storeActions.session.registerUser,
      storeActions.session.authUser
    ],
    async (actions, { type, error, result }, { getState }) => {
      if (error) return;
      const state = getState();

      // eslint-disable-next-line default-case
      switch (type) {
        case "@thunk.category.createCategory": {
          actions.updateProfileAction({
            categories: [...state.categories, result]
          });
          break;
        }
        case "@thunk.category.updateCategory": {
          const newStateCategories = state.categories.map(category =>
            category.id === result.id ? result : category
          );
          actions.updateProfileAction({
            categories: newStateCategories
          });
          break;
        }
        case "@thunk.category.deleteCategory": {
          // const filteredCategories = state.categories.filter(
          //   ({ id }) => id !== result.id
          // );
          // actions.updateProfileAction({
          //   categories: filteredCategories
          // });
          const profile = await actions.getUserProfile();
          actions.updateProfileAction(profile);
          break;
        }
        case "@thunk.session.recoverySession":
        case "@thunk.session.registerUser":
        case "@thunk.session.authUser":
        case "@thunk.session.socialAuthorizeUserAction": {
          actions.updateProfileAction(result);
          break;
        }
      }
    }
  ),
  onUpdateStatistics: thunkOn(
    (actions, storeActions) => [
      storeActions.todo.createTodo,
      storeActions.todo.deleteTodo,
      storeActions.todo.changeStatusTodo
    ],
    async (actions, { type, error, result }, { getState }) => {
      if (error) return;
      const { statistics } = getState();

      // eslint-disable-next-line default-case
      switch (type) {
        case "@thunk.todo.changeStatusTodo": {
          const { status } = result;
          const updatedState = {
            completed:
              status === "completed"
                ? statistics.completed + 1
                : statistics.completed - 1
          };
          actions.updateStatisticsAction(updatedState);
          break;
        }
        case "@thunk.todo.deleteTodo": {
          const { status, primary } = result;
          const updatedState = {
            count: statistics.count - 1,
            [status]: statistics[status] - 1,
            primary: primary ? statistics.primary - 1 : statistics.primary
          };
          actions.updateStatisticsAction(updatedState);
          break;
        }
        case "@thunk.todo.createTodo": {
          const { primary } = result;
          const updatedState = {
            count: statistics.count + 1,
            primary: primary ? statistics.primary + 1 : statistics.primary
          };
          actions.updateStatisticsAction(updatedState);
          break;
        }
      }
    }
  )
};

const actions = {
  updateStatisticsAction: action((state, payload) => ({
    ...state,
    statistics: {
      ...state.statistics,
      ...payload
    }
  })),
  updateProfileAction: action((state, payload) => ({
    ...state,
    ...payload
  }))
};

export const profileModel = {
  id: "",
  email: "",
  username: "",
  categories: [],
  friends: [],
  avatarPath: "",
  statistics: {
    count: 0,
    completed: 0,
    primary: 0
  },
  ...thunks,
  ...actions
};
