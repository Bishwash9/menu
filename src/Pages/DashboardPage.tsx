import { useAuth } from "../Context/AuthContext";
import AdminDashboardContent from "../Features/Dashboard/AdminDashboardContent";
import HouseKeepingDashboardContent from "../Features/Dashboard/HouseKeepingDashboardContent";
import StaffDashboardContent from "../Features/Dashboard/ReceptionDashboardContent";
import UserDashboardContent from "../Features/Dashboard/UserDashboardContent";

export default function DashboardPage() {
    const { role } = useAuth();
    const currentRole = role?.toLowerCase();


    return (
        <>
            {currentRole === 'admin' && <AdminDashboardContent />}
            {currentRole === 'staff' && <StaffDashboardContent />}
            {currentRole === 'user' && <UserDashboardContent />}
            {currentRole === 'housekeeper' && <HouseKeepingDashboardContent />}
        </>
    )
}