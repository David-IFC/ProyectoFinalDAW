<?php

session_start(); // Inicia sesión en memoria

if (isset($_GET['lang'])) {
    $_SESSION['lang'] = $_GET['lang'];
} elseif (!isset($_GET['lang'])) {
    // Si no viene por GET, reiniciar a español
    $_SESSION['lang'] = 'es';
}
$lang = $_SESSION['lang'];

?>