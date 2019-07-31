import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import {
  Select,
  SelectContainer,
  CustomIcon as DeleteCategoryBtn
} from "./styles";
import CreateCategory from "./CreateCategoryModal";
import DeleteCategory from "./DeleteCategory";
import { ReactComponent as RemoveIcon } from "./img/remove.svg";

const IndicatorSeparator = () => null;

const SelectComponent = () => {
  const { categories } = useStoreState(state => state.session.profile);
  const activeCategory = useStoreState(state => state.session.activeCategory);
  const setActiveCategory = useStoreActions(
    actions => actions.session.setActiveCategory
  );

  const getOptions = () =>
    categories.map(({ name, id }) => ({
      value: name,
      label: name,
      id
    }));

  const onChange = ({ id }) => setActiveCategory(id);

  return (
    <SelectContainer>
      <Select
        options={getOptions()}
        value={getOptions().find(({ id }) => id === activeCategory)}
        isSearchable={false}
        components={{ IndicatorSeparator }}
        onChange={onChange}
      />
      <CreateCategory />
      <DeleteCategory />
    </SelectContainer>
  );
};

export default SelectComponent;
