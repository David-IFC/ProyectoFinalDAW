
<?php include "assets/phpComponentes/GestionSesiones.php"; ?>
<?php include "assets/phpComponentes/IdiomaJson.php"; ?>

<?php
$nombreUsuario = $_SESSION['NombreUsuario'] ?? null;
$contraMal = $_SESSION['ContraMal'] ?? null;
$noEsta = $_SESSION['NoEsta'] ?? null;

unset($_SESSION['ContraMal']);
unset($_SESSION['NoEsta']);

?>

<?php include "assets/phpComponentes/datos.php"; ?>

<?php
$clase = "IniciarSesion";
$java = "IniciarSesion.js";
?>

<?php include "assets/phpComponentes/BeforeMain.php"; ?>

<main>
    <div class="contenedorPrincipal">
        <?php if ($contraMal): ?>
            <p class="mensaje rojo">
                <?php echo $texto["ErrorContra"] ?>
            </p>
            <br>
            <button class="botonEmpezarTiempo-TiempoTexto"
                onclick="transicion('?lang=<?= $lang ?>')"><?php echo $texto["reintentar"] ?></button>
        <?php elseif ($noEsta): ?>
            <p class="mensaje rojo">
                <?php echo $texto["EseUsuarioNoExiste"] ?>
            </p>
            <br>
            <button class="botonEmpezarTiempo-TiempoTexto"
                onclick="transicion('?lang=<?= $lang ?>')"><?php echo $texto["reintentar"] ?></button>
        <?php elseif ($nombreUsuario): ?>
            <p class="mensaje verde">
                <?php echo $texto["SesionIniciada"]; ?>
            </p>
            <br>
            <button class="botonEmpezarTiempo-TiempoTexto"
                onclick="transicion('index.php?lang=<?= $lang ?>')"><?php echo $texto["VolverMenu"] ?></button>
        <?php else: ?>
            <h2>
                <?php echo $texto["IniciarSesion"]; ?>
            </h2>

            <form id="registro" action=<?php echo "assets/db/ProcesarIniciarSesion.php?lang=" . $lang ?> method="post">
                <label for="username">
                    <?php echo $texto["nombreDeUsuario"]; ?>
                </label><br>
                <input type="text" id="username" required name="username"><br><br>
                <label for="password">
                    <?php echo $texto["contraseña"]; ?>
                </label><br>
                <input type="password" id="password" required name="password"><br><br>

                <button class="botonEmpezarTiempo-TiempoTexto" type="submit">
                    <?php echo $texto["IniciarSesion"]; ?>
                </button>
            </form>
        <?php endif; ?>
    </div>
</main>

<?php include "assets/phpComponentes/AfterMain.php"; ?>