import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MenuPage from './Pages/MenuPage'
import Testsidebar from './Pages/TestingSidebar'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path = '/' element={<MenuPage/>}/>
        <Route path = '/sidebar' element={<Testsidebar/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App