package main

import (
	"delete/controllers"
	"delete/server"
)

func main() {
	dsn := "jeissonr115:pipe115.@tcp(127.0.0.1:3010)/users"
	db, err := controllers.NewDatabase(dsn)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	userController := controllers.NewUser(db)
	router := server.InitializeRoutes(userController)

	server.StartServer(router)
}
