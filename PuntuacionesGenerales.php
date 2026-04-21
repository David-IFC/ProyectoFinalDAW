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
    INNER JOIN puntuaciones p ON p.usuario_id = u.id
    ORDER BY u.user ASC
");
$stmt->execute();
$puntuacionesGenerales = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<?php include "assets/phpComponentes/BeforeMain.php"; ?>

<main>
    <h1><?php echo $texto["PuntuacionesGenerales"] ?></h1>

    <div class="contenedorPrincipal">
        <?php if (empty($puntuacionesGenerales)): ?>
            <p>
                <?php $texto["NoUsuarios"] ?>
            </p>
        <?php else: ?>
            <table class="matriz tabla-general" border="1" style="visibility:hidden">
                <thead>
                    <tr>
                        <th class="col-usuario" data-column="0">
                            <?php echo htmlspecialchars($texto["nombreDeUsuarioTabla"]); ?>
                        </th>
                        <th data-column="1"><?php echo $texto["tiempoTexto"]; ?></th>
                        <th data-column="2"><?php echo $texto["cuentaLetras"]; ?></th>
                        <th data-column="3">Sudoku</th>
                        <th data-column="4"><?php echo $texto["punteria"]; ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($puntuacionesGenerales as $puntuaciones): ?>
                        <tr class="<?php echo ($puntuaciones['user'] === $nombreUsuario) ? 'fila-usuario-actual' : ''; ?>">
                            <td class="col-usuario <?php echo ($puntuaciones['user'] === $nombreUsuario) ? 'usuario-actual' : ''; ?>">
                                <?php echo htmlspecialchars($puntuaciones['user']); ?>
                            </td>
                            <td><?php echo $puntuaciones['TiempoTexto_mejor'] ?? ''; ?></td>
                            <td><?php echo $puntuaciones['CuentaLetras_mejor'] ?? ''; ?></td>
                            <td><?php echo $puntuaciones['Sudoku_mejor'] ?? ''; ?></td>
                            <td><?php echo $puntuaciones['Punteria_mejor'] ?? ''; ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>
</main>

<?php include "assets/phpComponentes/AfterMain.php"; ?>