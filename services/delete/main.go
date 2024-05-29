package main

import (
	"delete/controllers"
	"delete/server"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	dsn := "jeissonr115:pipe115.@tcp(127.0.0.1:3306)/users"
	db, err := controllers.NewDatabase(dsn)
	if err != nil {
		log.Fatalf("Error inicializando la base de datos: %v", err)
	}
	defer db.Close()

	userController := controllers.NewUser(db.Conn)
	router := server.InitializeRoutes(userController)

	server.StartServer(3010, router)
}
