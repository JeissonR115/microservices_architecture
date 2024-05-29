package controllers

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

type Database struct {
	Conn *sql.DB
}

// NewDatabase crea una nueva instancia de Database y la inicializa.
func NewDatabase(connectionString string) (*Database, error) {
	db := &Database{}
	if err := db.Init(connectionString); err != nil {
		return nil, err
	}
	return db, nil
}

// Init inicializa la conexión a la base de datos.
func (db *Database) Init(connectionString string) error {
	var err error
	db.Conn, err = sql.Open("mysql", connectionString)
	if err != nil {
		return fmt.Errorf("error al abrir la conexión a la base de datos: %v", err)
	}

	err = db.Conn.Ping()
	if err != nil {
		return fmt.Errorf("error al conectar a la base de datos: %v", err)
	}
	fmt.Println("Conexión exitosa a la base de datos.")
	return nil
}

// Close cierra la conexión a la base de datos.
func (db *Database) Close() {
	if err := db.Conn.Close(); err != nil {
		log.Printf("error al cerrar la conexión a la base de datos: %v", err)
	}
}
