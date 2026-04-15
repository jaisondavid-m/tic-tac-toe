package handlers

import (
	"encoding/json"
	"net/http"
	"sync"
	"time"

	"server/models"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var rooms = map[string]*models.Room{}
var mu sync.Mutex

var upgrader = websocket.Upgrader{CheckOrigin: func(r *http.Request) bool {
	return true
}}

func getRoom(id string) *models.Room {
	mu.Lock()
	defer mu.Unlock()
	if rooms[id] == nil {
		rooms[id] = &models.Room{Players: map[string]*models.Player{}, Turn: "X"}
	}
	return rooms[id]
}

func HandleWS(c *gin.Context) {

	roomID := c.Param("room")
	clientID := c.Query("clientId")

	if clientID == "" {
		c.JSON(http.StatusBadRequest,gin.H{
			"error":"ClientId is required",
		})
		return
	}

	room := getRoom(roomID)

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		return
	}

	room.Mutex.Lock()
	if len(room.Players) >= 2 && room.Players[clientID] == nil {
		room.Mutex.Unlock()
		conn.WriteMessage(websocket.TextMessage,[]byte(`{"type":"error","message":"Room Full"}`))
		conn.Close()
		return
	}

	symbol := "X"

	// if len(room.Players) == 1 {
	// 	symbol = "O"
	// }
	if old,ok := room.Players[clientID]; ok {
		symbol = old.Symbol
	} else if len(room.Players) == 1 {
		symbol = "O"
	}
	room.Players[clientID] = &models.Player{
		Conn: conn,
		Symbol: symbol,
		ClientID: clientID,
	}
	room.Mutex.Unlock()

	send(conn, models.Message{Type: "init", Player: symbol, Turn: room.Turn, Board: toSlice(room.Board)})
	broadcast(room)

	for {
		_, data, err := conn.ReadMessage()
		if err != nil {
			conn.Close()
			go func() {
				time.Sleep(5*time.Second)
				room.Mutex.Lock()
				delete(room.Players,clientID)
				empty := len(room.Players) == 0
				room.Mutex.Unlock()

				if empty {
					mu.Lock()
					delete(rooms,roomID)
					mu.Unlock()
				}
			}()
			break
			// room.Mutex.Lock()
			// delete(room.Clients, conn)
			// empty := len(room.Clients) == 0
			// room.Mutex.Unlock()
			// conn.Close()
			// if empty {
			// 	mu.Lock()
			// 	delete(rooms,roomID)
			// 	mu.Unlock()
			// }
			// // conn.Close()
			// break
		}
		var msg models.Message
		json.Unmarshal(data, &msg)

		if msg.Type == "move" {
			room.Mutex.Lock()
			if room.Board[msg.Index] == "" && room.Turn == room.Players[clientID].Symbol && checkWinner(room.Board) == "" {
				room.Board[msg.Index] = room.Players[clientID].Symbol
				if room.Turn == "X" {
					room.Turn = "O"
				} else {
					room.Turn = "X"
				}
			}
			room.Mutex.Unlock()
			broadcast(room)
		}
	}
	// room.Mutex.Lock()
	// if (len(room.Clients) >= 2 {
	// 	room.Mutex.Unlock()
	// 	conn.WriteMessage(websocket.TextMessage,[]byte(`{"type":"error","message":"Room FUll"}`))
	// 	conn.Close()
	// 	return
	// })
	// player := "X"
	// if len(room.Clients) == 1 {
	// 	player = "O"
	// }
	// room.Clients[conn] = player
	// room.Mutex.Unlock()
}

func broadcast(room *models.Room) {
	winner := checkWinner(room.Board)
	msg := models.Message{Type: "state", Board: toSlice(room.Board), Turn: room.Turn, Winner: winner}
	for _ , p := range room.Players {
		send(p.Conn , msg)
	}
}

func send(conn *websocket.Conn, msg models.Message) {
	b, _ := json.Marshal(msg)
	conn.WriteMessage(websocket.TextMessage, b)
}

func toSlice(a [9]string) []string {
	s := make([]string, 9)
	copy(s, a[:])
	return s
}

func checkWinner(b [9]string) string {
	wins := [][3]int{{0, 1, 2}, {3, 4, 5}, {6, 7, 8}, {0, 3, 6}, {1, 4, 7}, {2, 5, 8}, {0, 4, 8}, {2, 4, 6}}
	for _, w := range wins {
		if b[w[0]] != "" && b[w[0]] == b[w[1]] && b[w[1]] == b[w[2]] {
			return b[w[0]]
		}
	}
	full := true
	for _ , v := range b {
		if v == "" {
			full = false
			break
		}
	}
	if full {
		return "draw"
	}
	return ""
}
