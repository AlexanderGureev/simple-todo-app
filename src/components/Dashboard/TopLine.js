import React from "react";
import { TopLine } from "./styles";
import Filters from "./Filters";
import Select from "./Select";
import CategoryPrefix from "./CategoryPrefix";

const TopLineComponent = () => {
  return (
    <TopLine>
      <TopLine.Container>
        <CategoryPrefix />
        <Select />
      </TopLine.Container>
      <TopLine.Container>
        <Filters />
      </TopLine.Container>
    </TopLine>
  );
};

export default React.memo(TopLineComponent);
