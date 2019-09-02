import React from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useLocalStorage } from "react-use";
import { Filters } from "./styles";
import { ACTIVE_FILTER_CACHE_KEY } from "../../services/cache";

const FiltersComponent = () => {
  const [cachedFilter, setCachedFilter] = useLocalStorage(
    ACTIVE_FILTER_CACHE_KEY,
    0
  );
  const setFilter = useStoreActions(actions => actions.filter.setFilter);
  const activeFilter = useStoreState(state => state.filter.activeFilter);
  const filters = useStoreState(state => state.filter.filters);

  if (cachedFilter && activeFilter !== cachedFilter) {
    setFilter(cachedFilter);
  }

  const handleChangeFilter = id => {
    setCachedFilter(id);
    setFilter(id);
  };

  return (
    <Filters>
      {filters.map((filter, i) => (
        <Filters.Item
          key={filter}
          active={activeFilter === i}
          onClick={() => handleChangeFilter(i)}
        >
          {filter}
        </Filters.Item>
      ))}
    </Filters>
  );
};

export default FiltersComponent;
