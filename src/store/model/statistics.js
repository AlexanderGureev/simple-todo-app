import { thunk, action, thunkOn } from "easy-peasy";

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
  }),
  onUpdateStatistics: thunkOn(
    (actions, storeActions) => [
      storeActions.category.deleteCategory,
      storeActions.todo.createTodo,
      storeActions.todo.deleteTodo,
      storeActions.todo.changeStatusTodo
    ],
    async (actions, { type, error, result }, { getState }) => {
      if (error) return;
      const state = getState();

      // eslint-disable-next-line default-case
      switch (type) {
        case "@thunk.todo.changeStatusTodo": {
          const { status } = result;
          const updatedState = {
            completed:
              status === "completed" ? state.completed + 1 : state.completed - 1
          };
          actions.updateStatisticsAction(updatedState);
          break;
        }
        case "@thunk.todo.deleteTodo": {
          const { status, primary } = result;
          const updatedState = {
            count: state.count - 1,
            [status]: state[status] - 1,
            primary: primary ? state.primary - 1 : state.primary
          };
          actions.updateStatisticsAction(updatedState);
          break;
        }
        case "@thunk.todo.createTodo": {
          const { primary } = result;
          const updatedState = {
            count: state.count + 1,
            primary: primary ? state.primary + 1 : state.primary
          };
          actions.updateStatisticsAction(updatedState);
          break;
        }
        case "@thunk.category.deleteCategory": {
          await actions.getStatistics();
          break;
        }
      }
    }
  )
};

const actions = {
  updateStatisticsAction: action((state, payload) => ({
    ...state,
    ...payload
  }))
};
export const statisticsModel = {
  count: 0,
  completed: 0,
  primary: 0,
  ...thunks,
  ...actions
};
