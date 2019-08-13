import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useLocalStorage } from "react-use";
import { message } from "antd";
import { Select, SelectContainer } from "./styles";
import CreateCategory from "./CreateCategoryModal";
import DeleteCategory from "./DeleteCategory";
import { ACTIVE_CATEGORY_CACHE_KEY } from "../../services/cache";

const IndicatorSeparator = () => null;
const defaultCategory = { value: "empty", label: "empty" };

const SelectComponent = () => {
  const { categories } = useStoreState(state => state.session.profile);
  const activeCategory = useStoreState(state => state.session.activeCategory);
  const setCategory = useStoreActions(actions => actions.session.setCategory);
  const { deleteCategory } = useStoreActions(actions => actions.session);
  const { createCategory } = useStoreActions(actions => actions.session);
  const [cachedCategory, setCachedCategory] = useLocalStorage(
    ACTIVE_CATEGORY_CACHE_KEY,
    ""
  );

  if (cachedCategory && activeCategory !== cachedCategory) {
    setCategory(cachedCategory);
  }

  const onChange = ({ id }) => {
    setCachedCategory(id);
    setCategory(id);
  };

  const handleDeleteCategory = async () => {
    try {
      setCachedCategory("");
      const { name } = await deleteCategory(activeCategory);
      message.success(`Category ${name} success deleted.`);
    } catch (error) {
      message.error(`Category delete failed`);
      throw error;
    }
  };

  const handleCreateCategory = async values => {
    try {
      const { name, id } = await createCategory(values);
      setCachedCategory(id);
      message.success(`Category ${name} success created.`);
    } catch (error) {
      message.error(`Сategory creation error`);
      throw error;
    }
  };

  const getOptions = () =>
    categories.map(({ name, id, color }) => ({
      value: name,
      label: name,
      id,
      color
    }));

  return (
    <SelectContainer>
      <Select
        options={getOptions()}
        value={
          getOptions().find(({ id }) => activeCategory === id) ||
          defaultCategory
        }
        isSearchable={false}
        components={{ IndicatorSeparator }}
        onChange={onChange}
      />
      <CreateCategory handleCreateCategory={handleCreateCategory} />
      <DeleteCategory
        handleDeleteCategory={handleDeleteCategory}
        activeCategory={activeCategory}
      />
    </SelectContainer>
  );
};

export default SelectComponent;
