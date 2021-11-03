import React from 'react'
import Test from './views/pages/Test'
import { RouteObject } from 'react-router'
import MainLayout from './layout/MainLayout'
import Login from './views/login/Login'
import { Outlet } from 'react-router-dom'


const routes: RouteObject[] = [
  {
    path: '/app',
    element: <MainLayout/>,
    children: [{
        'path': 'test',
        'element': <Test/>,
    }]
  },
  {
    path: "/",
    element: <><Outlet/></>,
    children: [{
      path: 'login',
      element: <Login/>
    },
    {
      path: 'register',
      element: <Test/>
    }
    ]
  }
]

export default routes
