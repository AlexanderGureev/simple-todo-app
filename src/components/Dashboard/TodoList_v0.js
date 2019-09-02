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
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(0);

  const listRef = useRef();

  useThrottleFn(() => forceUpdateList(), 500, [
    windowWidth,
    activeCategory,
    activeFilter
  ]);

  useEffect(() => {
    forceUpdateList();
  }, [todos]);

  useEffect(() => {
    async function fetchTodosByCategory(id, params) {
      try {
        setLoading(true);
        const data = await getTodosByCategory({
          id,
          params
        });

        console.log("fetch");
        // console.log(params, data, "todos");
        setTodos(data.todos);
        setCount(data.todosCountByCategory);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    const params = mapQueryParams(activeFilter);

    fetchTodosByCategory(activeCategory, params);
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
  const changeStatusTodoHandle = todoId => async e => {
    try {
      const todo = todos.find(({ id }) => id === todoId);
      const updatedTodo = await changeStatusTodo({
        categoryId: activeCategory,
        todoId,
        body: { status: todo.status === "active" ? "completed" : "active" }
      });
      setTodos(
        todos.map(item => (item.id === updatedTodo.id ? updatedTodo : item))
      );

      if (updatedTodo.status === "completed") {
        message.success("1 task completed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreateNewTodo = todo => {
    setTodos([...todos, todo]);
    setCount(count + 1);
  };
  const handleDeleteTodo = deletedTodo => {
    console.log(todos, "до");
    console.log(todos.filter(({ id }) => id !== deletedTodo.id), "после");
    setTodos(todos.filter(({ id }) => id !== deletedTodo.id));
    setCount(count - 1);
  };
  const isRowLoaded = ({ index }) => !!todos[index];
  const loadMoreRows = async ({ startIndex, stopIndex }) => {
    const params = mapQueryParams(activeFilter);
    console.log("rows");
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
      console.log(todos, data.todos);
      setTodos([...todos, ...data.todos]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSortingTodos = async (array, oldIndex, newIndex) => {
    try {
      const list = array.map(({ id }) => id);
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
    if (oldIndex === newIndex) {
      return;
    }

    const movedTodos = arrayMove(todos, oldIndex, newIndex);
    setTodos(movedTodos);

    forceUpdateList();
    handleSortingTodos(todos, oldIndex, newIndex);
  };

  if (!loading && !todos.length)
    return (
      <TodoListWrapper>
        <TodoList>
          <EmptyCategory />
        </TodoList>
        <CreateTodo handleCreateNewTodo={handleCreateNewTodo} />
      </TodoListWrapper>
    );

  console.log(todos, "render");
  return (
    <TodoListWrapper>
      <TodoList>
        {loading ? (
          <Preloader />
        ) : (
          <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={count}
            minimumBatchSize={10}
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
                    todos={todos}
                    changeStatusTodoHandle={changeStatusTodoHandle}
                    handleDeleteTodo={handleDeleteTodo}
                    todosCount={todos.length}
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
