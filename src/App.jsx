import React from 'react';
import Layout from "./components/Layout";
import firebase from 'firebase/app';
import 'firebase/firestore';
import UserProvider from './UserContext';
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

function App() {
 
  const router = createBrowserRouter([
   { element: <Layout />,
   children:[
    {path:"/", element: <Home/>, errorElement: <Error /> },
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
