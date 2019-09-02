import { thunk, computed } from "easy-peasy";

const thunks = {
  recoverySession: thunk(async (actions, payload, { injections: { Api } }) => {
    const user = await Api.getUserProfile();
    return user;
  }),
  socialAuthorizeUserAction: thunk(
    async (actions, payload, { injections: { Api } }) => {
      const user = await Api.socialAuthApi(payload);
      return user;
    }
  ),
  registerUser: thunk(async (actions, payload, { injections: { Api } }) => {
    const user = await Api.registerUser(payload);
    return user;
  }),
  authUser: thunk(async (actions, payload, { injections: { Api } }) => {
    const user = await Api.authUser(payload);
    return user;
  }),
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
