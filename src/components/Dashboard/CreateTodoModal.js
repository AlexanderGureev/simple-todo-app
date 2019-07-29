import React, { useState } from "react";
import { useStoreActions } from "easy-peasy";
import { Form, Input, Checkbox, message, Modal } from "antd";
import { Button } from "./styles";

const CreateTodo = ({ form, handleCreateNewTodo }) => {
  const createTodo = useStoreActions(actions => actions.session.createTodo);
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
      if (!err) {
        const data = await createTodo(values);
        message.success("Created new todo!");

        handleCreateNewTodo(data);
        onClose();
      }
    });
  };

  return (
    <>
      <Button onClick={handleCreateTask}>New Task</Button>
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

export default Form.create({ name: "create-todo-form" })(CreateTodo);
