import React, { useEffect, useState, useReducer, useRef } from "react";
import {
  CellMeasurerCache,
  AutoSizer,
  InfiniteLoader
} from "react-virtualized";
import { useStoreActions, useStoreState } from "easy-peasy";
import { message } from "antd";
import arrayMove from "array-move";
import { useWindowSize, useThrottleFn } from "react-use";
import { TodoList, TodoListWrapper } from "./styles";
import CreateTodo from "./CreateTodoModal";
import Preloader from "../Common/Preloader";
import EmptyCategory from "./EmptyCategory";
import SortableVirtualList from "./SortableVirtualList";

const cache = new CellMeasurerCache({
  minHeight: 80,
  defaultHeight: 80,
  fixedWidth: true
});

function todoReducer(state, { type, payload }) {
  switch (type) {
    case "SET_TODOS": {
      const { id: categoryId, filterKey, todos } = payload;
      return {
        ...state,
        [categoryId]: {
          ...state[categoryId],
          [filterKey]: todos
        }
      };
    }
    case "ADD_CREATED_TODO": {
      const { activeCategory, filterKey, todo } = payload;
      if (!state[activeCategory]) {
        return {
          ...state,
          [activeCategory]: {
            [filterKey]: [todo]
          }
        };
      }
      const todosByFilters = Object.entries(state[activeCategory]);
      const todosByCategory = todosByFilters.reduce((acc, [filter, todos]) => {
        if (filter === "completed" || (filter === "primary" && !todo.primary))
          return acc;
        return { ...acc, [filter]: [...todos, todo] };
      }, {});

      return {
        ...state,
        [activeCategory]: todosByCategory
      };
    }
    case "ADD_LOADED_TODOS": {
      const { id: categoryId, filterKey, todos } = payload;
      return {
        ...state,
        [categoryId]: {
          ...state[categoryId],
          [filterKey]: [...state[categoryId][filterKey], ...todos]
        }
      };
    }
    case "UPDATE_TODOS": {
      const { activeCategory, todo } = payload;
      const todosByFilters = Object.entries(state[activeCategory]);
      const todosByCategory = todosByFilters.reduce((acc, [filter, todos]) => {
        if (filter === "active" && todo.status === "completed") {
          return { ...acc, [filter]: todos.filter(({ id }) => id !== todo.id) };
        }
        if (filter === "completed") {
          return todo.status === "completed"
            ? { ...acc, [filter]: [...todos, todo] }
            : {
                ...acc,
                [filter]: todos.filter(({ id }) => id !== todo.id)
              };
        }

        const index = todos.findIndex(({ id }) => id === todo.id);
        todos[index] = todo;
        return { ...acc, [filter]: [...todos] };
      }, {});

      return {
        ...state,
        [activeCategory]: todosByCategory
      };
    }
    case "REMOVE_DELETED_TODO": {
      const { activeCategory, todo } = payload;

      const updatedTodosByCategory = Object.entries(
        state[activeCategory]
      ).reduce(
        (acc, [filter, todos]) => ({
          ...acc,
          [filter]: todos.filter(({ id }) => id !== todo.id)
        }),
        {}
      );

      return {
        ...state,
        [activeCategory]: updatedTodosByCategory
      };
    }

    default:
      return state;
  }
}

