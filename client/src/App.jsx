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
import StreakPage from "./Pages/StreakPage.jsx"

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/github/callback" element={<PublicRoute><GitHubCallback/></PublicRoute>} />
          <Route
            element={
              <ProtectedRoute>
                <ProtectedLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/profile" element={<Profile/>} />
            <Route path="/home" element={<Home />} />
            <Route path="/bot" element={<BotGame />} />
            <Route path="/streak" element={<StreakPage/>} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}