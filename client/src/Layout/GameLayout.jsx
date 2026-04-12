import React from "react"

function GameLayout({ title , children }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
            <h1 className="text-4xl font-extrabold mb-6">
                { title }
            </h1>
            { children }
        </div>
    )
}

export default GameLayout