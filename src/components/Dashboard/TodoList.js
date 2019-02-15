import React from "react";
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

const TodoListComponent = () => {
  return (
    <>
      <TodoList>
        {todos.map(({ text, date, active = false }, index) => (
          <TodoList.Item key={index}>
            <TodoList.Item.Icon component={SettingIcon} />
            <TodoList.Item.Icon active={active} component={CheckIcon} />
            <TodoList.Container>
              <TodoList.Item.Text>{text}</TodoList.Item.Text>
              <TodoList.Item.Date>{date}</TodoList.Item.Date>
            </TodoList.Container>
          </TodoList.Item>
        ))}
      </TodoList>
      <Button>New Task</Button>
    </>
  );
};

export default TodoListComponent;
