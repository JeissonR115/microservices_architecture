<?php

// Incluir el modelo de usuario
require_once 'User.php';

// Controlador de Usuario
class UserController {

    // Método para consultar un usuario por su ID
    public function getUserById($id) {
        // Aquí podrías realizar la consulta a la base de datos para obtener el usuario con el ID proporcionado
        // Por ahora, simplemente creamos un usuario de ejemplo con ID 1
        return new User($id, 'example_username', 'example@example.com');
    }
}
