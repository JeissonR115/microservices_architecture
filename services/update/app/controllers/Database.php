<?php
class Database {
    private $serverName;
    private $username;
    private $password;
    private $database;
    private $conn;

    // Constructor para inicializar las credenciales
    public function __construct($serverName, $username, $password, $database) {
        $this->serverName = $serverName;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;
    }

    // Método para conectar a la base de datos
    public function connect() {
        $this->conn = new mysqli($this->serverName, $this->username, $this->password, $this->database);
        // Verificar la conexión
        if ($this->conn->connect_error) {
            die("Conexión fallida: " . $this->conn->connect_error);
        }
         echo "Conexión exitosa a la base de datos <br/>";
    }

    // Método para cerrar la conexión
    public function close() {
        $this->conn->close();
    }

    // Método para obtener la conexión a la base de datos
    public function getConnection() {
        return $this->conn;
    }
}
?>