function countReducer(state, { type, payload }) {
  switch (type) {
    case "SET_COUNT_TODOS": {
      const { id: categoryId, filterKey, todosCountByCategory } = payload;
      return {
        ...state,
        [categoryId]: {
          ...state[categoryId],
          [filterKey]: todosCountByCategory
        }
      };
    }
    case "INCREMENT_COUNT_TODOS": {
      const { activeCategory, filterKey } = payload;
      if (!state[activeCategory]) {
        return {
          ...state,
          [activeCategory]: {
            [filterKey]: 1
          }
        };
      }
      return {
        ...state,
        [activeCategory]: {
          ...state[activeCategory],
          [filterKey]: state[activeCategory][filterKey] + 1
        }
      };
    }
    case "DECREMENT_COUNT_TODOS": {
      const { activeCategory, todo } = payload;
      const updatedCountTodosByCategory = Object.entries(
        state[activeCategory]
      ).reduce((acc, [filter, count]) => {
        if (filter === "completed") {
          return {
            ...acc,
            [filter]: todo.status === "completed" ? count - 1 : count
          };
        }
        if (filter === "primary") {
          return {
            ...acc,
            [filter]: todo.primary ? count - 1 : count
          };
        }
        return { ...acc, [filter]: count - 1 };
      }, {});
      return {
        ...state,
        [activeCategory]: updatedCountTodosByCategory
      };
    }
    default:
      return state;
  }
}

