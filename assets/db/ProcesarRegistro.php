<?php
require_once "db.php";
session_start();
if (isset($_GET['lang'])) {
    $_SESSION['lang'] = $_GET['lang'];
} elseif (!isset($_GET['lang'])) {
    // Si no viene por GET, reiniciar a español
    $_SESSION['lang'] = 'es';
}
$lang = $_SESSION['lang'];

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $usuario = $_POST["username"] ?? '';
    $password = $_POST["password"] ?? '';

    if (!empty($usuario) && !empty($password)) {
        // Encriptar contraseña
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO usuarios (user, psw) VALUES (:user, :psw)";
        $stmt = $conexion->prepare($sql);

        $stmt->bindParam(":user", $usuario);
        $stmt->bindParam(":psw", $passwordHash);

        try {

            $stmt->execute();
            $_SESSION['NombreUsuario'] = $usuario;
            $_SESSION['Registro'] = true;
            $stmt = null;
            $conexion = null;
            header("Location:  /Registro.php?lang=" . $lang);
            exit();

        } catch (PDOException $e) {
            //otro error
            echo "Error: " . $e->getMessage();
            // Verificar si es error por duplicado de usuario
            if ($e->getCode() == 23000) {
                $_SESSION['NombreUsuario'] = $usuario;
                $_SESSION['repetido'] = true;

                $stmt = null;
                $conexion = null;
                header("Location:  /Registro.php?lang=" . $lang);
                exit();

            } else {

                $stmt = null;
                $conexion = null;
                /* header("Location:  /Registro.php");
                exit(); */
            }
        }

    } else {

        $stmt = null;
        $conexion = null;
        header("Location:  /Registro.php?lang=" . $lang);
    }



}
?>