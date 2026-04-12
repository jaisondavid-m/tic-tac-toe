import React from "react"
import { HUMAN , BOT } from "../Constants/game"
import bestMove from "./bestMove"
import CalculateWinner from "./CalculateWinner.jsx"

export const initialState = {
    board: Array(9).fill(null),
    turn: HUMAN,
    winner: null,
    draw: false,
    difficulty: "MEDIUM",
    gameStarted: false,
    showResult: false,
}

function reducer( state , action ) {
    switch (action.type) {
        case "START_GAME": 
            return {
                ...state,
                gameStarted: true,
                winner: null,
                draw: false,
            }
        case "RESET":
            return {
                ...initialState,
                gameStarted: false,
                showResult: false,
            }
        case "RESTART_MATCH":
            return {
                ...state,
                board: Array(9).fill(null),
                turn: HUMAN,
                winner: null,
                draw:false,
                showResult:false
            }
        case "MOVE": {
            if (state.board[action.index] || state.winner) return state
            const board = [...state.board]
            board[action.index] = HUMAN
            return { ...state , board , turn: BOT  }
        }
        case "BOT_MOVE": {
            const board = [...state.board]
            const move = bestMove(board,state.difficulty)
            if (move !== null){
                board[move] = BOT
                return { ...state , board , turn: HUMAN }
            } 
            return { ...state , board , turn: HUMAN }
        }
        case "SET_DIFFICULTY":
            return { ...state , difficulty: action.value }
        case "UPDATE": {
            const winner = CalculateWinner(state.board)
            const draw = !winner && state.board.every(Boolean)
            return { ...state , winner , draw , showResult: !!winner || draw }
        }
        
        default:
            return state
    }
}

export default reducer