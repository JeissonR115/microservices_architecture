package server

import (
	"fmt"
	"log"
	"net/http"
)

func StartServer(router *http.ServeMux) {
	fmt.Println("Servidor iniciado en el puerto 8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}
