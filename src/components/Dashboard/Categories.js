import React from "react";
import { AutoSizer, List } from "react-virtualized";
import { useStoreState } from "easy-peasy";
import { Empty } from "antd";
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

const CategoriesComponent = () => {
  const { categories } = useStoreState(state => state.session.profile);

  function rowRenderer({ key, index, style }) {
    return (
      <Categories.Item color={list[index].color} key={key} style={style}>
        {categories[index].name}
      </Categories.Item>
    );
  }

  return (
    <Categories>
      <Categories.Title>Categories</Categories.Title>
      {!categories.length ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <>
          <Categories.Container count={categories.length}>
            <AutoSizer>
              {({ height, width }) => (
                <List
                  height={height}
                  rowCount={categories.length}
                  rowHeight={40}
                  rowRenderer={rowRenderer}
                  width={width}
                />
              )}
            </AutoSizer>
          </Categories.Container>
        </>
      )}
    </Categories>
  );
};
export default CategoriesComponent;
