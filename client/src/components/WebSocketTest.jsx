import React ,{ useEffect } from 'react'

function WebSocketTest() {
    useEffect(()=>{
        const socket = new WebSocket("ws://localhost:8000/ws")
        socket.onopen = () => {
            console.log("Connected")
            socket.send("Hello From React")
        }
        socket.onmessage = (event) => {
            console.log("Received:",event.data)
        }
        socket.onclose = () => {
            console.log("Disconnected")
        }
    },[])
  return (
    <div className='mt-48'>
      WebSocket Demo
    </div>
  )
}

export default WebSocketTest
