import React from "react"

function GameLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
            { children }
        </div>
    )
}

export default GameLayout