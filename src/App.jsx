import React from 'react';
import Layout from "./components/Layout";
import firebase from 'firebase/app';
import 'firebase/firestore';
import UserProvider from './AuthProvider';
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import StoryList from './pages/StorytList';
import StoryForm from './pages/StoryForm';



function App() {
  const user = useContext(UserProvider);
  const router = createBrowserRouter([
   { element: <Layout />,
   children:[
    {path:"/", element: user ? <StoryList/> : <Home />, errorElement: <Error /> },
    {path: "/StoryForm", element: <StoryForm/> , errorElement: <Error /> },
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
