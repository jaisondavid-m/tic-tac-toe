import React from "react"
import { HUMAN , BOT } from "../Constants/game"
import bestMove from "./bestMove"
import CalculateWinner from "./CalculateWinner.jsx"

export const initialState = {
    board: Array(9).fill(null),
    turn: HUMAN,
    winner: null,
    draw: false,
}

function reducer( state , action ) {
    switch (action.type) {
        case "MOVE": {
            if (state.board[action.index] || state.winner) return state
            const board = [...state.board]
            board[action.index] = HUMAN
            return { ...state , board , turn: BOT  }
        }
        case "BOT_MOVE": {
            const board = [...state.board]
            const move = bestMove(board)
            if (move !== null) board[move] = BOT
            return { ...state , board , turn: HUMAN }
        }
        case "UPDATE": {
            const winner = CalculateWinner(state.board)
            const draw = !winner && state.board.every(Boolean)
            return { ...state , winner , draw }
        }
        case "RESET":
            return initialState
        
        default:
            return state
    }
}

export default reducer