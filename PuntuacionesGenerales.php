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
$java = "";
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

<style>
    body.Puntuaciones .contenedorPrincipal {
        width: fit-content;
        max-width: calc(100vw - 140px);
        margin: 0 auto;
        border-radius: 12px;
    }

    body.Puntuaciones .tabla-general {
        table-layout: auto;
        width: auto;
        margin: 0 auto;
    }

    body.Puntuaciones .tabla-general td {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: clip;
    }

    body.Puntuaciones .tabla-general td:first-child {
        width: auto;
    }

    @media (max-width: 740px) {
        body.Puntuaciones .contenedorPrincipal {
            width: calc(100vw - 12px);
            max-width: 360px;
        }

        body.Puntuaciones .tabla-general {
            width: 100%;
            table-layout: fixed;
        }

        body.Puntuaciones .tabla-general td:first-child {
            width: 34%;
        }
    }
</style>

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

<script>
    function ajustarTextoTablaGeneral() {
        const celdas = document.querySelectorAll(".tabla-general td");

        celdas.forEach((celda) => {
            let tamano = 16;
            celda.style.fontSize = tamano + "px";

            while (celda.scrollWidth > celda.clientWidth && tamano > 8) {
                tamano -= 1;
                celda.style.fontSize = tamano + "px";
            }
        });
    }

    function aplicarSaltosMovilTablaGeneral() {
        const celdasUsuario = document.querySelectorAll(".tabla-general .col-usuario");

        celdasUsuario.forEach((celda) => {
            if (!celda.dataset.textoOriginal) {
                celda.dataset.textoOriginal = celda.textContent.trim();
            }

            if (window.innerWidth <= 740) {
                celda.innerHTML = celda.dataset.textoOriginal.replace(/ /g, "<br>");
            } else {
                celda.textContent = celda.dataset.textoOriginal;
            }
        });
    }

    window.addEventListener("load", () => {
        aplicarSaltosMovilTablaGeneral();
        ajustarTextoTablaGeneral();
    });

    window.addEventListener("resize", () => {
        aplicarSaltosMovilTablaGeneral();
        ajustarTextoTablaGeneral();
    });
</script>

<?php include "assets/phpComponentes/AfterMain.php"; ?>
