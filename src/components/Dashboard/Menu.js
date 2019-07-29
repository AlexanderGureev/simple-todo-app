import React from "react";
import { Menu } from "./styles";

const MenuComponent = ({ handleClick, location: { pathname } }) => {
  return (
    <Menu>
      <Menu.Item to={`${pathname}`}>Home</Menu.Item>
      <Menu.Item to={`${pathname}`}>Todos</Menu.Item>
      <Menu.Item to={`${pathname}`}>Settings</Menu.Item>
      <Menu.Item to={`${pathname}`}>Support</Menu.Item>
      <Menu.Item to={`${pathname}`} onClick={handleClick}>
        Logout
      </Menu.Item>
    </Menu>
  );
};
export default MenuComponent;
