import React from 'react';
import SidebarMenu from './SidebarMenu';
import routes from '../routes';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#1a1f29] p-6 space-y-4">
      <div className="text-2xl font-bold mb-8">AuditMind</div>
      <nav className="flex flex-col space-y-4">
        {routes.map(({ path, label, icon: Icon }) => (
          <SidebarMenu key={path} to={path} Icon={Icon} label={label} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
