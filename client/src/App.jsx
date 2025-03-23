import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './routes/HomePage';
import ListPage from './routes/ListPage';
import SinglePage from './routes/SinglePage';
import Navbar from './components/Navbar';
import ProfilePage from './routes/ProfilePage';
import Register from './routes/Register';
import Login from './routes/Login';
function App() {
  return (
    <>
      <BrowserRouter>
    <Navbar />
      <Routes>
      <Route index element={<HomePage />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/list' element={<ListPage />} />
      <Route path='/:id' element={<SinglePage />} />
      <Route path='/profile' element={<ProfilePage />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
