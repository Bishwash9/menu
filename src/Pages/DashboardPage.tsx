import { DashboardLayout } from "../Components/Layout/DashboardLayout";
import { useAuth } from "../Context/AuthContext";
import AdminDashboardContent from "../Features/Dashboard/AdminDashboardContent";
import HouseKeepingDashboardContent from "../Features/Dashboard/HouseKeepingDashboardContent";
import StaffDashboardContent from "../Features/Dashboard/ReceptionDashboardContent";
import UserDashboardContent from "../Features/Dashboard/UserDashboardContent";

export default function DashboardPage () {
    const {role} = useAuth();
    const currentRole = role?.toLowerCase();


    return(
        <DashboardLayout>
            {currentRole === 'admin' && <AdminDashboardContent/>}
            {currentRole === 'reception' && <StaffDashboardContent/>}
            {currentRole === 'user' && <UserDashboardContent/>}
            {currentRole === 'housekeeping' && <HouseKeepingDashboardContent/>}
        </DashboardLayout>
    )
}