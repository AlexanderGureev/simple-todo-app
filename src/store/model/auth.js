import { action, thunk, computed } from "easy-peasy";

const thunks = {
  recoverySession: thunk(
    async (
      actions,
      payload,
      { injections: { Api, cache }, getStoreActions }
    ) => {
      try {
        const { category, profile } = getStoreActions();
        const user = await profile.getUserProfile();
        category.setActiveCategory(user);
        profile.updateProfileAction(user);
      } catch (error) {
        console.log(error);
      }
    }
  ),
  socialAuthorizeUserAction: thunk(
    async (actions, payload, { injections: { Api }, getStoreActions }) => {
      const { category, profile } = getStoreActions();
      const user = await Api.socialAuthApi(payload);
      category.setActiveCategory(user);
      profile.updateProfileAction(user);
    }
  ),
  registerUser: thunk(
    async (actions, payload, { injections: { Api }, getStoreActions }) => {
      const { category, profile } = getStoreActions();
      const user = await Api.registerUser(payload);

      category.setActiveCategory(user);
      profile.updateProfileAction(user);
    }
  ),
  authUser: thunk(
    async (actions, payload, { injections: { Api }, getStoreActions }) => {
      const { category, profile } = getStoreActions();
      const user = await Api.authUser(payload);

      category.setActiveCategory(user);
      profile.updateProfileAction(user);
    }
  ),
  logoutUser: thunk(
    async (
      actions,
      payload,
      { injections: { Api, cache }, getStoreActions }
    ) => {
      const { resetState } = getStoreActions();

      await Api.logoutUser();
      cache.clearCache();
      resetState();
    }
  )
};

const actions = {};

export const authModel = {
  isAuth: computed([(state, storeState) => storeState.profile.id], id =>
    Boolean(id)
  ),
  ...actions,
  ...thunks
};
