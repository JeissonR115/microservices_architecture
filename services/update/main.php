<?php

// Incluir la clase de base de datos
require_once 'app/controllers/Database.php';

// Incluir el controlador de rutas
require_once 'app/controllers/RouteController.php';

// Crear una instancia de la clase Database con las credenciales de conexión
$db = new Database('localhost', 'jeissonr115', 'pipe115.', 'users');

// Conectar a la base de datos
$db->connect();

// Crear una instancia del controlador de rutas
$routeController = new RouteController($db);

// Obtener la URL de la solicitud actual
$request_uri = $_SERVER['REQUEST_URI'];

// Obtener el método HTTP de la solicitud
$request_method = 'POST';

// Leer el contenido del cuerpo de la solicitud
$request_body = file_get_contents('php://input');

// Decodificar el JSON del cuerpo de la solicitud
$request_data = json_decode($request_body, true);


// Manejar la solicitud y obtener la respuesta
$response = $routeController->handleRequest($request_uri, $request_method, $request_data);

// Mostrar la respuesta
echo $response;

?>
