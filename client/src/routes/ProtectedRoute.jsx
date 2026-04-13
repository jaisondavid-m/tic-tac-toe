import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"
import Loading from "../components/Loading.jsx"

function ProtectedRoute({ children }) {
    const { isAuthenticated , loading } = useAuth()

    if(loading) {
        return (
            <Loading/>
        )
    }
    return isAuthenticated ? children : <Navigate to="/" replace />
}

export default ProtectedRoute