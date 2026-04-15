package routes

import (
	"server/handlers"
	"github.com/gin-gonic/gin"
)

func MultiplayerRoutes(r *gin.Engine) {
	r.POST("/room/create",handlers.CreateRoom)
	r.GET("/rooms",handlers.GetRooms)
	r.GET("/ws/:room",handlers.HandleWS)
}