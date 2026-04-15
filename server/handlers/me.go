package handlers

import (
	"net/http"

	"server/utils"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func Me(c *gin.Context) {
	accessToken , err := c.Cookie("access_token")

	if err != nil {
		c.JSON(http.StatusUnauthorized,gin.H{
			"message":"Access Token Missing",
		})
		return
	}
	
	token , err := jwt.Parse(accessToken,func(token *jwt.Token) (interface{},error) {
		return utils.AccessSecret , nil
	})

	if err != nil || !token.Valid {
		c.JSON(http.StatusUnauthorized,gin.H{
			"message":"Invalid Access Token",
		})
		return
	}
	
	claims , ok := token.Claims.(jwt.MapClaims)

	if !ok {
		c.JSON(http.StatusUnauthorized,gin.H{
			"message":"Invalid token claims",
		})
		return
	}

	if claims["type"] != "access" {
		c.JSON(http.StatusUnauthorized,gin.H{
			"message":"Wrong token Type",
		})
		return
	}

	name , _ := claims["name"].(string)
	email , _ := claims["email"].(string)
	picture , _ := claims["picture"].(string)

	c.JSON(http.StatusOK,gin.H{
		"user":gin.H{
			"name":name,
			"email":email,
			"picture":picture,
		},
	})

}