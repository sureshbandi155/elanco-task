import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export const Header: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState("applications");

  const handleItemClick = (name: string) => {
    setActiveMenu(name);
  };

  return (
    <Menu pointing secondary>
      <NavLink to="/" className={"item"}>
        Applications
      </NavLink>
      <NavLink to="/resources" className={"item"}>
        Resources
      </NavLink>
    </Menu>
  );
};
