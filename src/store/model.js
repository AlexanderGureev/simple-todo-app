import { action, thunk } from "easy-peasy";

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
      id: "",
      categories: [],
      friends: []
    },
    filterOptions: {},
    activeCategory: "",
    isAuth: false,
    updateProfileAction: action((state, payload) => ({
      ...state,
      profile: { ...state.profile, ...payload },
      activeCategory: payload.categories.length ? payload.categories[0].id : ""
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
