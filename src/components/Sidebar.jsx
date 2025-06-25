import React, { useState } from 'react';
import { FaChartBar, FaRobot, FaBell, FaFileAlt, FaCog, FaShieldAlt } from 'react-icons/fa';

const items = [
  { icon: <FaChartBar />, label: 'Dashboard', key: 'Dashboard' },
  { icon: <FaRobot />, label: 'AI Models', key: 'AI Models' },
  { icon: <FaChartBar />, label: 'Risk Insights', key: 'Risk Insights' },
  {
    icon: <FaShieldAlt />,
    label: 'API Manager',
    key: 'API Manager',
    children: [
      { label: 'Overview', key: 'api-overview' },
      { label: 'API Risk', key: 'api-risk' },
      { label: 'Traffic Guard', key: 'traffic-guard' },
      { label: 'Token Abuse', key: 'token-abuse' },
      { label: 'Prompt Risk', key: 'prompt-risk' },
      { label: 'Security Watch', key: 'security-watch' },
    ],
  },
  { icon: <FaBell />, label: 'Alerts', key: 'Alerts' },
  { icon: <FaFileAlt />, label: 'Reports', key: 'Reports' },
  { icon: <FaCog />, label: 'Settings', key: 'Settings' },
];

const Sidebar = ({ activeItem, onSelect }) => {
  const [open, setOpen] = useState(true);
  return (
    <aside className="w-[240px] bg-[#1a2235] p-6 space-y-4">
      <div className="flex items-center text-2xl font-bold mb-8">
        <svg
          className="w-10 h-10 drop-shadow-lg"
          viewBox="0 0 56 56"
          fill="url(#auditBlue)"
          style={{ animation: 'blueGlow 2s infinite' }}
        >
          <defs>
            <linearGradient id="auditBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b8e2ff" />
              <stop offset="50%" stopColor="#34b4ff" />
              <stop offset="100%" stopColor="#395cd6" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <style>{`
            @keyframes blueGlow {
              0% { filter: drop-shadow(0 0 8px #54a7f8aa); }
              50% { filter: drop-shadow(0 0 26px #54a7f8ff) brightness(1.18) saturate(1.2); transform: scale(1.04); }
              100% { filter: drop-shadow(0 0 8px #54a7f8aa); }
            }
          `}</style>
          <path
            d="M13 46 L28 10 L43 46 Q38 41 18 41 Z"
            stroke="#ffffff"
            strokeOpacity="0.2"
            strokeWidth="2.5"
            filter="url(#glow)"
          />
        </svg>
        <span className="ml-2">AuditMind</span>
      </div>
      <nav className="flex flex-col space-y-2">
        {items.map((item) =>
          item.children ? (
            <div key={item.key} className="space-y-1">
              <SidebarItem
                icon={item.icon}
                label={item.label}
                active={item.children.some((c) => c.key === activeItem)}
                onClick={() => setOpen(!open)}
              />
              {open && (
                <div className="pl-4 space-y-1">
                  {item.children.map((ch) => (
                    <SidebarItem
                      key={ch.key}
                      label={ch.label}
                      active={activeItem === ch.key}
                      onClick={() => onSelect(ch.key)}
                      indent
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <SidebarItem
              key={item.key}
              icon={item.icon}
              label={item.label}
              active={activeItem === item.key}
              onClick={() => onSelect(item.key)}
            />
          )
        )}
      </nav>
    </aside>
  );
};

const SidebarItem = ({ icon, label, active, onClick, indent }) => (
  <div
    onClick={onClick}
    className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#2a2f3a] ${
      active ? 'bg-[#2a2f3a] font-semibold' : ''
    } ${indent ? 'pl-5' : ''}`}
  >
    {icon}
    <span>{label}</span>
  </div>
);

export default Sidebar;
