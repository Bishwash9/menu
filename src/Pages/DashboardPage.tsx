import { DashboardLayout } from "../Components/Layout/DashboardLayout";
import { useAuth } from "../Context/AuthContext";
import AdminDashboardContent from "../Features/Dashboard/AdminDashboardContent";
import StaffDashboardContent from "../Features/Dashboard/ReceptionDashboardContent";
import UserDashboardContent from "../Features/Dashboard/UserDashboardContent";

export default function DashboardPage () {
    const {role} = useAuth();


    return(
        <DashboardLayout>
            {role === 'admin' && <AdminDashboardContent/>}
            {role === 'staff' && <StaffDashboardContent/>}
            {role === 'user' && <UserDashboardContent/>}
        </DashboardLayout>
    )
}