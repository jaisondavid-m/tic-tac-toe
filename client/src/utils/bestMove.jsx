import React from "react"
import minimax from "./minimax.jsx"
import getAvailableMoves from "./getAvailableMoves.jsx"
import { BOT } from "../Constants/game.js"

function bestMove(board) {
    let bestScore = -Infinity
    let move = null

    for( let i of getAvailableMoves(board) ) {

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

export default bestMove