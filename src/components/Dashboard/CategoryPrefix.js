import React, { useState, useRef } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { CategoryPrefixContainer, ColorPickerContainer } from "./styles";
import ColorPicker from "../Common/ColorPicker";
import useOnClickOutside from "../libs/useOnClickOutside";

const DEFAULT_PREFIX_COLOR = "#399fe9";

const CategoryPrefixComponent = () => {
  const {
    activeCategory,
    profile: { categories }
  } = useStoreState(state => state.session);

  const { updateCategory } = useStoreActions(actions => actions.session);
  const [visible, setVisible] = useState(false);
  const prefixRef = useRef();
  useOnClickOutside(prefixRef, () => setVisible(false));

  const { color = DEFAULT_PREFIX_COLOR } =
    categories.length && categories.find(({ id }) => id === activeCategory);

  const handleChangeColor = async hex => {
    try {
      if (hex === color) return;
      await updateCategory({ color: hex });
    } catch (error) {
      console.log(error);
    }
  };
  const openColorPicker = () => setVisible(true);

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
