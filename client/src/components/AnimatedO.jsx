import React from "react"

function AnimatedO() {
    return (
        <svg viewBox="0 0 100 100" className="w-10 h-10">
            <circle
                cx="50"
                cy="50"
                r="30"
                className="stroke-black stroke-[8] fill-none animate-draw-circle"
            />
        </svg>
    )
}

export default AnimatedO