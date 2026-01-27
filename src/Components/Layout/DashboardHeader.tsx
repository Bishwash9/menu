import { useState, useEffect, useRef } from "react";
import { Bell, User, LogOut, CheckCircle, Info, AlertCircle, Plus, X } from "lucide-react";
import OrderModelPage from "../../Pages/OrderModelPage";

export default function DashboardHeader({ initials = "" }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logs = [
    { id: 1, type: 'success', msg: 'Order #4292 confirmed', time: '2m ago' },
    { id: 2, type: 'info', msg: 'Room 302 checked out', time: '15m ago' },
    { id: 3, type: 'warning', msg: 'Stock low: Tomato Sauce', time: '1h ago' },
  ];

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle size={14} className="text-emerald-500" />;
      case 'warning': return <AlertCircle size={14} className="text-amber-500" />;
      default: return <Info size={14} className="text-blue-500" />;
    }
  };

  return (
    <>
      <header className="h-14 flex items-center justify-end px-6 sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="flex items-center gap-4">

          <button
            onClick={() => { setIsOrderModalOpen(true) }} //open modal when clicked 
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-200 text-sm font-medium shadow-sm active:scale-95"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Add Order</span>
          </button>


          <div className="h-4 w-px bg-slate-200 mx-1" />

          <div className="relative" ref={notificationsRef}>
            <button
              type="button"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className={`p-2 rounded-lg transition-colors relative ${isNotificationsOpen ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
            >




              <Bell size={19} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
                  <span className="font-semibold text-xs text-slate-700">Notifications</span>
                  <button type="button" className="text-[10px] text-blue-600 font-bold hover:underline">Mark all read</button>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {logs.map((log) => (
                    <div key={log.id} className="px-4 py-3 hover:bg-slate-50 flex gap-3 transition-colors cursor-pointer group">
                      <div className="shrink-0 pt-0.5">{getLogIcon(log.type)}</div>
                      <div className="flex flex-col min-w-0">
                        <p className="text-[12px] text-slate-700 leading-tight truncate">{log.msg}</p>
                        <span className="text-[10px] text-slate-400 mt-1">{log.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" className="w-full py-2.5 text-[11px] font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-50 border-t border-slate-100 transition-colors">
                  View History
                </button>
              </div>
            )}
          </div>

          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="group flex items-center gap-2 p-1 rounded-full hover:bg-slate-50 transition-all"
            >
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white ring-2 ring-offset-2 ring-transparent group-hover:ring-slate-200 transition-all">
                {initials}
              </div>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl shadow-slate-200/50 border border-slate-200 py-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-2 mb-1 border-b border-slate-50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Account</p>
                </div>
                <button type="button" className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                  <User size={15} />
                  <span>My Profile</span>
                </button>
                <button type="button" className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors">
                  <LogOut size={15} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/*Render Modal Overlay outside header to avoid stacking context issues */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-100 grid place-items-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 backdrop-blur-sm bg-black/40"
            onClick={() => setIsOrderModalOpen(false)} //close div when clicking on backdrop
          />

          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              onClick={() => setIsOrderModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors z-50 rounded-full hover:bg-slate-100"
            >
              <X size={20} />
            </button>
            <OrderModelPage isModal={true} />
          </div>

        </div>
      )}
    </>
  );
}