import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import RSelect from "react-select";
import { List } from "react-virtualized";

import {
  Menu as AntdMenu,
  Dropdown as AntdDropdown,
  Icon,
  Row as AntdRow,
  Col as AntdCol,
  Avatar as AvaBox,
  Upload,
  Empty as AntdEmpty,
  Button,
  Modal as AntdModal,
  Popover as AntdPopover,
  Button as AntdButton
} from "antd";
import uploadIcon from "./img/upload.svg";

export const Row = styled(AntdRow)``;
export const Col = styled(AntdCol)`
  height: 100%;
  ::-webkit-scrollbar {
    visibility: hidden;
    width: 0px;
  }
`;

export const SimpleButton = styled(AntdButton)`
  @media (max-width: 560px) {
    font-size: 12px;
  }
`;

export const Dashboard = styled.div`
  width: 100%;
  min-height: 100vh;
  background: url(${props => props.src}) no-repeat center center;
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ContentWrapper = styled.div`
  margin: 40px;
  background-color: #fff;
  border-radius: 50px;
  box-shadow: 0 15px 30px rgba(0, 83, 165, 0.3);
  height: 90vh;
  width: 80%;
  min-height: 590px;
  position: relative;
  overflow: hidden;

  @media (max-width: 991px) {
    height: 100%;
  }
`;

export const DropdownContainer = styled.div``;
export const TaskMenu = styled(AntdMenu)``;

TaskMenu.Item = styled(AntdMenu.Item)`
  display: flex;
  justify-content: left;
  align-items: center;
  && {
    padding: 0;
    @media (max-width: 580px) {
      li {
        font-size: 12px;
      }
    }
  }
`;
TaskMenu.Item.Text = styled.div`
  i {
    margin-right: 5px;
  }
  padding: 5px 10px;
`;

export const Menu = styled.div`
  font-size: 20px;
  font-weight: 500;
  padding: 30px 60px 30px 30px;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d1d1d1;

  @media (max-width: 1200px) {
    font-size: 16px;
  }

  @media (max-width: 960px) {
    font-size: 14px;
    padding: 30px;
  }
`;

const MenuItem = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  transition: 0.3s ease;
  color: #797979;
  &:hover {
    color: #298cef;
  }
`;
Menu.Item = MenuItem;

const PositionWrapper = styled.div`
  padding: 30px 0 40px 0;
  position: relative;

  ::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #d1d1d1;
  }
`;

export const Profile = styled(PositionWrapper)`
  padding: 30px 30px 20px 30px;
  text-align: center;

  @media (max-width: 991px) {
    margin-top: 30px;
    border-top: 1px solid #d1d1d1;
  }
`;

export const Avatar = styled(AvaBox)`
  && {
    > img {
      height: auto;
    }
    width: 70px;
    height: 70px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px;
    position: relative;
    border-radius: 5px;
    cursor: pointer;

    ::before {
      border-radius: 5px;
      content: "";
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.6);
      opacity: 0;
      transition: 0.3s ease;
    }
    ::after {
      content: "";
      position: absolute;
      width: 25px;
      height: 25px;
      top: 23px;
      left: 23px;
      opacity: 0;
      transition: 0.3s ease;
      background: url(${uploadIcon});
      background-size: cover;
    }
    :hover::after,
    :hover::before {
      opacity: 1;
    }

    @media (max-width: 991px) {
      width: 50px;
      height: 50px;

      ::after {
        width: 20px;
        height: 20px;
        top: 15px;
        left: 15px;
      }
    }
  }
`;

const Name = styled.p`
  font-weight: 500;
  font-size: 20px;
  color: #2c2b2b;
  margin: 5px 0;

  @media (max-width: 991px) {
    font-size: 16px;
  }
`;
const Email = styled(Name)`
  font-weight: 400;
  font-size: 14px;
  word-break: break-all;
  @media (max-width: 991px) {
    font-size: 14px;
  }
`;

