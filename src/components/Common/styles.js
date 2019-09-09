import styled, { keyframes } from "styled-components";
import { Button as AntdButton } from "antd";
import { ReactComponent as Logo } from "../Home/img/miniLogo.svg";

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

  &.ant-btn-loading:not(.ant-btn-circle):not(.ant-btn-circle-outline):not(.ant-btn-icon-only) {
    padding: 10px 70px;
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

const animateBg = keyframes`
  from {
    opacity: 1;
  } 
  to {
    opacity: 0;
    
  }
`;

export const LoadingContainer = styled.div`
  position: fixed;
  z-index: 10000;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #6dccef, #d4ebff);
  transition: 3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${animateBg} 0.5s ease;
  animation-delay: ${props => `${props.delay}s`};
  animation-fill-mode: forwards;
`;

export const LoadingIcon = styled(Logo)`
  width: 100px;
  position: relative;
  left: 12px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
