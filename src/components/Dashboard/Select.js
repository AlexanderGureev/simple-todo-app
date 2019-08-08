import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Select, SelectContainer } from "./styles";
import CreateCategory from "./CreateCategoryModal";
import DeleteCategory from "./DeleteCategory";

const IndicatorSeparator = () => null;
const defaultCategory = { value: "No categories", label: "No categories" };

const SelectComponent = () => {
  const { categories } = useStoreState(state => state.session.profile);
  const activeCategory = useStoreState(state => state.session.activeCategory);
  const setActiveCategory = useStoreActions(
    actions => actions.session.setActiveCategory
  );

  const getOptions = () =>
    categories.map(({ name, id, color }) => ({
      value: name,
      label: name,
      id,
      color
    }));

  const onChange = ({ id }) => setActiveCategory(id);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: "rgba(0,0,0,.9)",
      backgroundColor: state.isFocused ? state.data.color : "#fff"
    })
  };

  return (
    <SelectContainer>
      <Select
        styles={customStyles}
        options={getOptions()}
        value={
          getOptions().find(({ id }) => id === activeCategory) ||
          defaultCategory
        }
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
