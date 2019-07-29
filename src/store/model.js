import { action, thunk } from "easy-peasy";

const sessionEffects = {
  authUser: thunk(async (actions, payload, { injections: { Api } }) => {
    const user = await Api.authUser(payload);
    actions.updateProfileAction(user);
    actions.changeAuthStatusAction(true);
  }),
  getTodos: thunk(async (actions, payload, { injections: { Api } }) => {
    const data = await Api.getTodos(payload);
    return data;
  }),
  createTodo: thunk(async (actions, payload, { injections: { Api } }) => {
    const data = await Api.createTodo(payload);
    return data;
  }),
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
  })
};

const model = {
  session: {
    profile: {
      email: "",
      username: "",
      id: ""
    },
    filterOptions: {},
    isAuth: false,
    updateProfileAction: action((state, payload) => ({
      ...state,
      profile: { ...state.profile, ...payload }
    })),
    changeAuthStatusAction: action((state, payload) => ({
      ...state,
      isAuth: payload
    })),
    setFilter: action((state, payload) => ({
      ...state,
      filterOptions: payload
    })),
    ...sessionEffects
  }
};
export default model;
