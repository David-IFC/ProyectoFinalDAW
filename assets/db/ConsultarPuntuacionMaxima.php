<?php
require_once "db.php";
session_start();

// usuario logeado
if (!isset($_SESSION['NombreUsuario'])) {
    die("No hay usuario en sesión");
}

// compruebo nombre de juego
$juego = $_POST['juego'] ?? null;
$puntuacion = $_POST['puntuacion'] ?? null;

// valido puntuacion
if (!$juego || $puntuacion === null) {
    die("Faltan datos");
}

// parametro juego correcto
$juegosValidos = ['TiempoTexto', 'Sudoku', 'CuentaLetras', 'Punteria'];
if (!in_array($juego, $juegosValidos)) {
    die("Juego no válido");
}

// obtener id
$stmt = $conexion->prepare("SELECT id FROM usuarios WHERE user = :user");
$stmt->execute(['user' => $_SESSION['NombreUsuario']]);
$idUsuario = $stmt->fetchColumn();

// columna de mejor puntuacion
$colMejor = $juego . "_mejor";

// obtener mejor puntuacion actual
$stmt = $conexion->prepare("
    SELECT $colMejor
    FROM puntuaciones
    WHERE usuario_id = :id
");
$stmt->execute(['id' => $idUsuario]);
$mejorPuntuacion = $stmt->fetchColumn();

// convertir puntuacion a integer para evitar problemas de tipo
$puntuacionInt = intval($puntuacion);

// si no hay puntuacion aun (null o false cuando no hay filas), es la primera
if ($mejorPuntuacion === null || $mejorPuntuacion === false) {
    echo json_encode(['es_maxima' => true]);
} else {
    // comparar puntuacion (solo true si es estrictamente mayor)
    if ($puntuacionInt > $mejorPuntuacion) {
        echo json_encode(['es_maxima' => true]);
    } else {
        echo json_encode(['es_maxima' => false]);
    }
}
?>
