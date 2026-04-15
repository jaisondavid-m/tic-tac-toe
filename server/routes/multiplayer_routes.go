package routes

import (
	"server/handlers"
	"github.com/gin-gonic/gin"
)

func MultiplayerRoutes(r *gin.Engine) {
	r.GET("/ws/:room",handlers.HandleWS)
}