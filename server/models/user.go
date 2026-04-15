package models

type GoogleLoginRequest struct {
	Token string `json:"token" binding:"required"`
}

type GitHubLoginRequest struct {
	Code string `json:"code" binding:"required"`
}

type HackClubLoginRequest struct {
	Code string `json:"code" binding:"required"`
}

type User struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Picture string `json:"picture"`
}
