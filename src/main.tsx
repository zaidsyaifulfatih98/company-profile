import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
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
    path: '/',
    element: <App />,
  },
  {
      path : '/company-page',
      Component : Home
    },
    {
      path : '/company-page/about-us',
      Component : AboutUs
    },
    {
      path : '/company-page/products',
      Component : ProductPageCompany
    },
    {
      path : '/company-page/blog',
      Component : BlogPage
    },
    {
      path : '/company-page/create-blog',
      Component : CreateBlog
    },
    {
    path: "/company-page/blog/:id",
    element: <BlogDetails />,
    },
    {
      path : '/company-page/login',
      Component : LoginPage
    },
    {
      path : '/company-page/register',
      Component : RegisterPage
    },
    {
      path : '/company-page/teams',
      Component : TeamsPage
    },
    {
      path : '/company-page/products/:id',
      Component : ProductsPageDetail
    },
    {
      path : '/company-page/cart',
      Component : CartItemsPage
    },
])

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)