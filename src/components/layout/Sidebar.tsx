import { useState, useEffect } from "react";
import { SIDEBAR_CONFIG } from "../../config/sidebarConfig";
import type { Role } from "../../lib/roles";
import { ChevronDown, ChevronRight} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../../Assets/Logo.svg";
import Namaste from "../../Assets/Namaste.svg";


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
  
      className={`h-full bg-[#002366] text-white flex flex-col shadow-2xl font-sans overflow-hidden 
      ${collapsed ? "w-16" : "w-64"}`}
    >
      
         
       {/* Header */}
      <div
        className={`bg-white flex items-center border-b border-yellow-600 h-[6vh]
        ${collapsed ? "justify-center" : ""}`}
      >
        {collapsed ? (
          /* Collapsed State */
          <button onClick={() => setCollapsed(!collapsed)} className="focus:outline-none w-full flex justify-center">
             <img src={Logo} className="h-[8vh] w-[8vh] object-contain"/>
          </button>
        ) : (
          /* Expanded State */
          <button onClick={() => setCollapsed(!collapsed)} className="focus:outline-none w-full flex items-center">
             
           
             <div className="shrink-0">
                <img src={Logo} className="h-[8vh] w-[8vh] object-contain"/>
             </div>
            
             <div className="flex-1 flex items-center -ml-6">
                <img src={Namaste} className="h-[10vh] w-[14vw] object-contain"/>
             </div>
             
          </button>
        )}
      </div>

      <nav className="flex-1">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isOpen = openMenus === item.label;
            return (
              <li key={item.label} className="flex flex-col">
                <div
                  onClick={() => {
                    if (hasSubItems) {
                      toggleMenu(item.label);
                    } else {
                      null;
                    }
                  }}
                  className={`group flex items-center cursor-pointer 
                  border-l-4 border-transparent hover:bg-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37]
                   ${collapsed ? "justify-center py-4" : "py-4 pr-4"}`}
                >
                  {/* ICON CONTAINER: Fixed w-16 matches the collapsed sidebar width exactly */}
                  <div className="w-16 flex justify-center shrink-0">
                    <span className="text-2xl text-[#D4AF37] transition-transform duration-300">
                      {item.icon}
                    </span>
                  </div>
                  {!collapsed && (
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-sm font-medium flex-1 whitespace-nowrap">
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
                    </div>
                  )}
                </div>
                {/* Render sub-items */}
                {!collapsed && hasSubItems && isOpen && (
                  <ul className="bg-black/20 pb-2">
                    {item.subItems!.map((sub) => (
                      <li
                        onClick={() => {
                          if (sub.path) {
                            navigate(sub.path, { state: { orderType: sub.defaultType } });
                          }
                        }}
                        key={sub.label}
                        /* pl-16 aligns sub-items with the main text (past the icon width) */
                        className="flex items-center gap-3 pl-16 py-3 cursor-pointer
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