Profile.Avatar = Avatar;
Profile.Name = Name;
Profile.Email = Email;

const Statistics = styled.div`
  padding: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1200px) {
    flex-direction: column;
  }

  @media (max-width: 991px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;
const StatItem = styled.div`
  @media (max-width: 1200px) {
    :not(:last-child) {
      margin-bottom: 20px;
    }
  }
  @media (max-width: 991px) {
    :not(:last-child) {
      margin-bottom: 0;
    }
  }
`;
const Num = styled.p`
  font-weight: 700;
  font-size: 20px;
  color: #070606;
  margin: 0;
  padding-bottom: 15px;

  @media (max-width: 991px) {
    font-size: 16px;
  }
`;

const Title = styled.p`
  font-weight: 500;
  font-size: 16px;
  color: #434343;
  margin: 0;
  @media (max-width: 1400px) {
    font-size: 14px;
  }
`;
const Caption = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #434343;
  margin: 0;

  @media (max-width: 1400px) {
    font-size: 12px;
  }
`;
Profile.Statistics = Statistics;
Profile.Statistics.Item = StatItem;
Statistics.Item.Num = Num;
Statistics.Item.Title = Title;
Statistics.Item.Caption = Caption;

export const Categories = styled(PositionWrapper)`
  @media (max-width: 991px) {
    ::after {
      display: none;
    }
  }
  @media (max-width: 767px) {
    ::after {
      display: block;
    }
  }
`;

const CategoriestTitle = styled.p`
  font-weight: 600;
  font-size: 20px;
  color: #3b3b3b;
  margin: 0;
  padding-bottom: 30px;
  text-align: center;

  @media (max-width: 1200px) {
    font-size: 18px;
  }

  @media (max-width: 991px) {
    font-size: 16px;
  }
`;
const СategoryItem = styled.p`
  margin: 0 0 0 30px;
  font-weight: 500;
  font-size: 16px;
  color: #3b3b3b;
  position: relative;
  padding-left: 40px;
  @media (max-width: 991px) {
    padding-left: 20px;
  }

  @media (max-width: 680px) {
    padding-left: 14px;
  }
  &:not(:last-child) {
    padding-bottom: 20px;
  }
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 7px;
    width: 30px;
    height: 10px;
    background: ${props => props.color};

    @media (max-width: 991px) {
      width: 10px;
    }
  }

  @media (max-width: 991px) {
    font-size: 14px;
  }
`;

Categories.Title = CategoriestTitle;
Categories.Container = styled.div`
  width: 100%;
  height: ${props => (props.count < 5 ? `${props.count * 40}px` : "150px")};
  div {
    outline: none;
    ::-webkit-scrollbar {
      visibility: hidden;
      width: 3px;
      height: 2px;
    }
    ::-webkit-scrollbar-thumb {
      height: 50px;
      background-color: #666;
      border-radius: 3px;
    }
  }
`;
Categories.Item = СategoryItem;

export const Friends = styled(Categories)`
  ::after {
    display: none;
  }
  padding: 30px 0 10px 0;
`;
const FriendsTitle = styled(CategoriestTitle)``;
const FriendItem = styled.div`
  padding: 0 10px;
`;
const FriendAva = styled(Avatar)`
  && {
    width: 35px;
    height: 35px;

    @media (max-width: 991px) {
      width: 30px;
      height: 30px;
    }
  }

  ::after {
    display: none;
  }
`;
const FriendsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 30px;
`;
Friends.Title = FriendsTitle;
Friends.Avatar = FriendAva;
Friends.Item = FriendItem;
Friends.Container = FriendsContainer;

export const TopLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;

  @media (max-width: 670px) {
    padding: 20px;
    flex-direction: column-reverse;
  }
`;

