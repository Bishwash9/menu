import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SIDEBAR_CONFIG } from "../../config/sidebarConfig";
import type { Role } from "../../lib/roles";

interface SideBarProps {
  role: Role;
}

export function SideBar({ role }: SideBarProps) {
  const menuItems = SIDEBAR_CONFIG[role] || [];

  //  ADD: collapse state
  const [collapsed, setCollapsed] = useState(false);

  // GSAP refs
  const sidebarRef = useRef<HTMLElement>(null);
  const headerTextRef = useRef<HTMLHeadingElement>(null);
  const headerIconRef = useRef<HTMLSpanElement>(null);
  const menuItemsRef = useRef<(HTMLSpanElement | null)[]>([]);

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

  // GSAP animation effect for collapse/expand
  useEffect(() => {
    const timeline = gsap.timeline();
    const textElements = [headerTextRef.current, headerIconRef.current, ...menuItemsRef.current].filter(Boolean);

    if (collapsed) {
      // Collapse animation - fade out text first, then shrink
      timeline
        .to(textElements, {
          opacity: 0,
          duration: 0.15,
          ease: "power1.out",
        })
        .to(sidebarRef.current, {
          width: "4rem", // w-16
          duration: 0.4,
          ease: "power2.inOut",
        }, 0.1);
    } else {
      // Expand animation - expand first, then fade in text
      timeline
        .to(sidebarRef.current, {
          width: "16rem", // w-64
          duration: 0.4,
          ease: "power2.inOut",
        })
        .to(textElements, {
          opacity: 1,
          duration: 0.25,
          ease: "power1.in",
        }, 0.2);
    }

    return () => {
      timeline.kill();
    };
  }, [collapsed]);

  return (
    <aside
      ref={sidebarRef}
      className="h-screen bg-[#002366] text-white flex flex-col shadow-2xl font-sans overflow-hidden"
      style={{ width: collapsed ? "4rem" : "16rem" }}
      >
      {/* Header */}
      <div className="p-6 flex items-center border-b border-yellow-600/20 mb-4">
        {/* Toggle button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-[#D4AF37] text-xl focus:outline-none hover:scale-110 transition-transform shrink-0"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? "☰" : "✕"}
        </button>
        
        {/* Header content - hidden when collapsed */}
        <div className="flex items-center gap-3 overflow-hidden">
          <span 
            ref={headerIconRef}
            className="text-2xl animate-pulse shrink-0"
            style={{ opacity: collapsed ? 0 : 1, pointerEvents: collapsed ? 'none' : 'auto' }}
          >
            ✨
          </span>

          <h2 
            ref={headerTextRef}
            className="text-[#D4AF37] font-bold tracking-widest text-lg whitespace-nowrap"
            style={{ opacity: collapsed ? 0 : 1, pointerEvents: collapsed ? 'none' : 'auto' }}
          >
            ROYAL BLUE
          </h2>
        </div>
      </div>

      <nav className="flex-1 overflow-hidden">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li
              key={item.label}
              className={`group flex items-center cursor-pointer 
                transition-all duration-200 ease-in-out border-l-4 border-transparent
                hover:bg-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37]
                ${collapsed ? "justify-center px-4 py-4" : "px-6 py-4 gap-4"}`}
            >
              <span className="text-[#D4AF37] group-hover:scale-110 transition-transform duration-200 shrink-0">
                {item.icon}
              </span>

              <span 
                ref={(el) => { menuItemsRef.current[index] = el; }}
                className="text-sm font-medium tracking-wide whitespace-nowrap overflow-hidden"
                style={{ 
                  opacity: collapsed ? 0 : 1,
                  pointerEvents: collapsed ? 'none' : 'auto'
                }}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

