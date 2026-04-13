import React, { useEffect, useState } from "react"
import { Gamepad2, Trophy, Flame, Shield } from "lucide-react"
import { MeAPI, LogoutAPI } from "../api/axios"
import { useNavigate } from "react-router-dom"
import Loading from "../components/Loading.jsx"

export default function Profile() {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showLogout, setShowLogOut] = useState(false)
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await LogoutAPI()
            navigate("/login")
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await MeAPI()
                setUser(res.data.user)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    if (loading) return (
        <div>
            <Loading/>
        </div>
    )

    if (!user) return (
        <div>
            <Loading/>
        </div>
    )

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
            <div className="w-full max-w-md border border-white/20 rounded-3xl p-8 bg-white/5 backdrop-blur shadow-2xl">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 rounded-2xl border border-white/20 bg-white/10">
                        <Gamepad2 size={32} />
                    </div>
                    <img src={user.picture} alt={user.name} className="w-24 h-24 rounded-full border-4 border-white object-cover" />
                    <h1 className="mt-4 text-3xl font-black tracking-widest">{user.name}</h1>
                    <p className="text-white/70 text-sm break-all">{user.email}</p>
                    <div className="mt-6 grid grid-cols-3 gap-3 w-full">
                        {[
                            { label: 'LEVEL 68', icon: <Trophy size={16} /> },
                            { label: 'WIN STREAK', icon: <Flame size={16} /> },
                            { label: 'PRO MODE', icon: <Shield size={16} /> }
                        ].map((item, i) => (
                            <div key={i} className="border border-white/15 rounded-2xl py-3 text-xs font-bold flex flex-col items-center justify-center gap-1">
                                {item.icon}{item.label}
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => setShowLogOut(true)}
                        className="mt-6 px-6 py-3 rounded-2xl cursor-pointer bg-white text-black font-bold hover:scale-105 transition"
                    >
                        Logout
                    </button>
                </div>

                {showLogout && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                        <div className="bg-white text-black rounded-3xl p-6 w-[320px] text-center shadow-2xl">
                            <h2 className="text-2xl font-black mb-2">Confirm Logout</h2>
                            <p className="text-sm text-gray-600 mb-6">Are You Sure Want to Logout ?</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowLogOut(false)}
                                    className="flex px-1 py-2 rounded-xl cursor-pointer border font-bold"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex-1 py-2 rounded-xl cursor-pointer bg-black text-white font-bold"
                                >
                                    LogOut
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )

}