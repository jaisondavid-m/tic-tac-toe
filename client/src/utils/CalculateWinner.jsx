import React from "react"
import { WIN_PATTERNS } from "../Constants/game"

function CalculateWinner(board,returnLine = false) {
    for(let [a, b, c] of WIN_PATTERNS) {
        if( board[a] && board[a] === board[b] && board[a] === board[c] ) {
            return returnLine ? [a,b,c] : board[a]
        }
    }
    return null
}

export default CalculateWinner