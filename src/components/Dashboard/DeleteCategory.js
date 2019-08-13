import React from "react";
import { Popconfirm } from "antd";
import { CustomIcon as DeleteCategoryBtn } from "./styles";
import { ReactComponent as RemoveIcon } from "./img/remove.svg";

const DeleteCategory = ({ activeCategory, handleDeleteCategory }) => {
  const confirm = async e => {
    try {
      await handleDeleteCategory(e);
    } catch (error) {
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
