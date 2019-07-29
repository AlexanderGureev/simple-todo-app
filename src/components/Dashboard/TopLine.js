import React, { useState } from "react";
import { useStoreActions } from "easy-peasy";
import { v4 } from "uuid";
import { TopLine, Filters, CategoryPrefix } from "./styles";
import Select from "./Select";

const filters = [
  { id: v4(), text: "All", filter: {} },
  { id: v4(), text: "Active", filter: { status: "active" } },
  { id: v4(), text: "Completed", filter: { status: "completed" } },
  { id: v4(), text: "Primary", filter: { primary: true } }
];

const TopLineComponent = () => {
  const setFilter = useStoreActions(state => state.session.setFilter);
  const [active, setActiveFilter] = useState(0);

  const handleChangeFilter = (id, filterOptions) => {
    setActiveFilter(id);
    setFilter(filterOptions);
  };

  return (
    <TopLine>
      <TopLine.Container>
        <CategoryPrefix color="#0223AD" />
        <Select />
      </TopLine.Container>
      <TopLine.Container>
        <Filters>
          {filters.map(({ id, text, filter }, i) => (
            <Filters.Item
              key={id}
              active={active === i}
              onClick={() => handleChangeFilter(i, filter)}
            >
              {text}
            </Filters.Item>
          ))}
        </Filters>
      </TopLine.Container>
    </TopLine>
  );
};

export default TopLineComponent;
