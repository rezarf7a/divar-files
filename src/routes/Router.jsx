import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import {getProfile} from '../services/user'

import HomePage from '../pages/HomePage'
import DashboardPage from '../pages/DashboardPage'
import AdminPage from '../pages/AdminPage'
import AuthPage from '../pages/AuthPage'
import PageNotFound from '../pages/404'
import Loader from '../components/modules/Loader'
import PostDiscription from '../pages/PostDiscription'


function Router() {

    const { isLoading, data, error } = useQuery(["profile"], getProfile)
    // console.log({isLoading, data, error});

    if(isLoading) return <Loader />

  return (
    <Routes>
      <Route index element={ <HomePage /> } />
      <Route path='/dashboard' element={ data ? <DashboardPage /> : <Navigate to="/auth" /> } />
      <Route path='/admin' element={ data && data.data.role === "ADMIN" ? <AdminPage /> : <Navigate to="/" /> } />
      <Route path='/auth' element={ data ? <Navigate to="/dashboard" /> : <AuthPage /> } />
      <Route path='/description/:id' element={<PostDiscription />} />
      <Route path='*' element={ <PageNotFound /> } />
    </Routes>
  )
}

export default Router