import { useState, useEffect } from "react";
import { SIDEBAR_CONFIG } from "../../Config/SidebarConfig";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "@assets/Logo.svg";
import Namaste from "@assets/Namaste.svg";
import { useAuth } from "../../Context/AuthContext";



// interface SideBarProps {
//   role: Role;
// }

export function SideBar() {
  //first ma get role from context
  const{role} = useAuth();
  const menuItems = SIDEBAR_CONFIG[role as keyof typeof SIDEBAR_CONFIG] || [];
  const navigate = useNavigate();
  const location = useLocation();

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
      className={`h-screen bg-dashboard-primary text-white flex flex-col shadow-2xl  overflow-hidden 
      transition-all duration-300 ease-in-out
      ${collapsed ? "w-16" : "w-64"}`}
    >


      {/* Header */}
      <div
        className={`bg-white flex items-center justify-center border-b border-accent h-[7vh] 
       ${collapsed ? 'justify-center' : 'justify-start'}`}
      >
        <button onClick={() => setCollapsed(!collapsed)} className={`focus:outline-none h-full flex ease-in-out ${collapsed ? 'justify-center w-full' : 'gap-3'}`}>
          {/* Logo - Always visible, stays fixed */}
          <div className="shrink-0">
            <img src={Logo} className={`object-contain  ${collapsed ? 'h-[7vh] w-[7vh]' : 'h-[vh] w-[8vh]'}`} />
          </div>

          {/* Namaste Text - Fades out when collapsed */}
          <div className={`flex items-center  overflow-hidden ${collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto flex-1'}`}>
            <img src={Namaste} className="h-[10vh] w-[14vw] object-contain" />
          </div>
        </button>
      </div>

      <nav className="flex-1">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = item.path === location.pathname; 
            
            return (
              <li key={item.label}>
                <div
                  onClick={() => {
                    if (item.path) {
                      navigate(item.path);
                    }
                  }}
                  className={`group flex items-center cursor-pointer transition-all duration-300
                  border-l-4 ${isActive ? 'border-accent bg-white/10' : 'border-transparent hover:bg-white/10 hover:border-accent'} 
                  ${isActive ? 'text-accent' : 'hover:text-accent'}
                   ${collapsed ? "justify-center py-4" : "py-4 pr-4"}`}
                >
                
                  {/* ICON CONTAINER: Fixed w-16 matches the collapsed sidebar width exactly */}
                  <div className="w-16 flex justify-center shrink-0">
                    <span className="text-2xl transition-transform duration-300 text-accent">
                      {item.icon}
                    </span>
                  </div>
                  {!collapsed && (
                    <span className={`text-sm font-medium flex-1 whitespace-nowrap transition-all duration-300 ease-in-out ${isActive ? 'text-accent' : ''}`}>
                      {item.label}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
