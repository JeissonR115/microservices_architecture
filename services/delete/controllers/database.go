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

func NewDatabase(connectionString string) (*Database, error) {
	db := &Database{}
	db.Init(connectionString)
	return db, nil
}
func (db *Database) Init(connectionString string) {
	var err error
	db.Conn, err = sql.Open("mysql", connectionString)
	if err != nil {
		log.Fatalf("Error al abrir la conexión a la base de datos: %v", err)
	}

	err = db.Conn.Ping()
	if err != nil {
		log.Fatalf("Error al conectar a la base de datos: %v", err)
	}
	fmt.Println("Conexión exitosa a la base de datos.")
}
func (db *Database) Close() {
	db.Conn.Close()
}
