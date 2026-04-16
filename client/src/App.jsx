import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import BotGame from "./Pages/BotGame.jsx"
import Home from "./Pages/Home.jsx"
import Login from "./Pages/Login.jsx"
import { AuthProvider } from "./context/AuthContext.jsx"
import ProtectedRoute from "./routes/ProtectedRoute.jsx"
import ProtectedLayout from "./Layout/ProtectedLayout.jsx"
import PublicRoute from "./routes/PublicRoute.jsx"
import Profile from "./Pages/Profile.jsx"
import GitHubCallback from "./components/GitHubCallback.jsx"
import HackClubCallback from "./components/HackClubCallback.jsx"
import StreakPage from "./Pages/StreakPage.jsx"
import NotFound from "./Pages/NotFound.jsx"
import TimedBotGame from "./Pages/TimedBotGame.jsx"
import BotPage from "./Pages/BotPage.jsx"
// import WebSocketTest from "./components/WebSocketTest.jsx"
import Multiplayer from "./Pages/Multiplayer.jsx"
import CustomCursor from "./components/CustomCursor.jsx"
import NavBar from "./components/NavBar.jsx"

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CustomCursor/>
        {/* <NavBar/> */}
        <Routes>
          <Route path="/" element={<PublicRoute><Login /></PublicRoute>} /> 
          <Route path="/github/callback" element={<PublicRoute><GitHubCallback/></PublicRoute>} />
          <Route path="/hackclub/callback" element={<PublicRoute><HackClubCallback/></PublicRoute>} />
          <Route
            element={
              <ProtectedRoute>
                <ProtectedLayout />
              </ProtectedRoute>
            }
          >
          {/* <Route> */}
            {/* <Route path="/websocketdemo" element={<WebSocketTest/>} /> */}
            {/* <Route path="/" element={<Home/>}/> */}
            <Route path="/profile" element={<Profile/>} />
            <Route path="/home" element={<Home />} />
            <Route path="/bot" element={<BotPage/>} />
            <Route path="/normalbot" element={<BotGame />} />
            <Route path="/timedbot" element={<TimedBotGame/>} />
            <Route path="/multiplayer" element={<Multiplayer/>} />
            <Route path="/streak" element={<StreakPage/>} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}