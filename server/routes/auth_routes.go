package routes

import (
	"server/handlers"

	"github.com/gin-gonic/gin"
)

func AuthRoutes(r *gin.Engine) {
	auth := r.Group("/api/auth")
	{
		auth.POST("/google",handlers.GoogleLogin)
		auth.POST("/refresh",handlers.RefreshAccessToken)
		auth.POST("/logout",handlers.Logout)
	}
}