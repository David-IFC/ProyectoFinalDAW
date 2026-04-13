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
//parametro juego correcto
$juegosValidos = ['TiempoTexto', 'Sudoku', 'CuentaLetras', 'Punteria'];
if (!in_array($juego, $juegosValidos)) {
    die("Juego no válido");
}
// obtener id
$stmt = $conexion->prepare("SELECT id FROM usuarios WHERE user = :user");
$stmt->execute(['user' => $_SESSION['NombreUsuario']]);
$idUsuario = $stmt->fetchColumn();

// intentos del usuario
$col1 = $juego . "_intento1";
$col2 = $juego . "_intento2";
$col3 = $juego . "_intento3";

$stmt = $conexion->prepare("
    SELECT $col1, $col2, $col3 
    FROM puntuaciones 
    WHERE usuario_id = :id
");
$stmt->execute(['id' => $idUsuario]);
$intentos = $stmt->fetch(PDO::FETCH_ASSOC);
//para que no de error si todavia no hay filas
if (!$intentos) {
    $stmt = $conexion->prepare("
        INSERT INTO puntuaciones (usuario_id)
        VALUES (:id)
    ");
    $stmt->execute(['id' => $idUsuario]);

    $intentos = [$col1 => null, $col2 => null, $col3 => null];
}
if ($intentos[$col1] === null) {
    $updateCol = $col1;
} elseif ($intentos[$col2] === null) {
    $updateCol = $col2;
} elseif ($intentos[$col3] === null) {
    $updateCol = $col3;
} else {
//si ya hay 3 intentos los borramos todos y volvemos a empezar añadiendo el dato en el primer intento
    $stmt = $conexion->prepare("
        UPDATE puntuaciones 
        SET $col1 = :puntuacion,
            $col2 = NULL,
            $col3 = NULL
        WHERE usuario_id = :id
    ");
    $stmt->execute([
        'puntuacion' => $puntuacion,
        'id' => $idUsuario
    ]);

    // actualizar mejor intento
    $colMejor = $juego . "_mejor";
    $stmt = $conexion->prepare("
        UPDATE puntuaciones 
        SET $colMejor = GREATEST(IFNULL($colMejor, 0), :puntuacion)
        WHERE usuario_id = :id
    ");
    $stmt->execute([
        'puntuacion' => $puntuacion,
        'id' => $idUsuario
    ]);

    exit; 
}

$colMejor = $juego . "_mejor";

$stmt = $conexion->prepare("
    UPDATE puntuaciones
    SET $updateCol = :puntuacion,
        $colMejor = GREATEST(IFNULL($colMejor, 0), :puntuacion)
    WHERE usuario_id = :id
");
$stmt->execute([
    'puntuacion' => $puntuacion,
    'id' => $idUsuario
]);
?>