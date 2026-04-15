import React from "react"
import { useNavigate } from "react-router-dom"
import { Bot , Clock3 , Gamepad2 } from "lucide-react"
import GameLayout from "../Layout/GameLayout.jsx"

function BotPage() {

    const navigate = useNavigate()

    return (
        <GameLayout>
            <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl p-6">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 flex mx-auto rounded-2xl bg-black text-white items-center justify-center mb-4">
                        <Gamepad2 size={29}/>
                    </div>
                    <h1 className="text-2xl font-bold">Play with Bot</h1>
                    <p className="text-sm text-gray-500 mt-2">Choose Your Game Mode</p>
                </div>
                <div className="space-y-4">
                    <button
                        onClick={() => navigate("/normalbot")}
                        className="w-full p-4 rounded-2xl bg-black text-white hover:scale-[1.02] active:scale-95 transition"
                    >
                        <div className="flex items-center gap-3">
                            <Bot size={22}/>
                            <div className="text-left">
                                <p className="font-semibold">Normal Bot Match</p>
                                <p className="text-xs text-white/70">Classic match with difficulty levels</p>
                            </div>
                        </div>
                    </button>
                    <button
                        onClick={() => navigate("/timedbot")}
                        className="w-full p-4 rounded-2xl border border-black/10 bg-white hover:scale-[1.02] active:scale-95 transition"
                    >
                        <div className="flex items-center gap-3">
                            <Clock3 size={22} />
                            <div className="text-left">
                                <p className="font-semibold">Timed Bot Match</p>
                                <p className="text-xs text-gray-500">Race Against the Clock every Turn</p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </GameLayout>
    )

}

export default BotPage