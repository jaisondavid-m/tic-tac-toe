package main

import (
	"log"
	"os"
	"server/routes"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load()

	if err != nil {
		log.Println("No .env file Found")
	}
	frontendURL := strings.TrimSpace(os.Getenv("FRONTEND_URL"))
	allowedOrigins := []string{"http://localhost:5173"}
	if frontendURL != "" {
		allowedOrigins = []string{}
		for _, rawOrigin := range strings.Split(frontendURL, ",") {
			origin := strings.TrimSpace(strings.TrimSuffix(rawOrigin, "/"))
			if origin != "" {
				allowedOrigins = append(allowedOrigins, origin)
			}
		}
		if len(allowedOrigins) == 0 {
			allowedOrigins = []string{"http://localhost:5173"}
		}
	}
	gin.SetMode(gin.ReleaseMode)
	// r := gin.Default()
	r := gin.New()
	r.Use(gin.Recovery())
	r.Use(cors.New(cors.Config{
		AllowOrigins:     allowedOrigins,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	routes.TestRoutes(r)
	routes.AuthRoutes(r)
	// routes.WebsocketRoutes(r)
	routes.MultiplayerRoutes(r)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	r.Run(":" + port)
}
