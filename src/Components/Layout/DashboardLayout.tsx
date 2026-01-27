import DashboardHeader from "./DashboardHeader";
import { SideBar } from "./Sidebar";

export function DashboardLayout({children}:{children:React.ReactNode}){
    return(
        <div className="flex h-screen overflow-hidden">
            <SideBar/>

            <div className="bg-gray-50 overflow-y-auto flex-1">
                <DashboardHeader initials="B"/>
                {children} {/*esma chai content hunxa (admin,user,staff) which is dynamic with the concept of children*/ }
            </div>
        </div>
    );
}