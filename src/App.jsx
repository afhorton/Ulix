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
import Story from './pages/Story';
import PublishedList from './pages/PublishedList';
// import { Provider } from 'react-redux';
// import store from './store';
import PublishedStory from './pages/PublishedStory';
import PrivateRoute from './pages/PrivateRoute';


function App() {
  const user = useContext(UserProvider);
  const router = createBrowserRouter(
    [
      {
        element: <Layout />,
        children: [
          { path: "/", element: <Home />, errorElement: <Error /> },
          {
            path: "/storyList",
            element: <StoryList />,
            errorElement: <Error />,
          },
          {
            path: "/storyForm",
            element: <StoryForm />,
            errorElement: <Error />,
          },
          { path: "/login", element: <Login />, errorElement: <Error /> },
          { path: "/signup", element: <SignUp />, errorElement: <Error /> },
          { path: "/about", element: <About />, errorElement: <Error /> },
          {
            path: "/editStory/:postId",
            element: <EditStory />,
            errorElement: <Error />,
          },
          {
            path: "/story/:postId",
            element: <Story />,
            errorElement: <Error />,
          },
          {
            path: "/publishedList",
            element: <PublishedList />,
            errorElement: <Error />,
          },
          {
            path: "/publishedStory/:id",
            element: <PublishedStory />,
            errorElement: <Error />,
          },
          {
            path: "/admin",
            element: <PrivateRoute />,
            errorElement: <Error />,
          },
        ],
      },
    ],
    { basename: "/ulix" }
  );

  return (
    <>
     <UserProvider >
        <RouterProvider router={router} />
     </UserProvider>
    </>
  )
}

export default App;