import React from "react";
import { useStoreActions } from "easy-peasy";
import { useLocalStorage } from "react-use";
import { Filters } from "./styles";
import { ACTIVE_FILTER_CACHE_KEY } from "../../services/cache";

const filters = [
  { id: "all", text: "All", filter: {} },
  { id: "active", text: "Active", filter: { status: "active" } },
  { id: "completed", text: "Completed", filter: { status: "completed" } },
  { id: "primary", text: "Primary", filter: { primary: true } }
];

const FiltersComponent = () => {
  const [cachedFilter, setCachedFilter] = useLocalStorage(
    ACTIVE_FILTER_CACHE_KEY,
    0
  );
  const setFilter = useStoreActions(state => state.session.setFilter);

  const handleChangeFilter = (id, filter) => {
    setCachedFilter(id);
    setFilter(filter);
  };

  return (
    <Filters>
      {filters.map(({ id, text, filter }, i) => (
        <Filters.Item
          key={id}
          active={cachedFilter === i}
          onClick={() => handleChangeFilter(i, filter)}
        >
          {text}
        </Filters.Item>
      ))}
    </Filters>
  );
};

export default FiltersComponent;
