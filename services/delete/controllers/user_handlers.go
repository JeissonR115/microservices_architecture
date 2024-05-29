package controllers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"delete/models"

	"github.com/gorilla/mux"
)

func respondWithError(w http.ResponseWriter, statusCode int, message string) {
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(models.NewResponse("error", message, nil))
}

func respondWithSuccess(w http.ResponseWriter, statusCode int, message string, data interface{}) {
	response := models.NewResponse("success", message, data)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(response)
}

func (uc *User) HandleGetAll(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		respondWithError(w, http.StatusMethodNotAllowed, "Método no permitido")
		return
	}

	users, err := uc.GetAll()
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error obteniendo los usuarios")
		return
	}

	respondWithSuccess(w, http.StatusOK, "Usuarios obtenidos correctamente", users)
}

func (uc *User) HandleGetByID(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		respondWithError(w, http.StatusMethodNotAllowed, "Método no permitido")
		return
	}

	vars := mux.Vars(r)
	idStr := vars["id"]
	userID, err := strconv.Atoi(idStr)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "ID de usuario no válido")
		return
	}

	user, err := uc.GetByID(userID)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error obteniendo el usuario")
		return
	}
	if user == nil {
		respondWithError(w, http.StatusNotFound, "Usuario no encontrado")
		return
	}

	respondWithSuccess(w, http.StatusOK, "Usuario obtenido correctamente", user)
}

func (uc *User) HandleDeleteUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		respondWithError(w, http.StatusMethodNotAllowed, "Método no permitido")
		return
	}

	var requestBody map[string]interface{}
	err := json.NewDecoder(r.Body).Decode(&requestBody)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Error decodificando el cuerpo de la solicitud")
		return
	}

	id := requestBody["id"]
	var userID int
	switch id := id.(type) {
	case float64:
		userID = int(id)
	case string:
		userID, err = strconv.Atoi(id)
		if err != nil {
			respondWithError(w, http.StatusBadRequest, "ID de usuario no válido")
			return
		}
	default:
		respondWithError(w, http.StatusBadRequest, "ID de usuario no proporcionado o no válido")
		return
	}

	// Verificar si el usuario existe antes de eliminarlo
	user, err := uc.GetByID(userID)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error obteniendo el usuario")
		return
	}
	if user == nil {
		respondWithError(w, http.StatusNotFound, "El usuario no existe")
		return
	}

	err = uc.DeleteByID(userID)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error eliminando el usuario")
		return
	}

	respondWithSuccess(w, http.StatusOK, "Usuario eliminado correctamente", nil)
}
