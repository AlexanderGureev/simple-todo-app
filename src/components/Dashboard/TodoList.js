import React, { useEffect, useState } from "react";
import {
  CellMeasurer,
  CellMeasurerCache,
  AutoSizer,
  List,
  InfiniteLoader
} from "react-virtualized";
import { useStoreActions, useStoreState } from "easy-peasy";
import { TodoList, Button } from "./styles";
import { ReactComponent as SettingIcon } from "./img/menu-icon.svg";
import { ReactComponent as CheckIcon } from "./img/checked.svg";
import CreateTodo from "./CreateTodoModal";

const cache = new CellMeasurerCache({
  defaultHeight: 60,
  fixedWidth: true
});

const TodoListComponent = () => {
  const filterOptions = useStoreState(state => state.session.filterOptions);
  const getTodos = useStoreActions(actions => actions.session.getTodos);
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getTodos(filterOptions).then(data => {
      console.log(data);
      setTodos(data.todos);
      setCount(data.countTodos);
    });
  }, [filterOptions, getTodos]);

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
      const data = await getTodos({ ...filterOptions, limit, offset });
      setTodos([...todos, ...data.todos]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TodoList>
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
      </TodoList>
      <CreateTodo handleCreateNewTodo={handleCreateNewTodo} />
    </>
  );
};

export default TodoListComponent;
