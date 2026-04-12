import React from "react"
import { useNavigate } from "react-router-dom"

function HeroSection() {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0b0f1a] text-white px-6">
            <div className="max-w-2xl w-full">

                <div className="absolute inset-0 opacity-30 blur-3xl bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400" />

                <div className="relative text-center space-y-6">
                    <p className="uppercase tracking-[0.3em] text-xs text-white/60">
                        Minimal Game Experience
                    </p>
                    <h1 className="text-5xl md:text06xl font-bold leading-tight">
                        Tic Tac Toe
                        <span className="block text-white/60 text-2xl mt-2">
                            Simple game. Sharp Mind.
                        </span>
                    </h1>
                    <p className="text-white/50 text-sm md:text-base max-w-md mx-auto">
                        Play Against a Bot that never lets you win easily. No Noise. Just Logic.
                    </p>
                    <button
                        onClick={()=>navigate("/bot")}
                        className="mt-6 px-7 py-3 cursor-pointer rounded-full bg-white text-black font-semibold hover:scale-105 active:scale-95 transition"
                    >
                        Start Game
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection