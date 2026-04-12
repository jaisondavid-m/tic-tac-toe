import React from "react"
import { Cell } from "./Cell"

function Board({ board , onMove }) {
    return (
        <div className="grid grid-cols-3 gap-2 w-fit mx-auto">
            {board.map((cell,i) => (
                <Cell key={i} value={cell} onClick={() => onMove(i)} />
            ))}
        </div>
    )
}

export default Board