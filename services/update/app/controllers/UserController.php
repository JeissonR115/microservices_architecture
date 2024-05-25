<?php

// Incluir el modelo de usuario
require_once __DIR__ . '/../models/User.php';

// Controlador de Usuario
class UserController {
    private $db;

    // Constructor que recibe la conexión a la base de datos
    public function __construct($db) {
        $this->db = $db;
    }

    // Método para consultar un usuario por su ID
    public function getUserById($id) {
        // Aquí podrías realizar la consulta a la base de datos para obtener el usuario con el ID proporcionado
        // Por ahora, simplemente creamos un usuario de ejemplo con ID 1
        return new User($id, 'example_username', 'example@example.com');
    }

    // Método para actualizar un usuario
    public function updateUser($id, $data) {
        // Preparar la consulta SQL para actualizar el usuario
        $query = "UPDATE users SET Name = ?, age = ? WHERE id = ?";
        $statement = $this->db->getConnection()->prepare($query);

        // Vincular los parámetros
        $statement->bind_param('ssi', $data['name'], $data['age'], $id);

        // Ejecutar la consulta
        if ($statement->execute()) {
            // La actualización fue exitosa
            $message = "Usuario con ID $id actualizado correctamente";
        } else {
            // Ocurrió un error durante la actualización
            $message = "Error al actualizar el usuario";
        }

        return $message;
    }
}

?>
