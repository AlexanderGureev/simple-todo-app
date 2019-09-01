import React, { useState, useRef } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { CategoryPrefixContainer, ColorPickerContainer } from "./styles";
import ColorPicker from "../Common/ColorPicker";
import useOnClickOutside from "../libs/useOnClickOutside";

const DEFAULT_PREFIX_COLOR = "#399fe9";

const CategoryPrefixComponent = () => {
  const categories = useStoreState(state => state.profile.categories);
  const activeCategory = useStoreState(state => state.category.activeCategory);
  const updateCategory = useStoreActions(
    actions => actions.category.updateCategory
  );
  const [visible, setVisible] = useState(false);
  const prefixRef = useRef();
  useOnClickOutside(prefixRef, () => setVisible(false));

  const handleChangeColor = async hex => {
    try {
      if (hex === color) return;
      await updateCategory({ color: hex });
    } catch (error) {
      console.log(error);
    }
  };
  const openColorPicker = () => setVisible(true);

  const foundCategory = categories.find(({ id }) => id === activeCategory);
  const { color = DEFAULT_PREFIX_COLOR } = foundCategory || {};

  return (
    <ColorPickerContainer ref={prefixRef}>
      <CategoryPrefixContainer color={color} onClick={openColorPicker}>
        <ColorPicker
          defaultColor={DEFAULT_PREFIX_COLOR}
          visible={visible}
          onChange={handleChangeColor}
        />
      </CategoryPrefixContainer>
    </ColorPickerContainer>
  );
};

export default CategoryPrefixComponent;