export const CustomIcon = styled(Icon)`
  font-size: 14px;
  cursor: pointer;
  margin-right: 10px;

  svg {
    transition: 0.2s ease;
    fill: ${props => props.color || "#000"};

    :hover {
      fill: ${props => (props.color ? "hsl(0, 0%, 60%)" : "#000")};
    }
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const Select = styled(RSelect)`
  width: 300px;
  color: #3b3b3b;
  font-weight: 400;

  @media (max-width: 1360px) {
    width: 200px;
  }

  @media (max-width: 760px) {
    width: 150px;
  }

  @media (max-width: 360px) {
    width: 120px;
  }

  > div {
    font-size: 23px;
    border: none;
    outline: none;
    box-shadow: none;
    @media (max-width: 1200px) {
      font-size: 20px;
    }

    @media (max-width: 991px) {
      font-size: 18px;
    }
    :not(:first-of-type) {
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
      font-size: 16px;
      @media (max-width: 991px) {
        font-size: 14px;
      }
    }
  }
`;
export const Filters = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;

  div {
    margin-left: 20px;

    @media (max-width: 1200px) {
      margin-left: 5px;
    }

    @media (max-width: 680px) {
      margin-left: 5px;
    }

    @media (max-width: 360px) {
      margin-left: 0px;
    }
  }
`;
const FilterItem = styled.div`
  text-transform: uppercase;
  font-size: 16px;
  cursor: pointer;
  color: ${props => (props.active ? "#fff" : "#575656")};
  padding: 2px 10px;
  transition: 0.3s ease;
  position: relative;
  z-index: 1;

  ::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(9, 137, 230, 0.6);
    border-radius: 12px;
    z-index: -1;
    opacity: ${props => (props.active ? "1" : "0")};
    transform: ${props => (props.active ? "scale(1)" : "scale(0)")};
    transform-origin: center;
    transition: 0.3s ease;
  }

  @media (max-width: 1400px) {
    font-size: 14px;
  }
  @media (max-width: 1200px) {
    font-size: 12px;
  }
  @media (max-width: 680px) {
    font-size: 10px;
  }
  @media (max-width: 360px) {
    padding: 2px 5px;
  }
`;

const TopLineContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  @media (max-width: 670px) {
    :not(:last-child) {
      margin-top: 15px;
    }
  }
`;
Filters.Item = FilterItem;

TopLine.Container = TopLineContainer;

export const TodoListWrapper = styled.div`
  height: 100%;
  button {
    margin-bottom: 30px;
  }
`;
export const TodoList = styled.div`
  width: 100%;
  height: 85%;

  div {
    outline: none;
    ::-webkit-scrollbar {
      width: 3px;
      height: 3px;
    }
    ::-webkit-scrollbar-thumb {
      height: 50px;
      background-color: #666;
      border-radius: 3px;
    }
  }
  @media (max-width: 991px) {
    height: 450px;
    max-height: 450px;
  }
`;

export const DragHandleContainer = styled.div`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  cursor: pointer;

  svg {
    width: 25px;
    height: 25px;
  }
  @media (max-width: 680px) {
    svg {
      width: 15px;
      height: 15px;
    }
  }
  @media (max-width: 680px) {
    width: 15px;
    height: 15px;
  }
`;

export const TodoItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 30px;
`;
const TodoItem = styled.div`
  display: flex;
  align-items: center;
`;
const StyledTodoIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 30px;
  height: 30px;
  border-radius: 50%;
  border: ${props => (props.active ? "none" : "1px solid #b4b4b4")};
  position: relative;
  cursor: pointer;
  margin-right: 10px;
  background-color: ${props => (props.active ? "#72B9FF" : "none")};
  position: relative;
  transition: background-color 0.3s ease;

  @media (max-width: 680px) {
    min-width: 20px;
    height: 20px;
  }

  svg {
    width: 15px;
    path {
      fill: ${props => (props.active ? "#fff" : "rgb(159, 159, 159)")};
    }

    @media (max-width: 680px) {
      width: 10px;
    }
  }
