import React , { createContext , useContext , useEffect , useState } from "react"
import { MeAPI , LogoutAPI , RefreshTokenAPI } from "../api/axios.js"

const AuthContext = createContext()

export function AuthProvider({ children }) {

    const [ user , setUser ] = useState(null)
    const [ loading , setLoading ] = useState(true)

    const checkAuth = async () => {
        try {
            const res = await MeAPI()
            setUser(res.data.user)
        } catch {
            try {
                await RefreshTokenAPI()
                const res = await MeAPI()
                setUser(res.data.user)
            } catch {
                setUser(null)
            }
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        setLoading(true)
        try {
            await LogoutAPI()
        } catch {}
        setUser(null)
        setLoading(false)
    }

    useEffect(() => {
        checkAuth()
    },[])

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                checkAuth,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)