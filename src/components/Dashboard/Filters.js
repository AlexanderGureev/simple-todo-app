import React, { useCallback } from "react";
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

  const handleChangeFilter = useCallback(
    ({ target }) => {
      const id = Number(target.getAttribute("data-filter-id"));
      setCachedFilter(id);
      setFilter(id);
    },
    [setCachedFilter, setFilter]
  );

  return (
    <Filters onClick={handleChangeFilter}>
      {filters.map((filter, i) => (
        <Filters.Item
          key={filter}
          active={activeFilter === i}
          data-filter-id={i}
        >
          {filter}
        </Filters.Item>
      ))}
    </Filters>
  );
};

export default React.memo(FiltersComponent);
