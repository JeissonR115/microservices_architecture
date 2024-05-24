package server

import (
	"delete/controllers"
	"net/http"
)

func InitializeRoutes(uc *controllers.User) *http.ServeMux {
	router := http.NewServeMux()

	// Ruta para obtener todos los usuarios
	router.HandleFunc("/users", uc.HandleGetAll)

	// Ruta para obtener un usuario por su ID
	router.HandleFunc("/users/", uc.HandleGetByID)

	// Ruta para eliminar un usuario por su ID
	router.HandleFunc("/users/delete", uc.HandleDeleteUser)

	return router
}
