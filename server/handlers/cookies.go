package handlers

import (
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

func shouldUseSecureCookies() bool {
	frontendURL := strings.TrimSpace(os.Getenv("FRONTEND_URL"))
	return strings.HasPrefix(strings.ToLower(frontendURL), "https://")
}

func applyCookiePolicy(c *gin.Context) bool {
	secure := shouldUseSecureCookies()
	if secure {
		c.SetSameSite(http.SameSiteNoneMode)
	} else {
		c.SetSameSite(http.SameSiteLaxMode)
	}
	return secure
}

func setAuthCookie(c *gin.Context, name, value string, maxAge int) {
	secure := applyCookiePolicy(c)
	c.SetCookie(name, value, maxAge, "/", "", secure, true)
}

func clearAuthCookie(c *gin.Context, name string) {
	setAuthCookie(c, name, "", -1)
}
