import React, { useState, useCallback } from "react";
import parse from "parse-color";
import { COLORS, DEFAULT_COLOR, debounceFn } from "./libs";
import { ColorBox, ColorInput, ColorPickerContainer } from "./styles";

export default function ColorPicker({
  onChange = () => {},
  defaultColor = DEFAULT_COLOR,
  visible = false,
  width = 280,
  clearTimeout = 1000,
  onChangeTimeout = 1000
}) {
  const defaultState = () => {
    const [, ...rgbColor] = defaultColor;
    return rgbColor.join("");
  };

  const [inputValue, setInputValue] = useState(defaultState());
  const [color, setColor] = useState(defaultState());

  const debouncedOnChange = useCallback(
    debounceFn((...args) => onChange(...args), onChangeTimeout),
    [onChange]
  );
  const clearInput = useCallback(
    debounceFn(
      (value, defColor) =>
        !value ? setInputValue(defColor) : setInputValue(value.slice(1)),
      clearTimeout
    ),
    []
  );

  const handleChangeInput = ({ target }) => {
    const { hex } = parse(`#${target.value}`);

    setInputValue(target.value);
    clearInput(hex, color);

    if (hex) {
      setColor(hex.slice(1));
      debouncedOnChange(hex);
    }
  };

  const handleChangeColor = ({ target }) => {
    if (!target.attributes.color) return;
    const { value } = target.attributes.color;
    const rgbColor = value.slice(1);
    onChange(value);
    setColor(rgbColor);
    setInputValue(rgbColor);
  };

  return (
    visible && (
      <ColorPickerContainer onClick={handleChangeColor} width={width}>
        {COLORS.map(colorValue => (
          <ColorBox color={colorValue} key={colorValue} />
        ))}

        <ColorInput
          type="text"
          value={inputValue}
          onChange={handleChangeInput}
        />
      </ColorPickerContainer>
    )
  );
}
