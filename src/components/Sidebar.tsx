import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaChartBar,
  FaRobot,
  FaBell,
  FaFileAlt,
  FaCog,
} from 'react-icons/fa';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

const items = [
  { icon: <FaChartBar />, name: 'Dashboard', path: '/' },
  { icon: <FaRobot />, name: 'AI Models', path: '/models' },
  { icon: <FaChartBar />, name: 'Risk Insights', path: '/insights' },
  { icon: <FaBell />, name: 'Alerts', path: '/alerts' },
  { icon: <FaFileAlt />, name: 'Reports', path: '/reports' },
  { icon: <FaCog />, name: 'Settings', path: '/settings' },
];

const armMenu = {
  name: 'ARM (AI Risk Manager)',
  icon: <ShieldCheckIcon className="w-5 h-5" />,
  children: [
    { name: 'Overview', path: '/arm' },
    { name: 'API Risk', path: '/arm/api' },
    { name: 'Traffic Guard', path: '/arm/traffic' },
    { name: 'Prompt Risk', path: '/arm/prompt' },
    { name: 'Model Risk', path: '/arm/model' },
    { name: 'Security Watch', path: '/arm/security' },
  ],
};

const Sidebar = () => (
  <aside className="w-64 bg-[#1a1f29] p-6 space-y-4">
    <div className="text-2xl font-bold mb-8">AuditMind</div>
    <nav className="flex flex-col space-y-4">
      {items.map((item) => (
        <SidebarItem key={item.name} icon={item.icon} name={item.name} path={item.path} />
      ))}
      <div className="pt-4 text-sm text-gray-400 flex items-center space-x-2">
        {armMenu.icon}
        <span>{armMenu.name}</span>
      </div>
      {armMenu.children.map((c) => (
        <SidebarItem key={c.name} name={c.name} path={c.path} />
      ))}
    </nav>
  </aside>
);

const SidebarItem = ({ icon, name, path }) => (
  <NavLink
    to={path}
    className={({ isActive }) =>
      `flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-[#2a2f3a] ${
        isActive ? 'bg-[#2a2f3a] font-semibold' : ''
      }`
    }
  >
    {icon}
    <span>{name}</span>
  </NavLink>
);

export default Sidebar;