const TodoListComponent = () => {
  const { width: windowWidth } = useWindowSize();
  const activeFilter = useStoreState(state => state.filter.activeFilter);
  const filters = useStoreState(state => state.filter.filters);
  const activeCategory = useStoreState(state => state.category.activeCategory);
  const getTodosByCategory = useStoreActions(
    actions => actions.todo.getTodosByCategory
  );
  const changeStatusTodo = useStoreActions(
    actions => actions.todo.changeStatusTodo
  );
  const updateSortingTodos = useStoreActions(
    actions => actions.todo.updateSortingTodos
  );

  const [loading, setLoading] = useState(false);
  const [todos, todosDispatch] = useReducer(todoReducer, {});
  const [counts, countsDispatch] = useReducer(countReducer, {});

  const listRef = useRef();

  useThrottleFn(() => forceUpdateList(), 500, [
    windowWidth,
    activeCategory,
    activeFilter
  ]);

  useEffect(() => {
    forceUpdateList();
  }, [counts, todos]);

  useEffect(() => {
    const key = mapFilterKey(activeFilter);
    const params = mapQueryParams(activeFilter);

    if (
      (todos[activeCategory] && todos[activeCategory][key]) ||
      !activeCategory
    )
      return;

    async function fetchTodosByCategory(id, queryParams, filterKey) {
      try {
        setLoading(true);
        const data = await getTodosByCategory({
          id,
          params: queryParams
        });

        todosDispatch({ type: "SET_TODOS", payload: { ...data, filterKey } });
        countsDispatch({
          type: "SET_COUNT_TODOS",
          payload: { ...data, filterKey }
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchTodosByCategory(activeCategory, params, key);
  }, [activeCategory, activeFilter]); //eslint-disable-line

  const getRef = ref => {
    listRef.current = ref;
  };

  const forceUpdateList = () => {
    cache.clearAll();
    if (listRef.current) {
      listRef.current.recomputeRowHeights();
      listRef.current.forceUpdate();
    }
  };

  const mapQueryParams = filterIndex => {
    switch (filterIndex) {
      case 1:
        return { status: "active" };
      case 2:
        return { status: "completed" };
      case 3:
        return { primary: true };
      default:
        return {};
    }
  };
  const mapFilterKey = filterIndex => filters[filterIndex];
  const mapTodos = (categoryId, filter) => {
    const todosByCategory = todos[categoryId];
    if (!todosByCategory) return [];

    switch (filter) {
      case 1:
        return todosByCategory.active || [];
      case 2:
        return todosByCategory.completed || [];
      case 3:
        return todosByCategory.primary || [];
      default:
        return todosByCategory.all || [];
    }
  };
  const mapCount = (categoryId, filter) => {
    const filterKey = mapFilterKey(filter);
    const countTodosByCategory = counts[categoryId];

    if (!countTodosByCategory) return 0;

    switch (filterKey) {
      case "primary":
        return countTodosByCategory.primary || 0;
      case "active":
        return countTodosByCategory.active || 0;
      case "completed":
        return countTodosByCategory.completed || 0;
      default:
        return countTodosByCategory.all || 0;
    }
  };
  const changeStatusTodoHandle = todoId => async e => {
    try {
      const currentFilter = mapFilterKey(activeFilter);
      const todo = todos[activeCategory][currentFilter].find(
        ({ id }) => id === todoId
      );
      const updatedTodo = await changeStatusTodo({
        categoryId: activeCategory,
        todoId,
        body: { status: todo.status === "active" ? "completed" : "active" }
      });
      todosDispatch({
        type: "UPDATE_TODOS",
        payload: { todo: updatedTodo, activeCategory }
      });

      if (updatedTodo.status === "completed") {
        message.success("1 task completed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreateNewTodo = todo => {
    const filterKey = mapFilterKey(activeFilter);
    todosDispatch({
      type: "ADD_CREATED_TODO",
      payload: { todo, filterKey, activeCategory }
    });
    countsDispatch({
      type: "INCREMENT_COUNT_TODOS",
      payload: { activeCategory, filterKey }
    });
  };
  const handleDeleteTodo = deletedTodo => {
    todosDispatch({
      type: "REMOVE_DELETED_TODO",
      payload: { todo: deletedTodo, activeCategory }
    });
    countsDispatch({
      type: "DECREMENT_COUNT_TODOS",
      payload: { todo: deletedTodo, activeCategory }
    });
  };
  const isRowLoaded = ({ index }) => {
    const todosState = mapTodos(activeCategory, activeFilter);
    return !!todosState[index];
  };
  const loadMoreRows = async ({ startIndex, stopIndex }) => {
    const filterKey = mapFilterKey(activeFilter);
    const params = mapQueryParams(activeFilter);

    const limit = stopIndex + 1 - startIndex;
    const offset = startIndex;

    try {
      const data = await getTodosByCategory({
        id: activeCategory,
        params: {
          ...params,
          limit,
          offset
        }
      });
      todosDispatch({
        type: "ADD_LOADED_TODOS",
        payload: { ...data, filterKey }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSortingTodos = async (arr, oldIndex, newIndex) => {
    try {
      const list = arr.map(({ id }) => id);
      await updateSortingTodos({
        categoryId: activeCategory,
        list,
        oldIndex,
        newIndex
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onSortEnd = ({ oldIndex, newIndex }) => {
    const todosState = mapTodos(activeCategory, activeFilter);
    const filterKey = mapFilterKey(activeFilter);

    if (oldIndex === newIndex) {
      return;
    }

    const movedTodos = arrayMove(todosState, oldIndex, newIndex);
    todosDispatch({
      type: "SET_TODOS",
      payload: { id: activeCategory, todos: movedTodos, filterKey }
    });

    forceUpdateList();
    handleSortingTodos(todosState, oldIndex, newIndex);
  };

  if (!loading && !mapTodos(activeCategory, activeFilter).length)
    return (
      <TodoListWrapper>
        <TodoList>
          <EmptyCategory />
        </TodoList>
        <CreateTodo handleCreateNewTodo={handleCreateNewTodo} />
      </TodoListWrapper>
    );

  return (
    <TodoListWrapper>
      <TodoList>
        {loading ? (
          <Preloader />
        ) : (
          <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={mapCount(activeCategory, activeFilter)}
            minimumBatchSize={20}
            threshold={5}
          >
            {({ onRowsRendered }) => (
              <AutoSizer>
                {({ height, width }) => (
                  <SortableVirtualList
                    cache={cache}
                    getRef={getRef}
                    height={height}
                    width={width}
                    onRowsRendered={onRowsRendered}
                    onSortEnd={onSortEnd}
                    todos={mapTodos(activeCategory, activeFilter)}
                    changeStatusTodoHandle={changeStatusTodoHandle}
                    handleDeleteTodo={handleDeleteTodo}
                    todosCount={mapTodos(activeCategory, activeFilter).length}
                    useDragHandle
                  />
                )}
              </AutoSizer>
            )}
          </InfiniteLoader>
        )}
      </TodoList>
      <CreateTodo handleCreateNewTodo={handleCreateNewTodo} />
    </TodoListWrapper>
  );
};

export default TodoListComponent;
