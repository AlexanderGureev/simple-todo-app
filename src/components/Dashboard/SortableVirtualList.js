import React from "react";
import { CellMeasurer } from "react-virtualized";
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";
import {
  TodoItemContainer,
  DragHandleContainer,
  StyledList,
  CellWrapper
} from "./styles";
import TodoListItem from "./TodoListItem";
import { ReactComponent as MoveBtn } from "./img/move.svg";

const DragHandle = SortableHandle(() => (
  <DragHandleContainer>
    <MoveBtn />
  </DragHandleContainer>
));

const SortableItem = SortableElement(
  ({ style, value, handleChangeStatus, handleDeleteTodo }) => {
    return (
      <TodoItemContainer style={style}>
        <DragHandle />
        <TodoListItem
          todo={value}
          handleChangeStatus={handleChangeStatus}
          handleDeleteTodo={handleDeleteTodo}
          dragComponent={<DragHandle />}
        />
      </TodoItemContainer>
    );
  }
);

const VirtualList = ({
  cache,
  getRef,
  todosCount,
  todos,
  height,
  width,
  onRowsRendered,
  changeStatusTodoHandle,
  handleDeleteTodo
}) => {
  const rowRenderer = ({ key, index, parent, style }) => {
    return (
      <CellWrapper key={todos[index].id}>
        <CellMeasurer
          cache={cache}
          columnIndex={0}
          key={key}
          parent={parent}
          rowIndex={index}
        >
          {() => (
            <SortableItem
              index={index}
              style={style}
              value={todos[index]}
              handleChangeStatus={changeStatusTodoHandle(todos[index].id)}
              handleDeleteTodo={handleDeleteTodo}
            />
          )}
        </CellMeasurer>
      </CellWrapper>
    );
  };

  return (
    <StyledList
      deferredMeasurementCache={cache}
      rowHeight={cache.rowHeight}
      onRowsRendered={onRowsRendered}
      ref={getRef}
      height={height}
      width={width}
      rowCount={todosCount}
      rowRenderer={rowRenderer}
      overscanRowCount={20}
    />
  );
};

export default SortableContainer(VirtualList);
