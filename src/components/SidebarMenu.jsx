import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarMenu = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
        isActive
          ? 'bg-[#22262d] text-white border-l-4 border-[#5b93fc]'
          : 'text-gray-300 hover:bg-[#1b1f26]'
      }`
    }
  >
    <span className="text-lg">{icon}</span>
    <span className="whitespace-nowrap">{label}</span>
  </NavLink>
);

export default SidebarMenu;

