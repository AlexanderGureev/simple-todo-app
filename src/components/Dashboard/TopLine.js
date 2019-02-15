import React from "react";
import { TopLine, Filters, CategoryPrefix } from "./styles";
import Select from "./Select";

const TopLineComponent = () => (
  <TopLine>
    <TopLine.Container>
      <CategoryPrefix color="#0223AD" />
      <Select />
    </TopLine.Container>
    <TopLine.Container>
      <Filters>
        <Filters.Item active>All</Filters.Item>
        <Filters.Item>Completed</Filters.Item>
        <Filters.Item>Primary</Filters.Item>
      </Filters>
    </TopLine.Container>
  </TopLine>
);

export default TopLineComponent;
