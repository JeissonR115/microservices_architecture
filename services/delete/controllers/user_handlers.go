// En controllers/user_handlers.go

package controllers

import (
	"encoding/json"
	"net/http"
	"strconv"
)

func (uc *User) HandleGetAll(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	users, err := uc.GetAll()
	if err != nil {
		http.Error(w, "Error obteniendo los usuarios", http.StatusInternalServerError)
		return
	}

	// Convertir los usuarios a JSON
	usersJSON, err := json.Marshal(users)
	if err != nil {
		http.Error(w, "Error convirtiendo los usuarios a JSON", http.StatusInternalServerError)
		return
	}

	// Escribir la respuesta
	w.Header().Set("Content-Type", "application/json")
	w.Write(usersJSON)
}
func (uc *User) HandleGetByID(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	// Obtener el ID de usuario de la URL
	idStr := r.URL.Path[len("/users/"):]
	userID, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "ID de usuario no válido", http.StatusBadRequest)
		return
	}

	user, err := uc.GetByID(userID)
	if err != nil {
		http.Error(w, "Error obteniendo el usuario", http.StatusInternalServerError)
		return
	}
	if user == nil {
		http.Error(w, "Usuario no encontrado", http.StatusNotFound)
		return
	}

	// Convertir el usuario a JSON
	userJSON, err := json.Marshal(user)
	if err != nil {
		http.Error(w, "Error convirtiendo el usuario a JSON", http.StatusInternalServerError)
		return
	}

	// Escribir la respuesta
	w.Header().Set("Content-Type", "application/json")
	w.Write(userJSON)
}
func (uc *User) HandleDeleteUser(w http.ResponseWriter, r *http.Request) {
	// Obtener el ID del usuario a eliminar desde la URL
	userID := r.URL.Query().Get("id")
	if userID == "" {
		http.Error(w, "ID de usuario no proporcionado", http.StatusBadRequest)
		return
	}

	// Convertir el ID de usuario a entero
	id, err := strconv.Atoi(userID)
	if err != nil {
		http.Error(w, "ID de usuario no válido", http.StatusBadRequest)
		return
	}

	// Obtener el usuario por su ID
	user, err := uc.GetByID(id)
	if err != nil {
		http.Error(w, "Error obteniendo el usuario", http.StatusInternalServerError)
		return
	}

	// Verificar si el usuario existe
	if user == nil {
		http.Error(w, "El usuario no existe", http.StatusNotFound)
		return
	}

	// Eliminar el usuario por su ID
	err = uc.DeleteByID(id)
	if err != nil {
		http.Error(w, "Error eliminando el usuario", http.StatusInternalServerError)
		return
	}

	// Retornar una respuesta exitosa
	w.WriteHeader(http.StatusNoContent)
}
