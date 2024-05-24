package server

import (
	"log"
	"net/http"
)

func StartServer(router *http.ServeMux) {
	log.Println("Servidor iniciado en el puerto 8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}
