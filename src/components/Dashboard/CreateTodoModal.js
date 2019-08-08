import React, { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Form, Input, Checkbox, message, Modal } from "antd";
import { Button } from "../Common/styles";

const CreateTodo = ({ form, handleCreateNewTodo }) => {
  const createTodo = useStoreActions(actions => actions.session.createTodo);
  const activeCategory = useStoreState(state => state.session.activeCategory);
  const { categories } = useStoreState(state => state.session.profile);

  const [visible, setVisible] = useState(false);
  const { getFieldDecorator } = form;

  const handleCreateTask = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      try {
        if (!err) {
          const data = await createTodo({
            ...values,
            categoryId: activeCategory
          });
          message.success("Created new todo!");
          handleCreateNewTodo(data);
        }
      } catch (error) {
        message.error(`Todo creation error`);
        console.log(error);
      } finally {
        onClose();
      }
    });
  };

  return (
    <>
      <Button onClick={handleCreateTask} disabled={!categories.length}>
        New Task
      </Button>
      <Modal
        visible={visible}
        title="Create Todo"
        okText="create"
        onCancel={onClose}
        onOk={handleSubmit}
      >
        <Form layout="vertical">
          <Form.Item label="Text">
            {getFieldDecorator("text", {
              rules: [
                {
                  required: true,
                  message: "Please input the text todo!"
                }
              ]
            })(
              <Input.TextArea
                autosize={{ minRows: 5, maxRows: 15 }}
                placeholder="todo text"
              />
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator("primary", {
              initialValue: false
            })(<Checkbox>Primary</Checkbox>)}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Form.create({ name: "createTodoForm" })(CreateTodo);
