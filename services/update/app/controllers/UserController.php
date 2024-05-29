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
        $query = "SELECT id, name, age FROM users WHERE id = ?";
        $statement = $this->db->getConnection()->prepare($query);
        $statement->bind_param('i', $id);
        $statement->execute();
        $result = $statement->get_result();
        
        if ($row = $result->fetch_assoc()) {
            return new User($row['id'], $row['name'], $row['age']);
        } else {
            return null;
        }
    }

    // Método para actualizar un usuario
    public function updateUser($id, $data) {
        // Preparar la consulta SQL para actualizar el usuario
        $query = "UPDATE users SET name = ?, age = ? WHERE id = ?";
        $statement = $this->db->getConnection()->prepare($query);

        // Vincular los parámetros
        $statement->bind_param('ssi', $data['name'], $data['age'], $id);

        // Ejecutar la consulta
        if ($statement->execute()) {
            if ($statement->affected_rows > 0) {
                // La actualización fue exitosa y se afectaron filas
                $message = "Usuario con ID $id actualizado correctamente";
                $status = "success";
            } elseif ($this->getUserById($id) !== null) {
                // El usuario existe pero no se afectaron filas (sin cambios)
                $message = "La informacion del usuario con ID $id no ha cambiado";
                $status = "success";
            } else {
                // No se encontró el usuario
                $message = "No se encontro el usuario con ID $id";
                $status = "error";
            }
        } else {
            // Ocurrió un error durante la actualización
            $message = "Error al actualizar el usuario";
            $status = "error";
            $affectedRows = 0;
        }

        // Construir el array de respuesta
        $response = array(
            "message" => $message,
            "status" => $status,
        );

        // Convertir el array a JSON
        $jsonResponse = json_encode($response);

        return $jsonResponse;
    }


}

?>
