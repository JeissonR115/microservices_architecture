<?php

// Modelo de Usuario
class User {
    private $id;
    private $name;
    private $age;

    public function __construct($id, $name, $age) {
        $this->id = $id;
        $this->name = $name;
        $this->age = $age;
    }

    public function getId() {
        return $this->id;
    }

    public function getname() {
        return $this->name;
    }

    public function getage() {
        return $this->age;
    }

}
