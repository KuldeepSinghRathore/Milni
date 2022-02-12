import React from "react"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

export const PrivateRoutes = ({ children }) => {
  const users = useSelector((state) => state.users)

  const location = useLocation()

  if (!users.token) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return children
}
