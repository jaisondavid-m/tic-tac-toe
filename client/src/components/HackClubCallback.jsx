import { useEffect , useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { HackClubLoginAPI } from "../api/axios.js"
import Loading from "./Loading.jsx"

function HackClubCallback() {
    
    const navigate = useNavigate()
    const { checkAuth } = useAuth()
    const hasRun = useRef(false)

    useEffect(() => {
        if (hasRun.current) return
        hasRun.current = true

        const login = async () => {
            try {
                const code = new URLSearchParams(window.location.search).get("code")
                if (!code) {
                    navigate("/login")
                    return
                }
                await HackClubLoginAPI(code)
                await checkAuth()
                navigate("/home")
            } catch (error) {
                console.error(error)
                navigate("/login")
            }
        }
        login()
    },[navigate,checkAuth])

    return <Loading text="Logging WIth Hack Club" />

}

export default HackClubCallback