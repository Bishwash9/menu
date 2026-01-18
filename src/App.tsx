
import { useState, useEffect } from 'react';
import { SplashScreen } from './components/Common/SplashScreen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MenuPage from './Pages/MenuPage';
import Testsidebar from './Pages/TestingSidebar';
import OrderModelPage from './Pages/OrderModelPage';
import Dashboard from './Features/Dashboard/Dashboard';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show splash for 1.5 seconds on every refresh
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SplashScreen isLoading={isLoading} />
      {!isLoading && (
        <BrowserRouter>
          <Routes>
            <Route path='/orderForm' element={<OrderModelPage />} />
            <Route path='/menu' element={<MenuPage />} />
            <Route path='/sidebar' element={<Testsidebar />} />
            <Route path='/' element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;