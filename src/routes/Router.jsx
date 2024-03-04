import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import getProfile from '../services/user'

import HomePage from '../pages/HomePage'
import DashboardPage from '../pages/DashboardPage'
import AdminPage from '../pages/AdminPage'
import AuthPage from '../pages/AuthPage'
import PageNotFound from '../pages/404'


function Router() {

    const { isLoading, data, error } = useQuery(["profile"], getProfile)
    console.log({isLoading, data, error});

    if(isLoading) return <h1>Loading</h1>

  return (
    <Routes>
      <Route index element={ <HomePage /> } />
      <Route path='/dashboard' element={ <DashboardPage /> } />
      <Route path='/admin' element={ <AdminPage /> } />
      <Route path='/auth' element={ <AuthPage /> } />
      <Route path='*' element={ <PageNotFound /> } />
    </Routes>
  )
}

export default Router