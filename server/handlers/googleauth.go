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
		c.JSON(http.StatusBadRequest, gin.H{"message": "Token is required"})
		return
	}

	payload, err := idtoken.Validate(context.Background(), req.Token, GoogleClientID)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid Google Token"})
		return
	}

	name, _ := payload.Claims["name"].(string)
	email, _ := payload.Claims["email"].(string)
	picture, _ := payload.Claims["picture"].(string)

	accessToken, _ := utils.GenerateAccessToken(name, email, picture)
	refreshToken, _ := utils.GenerateRefreshToken(email)

	setAuthCookie(c, "refresh_token", refreshToken, 60*60*24*60)
	setAuthCookie(c, "access_token", accessToken, 60*60*24)
	c.JSON(http.StatusOK, gin.H{
		"message": "Login Success",
	})
}

func Logout(c *gin.Context) {
	clearAuthCookie(c, "refresh_token")
	clearAuthCookie(c, "access_token")
}
