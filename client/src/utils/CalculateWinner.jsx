import React from "react"
import { WIN_PATTERNS } from "../Constants/game"

function CalculateWinner(board) {
    for(let [a, b, c] of WIN_PATTERNS) {
        if( board[a] && board[a] === board[b] && board[a] === board[c] ) {
            return board[a]
        }
    }
    return null
}

export default CalculateWinner