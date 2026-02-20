import { Outlet } from "react-router-dom"; // Import Outlet
import DashboardHeader from "./DashboardHeader";
import { SideBar } from "./Sidebar";

export function DashboardLayout() {
    return (
        <div className="flex h-screen overflow-hidden">
            <SideBar />

            <div className="bg-gray-50 overflow-y-auto flex-1">
                <DashboardHeader initials="B" />
                
                {/* Outlet is the dynamic content of page */}
                <main className="p-6">
                    <Outlet /> 
                </main>
            </div>
        </div>
    );
}