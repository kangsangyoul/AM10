import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarMenu = ({ to, Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-[#2a2f3a] ${
        isActive ? 'bg-[#2a2f3a] font-semibold' : ''
      }`
    }
  >
    <Icon />
    <span>{label}</span>
  </NavLink>
);

export default SidebarMenu;
