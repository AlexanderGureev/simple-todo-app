import React from "react";
import { CellMeasurer } from "react-virtualized";
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";
import { TodoItemContainer, DragHandleContainer, StyledList } from "./styles";
import TodoListItem from "./TodoListItem";
import { ReactComponent as MoveBtn } from "./img/move.svg";

const DragHandle = SortableHandle(() => (
  <DragHandleContainer>
    <MoveBtn />
  </DragHandleContainer>
));

const SortableItem = SortableElement(
  ({ key, style, value, handleChangeStatus, handleDeleteTodo }) => {
    return (
      <TodoItemContainer style={style}>
        <DragHandle />
        <TodoListItem
          key={key}
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
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {({ measure }) => (
          <SortableItem
            index={index}
            key={key}
            style={style}
            value={todos[index]}
            handleChangeStatus={changeStatusTodoHandle(todos[index].id)}
            handleDeleteTodo={handleDeleteTodo}
          />
        )}
      </CellMeasurer>
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
      overscanRowCount={0}
    />
  );
};

export default SortableContainer(VirtualList);
