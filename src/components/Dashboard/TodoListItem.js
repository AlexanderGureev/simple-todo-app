import React, { useState, useRef } from "react";
import { Dropdown, Icon, Popconfirm } from "antd";
import { useStoreActions, useStoreState } from "easy-peasy";
import { TodoList, TaskMenu, DropdownContainer } from "./styles";
import { ReactComponent as SettingIcon } from "./img/menu-icon.svg";
import { ReactComponent as CheckIcon } from "./img/checked.svg";
import useOnClickOutside from "../libs/useOnClickOutside";

const TaskMenuComponent = ({ onClick }) => {
  const handleClick = props => {
    if (props.key === "delete") return;
    onClick(props);
  };
  return (
    <TaskMenu onClick={handleClick}>
      <TaskMenu.Item key="edit">
        <TaskMenu.Item.Text>
          <Icon type="edit" />
          Change task
        </TaskMenu.Item.Text>
      </TaskMenu.Item>
      <TaskMenu.Item key="duplicate">
        <TaskMenu.Item.Text>
          <Icon type="copy" />
          Duplicate
        </TaskMenu.Item.Text>
      </TaskMenu.Item>
      <TaskMenu.Divider />
      <TaskMenu.Item key="delete">
        <Popconfirm
          onConfirm={e => onClick({ key: "delete", domEvent: e })}
          title="Are you sure？"
          icon={
            <Icon type="question-circle-o" style={{ color: "#ff0000ab" }} />
          }
        >
          <TaskMenu.Item.Text>
            <Icon type="delete" style={{ color: "#ff0000ab" }} />
            Delete task
          </TaskMenu.Item.Text>
        </Popconfirm>
      </TaskMenu.Item>
    </TaskMenu>
  );
};

const TodoListItem = ({ todo, handleDeleteTodo, handleChangeStatus }) => {
  const { activeCategory } = useStoreState(state => state.session);
  const { deleteTodo: deleteTodoAction } = useStoreActions(
    actions => actions.session
  );
  const [visible, setVisible] = useState(false);
  const menuRef = useRef();

  useOnClickOutside(menuRef, () => setVisible(false));
  const handleOpenDropdown = e => setVisible(!visible);

  const deleteTodoById = async () => {
    try {
      const deletedTodo = await deleteTodoAction({
        categoryId: activeCategory,
        todoId: todo.id
      });
      handleDeleteTodo(deletedTodo);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = ({ key: actionKey, domEvent }) => {
    const fnMap = {
      edit: () => {},
      duplicate: () => {},
      delete: deleteTodoById
    };

    fnMap[actionKey]();
  };

  return (
    <TodoList.Item>
      <DropdownContainer ref={menuRef} id="dropDownContainer">
        <Dropdown
          getPopupContainer={() => document.getElementById("dropDownContainer")}
          onClick={handleOpenDropdown}
          overlay={TaskMenuComponent({ onClick: handleClick })}
          visible={visible}
        >
          <TodoList.Item.Icon component={SettingIcon} />
        </Dropdown>
      </DropdownContainer>

      <TodoList.Item.Icon
        onClick={handleChangeStatus}
        active={todo.status !== "active"}
        component={CheckIcon}
      />
      <TodoList.Container>
        <TodoList.Item.Text>{todo.text}</TodoList.Item.Text>
        <TodoList.Item.Date>
          {new Date(todo.date).toLocaleString()}
        </TodoList.Item.Date>
      </TodoList.Container>
    </TodoList.Item>
  );
};

export default TodoListItem;
