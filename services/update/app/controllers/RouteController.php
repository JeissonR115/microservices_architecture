<?php

// Incluir el controlador de usuario
require_once 'UserController.php';

class RouteController {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function handleRequest($request_uri, $request_method, $request_data) {
        // Obtener la ruta de la solicitud
        $route = parse_url($request_uri, PHP_URL_PATH);

        // Instanciar el controlador de usuario
        $userController = new UserController($this->db);

        // Manejar la solicitud según la ruta y el método HTTP
        switch ($route) {
            case '/user/update':
                // Verificar si el método de la solicitud es POST
                if ($request_method === 'POST') {
                    // Obtener los datos del usuario enviados desde el front-end
                    $id = $request_data['id'];
                    $name = $request_data['name'];
                    $age = $request_data['age'];
                    // Llamar al método para actualizar un usuario
                    $response = $userController->updateUser($id, ['name' => $name, 'age' => $age]);
                } else {
                    // Si no es un método POST, retornar un mensaje de error
                    $response = "Método no permitido para esta ruta";
                }
                break;
            // Agrega más casos para otras rutas si es necesario
            default:
                $response = "Ruta no encontrada";
                break;
        }

        // Devolver la respuesta
        return $response;
    }
}

?>
