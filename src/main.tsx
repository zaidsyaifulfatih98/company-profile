import React from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './page/page.tsx'
import AboutUs from './page/AboutUs.tsx'
import ProductPageCompany from './page/Products.tsx'
import BlogPage from './page/Blog.tsx'
import CreateBlog from './page/CreateBlog.tsx'
import BlogDetails from './page/BlogDetails.tsx'
import LoginPage from './page/LoginPage.tsx'
import RegisterPage from './page/RegisterPage.tsx'
import TeamsPage from './page/Teams.tsx'
import ProductsPageDetail from './page/ProductsPageDetail.tsx'
import CartItemsPage from './page/CartItems.tsx'




const router = createBrowserRouter([
  
  {
      path : '/',
      Component : Home
    },
    {
      path : '/about-us',
      Component : AboutUs
    },
    {
      path : '/products',
      Component : ProductPageCompany
    },
    {
      path : '/blog',
      Component : BlogPage
    },
    {
      path : '/create-blog',
      Component : CreateBlog
    },
    {
    path: "/blog/:id",
    element: <BlogDetails />,
    },
    {
      path : '/login',
      Component : LoginPage
    },
    {
      path : '/register',
      Component : RegisterPage
    },
    {
      path : '/teams',
      Component : TeamsPage
    },
    {
      path : '/products/:id',
      Component : ProductsPageDetail
    },
    {
      path : '/cart',
      Component : CartItemsPage
    },
])

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)