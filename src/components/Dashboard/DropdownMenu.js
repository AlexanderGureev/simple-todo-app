import React from "react";
import { Link } from "react-router-dom";

import { StyledMenu, Dropdown, MenuBtn } from "./styles";
import { ReactComponent as MenuBtnIcon } from "./img/menu-icon.svg";

const DropdownMenu = ({ handleClick, location: { pathname } }) => {
  const menu = (
    <StyledMenu>
      <StyledMenu.Item key="0">
        <Link to={`${pathname}`}>Home</Link>
      </StyledMenu.Item>
      <StyledMenu.Item key="1">
        <Link to={`${pathname}`}>Todos</Link>
      </StyledMenu.Item>
      <StyledMenu.Item key="2">
        <Link to={`${pathname}`}>Settings</Link>
      </StyledMenu.Item>
      <StyledMenu.Item key="3">
        <Link to={`${pathname}`}>Support</Link>
      </StyledMenu.Item>
      <StyledMenu.Item key="4">
        <Link to={`${pathname}`} onClick={handleClick}>
          Logout
        </Link>
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
