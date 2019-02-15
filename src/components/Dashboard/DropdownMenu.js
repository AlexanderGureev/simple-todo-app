import React from "react";
import { Link } from "react-router-dom";
import { StyledMenu, Dropdown, MenuBtn } from "./styles";
import { ReactComponent as MenuBtnIcon } from "./img/menu-icon.svg";

const DropdownMenu = () => {
  const menu = (
    <StyledMenu>
      <StyledMenu.Item key="0">
        <Link to="/">Home</Link>
      </StyledMenu.Item>
      <StyledMenu.Item key="1">
        <Link to="/">Todos</Link>
      </StyledMenu.Item>
      <StyledMenu.Item key="2">
        <Link to="/">Settings</Link>
      </StyledMenu.Item>
      <StyledMenu.Item key="3">
        <Link to="/">Support</Link>
      </StyledMenu.Item>
      <StyledMenu.Item key="4">
        <Link to="/">Logout</Link>
      </StyledMenu.Item>
    </StyledMenu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <MenuBtn component={MenuBtnIcon} />
    </Dropdown>
  );
};

export default DropdownMenu;
