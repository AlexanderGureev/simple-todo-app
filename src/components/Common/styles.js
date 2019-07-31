import styled from "styled-components";
import { Button as AntdButton } from "antd";

export const PreloaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled(AntdButton)`
  border: none;
  border-radius: 10px;
  color: #fff;
  font-size: 15px;
  font-weight: 400;

  background: linear-gradient(135deg, #60cbf2, #0340a0);
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(0, 92, 182, 0.25);
  padding: 10px 70px;
  outline: none;
  transition: 0.3s ease;
  opacity: ${props => (props.disabled ? ".7" : "1")};
  height: auto;
  display: block;
  margin: 0 auto;

  span {
    transition: 0.3s ease;
  }

  :hover[disabled] {
    color: #fff;
  }

  :disabled,
  :hover,
  :focus {
    background: linear-gradient(135deg, #60cbf2, #0340a0);
    color: #fff;
  }
  @media (max-width: 490px) {
    padding: 10px 50px;
  }
`;
