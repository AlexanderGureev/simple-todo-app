import React, { useState, useEffect, useRef } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import {
  CategoryPrefixContainer,
  ColorPicker,
  ColorPickerWrapper
} from "./styles";

const COLORS = [
  "#FF6900",
  "#FCB900",
  "#7BDCB5",
  "#00D084",
  "#8ED1FC",
  "#0693E3",
  "#ABB8C3",
  "#EB144C",
  "#F78DA7",
  "#9900EF",
  "#d6c315",
  "#0af2db"
];
const DEFAULT_PREFIX_COLOR = "#399fe9";

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

const CategoryPrefixComponent = () => {
  const {
    activeCategory,
    profile: { categories }
  } = useStoreState(state => state.session);

  const { updateCategory } = useStoreActions(actions => actions.session);
  const [visible, setVisible] = useState(false);

  const prefixRef = useRef();
  useOnClickOutside(prefixRef, () => setVisible(false));

  const handleChangeColor = async ({ hex }) => {
    try {
      await updateCategory({ color: hex });
    } catch (error) {
      console.log(error);
    } finally {
      setVisible(false);
    }
  };

  const openColorPicker = () => setVisible(true);

  const { color = DEFAULT_PREFIX_COLOR } =
    categories.length && categories.find(({ id }) => id === activeCategory);

  return (
    <CategoryPrefixContainer color={color} onClick={openColorPicker}>
      {visible && (
        <ColorPickerWrapper ref={prefixRef}>
          <ColorPicker
            onChangeComplete={handleChangeColor}
            triangle="hide"
            colors={COLORS}
          />
        </ColorPickerWrapper>
      )}
    </CategoryPrefixContainer>
  );
};

export default CategoryPrefixComponent;
