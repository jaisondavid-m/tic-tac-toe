import React from "react"
import { BrowserRouter , Routes , Route , Navigate } from "react-router-dom"
import BotGame from "./Pages/BotGame.jsx"
import Home from "./Pages/Home.jsx"

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/bot" element={<BotGame/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}