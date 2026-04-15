package handlers

import (
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"server/models"

	"github.com/gin-gonic/gin"
)

func CreateRoom(c *gin.Context) {

	rand.Seed(time.Now().UnixNano())

	for {

		code := strconv.Itoa(1000 + rand.Intn(9000))

		mu.Lock()
		_, exists := rooms[code]

		if !exists {
			rooms[code] = &models.Room{
				Players: map[string]*models.Player{},
				Turn: "X",
			}
			mu.Unlock()

			c.JSON(http.StatusOK,gin.H{
				"room":code,
			})
			return
		}
		mu.Unlock()
	}

}

func GetRooms(c *gin.Context) {
	mu.Lock()
	
	defer mu.Unlock()

	list := []string{}

	for id := range rooms {
		list = append(list,id)
	}
	c.JSON(http.StatusOK,gin.H{
		"rooms":list,
	})
}