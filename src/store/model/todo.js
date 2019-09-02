import { thunk } from "easy-peasy";

const thunks = {
  getTodos: thunk(async (actions, payload, { injections: { Api } }) => {
    const data = await Api.getTodos(payload);
    return data;
  }),
  createTodo: thunk(async (actions, payload, { injections: { Api } }) => {
    const createdTodo = await Api.createTodo(payload);
    return createdTodo;
  }),
  deleteTodo: thunk(
    async (actions, { categoryId, todoId }, { injections: { Api } }) => {
      const deletedTodo = await Api.deleteTodoByCategory(categoryId, todoId);
      return deletedTodo;
    }
  ),
  updateSortingTodos: thunk(
    async (
      actions,
      { categoryId, list, oldIndex, newIndex },
      { injections: { Api } }
    ) => {
      const data = await Api.updatePositionTodosByCategoryId(
        categoryId,
        list,
        oldIndex,
        newIndex
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
    async (actions, { categoryId, todoId, body }, { injections: { Api } }) => {
      const data = await Api.updateTodo(categoryId, todoId, body);
      return data;
    }
  )
};

export const todoModel = {
  ...thunks
};
