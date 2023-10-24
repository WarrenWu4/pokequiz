package main

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"fmt"

	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	goauth "google.golang.org/api/oauth2/v2"
	"google.golang.org/api/option"
	// "google.golang.org/api/people/v1"
)

var userInfo goauth.Userinfo

// User is a retrieved and authentiacted user.
type User struct {
	Sub           string `json:"sub"`
	Name          string `json:"name"`
	GivenName     string `json:"given_name"`
	FamilyName    string `json:"family_name"`
	Profile       string `json:"profile"`
	Picture       string `json:"picture"`
	Email         string `json:"email"`
	EmailVerified string `json:"email_verified"`
	Gender        string `json:"gender"`
}

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

	// existingSession := session.Get("state")
	// if userInfo, ok := existingSession.(goauth.Userinfo); ok {
	// 	c.Set("user", userInfo)
	// 	c.Next()
	// 	return
	// }

	if retrievedState != c.Query("state") {
		c.AbortWithError(http.StatusUnauthorized, fmt.Errorf("Invalid session state: %s", retrievedState))
		return
	}
	// log.Println("RAHHHH")
	tok, err := conf.Exchange(context.Background(), c.Query("code"))
	if err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}
	// log.Println("RAHHHH")
	oAuth2Service, err := goauth.NewService(c, option.WithTokenSource(conf.TokenSource(c, tok)))
	if err != nil {
		// glog.Errorf("[Gin-OAuth] Failed to create oauth service: %v", err)
		c.AbortWithError(http.StatusInternalServerError, fmt.Errorf("failed to create oauth service: %w", err))
		return
	}
	// log.Println("RAHHHH")
	userInfo, err := oAuth2Service.Userinfo.Get().Do()
	if err != nil {
		// glog.Errorf("[Gin-OAuth] Failed to get userinfo for user: %v", err)
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

func getUserInfo() goauth.Userinfo {
	return userInfo
}

func getUserEmail() string {
	return userInfo.Email
}

func getUserID() string {
	return userInfo.Id
}

func getUserName() string {
	return userInfo.Name
}

func getUserPicture() string {
	return userInfo.Picture
}

func loginHandler(c *gin.Context) {

	state = randToken()
	// c.Set("state", state)

	session := sessions.Default(c)
	session.Set("state", state)
	session.Save()

	// log.Println("state:", session.Get("state"))
	c.Redirect(http.StatusMovedPermanently, getLoginURL(state))
}

func logoutHandler(c *gin.Context) {
	session := sessions.Default(c)
	session.Clear()
	session.Save()
	c.Redirect(http.StatusMovedPermanently, "/")
}
