import React from "react"
import { Cell } from "./Cell"
import getLineStyle from "../utils/getLinStyle"

function Board({ board , onMove , winningLine }) {
    const lineStyle = getLineStyle(winningLine)
    return (
        <div className="relative grid grid-cols-3 gap-2 w-fit mx-auto">
            {board.map((cell,i) => (
                <Cell key={i} value={cell} onClick={() => onMove(i)} />
            ))}
            {winningLine && (
                <div
                    className={`absolute bg-black rounded-full animate-grow ${lineStyle}`}
                >
                </div>
            )}
        </div>
    )
}

export default Board