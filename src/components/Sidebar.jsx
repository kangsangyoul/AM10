import React from 'react';
import { FaChartBar, FaRobot, FaBell, FaFileAlt, FaCog } from 'react-icons/fa';

const items = [
  { icon: <FaChartBar />, label: 'Dashboard' },
  { icon: <FaRobot />, label: 'AI Models' },
  { icon: <FaChartBar />, label: 'Risk Insights' },
  { icon: <FaBell />, label: 'Alerts' },
  { icon: <FaFileAlt />, label: 'Reports' },
  { icon: <FaCog />, label: 'Settings' },
];

const Sidebar = ({ activeItem, onSelect }) => {
  return (
    <aside className="w-[240px] bg-[#1a2235] p-6 space-y-4">
      <div className="flex items-center text-2xl font-bold mb-8">
        <svg
          className="w-10 h-10 drop-shadow-lg"
          viewBox="0 0 24 24"
          fill="url(#gradA)"
        >
          <defs>
            <linearGradient id="gradA" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34b4ff" />
              <stop offset="100%" stopColor="#54a7f8" />
            </linearGradient>
          </defs>
          <path d="M12 2l9 20h-4l-2-5H9l-2 5H3l9-20z" />
        </svg>
        <span className="ml-2">AuditMind</span>
      </div>
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
