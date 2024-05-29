package server

import (
	"fmt"
	"log"
	"net/http"
	"strconv" // Importa strconv para convertir el puerto a una cadena

	"github.com/rs/cors"
)

func StartServer(port int, router http.Handler) {
	// Configuración de CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, // Ajusta esto según tus necesidades
		AllowedMethods:   []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	})

	// Aplicando CORS al enrutador
	handler := c.Handler(router)

	fmt.Printf("Servidor iniciado en el puerto %d\n", port)
	log.Fatal(http.ListenAndServe(":"+strconv.Itoa(port), handler)) // Corregir la conversión del puerto a una cadena
}
