<?php include "assets/phpComponentes/GestionSesiones.php"; ?>
<?php
if (!isset($_SESSION['NombreUsuario'])) {
    header("Location: index.php");
    exit();
}
?>
<?php include "assets/phpComponentes/IdiomaJson.php"; ?>
<?php include "assets/phpComponentes/datos.php"; ?>

<?php
$clase = "Puntuaciones";
$java = "PuntuacionesGenerales.js";
$home = true;
$copy = false;
$idioma = false;
?>

<?php require_once "assets/db/db.php";

$stmt = $conexion->prepare("
    SELECT
        u.user,
        p.TiempoTexto_mejor,
        p.CuentaLetras_mejor,
        p.Sudoku_mejor,
        p.Punteria_mejor
    FROM usuarios u
    LEFT JOIN puntuaciones p ON p.usuario_id = u.id
    ORDER BY u.user ASC
");
$stmt->execute();
$puntuacionesGenerales = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<?php include "assets/phpComponentes/BeforeMain.php"; ?>

<main>
    <?php if ($lang == "es"): ?>
        <h1>Puntuaciones generales</h1>
    <?php elseif ($lang == "en"): ?>
        <h1>General scores</h1>
    <?php endif; ?>

    <div class="contenedorPrincipal">
        <?php if (empty($puntuacionesGenerales)): ?>
            <?php if ($lang == "es"): ?>
                <p>No hay usuarios registrados todavia.</p>
            <?php elseif ($lang == "en"): ?>
                <p>There are no registered users yet.</p>
            <?php endif; ?>
        <?php else: ?>
            <table class="matriz tabla-general" border="1">
                <tr>
                    <td class="col-usuario"><?php echo htmlspecialchars($texto["nombreDeUsuarioTabla"]); ?></td>
                    <td><?php echo $texto["tiempoTexto"]; ?></td>
                    <td><?php echo $texto["cuentaLetras"]; ?></td>
                    <td>Sudoku</td>
                    <td><?php echo $texto["punteria"]; ?></td>
                </tr>
                <?php foreach ($puntuacionesGenerales as $puntuaciones): ?>
                    <tr>
                        <td class="col-usuario"><?php echo htmlspecialchars($puntuaciones['user']); ?></td>
                        <td><?php echo $puntuaciones['TiempoTexto_mejor'] ?? ''; ?></td>
                        <td><?php echo $puntuaciones['CuentaLetras_mejor'] ?? ''; ?></td>
                        <td><?php echo $puntuaciones['Sudoku_mejor'] ?? ''; ?></td>
                        <td><?php echo $puntuaciones['Punteria_mejor'] ?? ''; ?></td>
                    </tr>
                <?php endforeach; ?>
            </table>
        <?php endif; ?>
    </div>
</main>

<?php include "assets/phpComponentes/AfterMain.php"; ?>
