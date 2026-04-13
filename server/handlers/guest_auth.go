package handlers

import (
	"net/http"
	"server/utils"

	"github.com/gin-gonic/gin"
)

func GuestLogin(c *gin.Context) {

	name := "Guest"
	email := "guest@local"
	picture := ""

	accessToken , err := utils.GenerateAccessToken(name,email,picture)
	if err != nil {
		c.JSON(http.StatusInternalServerError,gin.H{
			"message":"Failed to Generate Access token",
		})
		return
	}

	refreshToken , err := utils.GenerateRefreshToken(email)
	if err != nil {
		c.JSON(http.StatusInternalServerError,gin.H{
			"message":"Failed to generate refresh Token",
		})
		return
	}

	c.SetCookie(
		"refresh_token",
		refreshToken,
		60*60*24*60,
		"/",
		"",
		false,
		true,
	)

	c.SetCookie(
		"access_token",
		accessToken,
		60*60*24,
		"/",
		"",
		false,
		true,
	)

	c.JSON(http.StatusOK,gin.H{
		"message":"Guest Login Success",
		"user":gin.H{
			"name":name,
			"email":email,
			"picture": picture,
			"isGuest": true,
		},
	})

}