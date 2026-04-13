import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"
import Loading from "../components/Loading.jsx"

function PublicRoute({ children }) {
    const { isAuthenticated , loading } = useAuth()
    if(loading) {
        return(
            <Loading/>
        )
    }
    return isAuthenticated ? <Navigate to="/home" replace /> : children
}

export default PublicRoute