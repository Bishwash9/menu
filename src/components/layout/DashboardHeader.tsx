import { Globe, Cog, Soup, Bed ,Bell,User } from "lucide-react";
import { useState } from "react";

type HeaderProps = {
  initials?: string;
};

export default function DashboardHeader({ initials = "SA" }: HeaderProps) {

    const[isSettingsOpen, setIsSetingsOpen] = useState(false);

  return (
    <header className=" h-14 flex items-center justify-end px-4">
      <div className="flex items-center gap-4 text-black">
      

      
        {/*Settinfs ko dropdown */}
        <div className="relative">
           
        <button
        onClick={()=>setIsSetingsOpen(!isSettingsOpen)}
        className="hover:text-slate-200 transition flex items-center">
          <Cog size={20} />
        </button>

        {isSettingsOpen &&(
            <div className="absolute right-0 mt-2 w-[8vw] bg-white rouded-xl shadow-lg border border-gray-00 py-1 z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">Settings</p>
              </div>

              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <User size={16} />
                <span>Profile</span>
              </button>

            
              {/* Language */}
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Globe size={16} />
                <span>Language</span>
              </button>

                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Soup size={16} />
                <span>Add Order</span>
              </button>

                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Bed size={16} />
                <span>Add Room</span>
              </button>
            </div>
        )}

        </div>


        {/* Notification */}
        <button className="relative hover:text-slate-200 transition">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Divider */}
        <span className="h-6 w-px bg-slate-400" />

        {/* Profile */}
        <div className="flex items-center justify-center h-7 w-7 text-white text-sm rounded-full border-2 border-yellow-400 bg-[#002366] font-semibold">
          {initials}
        </div>
      </div>
    </header>
  );
}