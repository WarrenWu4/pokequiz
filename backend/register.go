package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	"backend/pokeauth"

	"github.com/gin-gonic/gin"
)

type User struct {
	ID    string
	Email string
	Name  string
	// not sure how to implement avatar
}

var user User

func QueryUser(c *gin.Context) string {
	db, err := sql.Open("mysql", os.Getenv("DSN"))
	if err != nil {
		log.Fatalf("failed to connect: %v", err)
		// return http.StatusBadRequest
		return "Failed to connect"
	}
	defer db.Close()

	// Query the database
	// rows, err := db.Query("SELECT * FROM users")
	// if err != nil {
	// 	log.Fatal("(QueryUser) db.Query:", err)
	// 	// return http.StatusBadRequest
	// 	return "Failed to query"
	// }

	findUser := db.QueryRow("SELECT * FROM users WHERE ID = $1", user.ID)
	if findUser != nil {
		log.Fatal("(QueryUser) db.Query:", err)
		return "Found User"
	}

	// for rows.Next() {
	// 	err := rows.Scan(&user.ID, &user.Email, &user.Name)
	// 	if err != nil {
	// 		log.Fatal("(QueryUser) res.Scan:", err)
	// 		// return http.StatusFound
	// 		return "Found User"
	// 	}
	// }
	return "User not found"
}

func RegisterUser(c *gin.Context) {
	// Open a connection to PlanetScale
	db, err := sql.Open("mysql", os.Getenv("DSN"))
	if err != nil {
		log.Fatalf("failed to connect: %v", err)
		return
	}
	// else {
	// 	log.Println("Connected to PlanetScale...")
	// }

	// get user data
	existingUserID := pokeauth.GetUserID(c)
	if existingUserID == "" {
		log.Fatal("(registerUser) getUserID:", err)
		return
	}
	existingUserEmail := pokeauth.GetUserEmail(c)
	if existingUserEmail == "" {
		log.Fatal("(registerUser) getUserEmail:", err)
		return
	}
	existingUserName := pokeauth.GetUserName(c)
	if existingUserName == "" {
		log.Fatal("(registerUser) getUserName:", err)
		return
	}

	user = User{
		ID:    existingUserID,
		Email: existingUserEmail,
		Name:  existingUserName,
	}

	// create table if it doesn't exist
	createTableSQL := `CREATE TABLE IF NOT EXISTS users (
		ID VARCHAR(255),
		email VARCHAR(255),
		name VARCHAR(255)
		);`
	_, err = db.Exec(createTableSQL)
	if err != nil {
		log.Fatal("(registerUser) db.Exec:", err)
		return
	}

	// Insert into database
	if QueryUser(c) == "User not found" {
		log.Fatal(QueryUser(c))
		query := `INSERT INTO users (ID, email, name) VALUES (?, ?, ?)`
		result, err := db.Exec(query, user.ID, user.Email, user.Name)
		if err != nil {
			log.Fatal("(registerUser) db.Exec:", err)
			return
		}

		c.JSON(http.StatusOK, result)
	} else {
		log.Fatal("User already exists")
		c.JSON(http.StatusOK, "User already exists")
	}
}
