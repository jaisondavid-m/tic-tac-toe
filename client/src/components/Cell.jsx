import React from "react"

export function Cell({ value , onClick }) {
    return (
        <button
            onClick={onClick}
            className="h-20 w-20 text-3xl font-bold border rounded-xl shadow-sm hover:bg-gray-100 transition"
        >
            { value }
        </button>
    )
}