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
    <aside className="w-60 bg-[#14171c] pt-8 pb-4 px-3 flex flex-col">
      <div className="text-center text-2xl font-bold text-white mb-10">AuditMind</div>
      <nav className="flex flex-col gap-2 text-sm">
        {items.map((item) => (
          <SidebarMenu key={item.label} {...item} />
        ))}
      </nav>
    </aside>
  );
};
export default Sidebar;

