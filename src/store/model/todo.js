import { thunk } from "easy-peasy";

const thunks = {
  getTodos: thunk(async (actions, payload, { injections: { Api } }) => {
    const data = await Api.getTodos(payload);
    return data;
  }),
  createTodo: thunk(
    async (actions, payload, { injections: { Api }, getState }) => {
      const { statistics } = getState();
      const createdTodo = await Api.createTodo(payload);
      const updatedStat = {
        ...statistics,
        count: statistics.count + 1,
        primary: createdTodo.primary
          ? statistics.primary + 1
          : statistics.primary
      };
      actions.updateStatisticsAction(updatedStat);
      return createdTodo;
    }
  ),
  deleteTodo: thunk(
    async (
      actions,
      { categoryId, todoId },
      { injections: { Api }, getState }
    ) => {
      const { statistics } = getState();
      const deletedTodo = await Api.deleteTodoByCategory(categoryId, todoId);

      const updatedStatistics = {
        ...statistics,
        count: statistics.count - 1,
        [deletedTodo.status]: statistics[deletedTodo.status] - 1,
        primary: deletedTodo.primary
          ? statistics[deletedTodo.primary] - 1
          : statistics[deletedTodo.primary]
      };

      actions.updateStatisticsAction(updatedStatistics);
      return deletedTodo;
    }
  ),
  updateSortingTodos: thunk(
    async (actions, { categoryId, todosIds }, { injections: { Api } }) => {
      const data = await Api.updatePositionTodosByCategoryId(
        categoryId,
        todosIds
      );
      return data;
    }
  ),
  getTodosByCategory: thunk(
    async (actions, payload, { injections: { Api } }) => {
      const data = await Api.getTodosByCategory(payload);
      return data;
    }
  ),
  changeStatusTodo: thunk(
    async (
      actions,
      { categoryId, todoId, body },
      { injections: { Api }, getState }
    ) => {
      const { statistics } = getState();
      const data = await Api.updateTodo(categoryId, todoId, body);

      const completed =
        body.status === "completed"
          ? statistics.completed + 1
          : statistics.completed - 1;

      actions.updateStatisticsAction({
        ...statistics,
        completed
      });

      return data;
    }
  )
};

export const todoModel = {
  ...thunks
};
