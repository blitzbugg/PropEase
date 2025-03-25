import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './routes/HomePage';
import ListPage from './routes/ListPage';
import SinglePage from './routes/SinglePage';
import ProfilePage from './routes/ProfilePage';
import Register from './routes/Register';
import Login from './routes/Login';
import { Layout, RequireAuth } from "./routes/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes wrapped with Layout */}
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/list' element={<ListPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>

        {/* Protected routes wrapped with RequireAuth */}
        <Route element={<RequireAuth />}>
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/:id' element={<SinglePage />} />
          {/* Add other protected routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;