import React from "react"
import CalculateWinner from "./CalculateWinner"
import { BOT , HUMAN } from "../Constants/game"
import getAvailableMoves from "./getAvailableMoves"

function minimax( board , depth , isMax ) {

    const winner = CalculateWinner(board)

    if ( winner === BOT ) return 10 - depth
    if ( winner === HUMAN ) return depth - 10
    if ( getAvailableMoves(board).length === 0 ) return 0

    if (isMax) {
        let best = -Infinity
        for ( let m of getAvailableMoves(board) ) {
            const newBoard = [...board]
            newBoard[m] = BOT
            best = Math.max( best , minimax(newBoard , depth + 1 , false ) )
        }
        return best
    } else {
        let best = Infinity
        for (let m of getAvailableMoves(board) ) {
            const newBoard = [...board]
            newBoard[m] = HUMAN
            best = Math.min( best , minimax( newBoard , depth + 1 , true ) )
        }
        return best
    }
}

export default minimax