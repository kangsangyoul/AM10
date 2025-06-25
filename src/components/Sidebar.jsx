import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaChartBar,
  FaRobot,
  FaBell,
  FaFileAlt,
  FaCog,
  FaShieldAlt,
} from 'react-icons/fa';

const items = [
  { icon: <FaChartBar />, label: 'Dashboard', path: '/' },
  { icon: <FaRobot />, label: 'AI Models', path: '/models' },
  { icon: <FaChartBar />, label: 'Risk Insights', path: '/insights' },
  { icon: <FaBell />, label: 'Alerts', path: '/alerts' },
  { icon: <FaFileAlt />, label: 'Reports', path: '/reports' },
  { icon: <FaCog />, label: 'Settings', path: '/settings' },
];

const armItems = [
  { icon: <FaShieldAlt />, label: 'Overview', path: '/arm' },
  { icon: <FaShieldAlt />, label: 'API Risk', path: '/arm/api' },
  { icon: <FaShieldAlt />, label: 'Traffic Guard', path: '/arm/traffic' },
  { icon: <FaShieldAlt />, label: 'Prompt Risk', path: '/arm/prompt' },
  { icon: <FaShieldAlt />, label: 'Model Risk', path: '/arm/model' },
  { icon: <FaShieldAlt />, label: 'Security Watch', path: '/arm/security' },
];

const Sidebar = () => (
  <aside className="w-64 bg-[#1a1f29] p-6 space-y-4">
    <div className="text-2xl font-bold mb-8">AuditMind</div>
    <nav className="flex flex-col space-y-4">
      {items.map((item) => (
        <SidebarItem key={item.label} icon={item.icon} label={item.label} path={item.path} />
      ))}
      <div className="pt-4 text-sm text-gray-400">ARM (AI Risk Manager)</div>
      {armItems.map((item) => (
        <SidebarItem key={item.label} icon={item.icon} label={item.label} path={item.path} />
      ))}
    </nav>
  </aside>
);

const SidebarItem = ({ icon, label, path }) => (
  <NavLink
    to={path}
    className={({ isActive }) =>
      `flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-[#2a2f3a] ${
        isActive ? 'bg-[#2a2f3a] font-semibold' : ''
      }`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

export default Sidebar;
