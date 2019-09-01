import { action, thunk } from "easy-peasy";

const thunks = {
  recoverySession: thunk(
    async (actions, payload, { injections: { Api, cache } }) => {
      try {
        const user = await actions.getUserProfile();

        actions.setActiveCategory(user);
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

      actions.setActiveCategory(user);
      actions.updateProfileAction(user);
      actions.changeAuthStatusAction(true);
    }
  ),
  registerUser: thunk(async (actions, payload, { injections: { Api } }) => {
    const user = await Api.registerUser(payload);

    actions.setActiveCategory(user);
    actions.updateProfileAction(user);
    actions.changeAuthStatusAction(true);
  }),
  authUser: thunk(async (actions, payload, { injections: { Api } }) => {
    const user = await Api.authUser(payload);

    actions.setActiveCategory(user);
    actions.updateProfileAction(user);
    actions.changeAuthStatusAction(true);
  }),
  logoutUser: thunk(
    async (actions, payload, { injections: { Api, cache } }) => {
      await Api.logoutUser();
      cache.clearCache();
      actions.resetState();
      actions.changeAuthStatusAction(false);
    }
  )
};

const actions = {
  changeAuthStatusAction: action((state, payload) => ({
    ...state,
    isAuth: payload
  }))
};

export const authModel = {
  isAuth: false,
  ...actions,
  ...thunks
};
