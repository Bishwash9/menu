import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MenuPage from './Pages/MenuPage'
import OrderModelPage from './Pages/OrderModelPage'
import BookingPage from './Pages/BookingPage'
import MenuManagementPage from './Pages/MenuManagementPage'
import StaffManagementPage from './Pages/StaffManagementPage'
import RoomsPage from './Pages/RoomsPage'
import TablesPage from './Pages/TablesPage'
import CafeOrdersPage from './Pages/CafeOrdersPage'
import ReportsPage from './Pages/ReportsPage'
import SettingsPage from './Pages/SettingsPage'
import GuestsPage from './Pages/GuestsPage'
import BillingPage from './Pages/BillingPage'
import RolesAccessPage from './Pages/RolesAccessPage'
import DashboardPage from './Pages/DashboardPage'
import SubscriptionPage from './Pages/SubscriptionPage'
import { RoleGaurd } from './Components/RoleGaurd/RoleGaurd'
import WebSocketComponent from './WebSocketComponent'
import OrderDetailsPage from './Pages/OrderDetailsPage'
import LoginPage from './Pages/LoginPage'
import { PublicRoute } from './Features/Auth/Components/PublicRoute'

function App() {
  console.log('📱 App Component Rendering');
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route element={<RoleGaurd allowedRoles = {['admin', 'staff','housekeeper' ]}/> }>
            <Route path='/dashboard' element={<DashboardPage />} />
          </Route>  

          <Route element={<PublicRoute />}>
            <Route path='/' element={<LoginPage />} />
          </Route>
          {/* Adimin only pages */}
          <Route element={<RoleGaurd allowedRoles={['admin']} />}>
            <Route path='/menu-management' element={<MenuManagementPage />} />
            <Route path='/staff-management' element={<StaffManagementPage />} />
            <Route path='/settings' element={<SettingsPage />} />
            <Route path='/roles-access' element={<RolesAccessPage />} />
            <Route path='/rooms' element={<RoomsPage />} />
            <Route path='/reports' element={<ReportsPage />} />
            <Route path='/subscription' element={<SubscriptionPage />} />
          </Route>

          {/* Staff only pages */}
          <Route element={<RoleGaurd allowedRoles={['staff']} />}>
            <Route path='/bookings' element={<BookingPage />} />
            <Route path='/guests' element={<GuestsPage />} />
            <Route path='/tables' element={<TablesPage />} />
            <Route path='/cafe-orders' element={<CafeOrdersPage />} />
            <Route path='/menu' element={<MenuPage />} />
            <Route path='/orders/:orderId' element={<OrderDetailsPage />} />
            <Route path='/billing' element={<BillingPage />} />
            <Route path='/orderForm' element={<OrderModelPage />} />
          </Route>


          <Route path='/socket' element={<WebSocketComponent />} />


          {/* User only pages */}
          <Route element={<RoleGaurd allowedRoles={['user']} />}>
            <Route path='/orderForm' element={<OrderModelPage />} />
            <Route path='/menu' element={<MenuPage />} />
            <Route path='/orders/:orderId' element={<OrderDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App