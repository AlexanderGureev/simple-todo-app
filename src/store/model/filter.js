import { action } from "easy-peasy";

const actions = {
  setFilter: action((state, payload) => ({
    ...state,
    activeFilter: payload
  }))
};

export const filterModel = {
  filters: ["all", "active", "completed", "primary"],
  activeFilter: 0,
  ...actions
};
