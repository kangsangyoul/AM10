import React from 'react';
import {
  FaChartBar,
  FaRobot,
  FaBell,
  FaFileAlt,
  FaCog,
  FaShieldAlt,
} from 'react-icons/fa';

const items = [
  { icon: <FaChartBar />, label: 'Dashboard' },
  { icon: <FaRobot />, label: 'AI Models' },
  { icon: <FaChartBar />, label: 'Risk Insights' },
  { icon: <FaBell />, label: 'Alerts' },
  { icon: <FaFileAlt />, label: 'Reports' },
  { icon: <FaCog />, label: 'Settings' },
];

const armItems = [
  { icon: <FaShieldAlt />, label: 'ARM Overview' },
  { icon: <FaShieldAlt />, label: 'API Risk' },
  { icon: <FaShieldAlt />, label: 'Traffic Guard' },
  { icon: <FaShieldAlt />, label: 'Prompt Risk' },
  { icon: <FaShieldAlt />, label: 'Model Risk' },
  { icon: <FaShieldAlt />, label: 'Security Watch' },
];

const Sidebar = ({ activeItem, onSelect }) => {
  return (
    <aside className="w-64 bg-[#1a1f29] p-6 space-y-4">
      <div className="text-2xl font-bold mb-8">AuditMind</div>
      <nav className="flex flex-col space-y-4">
        {items.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={activeItem === item.label}
            onClick={() => onSelect(item.label)}
          />
        ))}
        <div className="pt-4 text-sm text-gray-400">ARM (AI Risk Manager)</div>
        {armItems.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={activeItem === item.label}
            onClick={() => onSelect(item.label)}
          />
        ))}
      </nav>
    </aside>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#2a2f3a] ${
      active ? 'bg-[#2a2f3a] font-semibold' : ''
    }`}
  >
    {icon}
    <span>{label}</span>
  </div>
);

export default Sidebar;
