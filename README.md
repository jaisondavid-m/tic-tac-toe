# Tic Tac Toe

A modern Tic Tac Toe Game with **Bot Mode**,**real-time Multiplayer (websocket)** , and a simple **Login/Profile** experience

## Highlights / Features

### Play Modes
- **Play vs Bot (Single Player)**
  - Choose **difficulty** (example: Medium and more)
  - Smooth gameplay with turn-based logic and win detection
- **Timed Bot Match**
  - A Faster Mode Where each turn is time-based (race against the clock)\
- **Online Multiplayer (Real-Time)**
  - Create a **room** and play with a friend
  - **Join Rooms** using a room code / available room list
  - Live updates using **WebSocket** (moves sync instantly)

### Multiplayer Room Sharing
- **Copy Room Link** to invite a friend
- **QR Code** Sharing option (easy mobile sharing)
- Automatically remembers your room/player in your browser (so you can reconnect easier)

### Accountd & Login
- **Google Login**
- **GitHub Login**
- **Guest Login**
- **Profile Page** (show your basic info after login)
- Session handling (keeps you logged in and supports logout)

### Streak / Activity
- **Streak Page** that tracks your daily play activity
- Stores a simple **Play History** locally in your browser and shows totals/streak

## How to Use (simple)
1. Open the app and log in (Google / Github / Guest)
2. Choose a mode:
    - Bot (Normal)
    - Bot (Timed)
    - Multiplayer
3. In Multiplayer:
    - Create a room or join an available room
    - Share the Link (Copy or QR) and start playing

## Multiplayer Notes (FYI)
- Multiplayer uses a room system (2 players per room)
- Game State (board,turn,win/draw) updates live while you play

## Tech
- Frontend: React JS
- Backend: Go (WebSocket + Gin)
##Note
- Currently Not Available for Moblie
