import React from "react"
import minimax from "./minimax.jsx"
import { BOT } from "../Constants/game.js"
import getAvailableMoves from "./getAvailableMoves.jsx"
import { DIFFICULTY } from "../Constants/difficulty.js"
import smartMove from "./smartMove.jsx"

function randomMove(board) {
    const moves = getAvailableMoves(board)
    return moves[Math.floor(Math.random()*moves.length)]
}

function bestMove( board , difficulty = DIFFICULTY.HARD ) {
    const moves = getAvailableMoves(board)
    if (moves.length===0) return null
    //easy
    if (difficulty === DIFFICULTY.EASY) {
        return Math.random() < 0.7 ? randomMove(board) : smartMove(board)
    }

    //medium
    if (difficulty === DIFFICULTY.MEDIUM) {
        return Math.random() < 0.4 ? randomMove(board) : smartMove(board)
    }

    return smartMove(board)
}

export default bestMove