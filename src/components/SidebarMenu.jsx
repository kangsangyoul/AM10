import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarMenu = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#2a2f3a] ${
          isActive ? 'bg-[#2a2f3a] font-semibold' : ''
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export default SidebarMenu;
