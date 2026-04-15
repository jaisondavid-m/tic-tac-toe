package handlers

import (
	"net/http"

	"server/utils"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func RefreshAccessToken(c *gin.Context) {
	refreshToken, err := c.Cookie("refresh_token")

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Refresh Token Missing",
		})
		return
	}

	token, err := jwt.Parse(refreshToken, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}
		return utils.RefreshSecret, nil
	})

	if err != nil || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Invalid Refresh Token",
		})
		return
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Invalid Token claims",
		})
		return
	}

	if claims["type"] != "refresh" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Wrong Token Type",
		})
		return
	}

	email, _ := claims["email"].(string)

	newAccessToken, err := utils.GenerateAccessToken("", email, "")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Could not generate access token",
		})
		return
	}

	setAuthCookie(c, "access_token", newAccessToken, 60*60*24)
	c.JSON(http.StatusOK, gin.H{
		"message": "Access token Refreshed!",
	})
}
