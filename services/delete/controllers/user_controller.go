package controllers

import (
	"database/sql"
	"delete/models"
	"log"
)

type User struct {
	DB *Database
}

func NewUser(db *Database) *User {
	return &User{DB: db}
}

func (uc *User) GetAll() ([]models.User, error) {
	query := "SELECT id, name, age FROM users"
	rows, err := uc.DB.Conn.Query(query)
	if err != nil {
		log.Fatalf("Error ejecutando la consulta: %v", err)
		return nil, err
	}
	defer rows.Close()

	var users []models.User

	for rows.Next() {
		var user models.User
		err := rows.Scan(&user.ID, &user.Name, &user.Age)
		if err != nil {
			log.Fatalf("Error escaneando los resultados: %v", err)
			return nil, err
		}
		users = append(users, user)
	}

	if err := rows.Err(); err != nil {
		log.Fatalf("Error iterando sobre los resultados: %v", err)
		return nil, err
	}

	return users, nil
}

func (uc *User) GetByID(userID int) (*models.User, error) {
	query := "SELECT id, name, age FROM users WHERE id = ?"
	row := uc.DB.Conn.QueryRow(query, userID)

	var user models.User
	err := row.Scan(&user.ID, &user.Name, &user.Age)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // No se encontró el usuario
		}
		log.Fatalf("Error escaneando los resultados: %v", err)
		return nil, err
	}

	return &user, nil
}

func (uc *User) DeleteByID(userID int) error {
	query := "DELETE FROM users WHERE id = ?"
	_, err := uc.DB.Conn.Exec(query, userID)
	if err != nil {
		log.Fatalf("Error eliminando el usuario: %v", err)
		return err
	}
	return nil
}
