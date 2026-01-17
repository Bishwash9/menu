import { useState, useEffect } from "react";
import { SIDEBAR_CONFIG } from "../../config/sidebarConfig";
import type { Role } from "../../lib/roles";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SideBarProps {
  role: Role;
}

export function SideBar({ role }: SideBarProps) {
  const menuItems = SIDEBAR_CONFIG[role] || [];

  //  ADD: collapse state
  const [collapsed, setCollapsed] = useState(false);

  //this is for dropdown
  const [openMenus, setOpenMenus] = useState<string | null>(null);

  const toggleMenu = (label: string) => {
    setOpenMenus(openMenus === label ? null : label);
  };

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

  const navigate = useNavigate();

  return (
   
    <aside
  
      className={`h-screen bg-[#002366] text-white flex flex-col shadow-2xl font-sans transition-all duration-300 ease-in-out overflow-hidden
      ${collapsed ? "w-16" : "w-64"}`}
    >
      {/* Header */}
      <div
        className={`p-6 flex items-center border-b border-yellow-600/20 mb-4
        ${collapsed ? "justify-center gap-0" : "gap-3"}`}
      >
        {/* 🔹 ADD: toggle button */}
        <div className="text-xl" style={{ height: "4vh" }}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-[#D4AF37] text-xl focus:outline-none"
          >
            ☰
          </button>
        </div>

       
        <div>
          {!collapsed && (
            <h2 className="text-[#D4AF37] font-bold tracking-widest text-lg">
              ROYAL BLUE
            </h2>
          )}
        </div>
      </div>

      <nav className="flex-1">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isOpen = openMenus === item.label
            return (
              <li key={item.label} className="flex flex-col">
                <div
                  onClick={() => {
                   if (hasSubItems){
                    toggleMenu(item.label);
                  
                  }else{
                    null;
                  }}}
                  className={`group flex items-center cursor-pointer transition-all duration-300 ease-in-out 
                  border-l-4 border-transparent hover:bg-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37]
                   ${collapsed ? "justify-center px-0 py-4" : "px-6 py-4 gap-4"}`}
                  >
                  <span className="text-2xl text-[#D4AF37]  transition-transform duration-300">
                    {item.icon}
                  </span>

                  {!collapsed && (
                    <>
                      <span className="text-sm font-medium flex-1">
                        {item.label}
                      </span>
                      {hasSubItems && (
                        <span>
                          {isOpen ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                        </span>
                      )}
                    </>
                  )}
                </div>

                {/* Render sub-items if menu is open and sidebar is not closed */}
                {!collapsed && hasSubItems && isOpen && (
                  <ul className="bg-black/20 pb-2">
                    {item.subItems!.map((sub) => (
                      <li
                         onClick={()=>{
                          if(sub.path){
                            navigate(sub.path,{state:{orderType:sub.defaultType}});
                          }
                         }}
                        key={sub.label}
                        className="flex items-center gap-3 px-12 py-3 cursor-pointer
                          hover:text-[#D4AF37] transition-colors text-xs text-slate-300 group/sub"
                      >
                        
                        <span className="scale-75 opacity-70 transition-transform duration-300">
                          {sub.icon}
                        </span>
                        <span>{sub.label}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
