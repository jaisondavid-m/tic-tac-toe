import React from "react"
import { Link } from "react-router-dom"
import { Home , RotateCcw , Gamepad2 , Ghost } from "lucide-react"

function NotFound() {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px] " />
            <div className="absolute top-20 left-10 w-24 h-24 border border-white/20 rounded-full animate-pulse"/>
            <div className="absolute bottom-20 right-10 w-16 h-16 border border-white/20 rotate-45 animate-bounce"/>
            <div className="relative z-10 max-w-xl w-full bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl shadow-2xl text-center">
                <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-2xl bg-white text-black shadow-lg">
                        <Ghost size={40} />
                    </div>
                </div>
                <h1 className="text-7xl md:text-8xl font-black tracking-widest mb-3">
                    404
                </h1>
                <p className="text-white/60 mb-8">
                    Game Over !
                </p>
                <p className="text-white/60 mb-8">
                    The Page You're Looking for has Vanished into another Dimension
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:scale-105 transition flex items-center justify-center gap-2"
                    >
                        <Home size={18} />Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white hover:text-black transition flex items-center justify-center gap-2"
                    >
                        <RotateCcw size={18} /> Go Back
                    </button>
                </div>
                <div className="mt-8 flex justify-center items-center gap-2 text-white/40 text-sm">
                    <Gamepad2 size={16} />
                    Press Start to Continue
                </div>
            </div>
        </div>
    )
}

export default NotFound