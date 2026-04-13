<?php
$host = "127.0.0.1";
$port = "10006";
$db = "local";
$user = "root";
$pass = "root";

try {
    $conexion = new PDO("mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4", $user, $pass);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

/* codigo para db en infinityfree:

<?php
$host = "sql104.infinityfree.com";
$db = "if0_41205019_local";
$user = "if0_41205019";
$pass = "2yfjysppfu80FZ";

try {
    $conexion = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}
?> */
?>