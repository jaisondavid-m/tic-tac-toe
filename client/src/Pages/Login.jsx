import React, { useState } from "react"
import { GoogleLogin } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"
import { Gamepad2, Trophy, Zap } from "lucide-react"
import { GoogleLoginAPI, GuestLoginAPI } from "../api/axios.js"
import { useAuth } from "../context/AuthContext.jsx"
import { FaGithub } from "react-icons/fa"

function Login() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const { checkAuth } = useAuth()
    const handleSuccess = async (credentialResponse) => {
        try {
            await GoogleLoginAPI(credentialResponse.credential)
            await checkAuth()
            navigate("/home")
        } catch (error) {
            setError("Login Failed. Please Try Again.")
            console.error(error)
        }
    }
    const handleGitHubLogin = () => {
        const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID
        window.location.href =
            `https://github.com/login/oauth/authorize` +
            `?client_id=${clientId}` +
            `&scope=user:email` +
            `&redirect_uri=http://localhost:5173/github/callback`
    }
    const handleHackClucLogin = () => {
        const clientId = import.meta.env.VITE_SLACK_CLIENT_ID
        window.location.href =
            `https://hackatime.hackclub.com/oauth/authorize` +
            `?client_id=${clientId}` +
            `&response_type=code` +
            `&scope=profile` +
            `&redirect_uri=http://localhost:5173/hackclub/callback`
    }
    const handleGuestLogin = async () => {
        try {
            await GuestLoginAPI()
            await checkAuth()
            navigate("/home")
        } catch (error) {
            setError("Guest Login Failed")
        }
    }

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center px-6">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,white,transparent_40%)]"></div>
            <div className="relative w-full max-w-md border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center shadow-xl">
                        <Gamepad2 size={32} />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-center">Tic Tac Toe</h1>
                <p className="text-white/60 text-center mt-2">
                    Continue with Google To Start Playing
                </p>
                <div className="grid grid-cols-3 gap-3 mt-6 text-center">
                    <div className="border border-white/10 rounded-xl p-3 bg-white/5" >
                        <Trophy className="mx-auto mb-0-2" size={18} />
                        <p className="text-xs text-white/70">Win Matched</p>
                    </div>
                    <div className="border border-white/10 rounded-xl p-3 bg-white/5">
                        <Zap className="mx-auto mb-2" size={18} />
                        <p className="text-xs text-white/70">Fast Play</p>
                    </div>
                    <div className="border border-white/10 rounded-xl p-3 bg-white/5">
                        <Gamepad2 className="mx-auto mb-2" size={18} />
                        <p className="text-xs text-white/70">Challenge Bot</p>
                    </div>
                </div>
                <div className="mt-8 flex flex-col gap-4 items-center w-full">
                    <div className="w-full flex justify-center">
                        <GoogleLogin
                            onSuccess={handleSuccess}
                            onError={() => setError("Google Login Failed")}
                        />
                    </div>

                    <button
                        onClick={handleGitHubLogin}
                        className="w-1/2 flex items-center justify-center gap-2 bg-white text-black py-3 rounded-xl font-semibold hover:opacity-90 transition tracking-tighter"
                    >
                        <FaGithub size={20} />
                        Continue With GitHub
                    </button>
                    <button
                        onClick={handleHackClucLogin}
                        className="w-1/2 flex items-center justify-center gap-2 bg-[#611f69] text-white py-3 rounded-xl  font-semibold hover:opacity-90 transition"
                    >
                        Continue With Hack Club
                    </button>
                    <button
                        onClick={handleGuestLogin}
                        className="w-1/2 flex items-center justify-center gap-2 border border-white/20 py-3 rounded-xl font-semibold hover:bg-white/10 transition"
                    >
                        Continue as Guest
                    </button>
                </div>
            </div>
            {error && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
                    <div className="w-full max-w-sm bg-white text-black rounded-2xl shadow-2xl p-6 text-center animate-in fade-in zoom-in duration-200">
                        <div className="w-14 h-14 mx-auto rounded-full bg-black text-white flex items-center justify-center text-2xl mb-4">
                            !
                        </div>
                        <h2 className="text-xl font-bold">Login Error</h2>
                        <p className="text-gray-600 mt-2">{error}</p>
                        <button
                            onClick={() => setError("")}
                            className="mt-6 w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )

}

export default Login