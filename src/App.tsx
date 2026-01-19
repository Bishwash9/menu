import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TitleBar } from './components/TitleBar'
import { WebSocketProvider } from './Providers/WebSocketProvider'
import MenuPage from './Pages/MenuPage'
import Testsidebar from './Pages/TestingSidebar'
import OrderModelPage from './Pages/OrderModelPage'
import Dashboard from './Features/Dashboard/Dashboard'

function App() {
  return (
    <WebSocketProvider>
      <BrowserRouter>
        <TitleBar />
        <main className="pt-10 h-full overflow-y-auto bg-gray-50">
          <Routes>
            <Route path='/orderForm' element={<OrderModelPage />} />
            <Route path='/menu' element={<MenuPage />} />
            <Route path='/sidebar' element={<Testsidebar />} />
            <Route path='/' element={<Dashboard />} />
          </Routes>
        </main>
      </BrowserRouter>
    </WebSocketProvider>
  )
}

export default App