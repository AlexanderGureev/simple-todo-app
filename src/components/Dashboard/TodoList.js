import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  CellMeasurer,
  CellMeasurerCache,
  AutoSizer,
  List,
  InfiniteLoader
} from "react-virtualized";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Empty } from "antd";
import { TodoList, Button } from "./styles";
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
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const prevCategory = useRef(activeCategory);

  if (prevCategory.current !== activeCategory) {
    prevCategory.current = activeCategory;
    setLoading(true);
    setTodos([]);
    setCount(0);
  }

  useEffect(() => {
    getTodosByCategory({ id: activeCategory, params: filterOptions })
      .then(data => {
        setTodos(data.todos);
        setCount(data.todosCountByCategory);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }, [activeCategory, filterOptions, getTodosByCategory]);

  const handleCreateNewTodo = todo => {
    setTodos([...todos, todo]);
    setCount(count + 1);
  };
  const rowRenderer = ({ key, index, parent, style }) => {
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
              active={todos[index].status !== "active"}
              component={CheckIcon}
            />
            <TodoList.Container>
              <TodoList.Item.Text>{todos[index].text}</TodoList.Item.Text>
              <TodoList.Item.Date>
                {new Date(todos[index].date).toLocaleString()}
              </TodoList.Item.Date>
            </TodoList.Container>
          </TodoList.Item>
        )}
      </CellMeasurer>
    );
  };
  const isRowLoaded = ({ index }) => !!todos[index];

  const loadMoreRows = async ({ startIndex, stopIndex }) => {
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
      setTodos([...todos, ...data.todos]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TodoList>
        {loading ? (
          <Preloader />
        ) : (
          <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={count}
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
                    rowCount={todos.length}
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
