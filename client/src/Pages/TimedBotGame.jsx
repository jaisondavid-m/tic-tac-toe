import React, { useEffect, useMemo, useReducer, useRef, useState } from "react"
import Board from "../components/Board.jsx"
import GameLayout from "../Layout/GameLayout.jsx"
import { HUMAN, BOT } from "../Constants/game.js"
import reducer, { initialState } from "../utils/reducer.jsx"
import DifficultySelect from "../components/DifficultySelect.jsx"

const TIMER_SECONDS = 5

function TimedBotGame() {

    const [state, dispatch] = useReducer(reducer, initialState)
    const { board, turn, winner, draw, winningLine } = state

    const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS)
    const timeRef = useRef(null)
    const isGameOver = winner || draw || state.showResult

    const clearTimer = () => {
        if (timeRef.current) {
            clearInterval(timeRef.current)
            timeRef.current = null
        }
    }

    const startTimer = () => {
        clearTimer()
        setTimeLeft(TIMER_SECONDS)
        timeRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timeRef.current)
                    timeRef.current = null
                    dispatch({ type: "TIMEOUT_LOSS" })
                    return 0
                }
                return prev - 1
            })
        }, 1000);
    }

    const handleMove = (i) => {
        if (turn !== HUMAN || winner || draw) return
        clearTimer()
        dispatch({ type: "MOVE", index: i })
    }

    useEffect(() => {
        dispatch({ type: "UPDATE", dispatch })
        if (winner || draw) {
            clearTimer()
            return
        }
        if (isGameOver) {
            clearTimer()
            return
        }

        if (!state.gameStarted) return

        if (turn === HUMAN) {
            startTimer()
        } else if (turn === BOT) {
            clearTimer()
            const t = setTimeout(() => {
                dispatch({ type: "BOT_MOVE" })
            }, 450)
            return () => clearTimeout(t)
        }
        return () => clearTimer()
    }, [board, turn, winner, draw, state.gameStarted, state.showResult])

    useEffect(() => () => clearTimer(), [])

    const status = useMemo(() => {
        if (winner) return `🏆Winner ${winner}`
        if (draw) return "🤝 Draw Game"
        return turn === HUMAN ? "Your Turn" : "BOT is Thinking..."
    }, [winner, draw, turn])

    const timerColor = timeLeft > 3 ? "#22c55e" : timeLeft > 1 ? "#eab308" : "#ef4444"

    const timerPercent = (timeLeft / TIMER_SECONDS) * 100

    if (!state.gameStarted) {
        return (
            <GameLayout>
                <div className="w-full max-w-sm mx-auto bg-white shadow-xl rounded-2xl p-6 text-center">
                    <img src="/panda.png" alt="panda" className="w-28 h-28 object-contain mx-auto mb-4 drop-shadow-lg" />
                    <h2 className="text-xl font-bold mb-1">Choose Difficulty</h2>
                    <p className="text-xs text-gray-400 mb-4">⏱ you Have {TIMER_SECONDS}s per move</p>
                    <DifficultySelect
                        value={state.difficulty}
                        onChange={(val) => dispatch({ type: "SET_DIFFICULTY", value: val })}
                    />
                    <button
                        onClick={() => dispatch({ type: "START_GAME" })}
                        className="w-full bg-black text-white py-3 rounded-xl"
                    >
                        Start Game
                    </button>
                </div>
            </GameLayout>
        )
    }

    const showTimer = turn === HUMAN && !winner && !draw

    return (
        <GameLayout>
            <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl p-6">
                <div className="flex items-center justify-center mb-4">
                    <div
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${turn === HUMAN ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                            }`}
                    >
                        {turn === HUMAN ? "YOU" : "BOt"}
                    </div>
                </div>
                <div className="mb-4 px-1">
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500 font-medium">
                            {showTimer ? "Time Remaining" : ""}
                        </span>
                        <span
                            className="font-bold tabular-nums transition-colors"
                            style={{ color: showTimer ? timerColor : "transparent" }}
                        >
                            {timeLeft}s
                        </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        {showTimer && (
                            <div
                                className={`h-full rounded-full transition-all duration-1000 ease-linear`}
                                style={{
                                    width: `${timerPercent}%`,
                                    backgroundColor: timerColor,
                                }}
                            />
                        )}
                    </div>
                </div>
                <div className="mt-2 text-center">
                    <Board board={board} onMove={handleMove} winningLine={winningLine} />
                </div>
                <div className="mt-4 text-center">
                    <p className="text-gray-700 font-medium">{status}</p>
                </div>
                <div className="flex justify-between mx-5">
                    <button
                        onClick={() => {
                            clearTimer()
                            dispatch({ type: "RESTART_MATCH" })
                        }}
                        className="mt-6 py-3 px-4 cursor-pointer bg-black text-white rounded-xl font-medium hover:scale-[1.02] active:scale-95 transition"
                    >
                        Restart Game
                    </button>
                    <button
                        onClick={() => {
                            clearTimer()
                            dispatch({ type: "RESET" })
                        }}
                        className="mt-6 py-3 px-4 cursor-pointer bg-black text-white rounded-xl font-medium hover:scale-[1.02] active:scale-95 transition"
                    >
                        New Game
                    </button>
                </div>
            </div>
            {state.showResult && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white w-72 p-6 rounded-2xl text-center shadow-2xl">
                        <h2
                            className="text-xl font-bold mb-2"
                        >
                            {winner ? winner === HUMAN ? "You Win! 🎉" : "Bot Wins 🤖" : "Draw Game 🤝"}
                        </h2>
                        {winner === BOT && state.timedOut && (
                            <p
                                className="text-sm text-red-500 mb-2"
                            >
                                ⏱ You Ran Out of Time !
                            </p>
                        )}
                        <p className="text-sm text-gray-500 mb-4">Game Over</p>
                        <button
                            onClick={() => {
                                clearTimer()
                                dispatch({ type: "RESTART_MATCH" })
                            }}
                            className="w-full bg-black text-white py-2 rounded-lg cursor-pointer "
                        >
                            Play Again
                        </button>
                    </div>
                </div>
            )}
        </GameLayout>
    )
}

export default TimedBotGame