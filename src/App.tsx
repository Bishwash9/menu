import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MenuPage from './Pages/MenuPage'
import Testsidebar from './Pages/TestingSidebar'
// import OrderModelPage from './Pages/OrderModelPage'
import Dashboard from './Features/Dashboard/Dashboard'
import { TitleBar } from './components/TitleBar'
import { SplashScreen } from './components/Common/SplashScreen'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      <SplashScreen isLoading={isLoading} />
      <TitleBar />
      <div className="flex-1 pt-10">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/menu' element={<MenuPage />} />
            <Route path='/sidebar' element={<Testsidebar />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App