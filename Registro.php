<?php include "assets/phpComponentes/GestionSesiones.php"; ?>
<?php include "assets/phpComponentes/IdiomaJson.php"; ?>

<?php

$nombreUsuario = $_SESSION['NombreUsuario'] ?? null;
$repetido = $_SESSION['repetido'] ?? null;
$registro= $_SESSION['Registro'] ?? null;
unset($_SESSION['NombreUsuario']);
unset($_SESSION['repetido']);
unset($_SESSION['Registro']);

?>

<?php include "assets/phpComponentes/datos.php"; ?>

<?php
$clase = "Registro";
$java = "Registro.js";
?>

<?php include "assets/phpComponentes/BeforeMain.php"; ?>

<main>
    <div class="contenedorPrincipal">
        <?php if ($repetido): ?>
            <p class="mensaje rojo">
                <?php echo $texto["ElNombreDeUsuario"] . " " . $nombreUsuario . " " . $texto["YaHaSidoUtilizado"] ?>
            </p>
            <br>
            <button class="botonEmpezarTiempo-TiempoTexto" onclick="transicion('?lang=<?= $lang ?>')">
                <?php echo $texto["reintentar"] ?></button>
        <?php elseif ($registro): ?>
            <p class="mensaje verde">
                <?php echo $texto["ElUsuario"] . " " . $nombreUsuario . " " . $texto["CreadoCorrectamente"] ?>
            </p>
            <br>
            <button class="botonEmpezarTiempo-TiempoTexto" onclick="transicion('index.php?lang=<?= $lang ?>')">
                <?php echo $texto["VolverMenu"] ?></button>

        <?php else: ?>
            <h2><?php echo $texto["resgistrar"]; ?></h2>
                
            <form id="registro" action=<?php echo"assets/db/ProcesarRegistro.php?lang=".$lang ?> method="post">
                <label for="username"><?php echo $texto["nombreDeUsuario"]; ?></label><br>
                <input type="text" id="username" required name="username"><br><br>
                <label for="password"><?php echo $texto["contraseña"]; ?></label><br>
                <input type="password" id="password" required name="password"><br><br>

                <button class="botonEmpezarTiempo-TiempoTexto" type="submit"><?php echo $texto["crearCuenta"]; ?></button>
            </form>
        <?php endif; ?>
    </div>
</main>

<?php include "assets/phpComponentes/AfterMain.php"; ?>