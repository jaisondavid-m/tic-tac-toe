import React from "react"
import getAvailableMoves from "./getAvailableMoves"
import { BOT } from "../Constants/game"
import minimax from "./minimax.jsx"

function smartMove( board ) {
    let bestScore = -Infinity
    let move = null
    for (let i of getAvailableMoves(board)) {
        const newBoard = [...board]
        newBoard[i] = BOT
        const score = minimax( newBoard , 0 , false )
        if ( score > bestScore ) {
            bestScore = score 
            move = i
        }
    }
    return move
}

export default smartMove