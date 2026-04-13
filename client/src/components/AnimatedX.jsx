import React from "react"

function AnimatedX() {
    return (
        <svg viewBox="0 0 100 100" className="w-10 h-10" >
            <line
                x1="20"
                y1="20"
                x2="80"
                y2="80"
                className="stroke-black stroke-[8] fill-none animate-draw-line"
            />
            <line
                x1="80"
                y1="20"
                x2="20"
                y2="80"
                className="stroke-black stroke-[8] fill-none animate-draw-line delay-15"
            />
        </svg>
    )
}

export default AnimatedX