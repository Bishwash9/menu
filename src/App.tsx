import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MenuPage from './Pages/MenuPage'
import Testsidebar from './Pages/TestingSidebar'
import OrderModelPage from './Pages/OrderModelPage'
import Dashboard from './Features/Dashboard/Dashboard'
import BookingPage from './Pages/BookingPage'
import MenuManagementPage from './Pages/MenuManagementPage'
import StaffManagementPage from './Pages/StaffManagementPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/orderForm' element={<OrderModelPage />} />
          <Route path='/menu' element={<MenuPage />} />
          <Route path='/sidebar' element={<Testsidebar />} />
          <Route path='/bookings' element={<BookingPage />} />
          <Route path='/menu-management' element={<MenuManagementPage />} />
          <Route path='/staff-management' element={<StaffManagementPage />} />
          <Route path='/' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App