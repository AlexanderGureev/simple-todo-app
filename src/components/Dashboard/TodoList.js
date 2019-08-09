import React, { useEffect, useState, useReducer } from "react";
import {
  CellMeasurer,
  CellMeasurerCache,
  AutoSizer,
  List,
  InfiniteLoader
} from "react-virtualized";
import { useStoreActions, useStoreState } from "easy-peasy";
import { message } from "antd";
import { TodoList } from "./styles";
import CreateTodo from "./CreateTodoModal";
import Preloader from "../Common/Preloader";
import EmptyCategory from "./EmptyCategory";
import TodoListItem from "./TodoListItem";

const cache = new CellMeasurerCache({
  defaultHeight: 60,
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
      const todosByFilter = Object.entries(state[activeCategory]);
      const todosByCategory = todosByFilter.reduce((acc, [filter, todos]) => {
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
      const todosByFilter = Object.entries(state[activeCategory]);
      const todosByCategory = todosByFilter.reduce((acc, [filter, todos]) => {
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
    default:
      return state;
  }
}

const TodoListComponent = () => {
  const filterOptions = useStoreState(state => state.session.filterOptions);
  const activeCategory = useStoreState(state => state.session.activeCategory);
  const getTodosByCategory = useStoreActions(
    actions => actions.session.getTodosByCategory
  );
  const changeStatusTodo = useStoreActions(
    actions => actions.session.changeStatusTodo
  );
  const [loading, setLoading] = useState(false);
  const [todos, todosDispatch] = useReducer(todoReducer, {});
  const [counts, countsDispatch] = useReducer(countReducer, {});

  useEffect(() => {
    async function fetchTodosByCategory() {
      try {
        setLoading(true);
        const data = await getTodosByCategory({
          id: activeCategory,
          params: filterOptions
        });
        todosDispatch({ type: "SET_TODOS", payload: { ...data, filterKey } });
        countsDispatch({
          type: "SET_COUNT_TODOS",
          payload: { ...data, filterKey }
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }

    clearListCache();
    const filterKey = mapFilterKey(filterOptions);
    if (
      (todos[activeCategory] && todos[activeCategory][filterKey]) ||
      !activeCategory
    )
      return;

    fetchTodosByCategory();
  }, [activeCategory, filterOptions]); //eslint-disable-line

  const clearListCache = () => cache.clearAll();
  const mapFilterKey = filter => {
    const [filterKey = "all"] = Object.keys(filter);
    switch (filterKey) {
      case "status":
        return filter[filterKey];
      case "primary":
        return filterKey;
      default:
        return filterKey;
    }
  };
  const mapTodos = (categoryId, filter) => {
    const filterKey = mapFilterKey(filter);
    const todosByCategory = todos[categoryId];

    if (!todosByCategory) return [];

    switch (filterKey) {
      case "primary":
        return todosByCategory.primary || [];
      case "active":
        return todosByCategory.active || [];
      case "completed":
        return todosByCategory.completed || [];
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
      const todo = todos[activeCategory].all.find(({ id }) => id === todoId);
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
    const filterKey = mapFilterKey(filterOptions);
    todosDispatch({
      type: "ADD_CREATED_TODO",
      payload: { todo, filterKey, activeCategory }
    });
    countsDispatch({
      type: "INCREMENT_COUNT_TODOS",
      payload: { activeCategory, filterKey }
    });
  };
  const rowRenderer = ({ key, index, parent, style }) => {
    const todosState = mapTodos(activeCategory, filterOptions);
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {({ measure }) => (
          <TodoListItem
            key={key}
            style={style}
            todo={todosState[index]}
            onClick={changeStatusTodoHandle(todosState[index].id)}
          />
        )}
      </CellMeasurer>
    );
  };
  const isRowLoaded = ({ index }) => {
    const todosState = mapTodos(activeCategory, filterOptions);
    return !!todosState[index];
  };
  const loadMoreRows = async ({ startIndex, stopIndex }) => {
    const filterKey = mapFilterKey(filterOptions);
    const limit = stopIndex + 1 - startIndex;
    const offset = startIndex;
    try {
      const data = await getTodosByCategory({
        id: activeCategory,
        params: {
          ...filterOptions,
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

  if (!loading && !mapTodos(activeCategory, filterOptions).length)
    return (
      <>
        <TodoList>
          <EmptyCategory />
        </TodoList>
        <CreateTodo handleCreateNewTodo={handleCreateNewTodo} />
      </>
    );

  return (
    <>
      <TodoList>
        {loading ? (
          <Preloader />
        ) : (
          <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={mapCount(activeCategory, filterOptions)}
            minimumBatchSize={10}
            threshold={5}
          >
            {({ onRowsRendered, registerChild }) => (
              <AutoSizer>
                {({ height, width }) => (
                  <List
                    deferredMeasurementCache={cache}
                    rowHeight={cache.rowHeight}
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                    height={height}
                    rowCount={mapTodos(activeCategory, filterOptions).length}
                    rowRenderer={rowRenderer}
                    width={width}
                    overscanRowCount={0}
                  />
                )}
              </AutoSizer>
            )}
          </InfiniteLoader>
        )}
      </TodoList>
      <CreateTodo handleCreateNewTodo={handleCreateNewTodo} />
    </>
  );
};

export default TodoListComponent;
