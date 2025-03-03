import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './routes/HomePage';
import ListPage from './routes/ListPage';
import SinglePage from './routes/SinglePage';
import Navbar from './components/Navbar';
function App() {
  return (
    <>
    <Navbar />
      <BrowserRouter>
      <Routes>
      <Route index element={<HomePage />} />
      <Route path='/list' element={<ListPage />} />
      <Route path='/:id' element={<SinglePage />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
