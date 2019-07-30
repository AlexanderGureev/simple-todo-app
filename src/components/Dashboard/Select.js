import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Select } from "./styles";

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
    <Select
      options={getOptions()}
      defaultValue={getOptions().find(({ id }) => id === activeCategory)}
      isSearchable={false}
      components={{ IndicatorSeparator }}
      onChange={onChange}
    />
  );
};

export default SelectComponent;
