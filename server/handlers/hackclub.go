package handlers

import (
	"encoding/json"
	"net/http"
	"net/url"
	"os"
	"strings"

	"server/models"
	"server/utils"

	"github.com/gin-gonic/gin"
)

func HackClubLogin(c *gin.Context) {
	
	clientID := os.Getenv("SLACK_CLIENT_ID")
	clientSecret := os.Getenv("SLACK_CLIENT_SECRET")

	if clientID == "" || clientSecret == "" {
		c.JSON(http.StatusInternalServerError,gin.H{
			"message":"Slack OAuth not configured",
		})
		return
	}

	var req models.HackClubLoginRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest,gin.H{
			"message":"Code is required",
		})
		return
	}
	
	form := url.Values{}
	form.Set("client_id",clientID)
	form.Set("client_secret",clientSecret)
	form.Set("code",req.Code)

	tokenReq , _ := http.NewRequest(
		"POST",
		"https://slack.com/api/oauth.v2.access",
		strings.NewReader(form.Encode()),
	)

	tokenReq.Header.Set("Content-Type","application/x-www-form-urlencoded")

	client := &http.Client{}
	res , err := client.Do(tokenReq)
	if err != nil {
		c.JSON(http.StatusInternalServerError,gin.H{
			"message":"Slack Token Request Failed",
		})
		return
	}
	defer res.Body.Close()

	var tokenData map[string]interface{}
	json.NewDecoder(res.Body).Decode(&tokenData)

	accessToken , ok := tokenData["access_token"].(string)
	if !ok {
		c.JSON(http.StatusUnauthorized,gin.H{
			"message":"Slack Authentication Failed",
		})
		return
	}
	userReq, _ := http.NewRequest(
		"GET",
		"https://slack.com/api/users.identity",
		nil,
	)

	userReq.Header.Set("Authorization","Bearer "+accessToken)

	userRes,err := client.Do(userReq)
	if err != nil {
		c.JSON(http.StatusInternalServerError,gin.H{
			"message":"Failed to Fetch slack User",
		})
		return
	}
	defer userRes.Body.Close()

	var userData map[string]interface{}
	json.NewDecoder(userRes.Body).Decode(&userData)

	user := userData["user"].(map[string]interface{})

	name,_ := user["name"].(string)
	email,_ := user["email"].(string)

	image := ""
	if img, ok := user["image_192"].(string); ok {
		image = img
	}

	jwtAccess, _ := utils.GenerateAccessToken(name,email,image)
	jwtRefresh, _ := utils.GenerateRefreshToken("slack:" + email)

	c.SetCookie("refresh_token",jwtRefresh,60*60*24*60,"/","",false,true)
	c.SetCookie("access_token",jwtAccess,60*60*24, "/","",false,true)

	c.JSON(http.StatusOK,gin.H{
		"message":"Hack Club Login Success",
	})

}