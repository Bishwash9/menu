import { useState, useEffect } from "react";
import { SIDEBAR_CONFIG } from "../../Config/SidebarConfig";
import { ROLES, type Role } from "../../Lib/roles";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../Assets/Logo.svg";
import Namaste from "../../Assets/Namaste.svg";
import { useAuth } from "../../Context/AuthContext";



// interface SideBarProps {
//   role: Role;
// }

export function SideBar() {
  //first ma get role and setrole from context
  const{role,setRole} = useAuth();
  const menuItems = SIDEBAR_CONFIG[role] || [];
  const navigate = useNavigate();
  const location = useLocation();

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


      {!collapsed && (
        <div className="px-3 py-2 bg-white border-b border-yellow-500">
          <select 
          value={role}
          onChange={(e) => {
            setRole(e.target.value as Role);
            navigate ('/');
            }}
          className="w-full text-sm bg-primary text-white border border-[#D4AF37] rounded px-2 py-1.5 
                    focus:outline-none focus:ring-1 ring-accent"
          >
            <option value={ROLES.ADMIN}>Admin</option>
            <option value={ROLES.RECEPTION}>Reception</option>
            {/* <option value={ROLES.USER}>User</option> */}
            <option value={ROLES.HOUSEKEEPING}>Housekeeping</option>
          </select>

        </div>
      )}

      {!collapsed &&(
        <div className="px-3 py-2 bg-white border-b border-yellow-500">
          <select name="" id="" className="w-full text-sm bg-primary text-white border border-[#D4AF37] rounded px-2 py-1.5 
                    focus:outline-none focus:ring-1 ring-accent">
            <option value="">Abc</option>
            <option value="">Def</option>
          </select>
        </div>
      )}

      <nav className="flex-1">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isOpen = openMenus === item.label;
            
            // Check if current item is active
            const isActive = item.path === location.pathname;
            
            // Check if any sub-item is active (for parent highlighting)
            const isParentActive = hasSubItems && item.subItems!.some(sub => sub.path === location.pathname);
            
            // Combined active state for parent
            const isItemActive = isActive || isParentActive;
            
            return (
              <li key={item.label} className="flex flex-col">
                <div
                  onClick={() => {
                    if (item.path) {
                      navigate(item.path);
                    }
                    if (hasSubItems) {
                      toggleMenu(item.label);
                    }
                  }}
                  className={`group flex items-center cursor-pointer transition-all duration-300
                  border-l-4 ${isItemActive ? 'border-accent bg-white/10' : 'border-transparent hover:bg-white/10 hover:border-accent'} 
                  ${isItemActive ? 'text-accent' : 'hover:text-accent'}
                   ${collapsed ? "justify-center py-4" : "py-4 pr-4"}`}
                >
                
                  {/* ICON CONTAINER: Fixed w-16 matches the collapsed sidebar width exactly */}
                  <div className="w-16 flex justify-center shrink-0">
                    <span className={`text-2xl transition-transform duration-300 ${isItemActive ? 'text-accent' : 'text-accent'}`}>
                      {item.icon}
                    </span>
                  </div>
                  {!collapsed && (
                    <div className="flex-1 flex items-center justify-between transition-all duration-300 ease-in-out">
                      <span className={`text-sm font-medium flex-1 whitespace-nowrap transition-all duration-300 ease-in-out ${isItemActive ? 'text-accent' : ''}`}>
                        {item.label}
                      </span>
                      {hasSubItems && (
                        <span className="transition-transform duration-300 ease-in-out">
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
                {/* Render sub-items with smooth transition */}
                {hasSubItems && (
                  <ul className={`bg-black/20 overflow-hidden transition-all duration-300 ease-in-out ${isOpen && !collapsed ? 'max-h-96 pb-2' : 'max-h-0'}`}>
                    {item.subItems!.map((sub) => {
                      const isSubActive = sub.path === location.pathname;
                      return (
                        <li
                          onClick={() => {
                            if (sub.path) {
                              navigate(sub.path, { state: { orderType: sub.defaultType } });
                            }
                          }}
                          key={sub.label}
                          /* pl-16 aligns sub-items with the main text (past the icon width) */
                          className={`flex items-center gap-3 pl-16 py-3 cursor-pointer transition-colors text-xs
                          ${isSubActive ? 'text-accent font-medium' : 'text-slate-300 hover:text-accent'} group/sub`}
                        >
                          <span className="scale-75 opacity-70 transition-transform duration-300">
                            {sub.icon}
                          </span>
                          <span>{sub.label}</span>
                        </li>
                      );
                    })}
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
