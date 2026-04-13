<!DOCTYPE html>
<html lang=<?php echo $lang; ?>>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $titulo; ?></title>
    <meta name="description"
        content="<?php echo htmlspecialchars($descripcion); ?>">
    <link rel="icon" type="image/png" href="assets/img/favicon-32x32.png">
    <link rel="stylesheet" href="assets/style.css?v=<?php echo date('U') ?>">
</head>

<body class=<?php echo $clase; ?>>
    <header>
        <nav>
            <?php
            if ($nombreUsuario && $home && $clase != "IniciarSesion" && $clase != "Registro" || $clase == "Puntuaciones") {
                //para impedir que la animacion del boton del usuario se vuelva a ver
                $_SESSION['Animacion'] = false;
            }

            if ($home) {

                echo '<button class="home" onclick="transicion(\'index.php?lang=' . $lang . '\')"><img src="assets/img/Logo.png" alt="Volver a Inicio"> </button>';

            }

            if ($idioma) {

                echo ' <details class="idioma">
    <summary>
        <span data-key="idioma">' . $texto["idioma"] . '</span>
        <br>
        <img class="flag" src="https://flagcdn.com/32x24/es.png" alt="España">
    </summary>
    <a href="index.php?lang=es" onclick="window.location=this.href;" data-lang="es">
        <span data-key="español">' . $texto["español"] . '</span>
        <br><img class="flag" src="https://flagcdn.com/32x24/es.png" alt="España">
    </a>
    <a href="index.php?lang=en" onclick="window.location=this.href;" data-lang="en">
        <span data-key="ingles">' . $texto["ingles"] . '</span>
        <br><img class="flag" src="https://flagcdn.com/32x24/us.png" alt="Estados Unidos">
    </a>

</details>';
            }
            ?>
            <?php if ($nombreUsuario && $home && $clase != "IniciarSesion" && $clase != "Puntuaciones"): ?>
                <div class="botonesRegistro">
                    <button onclick="transicion('Puntuaciones.php?lang=<?php echo $lang; ?>' )">
                        <?php echo $nombreUsuario ?> </button>
                </div>
            <?php endif; ?>
        </nav>



    </header>