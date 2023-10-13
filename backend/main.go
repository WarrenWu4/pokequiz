package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	gin.SetMode(gin.ReleaseMode)

	r := gin.Default()

	r.Use(cors.Default())

	// default route
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"data": "hungrymonkey",
		})
	})

	r.GET("/banana", func(c *gin.Context){
		c.JSON(http.StatusOK, gin.H{
			"name": "Mariel Salomon",
			"animal": "penguin",
			"roblox": "roblox is crazy",
		})
	})

	// test route
	r.GET("/test", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"data": "testing route",
		})
	})

	r.Run(":8000")
}
