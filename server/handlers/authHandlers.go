package handlers

import (
	"context"
	"net/http"
	"os"

	"server/models"
	"server/utils"

	"github.com/gin-gonic/gin"
	"google.golang.org/api/idtoken"
)

var GoogleClientID = os.Getenv("GOOGLE_CLIENT_ID")

func GoogleLogin(c *gin.Context) {

	var req models.GoogleLoginRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest,gin.H{"message":"Token is required"})
		return
	}

	payload , err := idtoken.Validate(context.Background(),req.Token,GoogleClientID)

	if err != nil {
		c.JSON(http.StatusUnauthorized,gin.H{"message":"Invalid Google Token"})
		return
	}

	name := payload.Claims["name"].(string)
	email := payload.Claims["email"].(string)
	picture := payload.Claims["picture"].(string)

	accessToken , _ := utils.GenerateAccessToken(name,email,picture)
	refreshToken , _ := utils.GenerateRefreshToken(email)

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
		"message":"Login Success",
	})
}

func Logout(c *gin.Context) {
	c.SetCookie("refresh_token","",-1,"/","",false,true)
	c.SetCookie("access_token","",-1,"/","",false,true,)
}

