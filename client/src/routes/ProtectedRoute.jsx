import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"

function ProtectedRoute({ children }) {
    const { isAuthenticated , loading } = useAuth()

    if(loading) {
        return (
            <div className="">
                Loading...
            </div>
        )
    }
    return isAuthenticated ? children : <Navigate to="/" replace />
}

export default ProtectedRoute