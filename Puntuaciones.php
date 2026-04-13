<?php include "assets/phpComponentes/GestionSesiones.php"; ?>

<?php
//si no estas registrado no deberias poder entrar aqui

if (!isset($_SESSION['NombreUsuario'])) {
    header("Location: index.php");
    exit();
}
?>
<?php include "assets/phpComponentes/IdiomaJson.php"; ?>

<?php include "assets/phpComponentes/datos.php"; ?>

<?php
$clase = "Puntuaciones";
$java = "";
$home = true;
?>
<?php require_once "assets/db/db.php";

$stmt = $conexion->prepare("
    SELECT * 
    FROM puntuaciones p
    JOIN usuarios u ON p.usuario_id = u.id
    WHERE u.user = :usuario
");
$stmt->execute(['usuario' => $nombreUsuario]);
$puntuaciones = $stmt->fetch();

?>
<?php include "assets/phpComponentes/BeforeMain.php"; ?>

<div class="botonesRegistro">
    <button onclick="transicion('PuntuacionesGenerales.php?lang=<?php echo $lang; ?>')">
        <?php if ($lang == "es"): ?>
            Puntuaciones generales
        <?php elseif ($lang == "en"): ?>
            General scores
        <?php endif; ?>
    </button>
</div>

<main>
    <?php if ($lang == "es"): ?>
        <h1> <?php echo $texto["Puntuaciones de"]; ?>     <?php echo $nombreUsuario ?></h1>
    <?php elseif ($lang == "en"): ?>
        <h1> <?php echo $nombreUsuario; ?><?php echo $texto["Puntuaciones de"]; ?></h1>
    <?php endif; ?>
    <div class="contenedorPrincipal">
        <table class="matriz" border="1">
            <tr>
                <td> <?php echo $texto["Prueba"]; ?></td>
                <td><?php echo $texto["Intento"]; ?> 1</td>
                <td><?php echo $texto["Intento"]; ?> 2</td>
                <td><?php echo $texto["Intento"]; ?> 3</td>
                <td><?php echo $texto["Mejor"]; ?> <?php echo $texto["Intento"] ?></td>
            </tr>
            <tr>
                <td><?php echo $texto["tiempoTexto"]; ?></td>
                <td>
                    <?php echo $puntuaciones['TiempoTexto_intento1'] ?? ''; ?>
                </td>
                <td>
                    <?php echo $puntuaciones['TiempoTexto_intento2'] ?? ''; ?>
                </td>
                <td>
                    <?php echo $puntuaciones['TiempoTexto_intento3'] ?? ''; ?>
                </td>
                <td>
                    <?php echo $puntuaciones['TiempoTexto_mejor'] ?? ''; ?>
                </td>
            </tr>
            <tr>
                <td><?php echo $texto["cuentaLetras"]; ?></td>
                <td>
                    <?php echo $puntuaciones['CuentaLetras_intento1'] ?? ''; ?>
                </td>
                <td>
                    <?php echo $puntuaciones['CuentaLetras_intento2'] ?? ''; ?>
                </td>
                <td>
                    <?php echo $puntuaciones['CuentaLetras_intento3'] ?? ''; ?>
                </td>
                <td>
                    <?php echo $puntuaciones['CuentaLetras_mejor'] ?? ''; ?>
                </td>
            </tr>
            <tr>
                <td><?php echo $texto["sudoku"]; ?></td>
                <td>
                    <?php echo $puntuaciones['Sudoku_intento1'] ?? ''; ?>
                </td>
                <td>
                    <?php echo $puntuaciones['Sudoku_intento2'] ?? ''; ?>
                </td>
                <td>
                    <?php echo $puntuaciones['Sudoku_intento3'] ?? ''; ?>
                </td>
                <td>
                    <?php echo $puntuaciones['Sudoku_mejor'] ?? ''; ?>
                </td>
            </tr>
            <tr>
                <td><?php echo $texto["punteria"]; ?></td>
                <td>
                    <?php echo $puntuaciones['Punteria_intento1'] ?? ''; ?>
                </td>
                <td>
                    <?php echo $puntuaciones['Punteria_intento2'] ?? ''; ?>
                </td>
                <td>
                    <?php echo $puntuaciones['Punteria_intento3'] ?? ''; ?>
                </td>
                <td>
                    <?php echo $puntuaciones['Punteria_mejor'] ?? ''; ?>
                </td>
            </tr>
        </table>
    </div>
</main>

<?php include "assets/phpComponentes/AfterMain.php"; ?>
