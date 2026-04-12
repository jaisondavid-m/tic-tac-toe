import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"

function PublicRoute({ children }) {
    const { isAuthenticated , loading } = useAuth()
    if(loading) {
        return(
            <div className="">
                Loading...
            </div>
        )
    }
    return isAuthenticated ? <Navigate to="/home" replace /> : children
}

export default PublicRoute