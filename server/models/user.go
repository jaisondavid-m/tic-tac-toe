package models

type GoogleLoginRequest struct {
	Token string `json:"token" binding:"required"`
}

type User struct {
	Name 	string 	`json:"name"`
	Email 	string 	`json:"email"`
	Picture string 	`json:"picture"`
}