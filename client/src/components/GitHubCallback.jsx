import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { GitHubLoginAPI } from "../api/axios.js"
import { useAuth } from "../context/AuthContext.jsx"
import Loading from "../components/Loading.jsx"

function GitHubCallback() {

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
                    navigate("/")
                    return
                }
                await GitHubLoginAPI(code)
                await checkAuth()
                navigate("/home")
            } catch(error) {
                console.error(error)
                navigate("/")
            }
        }
        login()
    }, [navigate, checkAuth])

    return (
        <div>
           <Loading text="Logging with github" /> 
        </div>
    )

}

export default GitHubCallback