<?php include "assets/phpComponentes/GestionSesiones.php"; ?>
<?php include "assets/phpComponentes/IdiomaJson.php"; ?>
<?php include "assets/phpComponentes/datos.php"; ?>

<?php
$clase = "index";
$home = false;
$java = "Index.js";
$copy = true;
$idioma = true;
$nombreUsuario = $_SESSION['NombreUsuario'] ?? null;
$animacionInicial = $_SESSION['Animacion']?? true;
?>
<?php include "assets/phpComponentes/BeforeMain.php"; ?>
<?php if ($nombreUsuario && $animacionInicial): ?>
    <div class="botonesRegistro">
        <button class="destacarUsuario"  onclick="transicion('Puntuaciones.php?lang=<?php echo $lang; ?>' )"><?php echo $nombreUsuario ?> </button>
        <button
            onclick="transicion('assets/db/ProcesarCerrarSesion.php?lang=<?php echo $lang; ?>' )"><?php echo $texto["CerrarSesion"] ?></button>
    </div>
<?php elseif ($nombreUsuario): ?>
    <div class="botonesRegistro">
        <button  onclick="transicion('Puntuaciones.php?lang=<?php echo $lang; ?>' )"><?php echo $nombreUsuario ?> </button>
        <button
            onclick="transicion('assets/db/ProcesarCerrarSesion.php?lang=<?php echo $lang; ?>' )"><?php echo $texto["CerrarSesion"] ?></button>
    </div>
<?php else: ?>
    <div class="botonesRegistro">
        <button onclick="transicion('Registro.php?lang=<?php echo $lang; ?>' )"><?php echo $texto["resgistrar"] ?> </button>
        <button
            onclick="transicion('IniciarSesion.php?lang=<?php echo $lang; ?>' )"><?php echo $texto["iniciarSesion"] ?></button>
    </div>
<?php endif; ?>
<a href="https://github.com/David-IFC/ProyectoFinalDAW" target="_blank">
    <div class="logo">
        <img src="assets/img/Logo.png" alt="Logo">
    </div>
</a>

<main>
    <button class="BotonMenuPrincipal" onclick="transicion('TiempoTexto.php?lang=<?php echo $lang; ?>')">
        <span data-key="tiempoTexto"><?php echo $texto["tiempoTexto"]; ?></span>
    </button>
    <button class="BotonMenuPrincipal" onclick="transicion('CuentaLetras.php?lang=<?php echo $lang; ?>')">
        <span data-key="cuentaLetras"><?php echo $texto["cuentaLetras"]; ?></span>
    </button>
    <button class="BotonMenuPrincipal" onclick="transicion('Sudoku.php?lang=<?php echo $lang; ?>')">
        <span data-key="sudoku"><?php echo $texto["sudoku"]; ?></span>
    </button>
    <button class="BotonMenuPrincipal" onclick="transicion('Punteria.php?lang=<?php echo $lang; ?>')">
        <span data-key="punteria"><?php echo $texto["punteria"]; ?></span>
    </button>
</main>

<?php include "assets/phpComponentes/AfterMain.php"; ?>