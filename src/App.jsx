import React from 'react';
import Layout from "./components/Layout";
import firebase from 'firebase/app';
import 'firebase/firestore';
import UserProvider from './AuthProvider';
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import BlogList from './pages/StorytList';

function App() {
  const user = useContext(UserProvider);
  const router = createBrowserRouter([
   { element: <Layout />,
   children:[
    {path:"/", element: user ? <BlogList/> : <Home />, errorElement: <Error /> },
    {path:, element: , errorElement: <Error /> },
    {path:, element: , errorElement: <Error />},
    {path:, element: , errorElement: <Error />},
    {path:, element: , errorElement: <Error /> },
   ],
  },
  ])

  return (
    <>
     <UserProvider>
        <RouterProvider router={router} />
     </UserProvider>
    </>
  )
}

export default App
