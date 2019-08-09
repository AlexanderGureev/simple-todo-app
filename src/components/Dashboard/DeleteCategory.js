import React, { useState } from "react";
import { Popconfirm, message } from "antd";
import { useStoreActions, useStoreState } from "easy-peasy";
import { CustomIcon as DeleteCategoryBtn } from "./styles";
import { ReactComponent as RemoveIcon } from "./img/remove.svg";

const DeleteCategory = () => {
  const activeCategory = useStoreState(state => state.session.activeCategory);
  const deleteCategory = useStoreActions(
    actions => actions.session.deleteCategory
  );

  const confirm = async e => {
    try {
      const { name } = await deleteCategory(activeCategory);
      message.success(`Category ${name} success deleted.`);
    } catch (error) {
      message.error(`Category delete failed`);
      console.log(error);
    }
  };

  return (
    <Popconfirm
      title="Are you sure delete this category?"
      onConfirm={confirm}
      okText="Yes"
      cancelText="No"
      disabled={!activeCategory}
    >
      <DeleteCategoryBtn component={RemoveIcon} color="hsl(0,0%,80%)" />
    </Popconfirm>
  );
};

export default DeleteCategory;
