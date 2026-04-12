import React from "react"
import { BrowserRouter , Routes , Route , Navigate } from "react-router-dom"
import Game from "./Pages/Game.jsx"

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Game/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}