import React , { useEffect , useMemo , useReducer } from "react"
import Board from "../components/Board"
import GameLayout from "../Layout/GameLayout"
import { HUMAN , BOT  } from "../Constants/game"
import reducer , { initialState } from "../utils/reducer"


function Game() {
    const [ state , dispatch ] = useReducer( reducer , initialState )
    const { board , turn , winner , draw } = state
    const handleMove = (i) => {
        if (turn !== HUMAN) return
        dispatch({ type: "MOVE" , index: i })
    }

    useEffect(() => {
        dispatch({ type: "UPDATE" })
        if (!winner && !draw && turn === BOT ) {
            const t = setTimeout(() => {
                dispatch({ type: "BOT_MOVE" })
            }, 400);
            return () => clearTimeout(t)
        }
    },[ board , turn , winner , draw ])

    const status = useMemo(() => {
        if(winner) return `Winner: ${winner}`
        if(draw) return "Draw Game"
        return turn == HUMAN ? "Your Turn (X)" : "BOT is Thinking..."
    },[ winner , draw , turn ])

    return (
        <GameLayout title = "Tic Tac Toe" >
            <Board board={board} onMove={handleMove} />
            <div className="mt-6 text-xl font-medium">{status}</div>
            <button
                onClick={() => dispatch({ type: "RESET" })}
                className="mt-5 px-5 py-2 bg-black text-white rounded-xl hover:opacity-80"
            >
                Restart Game
            </button>
        </GameLayout>
    )
}

export default Game