<?php include "assets/phpComponentes/GestionSesiones.php"; ?>
<?php include "assets/phpComponentes/IdiomaJson.php"; ?>
<?php include "assets/phpComponentes/datos.php"; ?>
<?php
$clase = "cuentaletras";
$java = "CuentaLetras.js";
?>

<?php include "assets/phpComponentes//BeforeMain.php"; ?>

<main>
    <div class="contenedorPrincipal">
        <p class="instruccion"><?php echo $texto["instruccionCuentaLetras"]; ?> </p>

        <div class="divTiempo">

            <img class="img" src="assets/img/relojArenaAzul.png" alt="">

            <p class="tiempo"><span class="numeroTiempo-TiempoTexto"></span><span class="letraS">s</span> </p>


        </div>

        <div class="botonesFila">


            <button class="botonEmpezarTiempo" onclick="empezar()"><?php echo $texto["empezar"]; ?></button>

        </div>
        <div class="divPalabrasAleatorias">
            <ul class="palabrasLetrasAContrar "> </ul>
        </div>



        <div class="textoInformativo instrucciones"><?php echo $texto["informacionCuentaletras"]; ?> <br></div>

        <div class="divResultados oculto">
            <div class="parejasAcertadas">
                <h2><? echo $texto["listadeParejasAcertadas"]; ?></h2>

                <div class="tablaPalabrasAcertadas"></div><br>
            </div>
            <div class="puntuacion resultadoTiempo">
                <h2><? echo $texto["resultadosCuentaletras"]; ?></h2>

                <div class="tablaPuntuacion ">
                    <? echo $texto["aciertos"]; ?> <span class="numeroAciertos">0 </span> &nbsp;&nbsp;&nbsp;
                    <? echo $texto["errores"]; ?> <span class="numeroErrores">0</span> <br><br>
                    <span class="textoPuntuacion"> <? echo $texto["puntuacion"]; ?></span> <span
                        class="numeroPuntuacion">0</span>
                </div>
            </div>

        </div>
        <div class="botonesFila">
            <button class="botonEmpezarTiempo reintentar oculto" onclick="recargar('CuentaLetras.php')"> <span
                    data-key="reintentar"><?php echo $texto["reintentar"]; ?></span></button>
        </div>
    </div>
</main>

<? include "assets/phpComponentes/AfterMain.php"; ?>