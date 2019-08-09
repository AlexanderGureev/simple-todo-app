import React from "react";
import { Menu, Dropdown, Icon } from "antd";
import { TodoList } from "./styles";
import { ReactComponent as SettingIcon } from "./img/menu-icon.svg";
import { ReactComponent as CheckIcon } from "./img/checked.svg";

const menu = (
  <Menu>
    <Menu.Item key="0">
      <Icon type="edit" />
      Change task
    </Menu.Item>
    <Menu.Item key="1">
      <Icon type="copy" />
      Duplicate
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">
      <Icon type="delete" />
      Delete task
    </Menu.Item>
  </Menu>
);

const TodoListItem = ({ key, style, todo, onClick }) => (
  <TodoList.Item key={key} style={style}>
    <Dropdown overlay={menu} trigger={["click"]}>
      <TodoList.Item.Icon component={SettingIcon} />
    </Dropdown>
    <TodoList.Item.Icon
      onClick={onClick}
      active={todo.status !== "active"}
      component={CheckIcon}
    />
    <TodoList.Container>
      <TodoList.Item.Text>{todo.text}</TodoList.Item.Text>
      <TodoList.Item.Date>
        {new Date(todo.date).toLocaleDateString()}
      </TodoList.Item.Date>
    </TodoList.Container>
  </TodoList.Item>
);

export default TodoListItem;
