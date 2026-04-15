import React , { useEffect , useRef , useState } from "react"
import Board from "../components/Board.jsx"
import GameLayout from "../Layout/GameLayout.jsx"
import CalculateWinner from "../utils/CalculateWinner.jsx"

function Multiplayer() {
    const [ board , setBoard ] = useState(Array(9).fill(null))
    const [ player , setPlayer ] = useState(null)
    const [ turn , setTurn ] = useState("X")
    const [ winner , setWinner ] = useState(null)
    const [ winningLine , setWinningLine ] = useState(null)
    const [ room , setRoom ] = useState("")
    const [ connected , setConnected ] = useState(false)

    const ws = useRef(null)

    const status = () => {
        if (!connected) return "Not Connected"
        if (winner === "draw") return "Draw"
        if (winner) return winner === player ? "You Win !" : "You Lose !"
        if (turn === player) return "Your Turn"
        return "Opponent Turn"
    }

    const connect = () => {

        if (!room) return alert("Enter Room ID")
        
        const protocol = window.location.protocol === "https:" ? "wss" : "ws"
        ws.current = new WebSocket(`${protocol}://localhost:8000/ws/${room}`)

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
                    setWinningLine(CalculateWinner(msg.board,true))
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
    },[])

    return (
        <GameLayout>
            {!connected ? (
                <div className="bg-white p-6 rounded-xl shadow text-center">
                    <h2 className="text-xl font-bold mb-4">
                        Join Multiplayer Room
                    </h2>
                    <input
                     type="text"
                     placeholder="Enter Room ID"
                     value={room}
                     onChange={(e) => setRoom(e.target.value)}
                     onKeyDown={(e) => e.key === "Enter" && connect()}
                     className="border p-2 rounded-xl w-full mb-4"
                    />
                    <button
                        onClick={connect}
                        className="bg-black text-white px-4 py-2 rounded-xl"
                    >
                        Join Room
                    </button>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-xl shadow text-center">
                    <p className="mb-2">Room: {room}</p>
                    <p className="mb-2">You are: {player}</p>
                    <Board board={board} onMove={handleMove} winningLine={winningLine} />
                    <p className="mt-4 font-semibold">{status()}</p>
                </div>
            )}
        </GameLayout>
    )

}

export default Multiplayer