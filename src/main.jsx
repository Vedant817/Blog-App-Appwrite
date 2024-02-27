import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'

import AuthLayout from './components/AuthLayout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
    {
      path: "/",
      element: <Home />
    },
    {
      path: '/login',
      element: (
        <AuthLayout authentication={false}>
          <Login />
        </AuthLayout>
      )
    },
    {
      path: '/signup',
      element: (
        <AuthLayout authentication={false}>
          <Signup />
        </AuthLayout>
      )
    },
    {
      path: '/all-post',
      element: (
        <AuthLayout authentication>
          <AllPosts />
        </AuthLayout>
      )
    },
    {
      path: 'add-post',
      element: (
        <AuthLayout authentication>
          <AddPost />
        </AuthLayout>
      )
    },
    {
      path: '/edit-post/:slug',
      element: (
        <AuthLayout authentication>
          <EditPost />
        </AuthLayout>
      )
    },
    {
      path: '/post/slug',
      element: (
        <AuthLayout authentication>
          <Post />
        </AuthLayout>
      )
    }
  ]
}])
//! Every Page of the site should be wrapped with the store.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
