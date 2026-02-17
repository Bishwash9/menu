import { useState, useEffect } from "react";
import { SIDEBAR_CONFIG } from "../../Config/SidebarConfig";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "@assets/Logo.svg";
import Namaste from "@assets/Namaste.svg";
import { Building2, ChevronDown, Plus } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";



export function SideBar() {
  //first ma get role from context
  const { role, user } = useAuth();
  const menuItems = SIDEBAR_CONFIG[role as keyof typeof SIDEBAR_CONFIG] || [];
  const navigate = useNavigate();
  const location = useLocation();
  //  ADD: collapse state
  const [collapsed, setCollapsed] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(user?.name || "The Food Hub Cafe");

  //  ADD: auto-collapse on small screens
  useEffect(() => {
    if(user?.name){
      setSelectedCompany(user.name);
    }
  }, [user]);

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
      transition-all duration-300 ease-in-out justify-start
      ${collapsed ? "w-16" : "w-64"}`}
    >


      {/* Header */}
      <div
        className={`bg-white flex items-center justify-start border-b border-accent h-[7vh]`}
      >
        <button onClick={() => setCollapsed(!collapsed)} className={`focus:outline-none h-full flex items-center justify-center w-16 p-0`}>
          {/* Logo - Always visible, stays fixed */}
          <div className="shrink-0">
            <img src={Logo} className={`object-contain h-[7vh] w-[7vh]`} />
          </div>
        </button>

        {/* Namaste Text - Fades out when collapsed */}
        <div className={`flex items-center overflow-hidden ${collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto flex-1'}`}>
          <img src={Namaste} className="h-[10vh] w-[14vw] object-contain" />
        </div>
      </div>

      {collapsed ? (
        // Icon only when collapsed
        <div className="w-16 flex justify-center items-center py-4 border-b border-white/10 cursor-pointer transition-colors" >
          <div className="p-2 bg-white/5 rounded-lg hover:bg-white/10 border border-white/10 transition-colors ">
            <div className="bg-accent/20 px-2 py-2 rounded-lg">
              <Building2 size={20} className="text-accent" />
            </div>
          </div>
        </div>
      ) : (
        // Full company selector when expanded
        <div className="relative px-3 py-4 border-b border-white/10">
          <button
            onClick={() => setIsCompanyOpen(!isCompanyOpen)}
            className="w-full flex items-center gap-3 px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl transition-all group"
          >
            <div className="p-1.5 bg-accent/20 rounded-lg group-hover:bg-accent/30 transition-colors">
              <Building2 size={18} className="text-accent" />
            </div>
            <div className="text-left overflow-hidden">
              <p className="text-[10px] text-white/50 uppercase font-bold tracking-wider leading-none mb-1">Company</p>
              <p className="text-sm font-semibold truncate leading-none">{selectedCompany}</p>
            </div>
            <ChevronDown size={14} className={`ml-auto text-white/50 transition-transform duration-300 ${isCompanyOpen ? 'rotate-180' : ''}`} />
          </button>

          {isCompanyOpen && (
            <div className="absolute left-3 right-3 mt-2 bg-primary border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
              <div className="p-1">
                {['The Food Hub Cafe', 'Company 1', 'Company 2'].map((company) => (
                  <button
                    key={company}
                    onClick={() => {
                      setSelectedCompany(company);
                      setIsCompanyOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${selectedCompany === company ? 'bg-accent text-white' : 'hover:bg-white/5 text-white/80'
                      }`}
                  >
                    {company}
                  </button>
                ))}
              </div>
              <div className="p-1 border-t border-white/10 bg-white/5">
                <button className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-accent hover:bg-accent/10 rounded-lg transition-colors">
                  <Plus size={14} />
                  Add New Company
                </button>
              </div>
            </div>
          )}
        </div>
      )}

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
                  ${isActive ? 'text-accent' : 'hover:text-accent'} py-4 pr-4`}
                >

                  {/* ICON CONTAINER: Fixed w-16 matches the collapsed sidebar width exactly */}
                  <div className="w-16 flex justify-center items-center shrink-0">
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
