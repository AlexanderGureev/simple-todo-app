import React from "react";
import { AutoSizer, List } from "react-virtualized";
import { Categories } from "./styles";

const list = [
  { color: "#0223AD", text: "Development" },
  { color: "#22CBBE", text: "Design" },
  { color: "#D90799", text: "Management" },
  { color: "#7CE216", text: "Home" },
  { color: "#0223AD", text: "Development" },
  { color: "#22CBBE", text: "Design" },
  { color: "#D90799", text: "Management" },
  { color: "#7CE216", text: "Home" },
  { color: "#0223AD", text: "Development" },
  { color: "#22CBBE", text: "Design" },
  { color: "#D90799", text: "Management" },
  { color: "#7CE216", text: "Home" },
  { color: "#0223AD", text: "Development" },
  { color: "#22CBBE", text: "Design" },
  { color: "#D90799", text: "Management" },
  { color: "#7CE216", text: "Home" },
  { color: "#0223AD", text: "Development" },
  { color: "#22CBBE", text: "Design" },
  { color: "#D90799", text: "Management" },
  { color: "#7CE216", text: "Home" }
];

function rowRenderer({ key, index, style }) {
  return (
    <Categories.Item color={list[index].color} key={key} style={style}>
      {list[index].text}
    </Categories.Item>
  );
}

const CategoriesComponent = () => (
  <Categories>
    <Categories.Title>Categories</Categories.Title>
    <Categories.Container>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            rowCount={list.length}
            rowHeight={40}
            rowRenderer={rowRenderer}
            width={width}
          />
        )}
      </AutoSizer>
    </Categories.Container>
  </Categories>
);

export default CategoriesComponent;
