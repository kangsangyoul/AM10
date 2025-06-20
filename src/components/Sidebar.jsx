import React from 'react';
import { FaChartBar, FaRobot, FaBell, FaFileAlt, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#1a1f29] p-6 space-y-4">
      <div className="text-2xl font-bold mb-8">AuditMind</div>
      <nav className="flex flex-col space-y-4">
        <SidebarItem icon={<FaChartBar />} label="Dashboard" active />
        <SidebarItem icon={<FaRobot />} label="AI Models" />
        <SidebarItem icon={<FaChartBar />} label="Risk Insights" />
        <SidebarItem icon={<FaBell />} label="Alerts" />
        <SidebarItem icon={<FaFileAlt />} label="Reports" />
        <SidebarItem icon={<FaCog />} label="Settings" />
      </nav>
    </aside>
  );
};

const SidebarItem = ({ icon, label, active }) => (
  <div className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#2a2f3a] ${active ? 'bg-[#2a2f3a] font-semibold' : ''}`}>
    {icon}
    <span>{label}</span>
  </div>
);

export default Sidebar;
