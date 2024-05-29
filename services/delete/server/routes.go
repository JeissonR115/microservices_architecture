package server

import (
	"delete/controllers"
	"net/http"

	"github.com/gorilla/mux"
)

func InitializeRoutes(uc *controllers.User) http.Handler {
	router := mux.NewRouter()

	router.HandleFunc("/users", uc.HandleGetAll).Methods(http.MethodGet)
	router.HandleFunc("/users/get/{id}", uc.HandleGetByID).Methods(http.MethodGet)
	router.HandleFunc("/users/delete", uc.HandleDeleteUser).Methods(http.MethodDelete)

	return router
}
