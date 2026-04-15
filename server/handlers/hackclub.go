package handlers

import (
	"encoding/json"
	// "fmt"
	// "io"
	"net/http"
	"net/url"
	"os"
	"strings"

	"server/models"
	"server/utils"

	"github.com/gin-gonic/gin"
)

func HackClubLogin(c *gin.Context) {

	clientID := os.Getenv("HACKATIME_CLIENT_ID")
	clientSecret := os.Getenv("HACKATIME_CLIENT_SECRET")

	if clientID == "" || clientSecret == "" {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Hackatime OAuth not configured",
		})
		return
	}

	var req models.HackClubLoginRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Code is required",
		})
		return
	}

	tokenURL := "https://hackatime.hackclub.com/oauth/token"

	form := url.Values{}
	form.Set("client_id", clientID)
	form.Set("client_secret", clientSecret)
	form.Set("code", req.Code)
	form.Set("grant_type", "authorization_code")
	form.Set("redirect_uri", "http://localhost:5173/hackclub/callback")

	tokenReq, err := http.NewRequest(
		"POST",
		// "https://hackatime.hackclub.com/api/oauth/token",
		tokenURL,
		strings.NewReader(form.Encode()),
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Request Creation Failed",
		})
		return
	}

	tokenReq.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	client := &http.Client{}
	res, err := client.Do(tokenReq)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Hackatime Token Request Failed",
		})
		return
	}
	defer res.Body.Close()

	var tokenData map[string]interface{}
	if err := json.NewDecoder(res.Body).Decode(&tokenData); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to decode token response",
		})
		return
	}

	ok := tokenData["access_token"] != nil
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Hackatime Authentication Failed",
		})
		return
	}
	// userReq, _ := http.NewRequest(
	// 	"GET",
	// 	"https://hackatime.hackclub.com/",
	// 	nil,
	// )

	// userReq.Header.Set("Authorization", "Bearer "+accessToken)
	// userReq.Header.Set("Accept", "application/json")

	// userRes, err := client.Do(userReq)
	// if err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{
	// 		"message": "Failed to Fetch HackClub User",
	// 	})
	// 	return
	// }
	// fmt.Println("STATUS:", userRes.StatusCode)
	// // fmt.Println("BODY:", string(bodyBytes))
	// defer userRes.Body.Close()

	// var userData map[string]interface{}
	// // json.NewDecoder(userRes.Body).Decode(&userData)
	// bodyBytes, _ := io.ReadAll(userRes.Body)
	// fmt.Println("raw_response:", string(bodyBytes))
	// json.Unmarshal(bodyBytes, &userData)

	// data, ok := userData["data"].(map[string]interface{})
	// if !ok {
	// 	c.JSON(http.StatusInternalServerError, gin.H{
	// 		"message":  "Invalid User Response",
	// 		"response": userData,
	// 	})
	// 	return
	// }

	// name, _ := data["username"].(string)
	// email, _ := data["email"].(string)

	// image := ""
	// if img, ok := data["photo"].(string); ok {
	// 	image = img
	// }

	// fmt.Println("TOKEN:", tokenData)
	// fmt.Println("USER:", userData)

	jwtAccess, _ := utils.GenerateAccessToken("hackclub_user", "hackclub_user", "")
	jwtRefresh, _ := utils.GenerateRefreshToken("hackatime:" + "hackclub_user")

	setAuthCookie(c, "refresh_token", jwtRefresh, 60*60*24*60)
	setAuthCookie(c, "access_token", jwtAccess, 60*60*24)

	c.JSON(http.StatusOK, gin.H{
		"message": "Hack Club Login Success",
	})

}
