const sessionEffects = {};

const model = {
  session: {
    profile: {
      email: "",
      username: ""
    },
    isAuth: false,
    updateProfileAction: (state, payload) => ({
      ...state,
      profile: { ...state.profile, ...payload }
    }),
    changeAuthStatusAction: (state, payload) => ({ ...state, isAuth: payload }),
    ...sessionEffects
  }
};
export default model;
