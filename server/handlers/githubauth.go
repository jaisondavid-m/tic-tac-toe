package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"strings"

	"server/models"
	"server/utils"

	"github.com/gin-gonic/gin"
)

func GitHubLogin(c *gin.Context) {
	clientID := os.Getenv("GITHUB_CLIENT_ID")
	clientSecret := os.Getenv("GITHUB_CLIENT_SECRET")
	if clientID == "" || clientSecret == "" {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "GitHub OAuth is not configured",
		})
		return
	}

	var req models.GitHubLoginRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Code is required",
		})
		return
	}

	// tokenRes , err := http.Post(
	// 	"https://github.com/login/oauth/access_token",
	// 	"application/json",
	// 	nil,
	// )

	// if err != nil {
	// 	c.JSON(http.StatusInternalServerError,gin.H{
	// 		"message":"Failed to connect GitHub",
	// 	})
	// 	return
	// }

	// defer tokenRes.Body.Close()

	// reqBody := map[string]string{
	// 	"client_id"  	: GitHubClientID,
	// 	"client_secret"	: GitHubClientSecret,
	// 	"code"			: req.Code,
	// }

	// json.NewEncoder(tokenRes.Body).Encode(reqBody)

	// var tokenData map[string]interface{}
	// json.NewDecoder(tokenRes.Body).Decode(&tokenData)

	form := url.Values{}
	form.Set("client_id", clientID)
	form.Set("client_secret", clientSecret)
	form.Set("code", req.Code)

	reqToken, err := http.NewRequest(
		"POST",
		"https://github.com/login/oauth/access_token",
		strings.NewReader(form.Encode()),
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Request Creation Failed",
		})
		return
	}

	reqToken.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	reqToken.Header.Set("Accept", "application/json")

	client := &http.Client{}
	res, err := client.Do(reqToken)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "GitHub Token Request Failed",
		})
		return
	}

	defer res.Body.Close()

	var tokenData map[string]interface{}
	json.NewDecoder(res.Body).Decode(&tokenData)

	accessToken, ok := tokenData["access_token"].(string)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "GitHub Authentication Failed",
		})
		return
	}

	reqUser, _ := http.NewRequest("GET", "https://api.github.com/user", nil)
	reqUser.Header.Set("Authorization", "Bearer "+accessToken)

	resUser, err := client.Do(reqUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed To Fetch User",
		})
		return
	}

	defer resUser.Body.Close()

	var user map[string]interface{}

	if err := json.NewDecoder(resUser.Body).Decode(&user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to Parse Token Response",
		})
		return
	}

	emailsReq, _ := http.NewRequest(
		"GET",
		"https://api.github.com/user/emails",
		nil,
	)

	emailsReq.Header.Set("Authorization", "Bearer "+accessToken)
	emailsReq.Header.Set("Accept", "application/vnd.github+json")

	emailsRes, err := client.Do(emailsReq)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to fetch emails",
		})
		return
	}

	defer emailsRes.Body.Close()

	var emails []map[string]interface{}
	json.NewDecoder(emailsRes.Body).Decode(&emails)

	email := ""
	for _, e := range emails {
		if primary, _ := e["primary"].(bool); primary {
			email, _ = e["email"].(string)
			break
		}
	}

	id := fmt.Sprintf("%v", user["id"])
	name, _ := user["name"].(string)
	picture, _ := user["avatar_url"].(string)

	if name == "" {
		name, _ = user["login"].(string)
	}

	jwtAccess, _ := utils.GenerateAccessToken(name, email, picture)
	jwtRefresh, _ := utils.GenerateRefreshToken("github:" + fmt.Sprintf("%v", id))

	c.SetCookie("refresh_token", jwtRefresh, 60*60*24*60, "/", "", false, true)
	c.SetCookie("access_token", jwtAccess, 60*60*24, "/", "", false, true)

	c.JSON(http.StatusOK, gin.H{
		"message": "GitHub Login Success",
	})
}
