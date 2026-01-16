import  { useState, useEffect } from "react";
import { SIDEBAR_CONFIG } from "../../config/sidebarConfig";
import type { Role } from "../../lib/roles";

interface SideBarProps {
  role: Role;
}

export function SideBar({ role }: SideBarProps) {
  const menuItems = SIDEBAR_CONFIG[role] || [];

  //  ADD: collapse state
  const [collapsed, setCollapsed] = useState(false);

  //  ADD: auto-collapse on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside
      //  ORIGINAL (commented, not removed)
      // className="w-64 h-screen bg-[#002366] text-white flex flex-col shadow-2xl font-sans"

      //  UPDATED (collapsible + animated)
      className={`h-screen bg-[#002366] text-white flex flex-col shadow-2xl font-sans transition-all duration-300 ease-in-out overflow-hidden
      ${collapsed ? "w-16" : "w-64"}`}
      >
      {/* Header */}
      <div
        className={`p-6 flex items-center border-b border-yellow-600/20 mb-4
        ${collapsed ? "justify-center gap-0" : "gap-3"}`}
      >
        {/* 🔹 ADD: toggle button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-[#D4AF37] text-xl focus:outline-none"
        >
          ☰
        </button>
        {!collapsed && (
          <span className="text-2xl animate-pulse flex items-center justify-center w-8">
            ✨
          </span>
        )}

        {/*  ORIGINAL */}
        {/* <h2 className="text-[#D4AF37] font-bold tracking-widest text-lg">ROYAL HMS</h2> */}

        {/*  UPDATED (text hides on collapse) */}
        {!collapsed && (
          <h2 className="text-[#D4AF37] font-bold tracking-widest text-lg">
            ROYAL BLUE
          </h2>
        )}
      </div>

      <nav className="flex-1">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li
              key={item.label}
              className={`group flex items-center cursor-pointer 
                transition-all duration-300 ease-in-out border-l-4 border-transparent
                hover:bg-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37]
                animate-in slide-in-from-left
                ${collapsed ? "justify-center px-0 py-4" : "px-6 py-4 gap-4"}`}
              style={{
                animationDelay: `${index * 75}ms`,
                animationFillMode: "backwards",
              }}
            >
              <span className="text-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </span>

              {/*  ORIGINAL */}
              {/* <span className="text-sm font-medium tracking-wide">{item.label}</span> */}

              {/*  UPDATED (hide label when collapsed) */}
              {!collapsed && (
                <span className="text-sm font-medium tracking-wide">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

