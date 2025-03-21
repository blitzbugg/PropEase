import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './routes/HomePage';
import ListPage from './routes/ListPage';
import SinglePage from './routes/SinglePage';
import Navbar from './components/Navbar';
import ProfilePage from './routes/ProfilePage';
function App() {
  return (
    <>
      <BrowserRouter>
    <Navbar />
      <Routes>
      <Route index element={<HomePage />} />
      <Route path='/list' element={<ListPage />} />
      <Route path='/:id' element={<SinglePage />} />
      <Route path='/profile' element={<ProfilePage />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
