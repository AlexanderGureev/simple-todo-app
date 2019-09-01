import { action, thunk } from "easy-peasy";

const thunks = {
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

const actions = {
  updateStatisticsAction: action((state, payload) => ({
    ...state,
    statistics: { ...state.statistics, ...payload }
  }))
};
export const statisticsModel = {
  statistics: {
    count: 0,
    completed: 0,
    primary: 0
  },
  ...thunks,
  ...actions
};
