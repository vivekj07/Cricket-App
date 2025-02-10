import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoute = ({children,isAuthenticated,redirect="/login"}) => {
  if(!isAuthenticated) return <Navigate to={redirect} />

  return (
     children ? children : <Outlet />
  )
}

export default ProtectedRoute