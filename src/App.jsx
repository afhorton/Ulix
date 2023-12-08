import React, { useContext } from 'react';
import Layout from "./components/Layout";
import UserProvider from './AuthProvider';
// import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import StoryList from './pages/StorytList';
import StoryForm from './pages/StoryForm';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Home from './pages/Home';
import Error from './pages/Error';
import About from './pages/About';
import EditStory from './pages/EditStory';



function App() {
  const user = useContext(UserProvider);
  const router = createBrowserRouter([
   { element: <Layout />,
   children:[
    {path: "/", element: <Home />, errorElement: <Error /> },
    {path: "/storyList", element: <StoryList/> , errorElement: <Error />},
    {path: "/storyForm", element: <StoryForm/> , errorElement: <Error /> },
    {path:"/login", element: <Login/> , errorElement: <Error />},
    {path: "/signup", element: <SignUp/>, errorElement: <Error />},
    {path: "/about", element: <About/>, errorElement: <Error />},
    {path: "/editStory", element: <EditStory/>, errorElement: <Error />}
   ],
  },
  ])

  return (
    <>
     <UserProvider >
        <RouterProvider router={router} />
     </UserProvider>
    </>
  )
}

export default App;