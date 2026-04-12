import React from "react"
import NavBar from "../components/NavBar.jsx"
import { Outlet } from "react-router-dom"

function ProtectedLayout() {
    return (
        <>
            <NavBar/>
            <Outlet/>
        </>
    )
}

export default ProtectedLayout