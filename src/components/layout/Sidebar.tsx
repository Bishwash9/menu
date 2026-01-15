import React from 'react';
import { SIDEBAR_CONFIG } from '../../config/sidebarConfig';
import type { Role } from '../../lib/roles';

interface SideBarProps {
  role: Role;
}

export function SideBar({ role }: SideBarProps) {

  const menuItems = SIDEBAR_CONFIG[role] || [];

  return (
    <aside className="w-64 h-screen bg-[#002366] text-white flex flex-col shadow-2xl font-sans">

      <div className="p-6 flex items-center gap-3 border-b border-yellow-600/20 mb-4">
        <span className="text-2xl animate-pulse">✨</span>
        <h2 className="text-[#D4AF37] font-bold tracking-widest text-lg">ROYAL HMS</h2>
      </div>


      <nav className="flex-1">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li
              key={item.label}
              className="group flex items-center px-6 py-4 gap-4 cursor-pointer 
                         transition-all duration-300 ease-in-out border-l-4 border-transparent
                         hover:bg-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37]
                         animate-in slide-in-from-left duration-500"
              style={{ animationDelay: `${index * 75}ms`, animationFillMode: 'backwards' }}
            >
              <span className="text-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </span>
              <span className="text-sm font-medium tracking-wide">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}