package models

import "encoding/json"

// Response representa una respuesta JSON estandarizada.
type Response struct {
	Status  string      `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

// NewResponse crea una nueva instancia de Response.
func NewResponse(status, message string, data interface{}) Response {
	return Response{
		Status:  status,
		Message: message,
		Data:    data,
	}
}

// ToJSON convierte el objeto Response a formato JSON.
func (r Response) ToJSON() ([]byte, error) {
	return json.Marshal(r)
}
