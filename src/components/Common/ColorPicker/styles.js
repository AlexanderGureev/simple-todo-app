import React from "react";
import styled from "styled-components";

export const ColorPickerContainer = styled.div`
  background: #fff;
  position: absolute;
  z-index: 100;
  top: 40px;
  font-family: "Roboto";
  width: ${props => `${props.width}px`};
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
  padding: 12px 15px;
  border-radius: 3px;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 670px) {
    left: -40px;
  }

  @media (max-width: 460px) {
    width: 200px;
    left: 0;
  }
`;

export const ColorBox = styled.div`
  min-width: ${props => `${props.size || 30}px`};
  min-height: ${props => `${props.size || 30}px`};
  background-color: ${props => props.color};
  display: inline-block;
  cursor: pointer;
  transition: 0.3s ease;
  border-radius: 4px;
  margin: 2px 0;

  :hover {
    transform: scale(1.1);
  }
  :not(:last-child) {
    margin-right: 5px;
  }

  @media (max-width: 460px) {
    min-width: 20px;
    min-height: 20px;
  }
`;
export const InputContainer = styled.div`
  display: flex;
  height: 30px;
  max-width: 135px;
  margin: 2px 0;
`;
const Input = styled.input`
  border-radius: 0 4px 4px 0;
  border: 1px solid rgb(240, 240, 240);
  outline: none;
  color: rgba(0, 0, 0, 0.7);
  font-size: 14px;
  padding-left: 5px;
  max-width: 105px;
`;

const Prefix = styled.span`
  background-color: rgb(240, 240, 240);
  font-size: 16px;
  color: rgb(152, 161, 164);
  min-width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px 0 0 4px;
`;

export const ColorInput = ({ className, prefix = "#", ...rest }) => (
  <InputContainer className={className}>
    <Prefix>{prefix}</Prefix>
    <Input {...rest} />
  </InputContainer>
);
