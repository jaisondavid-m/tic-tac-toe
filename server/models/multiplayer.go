package models

import (

	"sync"

	"github.com/gorilla/websocket"
	
)

type Message struct {
	Type 		string 		`json:"type"`
	Index 		int 		`json:"index"`
	Player 		string 		`json:"player"`
	Board 		[]string 	`json:"board"`
	Turn 		string 		`json:"turn"`
	Winner 		string 		`json:"winner"`
}

type Player struct {
	Conn 		*websocket.Conn
	Symbol 		string
	ClientID 	string
}

type Room struct {
	Players map[string]*Player
	Board [9]string
	Turn string
	Mutex sync.Mutex
}