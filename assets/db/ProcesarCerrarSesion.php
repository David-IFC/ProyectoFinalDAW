<?php

session_start();
//para que la animacion vuelva a salir al loguearte
$_SESSION['Animacion'] = true;
if (isset($_GET['lang'])) {
    $_SESSION['lang'] = $_GET['lang'];
} elseif (!isset($_GET['lang'])) {
    // Si no viene por GET, reiniciar a español
    $_SESSION['lang'] = 'es';
}
$lang = $_SESSION['lang'];
unset($_SESSION['NombreUsuario']);
header("Location: /index.php?lang=" . $lang);
exit();

?>