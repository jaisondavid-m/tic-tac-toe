import React, { useEffect, useMemo, useReducer } from "react"
import Board from "../components/Board"
import GameLayout from "../Layout/GameLayout"
import { HUMAN, BOT } from "../Constants/game"
import reducer, { initialState } from "../utils/reducer"
import DifficultySelect from "../components/DifficultySelect.jsx"
import NavBar from "../components/NavBar.jsx"

function BotGame() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { board, turn, winner, draw , winningLine } = state
    const handleMove = (i) => {
        if (turn !== HUMAN || winner || draw) return
        dispatch({ type: "MOVE", index: i })
    }
    const handleDifficultChange = (e) => {
        dispatch({
            type: "SET_DIFFICULTY",
            value: e.target.value
        })
    }

    useEffect(() => {
        dispatch({ type: "UPDATE" , dispatch })
        if (!winner && !draw && turn === BOT) {
            const t = setTimeout(() => {
                dispatch({ type: "BOT_MOVE" })
            }, 450);
            return () => clearTimeout(t)
        }
    }, [board, turn, winner, draw])

    const status = useMemo(() => {
        if (winner) return `🏆 Winner: ${winner}`
        if (draw) return "🤝Draw Game"
        return turn === HUMAN ? "Your Turn" : "BOT is Thinking..."
    }, [winner, draw, turn])

    if (!state.gameStarted) {
        return (
            <div>
                {/* <NavBar /> */}
                <GameLayout >
                    <div className="w-full max-w-sm mx-auto bg-white shadow-xl rounded-2xl p-6 text-center">
                        <img
                            src="/panda.png"
                            alt="Panda"
                            className="w-28 h-28 objecct-contain mx-auto mb-4 drop-shadow-lg"
                        />
                        <h2 className="text-xl font-bold mb-4">
                            Choose Difficulty
                        </h2>
                        <DifficultySelect
                            value={state.difficulty}
                            onChange={(val) => {
                                dispatch({ type: "SET_DIFFICULTY", value: val })
                            }}
                        />
                        <button
                            onClick={() => dispatch({ type: "START_GAME" })}
                            className="w-full bg-black text-white py-3 rounded-xl"
                        >
                            Start Game
                        </button>
                    </div>
                </GameLayout>
            </div>

        )
    }

    return (
        <div>
            {/* <NavBar/> */}
            <GameLayout>
                <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl p-6">
                    <div className="flex items-center justify-center mb-6">
                        <div
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${turn === HUMAN ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                                }`}
                        >
                            {turn === HUMAN ? "YOU" : "BOT"}
                        </div>
                    </div>
                    <div className="mt-5 text-center">
                        <Board board={board} onMove={handleMove} winningLine={winningLine} />
                    </div>
                    <div className="mt-5 text-center">
                        <p className="text-gray-700 font-medium">{status}</p>
                    </div>
                    <div className="flex justify-between mx-5">
                        <button
                            onClick={() => dispatch({ type: "RESTART_MATCH" })}
                            className="mt-6 py-3 px-4 cursor-pointer bg-black text-white rounded-xl font-medium hover:scale-[1.02] active:scale-95 transition"
                        >
                            Restart Game
                        </button>
                        <button
                            onClick={() => dispatch({ type: "RESET" })}
                            className="mt-6 py-3 px-4 cursor-pointer bg-black text-white rounded-xl font-medium hover:scale-[1.02] active:scale-95 transition"
                        >
                            New Game
                        </button>
                    </div>

                </div>
                {(state.showResult) && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white w-72 p-6 rounded-2xl text-center shadow-2xl">
                            <h2 className="text-xl font-bold mb-2">
                                {
                                    winner
                                        ? winner === HUMAN
                                            ? "You Win !"
                                            : "Bot Win !"
                                        : "Draw Game"
                                }
                            </h2>
                            <p className="text-sm text-gray-500 mb-4">
                                Game Over
                            </p>
                            <button
                                onClick={() => dispatch({ type: "RESTART_MATCH" })}
                                className="w-full bg-black text-white py-2 rounded-lg cursor-pointer"
                            >
                                Play Again
                            </button>
                        </div>
                    </div>
                )}
            </GameLayout>
        </div>

    )
}

export default BotGame