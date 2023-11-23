package main

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"fmt"

	// "log"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	goauth "google.golang.org/api/oauth2/v2"
	"google.golang.org/api/option"
)

var userInfo goauth.Userinfo
var conf *oauth2.Config
var state string
var store = cookie.NewStore([]byte("random-secret"))

func randToken() string {
	b := make([]byte, 32)
	rand.Read(b)
	return base64.StdEncoding.EncodeToString(b)
}

func getLoginURL(state string) string {
	return conf.AuthCodeURL(state)
}

func authHandler(c *gin.Context) {
	// Handle the exchange code to initiate a transport.
	session := sessions.Default(c)
	retrievedState := session.Get("state")

	// log.Println("retrievedState:", retrievedState)
	// log.Println("c.Query(state):", c.Query("state"))

	// existingSession := session.Get("state")
	// if userInfo, ok := existingSession.(goauth.Userinfo); ok {
	// 	c.Set("user", userInfo)
	// 	c.Next()
	// 	return
	// }

	if retrievedState != c.Query("state") {
		state := randToken()
		session.Set("state", state)
		session.Save()
		if err := session.Save(); err != nil {
			c.AbortWithError(http.StatusInternalServerError, fmt.Errorf("failed to save session: %w", err))
		}
		c.Redirect(http.StatusMovedPermanently, getLoginURL(state))
		// c.AbortWithError(http.StatusUnauthorized, fmt.Errorf("Invalid session state: %s", retrievedState))
		// return
	}

	tok, err := conf.Exchange(context.Background(), c.Query("code"))
	if err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}
	session.Set("token", tok)
	session.Save()
	if err := session.Save(); err != nil {
		c.AbortWithError(http.StatusInternalServerError, fmt.Errorf("failed to save token: %w", err))
		return
	}

	oAuth2Service, err := goauth.NewService(c, option.WithTokenSource(conf.TokenSource(c, tok)))
	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, fmt.Errorf("failed to create oauth service: %w", err))
		return
	}

	userInfo, err := oAuth2Service.Userinfo.Get().Do()
	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, fmt.Errorf("failed to get userinfo for user: %w", err))
		return
	}

	setUserInSession(c, userInfo)
	c.Redirect(http.StatusMovedPermanently, "/user")
}

func setUserInSession(c *gin.Context, userInfo *goauth.Userinfo) {
	// Set user data in session
	session := sessions.Default(c)
	session.Set("user", userInfo)
	if err := session.Save(); err != nil {
		// Handling session save error
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
}

func getUserFromSession(c *gin.Context) {
	// Get user data from session
	session := sessions.Default(c)
	user := session.Get("user")

	if user == nil {
		c.JSON(http.StatusOK, gin.H{"message": "User not found in session"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"user": user})
}

func userHandler(c *gin.Context) {
	getUserFromSession(c)
}

func getUserInfo(c *gin.Context) interface{} {
	session := sessions.Default(c)
	user := session.Get("user")
	if user == nil {
		c.JSON(http.StatusOK, gin.H{"message": "User not found in session"})
		return nil
	}
	return user
}

func getUserEmail(c *gin.Context) string {
	session := sessions.Default(c)
	user := session.Get("user")
	if info, ok := user.(*goauth.Userinfo); ok {
		return info.Email
	} else {
		c.JSON(http.StatusOK, gin.H{"message": "User not found in session"})
		return ""
	}
}

func getUserID(c *gin.Context) string {
	session := sessions.Default(c)
	user := session.Get("user")
	if info, ok := user.(*goauth.Userinfo); ok {
		return info.Id
	} else {
		c.JSON(http.StatusOK, gin.H{"message": "User not found in session"})
		return ""
	}
}

func getUserName(c *gin.Context) string {
	session := sessions.Default(c)
	user := session.Get("user")
	if info, ok := user.(*goauth.Userinfo); ok {
		return info.Name
	} else {
		c.JSON(http.StatusOK, gin.H{"message": "User not found in session"})
		return ""
	}
}

func getUserPicture(c *gin.Context) string {
	session := sessions.Default(c)
	user := session.Get("user")
	if info, ok := user.(*goauth.Userinfo); ok {
		return info.Picture
	} else {
		c.JSON(http.StatusOK, gin.H{"message": "User not found in session"})
		return ""
	}
}

func loginHandler(c *gin.Context) {
	state = randToken()

	session := sessions.Default(c)
	session.Set("state", state)
	if err := session.Save(); err != nil {
		// Handling session save error
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// log.Println("state saving")
	session.Save()
	// c.Writer.Write([]byte("<html><title>Golang Google</title> <body> <a href='" + getLoginURL(state) + "'><button>Login with Google!</button> </a> </body></html>"))
	c.Redirect(http.StatusMovedPermanently, getLoginURL(state))
}

func logoutHandler(c *gin.Context) {
	session := sessions.Default(c)
	// log.Println("Showing")
	session.Clear()
	session.Save()
	c.Redirect(http.StatusMovedPermanently, "/")
}
