package utils

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var AccessSecret = []byte(os.Getenv("ACCESS_TOKEN"))
var RefreshSecret = []byte(os.Getenv("REFRESH_TOKEN"))

func GenerateAccessToken( name , email , picture string ) (string,error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,jwt.MapClaims{
		"name":  name,
		"email": email,
		"picture": picture,
		"type": "access",
		"exp": time.Now().Add(24*time.Hour).Unix(),
	})
	return token.SignedString(AccessSecret)
}

func GenerateRefreshToken(email string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,jwt.MapClaims{
		"email": email,
		"type": "refresh",
		"exp": time.Now().Add(60*24*time.Hour).Unix(), // 60 days
	})
	return token.SignedString(RefreshSecret)
}