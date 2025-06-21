import React from 'react';
import {
  FaChartBar,
  FaRobot,
  FaBolt,
  FaBell,
  FaFileAlt,
  FaCog,
} from 'react-icons/fa';
import SidebarMenu from './SidebarMenu';

const items = [
  { icon: <FaChartBar />, label: 'Dashboard', to: '/' },
  { icon: <FaRobot />, label: 'AI Models', to: '/ai-models' },
  { icon: <FaBolt />, label: 'Risk Insights', to: '/risk-insights' },
  { icon: <FaBell />, label: 'Alerts', to: '/alerts' },
  { icon: <FaFileAlt />, label: 'Reports', to: '/reports' },
  { icon: <FaCog />, label: 'Settings', to: '/settings' },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#1a1f29] p-6 space-y-4">
      <div className="text-2xl font-bold mb-8">AuditMind</div>
      <nav className="flex flex-col space-y-4">
        {items.map((item) => (
          <SidebarMenu key={item.label} {...item} />
        ))}
      </nav>
    </aside>
  );
};
export default Sidebar;
