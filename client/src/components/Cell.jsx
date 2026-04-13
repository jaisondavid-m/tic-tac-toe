import React from "react"
import AnimatedO from "./AnimatedO"
import AnimatedX from "./AnimatedX"

export function Cell({ value , onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex h-20 w-20 text-3xl font-bold border rounded-xl shadow-sm hover:bg-gray-100 transition justify-center items-center"
        >
            { value === "X" && <AnimatedX/> }
            { value === "O" && <AnimatedO/> }
        </button>
    )
}