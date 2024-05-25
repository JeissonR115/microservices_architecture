<?php
// Archivo de configuración de la base de datos
require_once 'app/controllers/database.php';

// Clase principal de la aplicación
class Application {
    private $database;

    public function __construct(Database $database) {
        $this->database = $database;
    }

    public function run() {
        $this->database->connect();
        $this->database->close();
    }
}


$database = new Database("localhost", "jeissonr115", "pipe115.", "users");

// Crear una instancia de la clase Application y ejecutar la aplicación
$application = new Application($database);
$application->run();
?>
