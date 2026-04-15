package handlers

// import (
// 	"log"

// 	"github.com/gin-gonic/gin"
// 	"github.com/gorilla/websocket"
// )

// // var upgrader = websocket.Upgrader{
// // 	CheckOrigin: func(r *http.Request) bool {
// // 		return true
// // 	},
// // }

// var clients = make(map[*websocket.Conn]bool)

// // var broadcast = make(chan string)

// func init() {
// 	go handleMessages()
// }

// func HandleWebSocket(c *gin.Context) {
// 	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
// 	if err != nil {
// 		log.Println(err)
// 		return
// 	}
// 	clients[conn] = true
// 	log.Println("Client Connected")

// 	for {
// 		_, msg,err := conn.ReadMessage()
// 		if err != nil {
// 			delete(clients, conn)
// 			conn.Close()
// 			log.Println("Client Disconnected")
// 			break
// 		}
// 		broadcast <- string(msg)
// 	}
// }
// func handleMessages() {
// 	for {
// 		msg := <-broadcast
// 		for client := range clients {
// 			err := client.WriteMessage(websocket.TextMessage, []byte(msg))
// 			if err != nil {
// 				client.Close()
// 				delete(clients, client)
// 			}
// 		}
// 	}
// }
