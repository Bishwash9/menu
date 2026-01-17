import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MenuPage from './Pages/MenuPage'
import Testsidebar from './Pages/TestingSidebar'
import OrderModelPage from './Pages/OrderModelPage'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path = '/' element={<OrderModelPage/>}/>
        <Route path='/menu' element = {<MenuPage/>}/>
        <Route path = '/sidebar' element={<Testsidebar/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App