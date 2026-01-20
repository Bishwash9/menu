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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/orderForm' element={<OrderModelPage />} />
          <Route path='/menu' element={<MenuPage />} />
          <Route path='/bookings' element={<BookingPage />} />
          <Route path='/menu-management' element={<MenuManagementPage />} />
          <Route path='/staff-management' element={<StaffManagementPage />} />
          <Route path='/rooms' element={<RoomsPage />} />
          <Route path='/tables' element={<TablesPage />} />
          <Route path='/cafe-orders' element={<CafeOrdersPage />} />
          <Route path='/reports' element={<ReportsPage />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='/guests' element={<GuestsPage />} />
          <Route path='/billing' element={<BillingPage />} />
          <Route path='/roles-access' element={<RolesAccessPage />} />
          <Route path='/' element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App