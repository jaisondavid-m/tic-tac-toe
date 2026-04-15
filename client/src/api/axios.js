import axios from "axios"

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

export const GoogleLoginAPI = (token) => {
    return API.post("/api/auth/google",{token})
}

export const GitHubLoginAPI = (code) => {
    return API.post("/api/auth/github",{code})
}

export const RefreshTokenAPI = () => {
    return API.post("/api/auth/refresh")
}

export const GuestLoginAPI = () => {
    return API.post("/api/auth/guest")
}

export const LogoutAPI = () => {
    return API.post("/api/auth/logout")
}

export const MeAPI = () => {
    return API.get("/api/auth/me")
}

export const CreateRoom = () => {
    return API.post("/room/create")
}

export const getAvailableRooms = async () => {
    return API.get("/rooms")
}

export default API