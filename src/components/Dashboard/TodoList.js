import React from "react";
import {
  CellMeasurer,
  CellMeasurerCache,
  AutoSizer,
  List
} from "react-virtualized";
import { TodoList, Button } from "./styles";
import { ReactComponent as SettingIcon } from "./img/menu-icon.svg";
import { ReactComponent as CheckIcon } from "./img/checked.svg";

const todos = [
  {
    text:
      "Buy a cakeBuy a cakeBuy a cakeBuy a cakeBuy a cakeBuy a cakeBuy a cakeBuy a cakeBuy a cakeBuy a cakeBuy a cakeBuy a cakeBuy a cakeBuy a cake a cake",
    date: "22 Feb, 2018",
    active: true
  },
  { text: "Look for a bigger Nutella", date: "22 Feb, 2018" },
  { text: "Pick up wine for tonight", date: "22 Feb, 2018", active: true },
  { text: "Buy fruit", date: "22 Feb, 2018" },
  { text: "Buy a cake", date: "22 Feb, 2018" },
  { text: "Pick up wine for tonight", date: "22 Feb, 2018" },
  { text: "Buy a cake", date: "22 Feb, 2018", active: true },
  { text: "Look for a bigger Nutella", date: "22 Feb, 2018" },
  { text: "Pick up wine for tonight", date: "22 Feb, 2018", active: true },
  { text: "Buy fruit", date: "22 Feb, 2018" },
  { text: "Buy a cake", date: "22 Feb, 2018" },
  { text: "Pick up wine for tonight", date: "22 Feb, 2018" },
  { text: "Buy a cake", date: "22 Feb, 2018", active: true },
  { text: "Look for a bigger Nutella", date: "22 Feb, 2018" },
  { text: "Pick up wine for tonight", date: "22 Feb, 2018", active: true },
  { text: "Buy fruit", date: "22 Feb, 2018" },
  { text: "Buy a cake", date: "22 Feb, 2018" },
  { text: "Pick up wine for tonight", date: "22 Feb, 2018" }
];

const cache = new CellMeasurerCache({
  defaultHeight: 60,
  fixedWidth: true
});

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
            active={todos[index].active}
            component={CheckIcon}
          />
          <TodoList.Container>
            <TodoList.Item.Text>{todos[index].text}</TodoList.Item.Text>
            <TodoList.Item.Date>{todos[index].date}</TodoList.Item.Date>
          </TodoList.Container>
        </TodoList.Item>
      )}
    </CellMeasurer>
  );
};

const TodoListComponent = () => {
  return (
    <>
      <TodoList>
        <AutoSizer>
          {({ height, width }) => (
            <List
              deferredMeasurementCache={cache}
              rowHeight={cache.rowHeight}
              height={height}
              rowCount={todos.length}
              rowRenderer={rowRenderer}
              width={width}
              overscanRowCount={0}
            />
          )}
        </AutoSizer>
      </TodoList>
      <Button>New Task</Button>
    </>
  );
};

export default TodoListComponent;
