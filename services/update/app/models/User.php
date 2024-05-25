<?php

// Modelo de Usuario
class User {
    private $id;
    private $username;
    private $age;

    public function __construct($id, $username, $age) {
        $this->id = $id;
        $this->username = $username;
        $this->age = $age;
    }

    public function getId() {
        return $this->id;
    }

    public function getUsername() {
        return $this->username;
    }

    public function getage() {
        return $this->age;
    }

}
