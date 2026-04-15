package main

import (
	"log"
	"server/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load()

	if err != nil {
		log.Println("No .env file Found")
	}
	
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{"GET","POST","PUT","DELETE","OPTIONS"},
		AllowHeaders: []string{"Origin","Content-Type","Authorization"},
		AllowCredentials: true,
	}))
	routes.TestRoutes(r)
	routes.AuthRoutes(r)
	// routes.WebsocketRoutes(r)
	routes.MultiplayerRoutes(r)

	r.Run(":8000")
}