<?php include "assets/phpComponentes/GestionSesiones.php"; ?>

<?php
// Cargar JSON según el idioma
$json_file = __DIR__ . "/assets/json/$lang.json";
$texto = json_decode(file_get_contents($json_file), true);
?>

<?php include "assets/phpComponentes/datos.php"; ?>

<?php
$clase = "TiempoTexto";
$java = "TiempoTexto.js";

?>

<?php include "assets/phpComponentes/BeforeMain.php"; ?>

<main>
    <div class="contenedorPrincipal">
        <p class="instruccion">
            <span data-key="instruccionTiempoTexto"><?php echo $texto["instruccionTiempoTexto"]; ?></span>
        </p>

        <div class="divTexto">
            <p class="texto">
                <span data-key="textoEjercicio"><?php echo $texto["textoEjercicio"]; ?></span>
            </p>
        </div>

        <div class="divTiempo">
            <img class="img" src="assets/img/relojArenaAzul.png" alt="">
            <p class="tiempo">
                <span class="numeroTiempo-TiempoTexto"></span><span class="letraS">s</span>
            </p>
        </div>

        <div class="textAreaBotones-TiempoTexto">
            <textarea readonly spellcheck="false" class="textoUsuario-TiempoTexto oculto"></textarea>
            <div class="botonesFila">
                <button class="botonEmpezarTiempo-TiempoTexto" onclick="empezarEscribirtexto()">
                    <span data-key="empezar"><?php echo $texto["empezar"]; ?></span>
                </button>
            </div>
        </div>

        <br><br>
        <div class="resultadoTiempo oculto"></div>
        <div class="botonesFila">
            <button class="botonEmpezarTiempo-TiempoTexto reintentar oculto" onclick="recargar('TiempoTexto.php')">
                <span data-key="reintentar"><?php echo $texto["reintentar"]; ?></span></button>
        </div>
    </div>
</main>

<?php include "assets/phpComponentes/AfterMain.php"; ?>