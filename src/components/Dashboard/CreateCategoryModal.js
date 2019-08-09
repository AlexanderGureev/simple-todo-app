import React, { useState } from "react";
import { Form, Input, message, Modal } from "antd";
import { useStoreActions } from "easy-peasy";
import { CustomIcon as CreateCategoryBtn } from "./styles";
import { ReactComponent as PlusIcon } from "./img/add.svg";

const CreateCategory = ({ form }) => {
  const createCategory = useStoreActions(
    actions => actions.session.createCategory
  );
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getFieldDecorator } = form;

  const onOpen = () => {
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
        try {
          setLoading(true);
          const { name } = await createCategory(values);
          message.success(`Category ${name} success created.`);
        } catch (error) {
          message.error(`Сategory creation error`);
          console.log(error);
        } finally {
          setLoading(false);
          onClose();
        }
      }
    });
  };

  return (
    <>
      <CreateCategoryBtn
        onClick={onOpen}
        component={PlusIcon}
        color="hsl(0,0%,80%)"
      />
      <Modal
        visible={visible}
        title="Create Category"
        okText="Create"
        onCancel={onClose}
        onOk={handleSubmit}
        confirmLoading={loading}
      >
        <Form layout="vertical">
          <Form.Item>
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Please input the name category!"
                }
              ]
            })(<Input placeholder="Name category" />)}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Form.create({ name: "createCategoryForm" })(CreateCategory);
