import React, { useEffect, useRef, useState } from "react"
import Board from "../components/Board.jsx"
import GameLayout from "../Layout/GameLayout.jsx"
import CalculateWinner from "../utils/CalculateWinner.jsx"
import { CreateRoom, getAvailableRooms } from "../api/axios.js"

function Multiplayer() {
    const [board, setBoard] = useState(Array(9).fill(null))
    const [player, setPlayer] = useState(null)
    const [turn, setTurn] = useState("X")
    const [winner, setWinner] = useState(null)
    const [winningLine, setWinningLine] = useState(null)
    const [room, setRoom] = useState("")
    const [connected, setConnected] = useState(false)
    const [availableRooms, setAvailableRooms] = useState([])

    const ws = useRef(null)

    const status = () => {
        if (!connected) return "Not Connected"
        if (winner === "draw") return "Draw"
        if (winner) return winner === player ? "You Win !" : "You Lose !"
        if (turn === player) return "Your Turn"
        return "Opponent Turn"
    }

    const connectWithRoom = (roomdId) => {

        const protocol = window.location.protocol === "https:" ? "wss" : "ws"

        ws.current = new WebSocket(
            `${protocol}://localhost:8000/ws/${roomdId}`
        )

        setRoom(roomdId)

        // if (!room) return alert("Enter Room ID")

        // const protocol = window.location.protocol === "https:" ? "wss" : "ws"
        // ws.current = new WebSocket(`${protocol}://localhost:8000/ws/${room}`)

        ws.current.onmessage = (event) => {
            const msg = JSON.parse(event.data)
            if (msg.type === "init") {
                setPlayer(msg.player)
                setBoard(msg.board)
                setTurn(msg.turn)
            }
            if (msg.type === "state") {
                setBoard(msg.board)
                setTurn(msg.turn)
                setWinner(msg.winner)
                if (msg.winner && msg.winner !== "draw") {
                    setWinningLine(CalculateWinner(msg.board, true))
                } else {
                    setWinningLine(null)
                }
            }
            if (msg.type === "error") {
                alert(msg.message)
            }

        }



        ws.current.onopen = () => {
            setConnected(true)
        }

        ws.current.onclose = () => {
            setConnected(false)
            setPlayer(null)
        }
    }
    const connect = () => {
        if (!room) return
        connectWithRoom(room)
    }

    const createRoom = async () => {
        const res = await CreateRoom()
        const data = res.data
        setRoom(data.room)
        connectWithRoom(data.room)

    }

    const fetchRooms = async () => {
        const res = await getAvailableRooms()
        const data = res.data
        setAvailableRooms(data.rooms)
    }

    useEffect(() => {
        fetchRooms()
    }, [])
    const handleMove = (i) => {

        if (!ws.current) return
        if (winner) return
        if (turn !== player) return
        if (board[i]) return

        ws.current.send(
            JSON.stringify({
                type: "move",
                index: i
            })
        )

    }

    useEffect(() => {
        return () => {
            ws.current?.close()
        }
    }, [])
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const roomFromUrl = params.get("room")
        if (roomFromUrl) {
            connectWithRoom(roomFromUrl)
        }
    }, [])

    return (
        <GameLayout>
            {!connected ? (
                <div className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-xl border border-gray-900 p-8 rounded-3xl shadow-2xl text-center">
                    <h2 className="text-2xl font-bold mb-2 text-gray-900">
                        Join Multiplayer Room
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Play Live with Friends in a private room
                    </p>
                    <input
                        type="text"
                        placeholder="Enter Room ID"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && connect()}
                        className="border border-gray-300 px-2 py-3 rounded-2xl mb-4 outline-none focus:ring-2 focus:ring-black w-full"
                    />
                    <div className="flex gap-3">
                        <button
                            onClick={connect}
                            className="w-1/2 bg-black text-white px-4 py-3 rounded-2xl active:scale-95 hover:scale-[1.02] mb-4 cursor-pointer"
                        >
                            Join Room
                        </button>
                        <button
                            onClick={createRoom}
                            className="w-1/2 bg-emerald-600 text-white px-4 py-3 rounded-2xl active:scale-95 hover:scale-[1.02] mb-4 cursor-pointer"
                        >
                            Create Room
                        </button>
                    </div>

                    <div className="mt-4 text-left border-t pt-4">
                        <p className="font-bold mb-2">Available Rooms</p>
                        {availableRooms.map((r) => (
                            <button
                                key={r}
                                onClick={() => connectWithRoom(r)}
                                className="block w-full bg-gray-50 hover:bg-gray-100 border px-4 py-3 mb-2 rounded-2xl transition text-left"
                            >
                                Join Room {r}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-gray-200 p-6 rounded-3xl shadow-2xl text-center">
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(
                                `${window.location.origin}/multiplayer?room=${room}`
                            )
                        }}
                        className="w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold mb-4 hover:scale-[1.02] transition"
                    >
                        Share Room Link
                    </button>
                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                        <p className="mb-2">Room: {room}</p>
                        <p className="mb-2">You are: {player}</p>
                    </div>
                    <Board board={board} onMove={handleMove} winningLine={winningLine} />
                    <p className="mt-5 text-lg font-bold text-gray-800">{status()}</p>
                </div>
            )}
        </GameLayout>
    )

}

export default Multiplayer