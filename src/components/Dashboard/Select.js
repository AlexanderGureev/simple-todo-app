import React from "react";
import { Select } from "./styles";

const IndicatorSeparator = () => null;

const options = [
  { value: "home1", label: "Home1" },
  { value: "home2", label: "Home2" },
  { value: "home3", label: "Home3" },
  { value: "home4", label: "Home4" }
];
const SelectComponent = () => (
  <Select
    options={options}
    defaultValue={options[0]}
    isSearchable={false}
    components={{ IndicatorSeparator }}
  />
);

export default SelectComponent;
