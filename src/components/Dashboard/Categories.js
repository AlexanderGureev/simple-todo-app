import React from "react";
import { AutoSizer, List } from "react-virtualized";
import { useStoreState } from "easy-peasy";
import { Categories, Empty } from "./styles";

const CategoriesComponent = () => {
  const categories = useStoreState(state => state.profile.categories);

  function rowRenderer({ key, index, style }) {
    return (
      <Categories.Item color={categories[index].color} key={key} style={style}>
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
export default React.memo(CategoriesComponent);
