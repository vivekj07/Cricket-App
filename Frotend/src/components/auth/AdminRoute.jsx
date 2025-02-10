import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoute = ({adminOnly=true,isAdmin=false,redirect="/",children}) => {
    if(adminOnly && !isAdmin) <Navigate to={redirect} />

  return (
    children ? children : <Outlet />
  )
}

export default AdminRoute