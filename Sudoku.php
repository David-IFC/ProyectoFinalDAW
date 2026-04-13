<?php include "assets/phpComponentes/GestionSesiones.php"; ?>

<?php

// Cargar JSON según el idioma
$json_file = __DIR__ . "/assets/json/$lang.json";
$texto = json_decode(file_get_contents($json_file), true);
?>
<?php include "assets/phpComponentes/datos.php"; ?>
<?php
$clase = "Sudoku";
$java = "Sudoku.js"; 

?>

<?php include "assets/phpComponentes//BeforeMain.php"; ?>

<main>

    <div class="contenedorPrincipal">

        <div class="divTiempo">

            <img class="img" src="assets/img/relojArenaAzul.png" alt="">

            <p class="tiempo"><span class="numeroTiempo-TiempoTexto"></span><span class="letraS"> s</span> </p>


        </div>

        <table class="matriz" border="1">
            <tbody id="tablero"></tbody>
        </table>
        <div class="textAreaBotones-TiempoTexto"> <textarea readonly class="textoUsuario-TiempoTexto oculto"></textarea>
            <button class="botonEmpezarTiempo" onclick="generacionSudoku()"><?echo $texto["generarSudoku"];?></button>

        </div>

        <div class="resultadoTiempo oculto"></div>
        <button class="botonEmpezarTiempo reintentar oculto" onclick="recargar('Sudoku.php')"><?echo $texto["reintentar"];?></button>

    </div>
</main>

<?php include "assets/phpComponentes/AfterMain.php";?>