`;

const TodoIcon = ({ component: Component, active = false, ...rest }) => (
  <StyledTodoIcon active={active} {...rest}>
    <Component />
  </StyledTodoIcon>
);

const TodoText = styled.p`
  color: #444445;
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  padding-bottom: 5px;
  word-break: break-all;

  @media (max-width: 1200px) {
    font-size: 16px;
  }
  @media (max-width: 991px) {
    font-size: 14px;
  }

  @media (max-width: 680px) {
    font-size: 12px;
  }
`;
const TodoDate = styled.div`
  font-size: 12px;
  font-weight: 300;
  margin: 0;
  padding-bottom: 5px;
  word-break: break-all;

  @media (max-width: 991px) {
    font-size: 10px;
  }
`;
const TodoContainer = styled.div``;
TodoItem.Icon = TodoIcon;
TodoItem.Text = TodoText;
TodoItem.Date = TodoDate;
TodoList.Item = TodoItem;
TodoList.Container = TodoContainer;

export const Dropdown = styled(AntdDropdown)`
  margin: 0 auto;
  display: block;
  text-align: center;
  padding-top: 25px !important;
`;
export const StyledMenu = styled(AntdMenu)`
  text-align: center;
  font-family: Montserrat;

  li {
    font-size: 16px;
    :not(:last-child) {
      padding-bottom: 10px;
    }
  }
`;
export const MenuBtn = styled(Icon)`
  font-size: 23px;
  cursor: pointer;
`;

export const Dragger = styled(Upload.Dragger)`
  font-size: 16px;
  font-weight: 400;
`;

const DraggerIcon = styled(Icon)`
  svg {
    width: 50px;
    height: 50px;
  }
  margin-bottom: 10px;
`;
const DraggerText = styled.p``;
const DraggerContainer = styled.div``;
Dragger.Container = DraggerContainer;
Dragger.Icon = DraggerIcon;
Dragger.Text = DraggerText;

export const EmptyContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Empty = styled(AntdEmpty)`
  && {
    margin: 10px 0;
  }
`;
const EmptyDescription = styled.div`
  padding: 0 30px;
`;
const EmptyHeader = styled.h2`
  font-size: 16px;

  @media (max-width: 560px) {
    font-size: 14px;
  }
`;
const EmptyBody = styled.span`
  font-size: 14px;

  @media (max-width: 560px) {
    font-size: 12px;
  }
`;

Empty.Description = EmptyDescription;
Empty.Header = EmptyHeader;
Empty.Body = EmptyBody;

Empty.Image = styled.div``;
Empty.Footer = styled.div`
  margin-top: 20px;
`;

export const Popover = styled(AntdPopover)``;
export const PopoverTitle = styled.div``;
export const PopoverTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ContentList = styled.ul`
  padding: 0 15px;

  @media (max-width: 760px) {
    width: 280px;
  }

  @media (max-width: 560px) {
    width: 200px;
    font-size: 12px;
  }
`;
const ContentItem = styled.li``;
ContentList.Item = ContentItem;

export const Modal = styled(AntdModal)`
  .ant-modal-footer {
    padding: 10px 24px;
  }
`;
export const ModalFooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const ModalBtn = styled(Button)`
  order: ${props => props.order || 0};
`;
export const ModalBtnGroup = styled.div`
  display: flex;
  order: ${props => props.order || 0};
  ${ModalBtn}:not(:last-child) {
    margin-right: 10px;
  }
`;

export const CategoryPrefix = styled.div`
  cursor: pointer;
  background-color: ${props => props.color};
  width: 10px;
  height: 30px;
  position: relative;

  @media (max-width: 580px) {
    height: 10px;
  }
`;

export const CategoryPrefixContainer = ({ children, className, ...rest }) => (
  <CategoryPrefix className={className} {...rest}>
    {children}
  </CategoryPrefix>
);

export const ColorPickerContainer = styled.div``;

export const StyledList = styled(List)`
  > div {
    position: initial !important;
  }
`;
