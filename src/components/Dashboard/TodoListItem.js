import React from "react";
import { Dropdown, Icon, Modal } from "antd";
import { useStoreActions, useStoreState } from "easy-peasy";
import { TodoList, TaskMenu } from "./styles";
import { ReactComponent as SettingIcon } from "./img/menu-icon.svg";
import { ReactComponent as CheckIcon } from "./img/checked.svg";

const { confirm } = Modal;

const TaskMenuComponent = ({ onClick }) => {
  const handleClick = props => onClick(props);

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
        <TaskMenu.Item.Text>
          <Icon type="delete" style={{ color: "#ff0000ab" }} />
          Delete task
        </TaskMenu.Item.Text>
      </TaskMenu.Item>
    </TaskMenu>
  );
};

const TodoListItem = ({ todo, handleDeleteTodo, handleChangeStatus }) => {
  const activeCategory = useStoreState(state => state.category.activeCategory);
  const deleteTodo = useStoreActions(actions => actions.todo.deleteTodo);

  const deleteTodoById = async () => {
    try {
      const deletedTodo = await deleteTodo({
        categoryId: activeCategory,
        todoId: todo.id
      });
      handleDeleteTodo(deletedTodo);
    } catch (error) {
      console.log(error);
    }
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this task?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteTodoById();
      }
    });
  };

  const handleClick = ({ key: actionKey }) => {
    const fnMap = {
      edit: () => {},
      duplicate: () => {},
      delete: showDeleteConfirm
    };

    fnMap[actionKey]();
  };

  return (
    <TodoList.Item>
      <Dropdown
        overlay={TaskMenuComponent({ onClick: handleClick })}
        trigger={["click"]}
      >
        <TodoList.Item.Icon component={SettingIcon} />
      </Dropdown>

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
