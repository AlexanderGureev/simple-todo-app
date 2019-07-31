import React, { useEffect, useState } from "react";
import {
  CellMeasurer,
  CellMeasurerCache,
  AutoSizer,
  List,
  InfiniteLoader
} from "react-virtualized";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Empty } from "antd";
import { TodoList, EmptyContainer } from "./styles";
import { ReactComponent as SettingIcon } from "./img/menu-icon.svg";
import { ReactComponent as CheckIcon } from "./img/checked.svg";
import CreateTodo from "./CreateTodoModal";
import Preloader from "../Common/Preloader";

const cache = new CellMeasurerCache({
  defaultHeight: 60,
  fixedWidth: true
});

const TodoListComponent = () => {
  const filterOptions = useStoreState(state => state.session.filterOptions);
  const activeCategory = useStoreState(state => state.session.activeCategory);
  const getTodosByCategory = useStoreActions(
    actions => actions.session.getTodosByCategory
  );
  const changeStatusTodo = useStoreActions(
    actions => actions.session.changeStatusTodo
  );
  const [todos, setTodos] = useState({});
  const [count, setCount] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => clearListCache(), [filterOptions, activeCategory]);
  useEffect(() => {
    const filterKey = mapFilterKey(filterOptions);
    if (todos[activeCategory] && todos[activeCategory][filterKey]) return;

    getTodosByCategory({ id: activeCategory, params: filterOptions })
      .then(data => {
        setTodos({
          ...todos,
          [data.id]: {
            ...todos[data.id],
            [filterKey]: data.todos
          }
        });
        setCount({
          ...count,
          [data.id]: {
            ...count[data.id],
            [filterKey]: data.todosCountByCategory
          }
        });
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }, [activeCategory, count, filterOptions, getTodosByCategory, todos]);

  const clearListCache = () => {
    cache.clearAll();
  };
  const changeStatusTodoHandle = todoId => async e => {
    try {
      const todo = todos[activeCategory].all.find(({ id }) => id === todoId);
      const updatedTodo = await changeStatusTodo({
        categoryId: activeCategory,
        todoId,
        body: { status: todo.status === "active" ? "completed" : "active" }
      });

      const todosByFilter = { ...todos[activeCategory] };
      const todosByCategory = Object.keys(todosByFilter).reduce(
        (acc, filter) => {
          if (filter === "completed") {
            return updatedTodo.status === "completed"
              ? { ...acc, [filter]: [...todosByFilter[filter], updatedTodo] }
              : {
                  ...acc,
                  [filter]: todosByFilter[filter].filter(
                    ({ id }) => id !== updatedTodo.id
                  )
                };
          }

          const index = todosByFilter[filter].findIndex(
            ({ id }) => id === updatedTodo.id
          );
          todosByFilter[filter][index] = updatedTodo;
          return { ...acc, [filter]: [...todosByFilter[filter]] };
        },
        {}
      );

      setTodos({
        ...todos,
        [activeCategory]: todosByCategory
      });
    } catch (error) {
      console.log(error);
    }
  };
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
    const countTodosByCategory = count[categoryId];

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

  const handleCreateNewTodo = todo => {
    const filterKey = mapFilterKey(filterOptions);
    const todosByFilter = { ...todos[activeCategory] };
    const todosByCategory = Object.keys(todosByFilter).reduce((acc, filter) => {
      if (filter === "completed" || (filter === "primary" && !todo.primary))
        return acc;

      return { ...acc, [filter]: [...todosByFilter[filter], todo] };
    }, {});

    setTodos({
      ...todos,
      [activeCategory]: todosByCategory
    });
    setCount({
      ...count,
      [activeCategory]: {
        ...count[activeCategory],
        [filterKey]: count[activeCategory][filterKey] + 1
      }
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
          <TodoList.Item key={key} style={style}>
            <TodoList.Item.Icon component={SettingIcon} />
            <TodoList.Item.Icon
              onClick={changeStatusTodoHandle(todosState[index].id)}
              active={todosState[index].status !== "active"}
              component={CheckIcon}
            />
            <TodoList.Container>
              <TodoList.Item.Text>{todosState[index].text}</TodoList.Item.Text>
              <TodoList.Item.Date>
                {new Date(todosState[index].date).toLocaleString()}
              </TodoList.Item.Date>
            </TodoList.Container>
          </TodoList.Item>
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

      setTodos({
        ...todos,
        [data.id]: {
          ...todos[data.id],
          [filterKey]: [...todos[data.id][filterKey], ...data.todos]
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!loading && !mapTodos(activeCategory, filterOptions).length)
    return (
      <>
        <TodoList>
          <EmptyContainer>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </EmptyContainer>
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
