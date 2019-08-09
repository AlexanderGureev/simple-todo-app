import styled, { keyframes } from "styled-components";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Link } from "react-router-dom";
import {
  Button as AntdButton,
  Input as AntdInput,
  Form as AntdForm
} from "antd";
import { ReactComponent as Logo } from "./img/logo.svg";

export const Header = styled.div`
  height: 100vh;
  min-height: 800px;
  width: 100%;
  position: relative;
  background: url(${props => props.src}) no-repeat center -150px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

Header.Logo = styled(Logo)`
  margin: 40px 0 0 50px;
  cursor: pointer;

  @media (max-width: 590px) {
    margin: 40px 0 0 30px;
    width: 130px;
  }
`;

const Title = styled.p`
  font-weight: 700;
  color: #fff;
  font-size: 60px;
  margin: 0;

  @media (max-width: 890px) {
    font-size: 45px;
  }

  @media (max-width: 590px) {
    font-size: 35px;
  }
`;
const Caption = styled(Title)`
  padding-top: 10px;
  font-size: 25px;

  @media (max-width: 890px) {
    font-size: 18px;
  }
  @media (max-width: 590px) {
    font-size: 14px;
  }
`;

const Container = styled.div`
  margin-top: 25vh;
  text-align: center;

  @media (max-width: 720px) {
    margin-top: 20vh;
  }
`;
const ScrollBtn = styled(AnchorLink)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(180deg, #65dafd, #066ee8);
  box-shadow: 0 5px 15px rgba(119, 217, 247, 0.15);
  cursor: pointer;
  position: absolute;
  top: 650px;

  &::after {
    background: url(${props => props.src}) no-repeat center center;
    content: "";
    position: absolute;
    width: 35px;
    height: 35px;
    top: 12.5px;
    left: 12px;
    margin: 0 auto;
    background-size: contain;

    @media (max-width: 720px) {
      width: 20px;
      height: 20px;
      top: 10px;
      left: 10px;
    }
  }

  @media (max-width: 720px) {
    width: 40px;
    height: 40px;
    top: 620px;
  }
`;

Header.ScrollBtn = ScrollBtn;
Header.Container = Container;
Header.Title = Title;
Header.Caption = Caption;

export const Content = styled.div`
  min-height: 900px;
  width: 100%;
  position: relative;
  background: url(${props => props.src}) no-repeat center top;
  background-size: cover;
`;

Content.Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: ${props => `${props.top}px`};
  padding-bottom: ${props => `${props.bottom || 0}px`};
  text-align: center;

  @media (max-width: 490px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;
Content.Title = Title;
Content.Caption = Caption;

export const Form = styled.form`
  max-width: 560px;
  border-radius: 50px;
  padding: 50px 80px;
  background: #fff;
  box-shadow: 0 30px 40px rgba(0, 83, 165, 0.3);
  margin: 0 15px;

  @media (max-width: 590px) {
    padding: 50px;
  }

  @media (max-width: 490px) {
    padding: 50px 30px;
  }
`;

const FormHeader = styled.div`
  text-align: center;
`;

const FormHeaderTitle = styled.p`
  color: #003db1;
  font-size: 42px;
  font-weight: 500;

  margin: 0;

  @media (max-width: 590px) {
    font-size: 40px;
  }
  @media (max-width: 490px) {
    font-size: 30px;
  }
`;
const FormHeaderCaption = styled.p`
  color: #848080;
  font-size: 16px;
  font-weight: 300;

  margin: 0;
  padding-top: 10px;

  @media (max-width: 590px) {
    font-size: 14px;
  }

  @media (max-width: 490px) {
    font-size: 12px;
  }
`;
Form.Header = FormHeader;
FormHeader.Title = FormHeaderTitle;
FormHeader.Caption = FormHeaderCaption;

const SocialBlock = styled.div`
  padding: 30px 0;
  text-align: center;
`;
SocialBlock.Icon = styled.img.attrs(props => ({
  src: props.src
}))`
  height: 50px;
  cursor: pointer;
  &:not(:last-child) {
    padding-right: 40px;
  }

  @media (max-width: 590px) {
    height: 40px;
  }

  @media (max-width: 490px) {
    &:not(:last-child) {
      padding-right: 20px;
    }
  }
`;

Form.SocialBlock = SocialBlock;
const InputGroup = styled.div`
  position: relative;
`;
const BtnGroup = styled.div`
  position: relative;
  margin-top: 20px;
`;
Form.InputGroup = InputGroup;
Form.BtnGroup = BtnGroup;

Form.Item = styled(AntdForm.Item)`
  .has-error .ant-form-explain {
    font-size: 12px;
    padding: 5px;
  }
`;
export const Input = styled(AntdInput)`
  && {
    height: 40px;
    border-radius: 5px;
  }
`;

export const InputPassword = styled(AntdInput.Password)`
  && {
    height: 40px;
    border-radius: 5px;
  }
`;

Input.Password = InputPassword;

const FormFooter = styled.div``;
const FormText = styled.p`
  color: #848080;
  font-size: 14px;
  font-weight: 300;

  margin: 0;
  line-height: 1.5;

  @media (max-width: 490px) {
    font-size: 12px;
  }
`;

Form.Footer = FormFooter;
Form.Text = FormText;

const LinkGroup = styled.div`
  text-align: right;
  padding: 20px 0;
`;
const FormLink = styled(Link)`
  color: #848080;
  font-size: 14px;
  font-weight: 400;

  margin: 0;
  cursor: pointer;
  transition: 0.3s ease;
  display: block;
  text-decoration: none;

  :focus {
    text-decoration: none;
  }
  @media (max-width: 590px) {
    font-size: 12px;
  }
  &:not(:last-child) {
    padding-bottom: 5px;
  }
  &:hover {
    color: #0340a0;
  }
`;
Form.LinkGroup = LinkGroup;
Form.Link = FormLink;
