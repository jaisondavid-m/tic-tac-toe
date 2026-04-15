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

type Room struct {
	Clients map[*websocket.Conn]string
	Board [9]string
	Turn string
	Mutex sync.Mutex
}