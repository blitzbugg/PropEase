import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import HomePage from './routes/HomePage';
import ListPage from './routes/ListPage';
import SinglePage from './routes/SinglePage';
import ProfilePage from './routes/ProfilePage';
import ProfileUpdatePage from './routes/ProfileUpdatePage';
import Register from './routes/Register';
import Login from './routes/Login';
import { Layout, RequireAuth } from './routes/Layout';
import NewPostPage from './routes/NewPostPage';
import { singlePageLoader } from './lib/loaders';

const router = createBrowserRouter([
  {
    element: <Layout />, // Public layout wrapper
    children: [
      { index: true, element: <HomePage /> },
      { path: 'list', element: <ListPage /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
  {
    element: <RequireAuth />, // Protected routes wrapper
    children: [
      { path: 'profile', element: <ProfilePage /> },
      { path: 'profile/update', element: <ProfileUpdatePage /> },
      { path: ':id', element: <SinglePage />, loader: singlePageLoader,},
      { path: 'add', element: <NewPostPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
